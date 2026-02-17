import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue } from "framer-motion";
import { Header } from "../header";
import { Bulge } from "../bulge";
import Image from "next/image";

const logoItems = [
  { name: "Antigravity", file: "antigravity.svg" },
  { name: "App Store", file: "appstore.svg" },
  { name: "Arc Browser", file: "arc_browser.svg" },
  { name: "AWS", file: "aws_dark.svg" },
  { name: "Bun", file: "bun.svg" },
  { name: "C++", file: "cP_orange.svg" },
  { name: "Convex", file: "convex_wordmark_dark.svg" },
  { name: "Coursera", file: "coursera.svg" },
  { name: "Cursor", file: "cursor_dark.svg" },
  { name: "Dribbble", file: "dribbble-wordmark-dark.svg" },
  { name: "Express", file: "expressjs_dark.svg" },
  { name: "Figma", file: "figma-logo.svg" },
  { name: "Firebase", file: "firebase.svg" },
  { name: "Flutter", file: "flutter.svg" },
  { name: "Framer", file: "framer-logo.svg" },
  { name: "GDSC", file: "gdsc.svg" },
  { name: "Git", file: "git.svg" },
  { name: "GitHub", file: "github_dark.svg" },
  { name: "Google Cloud", file: "google-cloud.svg" },
  { name: "Google Play", file: "googleplay.svg" },
  { name: "GSAP", file: "gsap-logo.svg" },
  { name: "Java", file: "java.svg" },
  { name: "LinkedIn", file: "linkedin.svg" },
  { name: "MCP", file: "model-context-protocol-wordmark-dark.svg" },
  { name: "MongoDB", file: "mongodb-wordmark-dark.svg" },
  { name: "MySQL", file: "mysql-wordmark-dark.svg" },
  { name: "Next.js", file: "nextjs-logo.svg" },
  { name: "Node.js", file: "nodejs.svg" },
  { name: "Notion", file: "notion.svg" },
  { name: "NPM", file: "npm.svg" },
  { name: "Ollama", file: "ollama_dark.svg" },
  { name: "PostgreSQL", file: "postgresql-wordmark-dark.svg" },
  { name: "React", file: "react-logo.svg" },
  { name: "Resend", file: "resend-wordmark-white.svg" },
  { name: "Stripe", file: "stripe.svg" },
  { name: "Supabase", file: "supabase.svg" },
  { name: "Tailwind", file: "tailwind-logo.svg" },
  { name: "TypeScript", file: "typescript-logo.svg" },
  { name: "Webflow", file: "webflow-logo.svg" },
  { name: "WebGL", file: "webgl.svg" },
];

const DraggableLogo = React.memo(({ item, initialPos }: { item: typeof logoItems[0], initialPos: { x: number, y: number, r: number } }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotate = useMotionValue(initialPos.r);

    const handleRotate = (delta: { x: number, y: number }, factor: { x: number, y: number }) => {
        const current = rotate.get();
        // Calculate rotation contribution based on drag delta and corner position factors
        // Tuning 0.5 for sensitivity
        const change = (delta.x * factor.x + delta.y * factor.y) * 0.5;
        rotate.set(current + change);
    };

    return (
        <motion.div
            drag
            dragMomentum={true}
            dragElastic={0.1}
            style={{ x, y, rotate, marginLeft: `${initialPos.x}vw`, marginTop: `${initialPos.y}vh` }}
            whileHover={{ scale: 1.1, zIndex: 50 }}
            whileTap={{ scale: 0.95, cursor: "grabbing" }}
            className="absolute top-1/2 left-1/2 flex items-center justify-center cursor-move group will-change-transform"
        >
            {/* The Logo Image */}
            <div className="relative w-16 h-16 md:w-24 md:h-24 transition-transform duration-300 ease-out">
                <Image
                    src={`/svg_logo/${item.file}`}
                    alt={item.name}
                    fill
                    className="object-contain drop-shadow-2xl"
                    draggable={false}
                    priority // Prioritize loading these logos
                    sizes="(max-width: 768px) 100px, 150px"
                />
            </div>

            {/* Invisible Rotation Handles (Corners) */}
            <CornerHandle position="-top-4 -left-4"  factor={{ x: 1, y: -1 }} onRotate={handleRotate} />
            <CornerHandle position="-top-4 -right-4" factor={{ x: 1, y: 1 }}  onRotate={handleRotate} />
            <CornerHandle position="-bottom-4 -right-4" factor={{ x: -1, y: 1 }} onRotate={handleRotate} />
            <CornerHandle position="-bottom-4 -left-4" factor={{ x: -1, y: -1 }} onRotate={handleRotate} />

        </motion.div>
    );
});

DraggableLogo.displayName = "DraggableLogo";

const CornerHandle = React.memo(({ position, factor, onRotate }: { position: string, factor: {x:number, y:number}, onRotate: (d: {x:number, y:number}, f: {x:number, y:number}) => void }) => (
    <motion.div
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0}
        dragMomentum={false}
        onDrag={(e, info) => onRotate(info.delta, factor)}
        onPointerDown={(e) => e.stopPropagation()}
        className={`absolute w-12 h-12 ${position} cursor-help opacity-0 z-20`}
    />
));

CornerHandle.displayName = "CornerHandle";

export function TechStackSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [positions, setPositions] = useState<Array<{x: number, y: number, r: number}>>([]);

  useEffect(() => {
    // Grid-based scattering to prevent overlap
    const cols = 8; // 8 columns
    const rows = 6; // 6 rows ~ 48 slots for 40 items
    const slots: {x: number, y: number}[] = [];

    const xRange = 85; // 85vw width (-42.5 to 42.5)
    const yRange = 70; // 70vh height (-35 to 35)
    const stepX = xRange / cols;
    const stepY = yRange / rows;

    // Create grid slots
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            slots.push({
                x: -xRange / 2 + i * stepX + stepX / 2,
                y: -yRange / 2 + j * stepY + stepY / 2
            });
        }
    }

    // Shuffle slots (Fisher-Yates)
    for (let i = slots.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [slots[i], slots[j]] = [slots[j], slots[i]];
    }

    const newPositions = logoItems.map((_, i) => {
        const slot = slots[i] || { x: 0, y: 0 };
        return {
            // Add jitter, but keep inside slot (max +/- 40% of slot dimension)
            x: slot.x + (Math.random() - 0.5) * (stepX * 0.6),
            y: slot.y + (Math.random() - 0.5) * (stepY * 0.6),
            r: Math.random() * 30 - 15
        };
    });
    setPositions(newPositions);
  }, []);

  return (
    <section className="section section__6 sixth relative h-screen w-full overflow-hidden bg-black flex items-center justify-center">
      <Bulge type="Light" />
      <Header color="Light" />

      {/* Background Title */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <h1 className="text-[12vw] font-bold text-white/5 uppercase tracking-tighter leading-none text-center blur-sm will-change-transform">
          Technology<br />Stack
        </h1>
      </div>

      {/* Draggable Area */}
      <div ref={containerRef} className="relative w-full h-full z-10 perspective-1000">
         {positions.length > 0 && logoItems.map((item, i) => (
             <DraggableLogo
                key={item.name}
                item={item}
                initialPos={positions[i]}
             />
         ))}

         {/* Hint text */}
         <div className="absolute bottom-12 left-0 w-full text-center text-white/30 text-sm pointer-events-none font-medium tracking-wide">
            Drag to move • Grab corner to rotate
         </div>
      </div>

    </section>
  );
}
