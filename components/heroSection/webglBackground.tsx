"use client";

import React, { useEffect, useRef } from "react";

/**
 * WebGL particle field background.
 * Renders an interactive grid of dots that respond to mouse movement
 * with a parallax-like displacement effect.
 */
export function WebGLBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: true,
      premultipliedAlpha: false,
    });
    if (!gl) return;

    // --- Shader sources ---
    const vertSrc = `
      attribute vec2 a_position;
      attribute float a_size;
      attribute float a_alpha;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      uniform float u_time;
      varying float v_alpha;

      void main() {
        vec2 pos = a_position;

        // Mouse influence
        vec2 diff = pos - u_mouse;
        float dist = length(diff);
        float influence = smoothstep(250.0, 0.0, dist);
        pos += normalize(diff + 0.001) * influence * 30.0;

        // Subtle floating motion
        pos.y += sin(u_time * 0.5 + a_position.x * 0.01) * 2.0;
        pos.x += cos(u_time * 0.3 + a_position.y * 0.01) * 1.5;

        // Convert to clip space
        vec2 clipSpace = (pos / u_resolution) * 2.0 - 1.0;
        gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
        gl_PointSize = a_size * (1.0 + influence * 2.0);
        v_alpha = a_alpha * (0.3 + influence * 0.7);
      }
    `;

    const fragSrc = `
      precision mediump float;
      varying float v_alpha;
      uniform vec3 u_color;

      void main() {
        // Soft circle
        vec2 center = gl_PointCoord - 0.5;
        float d = length(center);
        float alpha = smoothstep(0.5, 0.2, d) * v_alpha;
        gl_FragColor = vec4(u_color, alpha);
      }
    `;

    function createShader(
      glCtx: WebGLRenderingContext,
      type: number,
      source: string
    ) {
      const shader = glCtx.createShader(type)!;
      glCtx.shaderSource(shader, source);
      glCtx.compileShader(shader);
      return shader;
    }

    function createProgram(
      glCtx: WebGLRenderingContext,
      vert: WebGLShader,
      frag: WebGLShader
    ) {
      const program = glCtx.createProgram()!;
      glCtx.attachShader(program, vert);
      glCtx.attachShader(program, frag);
      glCtx.linkProgram(program);
      return program;
    }

    const vertShader = createShader(gl, gl.VERTEX_SHADER, vertSrc);
    const fragShader = createShader(gl, gl.FRAGMENT_SHADER, fragSrc);
    const program = createProgram(gl, vertShader, fragShader);

    const aPosition = gl.getAttribLocation(program, "a_position");
    const aSize = gl.getAttribLocation(program, "a_size");
    const aAlpha = gl.getAttribLocation(program, "a_alpha");
    const uResolution = gl.getUniformLocation(program, "u_resolution");
    const uMouse = gl.getUniformLocation(program, "u_mouse");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uColor = gl.getUniformLocation(program, "u_color");

    // --- Generate particles ---
    const spacing = 28;
    let positions: number[] = [];
    let sizes: number[] = [];
    let alphas: number[] = [];
    let width = 0;
    let height = 0;

    function generateParticles() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas!.clientWidth;
      height = canvas!.clientHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;

      positions = [];
      sizes = [];
      alphas = [];

      const cols = Math.ceil(width / spacing) + 2;
      const rows = Math.ceil(height / spacing) + 2;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          positions.push(c * spacing, r * spacing);
          sizes.push(1.2 + Math.random() * 1.8);
          alphas.push(0.15 + Math.random() * 0.35);
        }
      }
    }

    generateParticles();

    const positionBuffer = gl.createBuffer();
    const sizeBuffer = gl.createBuffer();
    const alphaBuffer = gl.createBuffer();

    function uploadBuffers() {
      gl!.bindBuffer(gl!.ARRAY_BUFFER, positionBuffer);
      gl!.bufferData(
        gl!.ARRAY_BUFFER,
        new Float32Array(positions),
        gl!.STATIC_DRAW
      );

      gl!.bindBuffer(gl!.ARRAY_BUFFER, sizeBuffer);
      gl!.bufferData(
        gl!.ARRAY_BUFFER,
        new Float32Array(sizes),
        gl!.STATIC_DRAW
      );

      gl!.bindBuffer(gl!.ARRAY_BUFFER, alphaBuffer);
      gl!.bufferData(
        gl!.ARRAY_BUFFER,
        new Float32Array(alphas),
        gl!.STATIC_DRAW
      );
    }

    uploadBuffers();

    // --- Mouse tracking ---
    const mouse = { x: width / 2, y: height / 2 };

    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }
    canvas.addEventListener("mousemove", onMouseMove);

    // --- Render loop ---
    let animId: number;
    const startTime = performance.now();

    function render() {
      if (!gl) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      gl.viewport(0, 0, width * dpr, height * dpr);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

      gl.useProgram(program);
      gl.uniform2f(uResolution, width, height);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform1f(uTime, (performance.now() - startTime) / 1000);
      // Accent color: #c8f031 mapped to 0-1
      gl.uniform3f(uColor, 0.784, 0.941, 0.192);

      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.enableVertexAttribArray(aPosition);
      gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuffer);
      gl.enableVertexAttribArray(aSize);
      gl.vertexAttribPointer(aSize, 1, gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ARRAY_BUFFER, alphaBuffer);
      gl.enableVertexAttribArray(aAlpha);
      gl.vertexAttribPointer(aAlpha, 1, gl.FLOAT, false, 0, 0);

      gl.drawArrays(gl.POINTS, 0, positions.length / 2);

      animId = requestAnimationFrame(render);
    }

    render();

    function onResize() {
      generateParticles();
      uploadBuffers();
    }

    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-auto absolute inset-0 h-full w-full"
      style={{ opacity: 0.6 }}
    />
  );
}
