import { NextResponse } from "next/server";

export async function GET() {
  const GITHUB_USERNAME = process.env.GITHUB_USERNAME || "tabrezkhan005";
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

  // Fallback to mock data if no token is provided to prevent crash
  if (!GITHUB_TOKEN) {
    console.warn("GITHUB_TOKEN is missing. Returning mock data.");
    const contributions = Array.from({ length: 364 }).map((_, i) => ({
      date: i,
      level: Math.random() > 0.7 ? Math.floor(Math.random() * 5) : 0
    }));

    return NextResponse.json({
      contributions,
      stats: {
        repositories: 48,
        hoursWorked: 2450,
        linesOfCode: "1.2M+",
        totalContributions: 1807,
        githubUsername: GITHUB_USERNAME
      }
    });
  }

  // Calculate date range for a rolling year (last 365 days)
  const now = new Date();
  const to = now.toISOString();
  const from = new Date(now.setFullYear(now.getFullYear() - 1)).toISOString();

  const query = `
    query($username: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $username) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
                color
              }
            }
          }
        }
        repositories(privacy: PUBLIC) {
          totalCount
        }
        followers {
          totalCount
        }
      }
    }
  `;

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { username: GITHUB_USERNAME, from, to },
      }),
    });

    const result = await response.json();

    if (result.errors) {
      throw new Error(result.errors[0].message);
    }

    const { user } = result.data;
    const calendar = user.contributionsCollection.contributionCalendar;

    // Flatten 52 weeks of days into a single array
    const contributions = calendar.weeks.flatMap((week: any) =>
      week.contributionDays.map((day: any) => ({
        date: day.date,
        // Map GitHub colors/counts to 0-4 levels for your frontend
        level: day.contributionCount === 0 ? 0 :
               day.contributionCount < 3 ? 1 :
               day.contributionCount < 6 ? 2 :
               day.contributionCount < 9 ? 3 : 4
      }))
    );

    // Dynamic stats calculation
    const totalContributions = calendar.totalContributions;

    // Estimations for "Experience" metrics (GitHub doesn't track these directly)
    const hoursWorked = Math.floor(totalContributions * 1.5); // Est 1.5h per contribution
    const linesOfCode = `${(totalContributions * 125 / 1000).toFixed(1)}k+`; // Est 125 lines per contribution

    const stats = {
      repositories: user.repositories.totalCount,
      hoursWorked,
      linesOfCode,
      totalContributions,
      githubUsername: GITHUB_USERNAME
    };

    return NextResponse.json({ contributions, stats });
  } catch (error: any) {
    console.error("GitHub API Error:", error.message);
    return NextResponse.json({ error: "Failed to fetch GitHub data" }, { status: 500 });
  }
}
