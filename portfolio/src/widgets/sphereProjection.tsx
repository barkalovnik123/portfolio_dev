import { useRef, useEffect } from "react";

type Coords = [number, number, number];

function rotate([x, y, z]: Coords, a = 0, b = 0, c = 0): Coords {
  const nx = x * Math.cos(b) * Math.cos(c) - y * Math.sin(c) * Math.cos(b) + z * Math.sin(b);
  let ny = x * (Math.sin(a) * Math.sin(b) * Math.cos(c) + Math.sin(c) * Math.cos(a));
  ny += y * (-Math.sin(a) * Math.sin(b) * Math.sin(c) + Math.cos(a) * Math.cos(c));
  ny += z * -Math.sin(a) * Math.cos(b);
  let nz = x * (Math.sin(a) * Math.sin(c) - Math.sin(b) * Math.cos(a) * Math.cos(c));
  nz += y * (Math.sin(a) * Math.cos(c) + Math.sin(b) * Math.sin(c) * Math.cos(a));
  nz += z * Math.cos(a) * Math.cos(b);
  return [nx, ny, nz];
}

// Разбиение рёбер многоугольника на n точек линейной интерполяцией.
function findDots(vertices: Coords[], n = 16): Coords[] {
  const dots: Coords[] = [];
  const edges = vertices.map((_, k) => (k < vertices.length - 1 ? [k, k + 1] : [k, 0]));
  for (const [start, end] of edges) {
    for (let k = 0; k < n; k++) {
      const t = k / n;
      dots.push([0, 1, 2].map((j) => vertices[start][j] * (1 - t) + vertices[end][j] * t) as Coords);
    }
  }
  return dots;
}

function projectionOnSphere([x, y, z]: Coords, r = 1): Coords {
  const len = Math.sqrt(x * x + y * y + z * z);
  if (len === 0) return [0, 0, 0];
  const k = r / len;
  return [x * k, y * k, z * k];
}

function centralProjection([x0, y0, z0]: Coords, center = [0, 0, 2], A = 0, B = 0, C = 1, D = 2) {
  const p = center[0] - x0;
  const q = center[1] - y0;
  const m = center[2] - z0;
  const denom = A * p + B * q + C * m;
  if (denom === 0) return [x0, y0, z0];
  const t = (-D - C * z0 - B * y0 - A * x0) / denom;
  return [x0 + p * t, y0 + q * t, z0 + m * t];
}

// Полная цепочка преобразований для одной фигуры.
function processFigure(vertices: Coords[], angles: number[]) {
  const rotated: Coords[] = vertices.map((v) => rotate(v, angles[0], angles[1], angles[2]));
  const dots = findDots(rotated);
  return dots.map((d) => centralProjection(projectionOnSphere(d)));
}

/* ---------------------------------------------------------------------
   Тест 7 из моего РГР (квадрат + два треугольника) - используется как фон по умолчанию.
--------------------------------------------------------------------- */

const SQ3 = Math.sqrt(3);

const TEST_7_FIGURES = [
  { vertices: [[0, 2, 2], [2, 2, 0], [0, 2, -2], [-2, 2, 0]] as Coords[], speeds: [1, 1, 0], consts: [0, 0, 0] },
  { vertices: [[0, 2, 2], [SQ3, 2, -1], [-SQ3, 2, -1]] as Coords[], speeds: [1, 1, 1], consts: [0, 0, 0] },
  { vertices: [[1, 1, 3], [-2, 1, 3], [-2, -1, 3]] as Coords[], speeds: [1, 0, 0], consts: [0, 5, 5] },
];

const FIGURE_COLORS = ["#c43c3c", "#46aa6e", "#4678c8"];

// Скорость роста таймера в секунду (та же, что и в python-версии проекта).
const TIMER_SPEED = 0.8;

/* ---------------------------------------------------------------------
   Компонент-фон
--------------------------------------------------------------------- */

export default function SphereProjectionBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const timerRef = useRef(0);
  const lastTsRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas == null) return;
    const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
    if (ctx == null) return;

    // Подгоняем размер canvas под размер окна (с учётом плотности пикселей).
    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = (ts: number) => {
      if (lastTsRef.current == null) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;
      timerRef.current += dt * TIMER_SPEED;
      const timer = timerRef.current;

      const centerX = width / 2;
      const centerY = height / 2;
      // Радиус сферы и масштаб подстраиваются под меньшую сторону экрана,
      // чтобы анимация всегда была полностью видна.
      const base = Math.min(width, height);
      const sphereRadius = base * (232 / 600);
      const scale = base * (200 / 600);

      ctx.fillStyle = "#01031c";
      ctx.fillRect(0, 0, width, height);

      ctx.beginPath();
      ctx.arc(centerX, centerY, sphereRadius, 0, Math.PI * 2);
      ctx.fillStyle = "#111";
      ctx.fill();

      TEST_7_FIGURES.forEach((figure, index) => {
        const angles = [0, 1, 2].map((i) => figure.speeds[i] * timer + figure.consts[i]);
        // Инвертируем ось Y: canvas растёт вниз, а в исходной python/arcade
        // версии - вверх, поэтому знак при y меняется на противоположный.
        const finalPoints = processFigure(figure.vertices, angles).map(([x, y]) => [
          x * scale + centerX,
          centerY - y * scale,
        ]);

        ctx.strokeStyle = FIGURE_COLORS[index % FIGURE_COLORS.length];
        ctx.lineWidth = 2;
        ctx.beginPath();
        finalPoints.forEach(([x, y], i) => {
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        ctx.closePath();
        ctx.stroke();
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTsRef.current = null;
    };
  }, []);

  return (
    <div className="sticky w-screen h-screen overflow-hidden inset-0 z-[-1]">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}