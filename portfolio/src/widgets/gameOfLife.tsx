import { useRef, useEffect } from "react";

export default function GameOfLife() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ===== Настройки =====
    const cellSize = 12; // размер клетки в пикселях
    const aliveProbability = 0.15; // вероятность живой клетки на старте
    const allowRandomLife = false; // разрешить случайное рождение
    const randomLifeProbability = 0.0005;
    const poleType: 1 | 0 = 0; // 0 - тор (края соединены), 1 - ограничено экраном
    const tickMs = 250; // скорость смены поколений
    const fadeSpeed = 0.08; // скорость плавного появления/исчезновения (0..1, меньше = плавнее)

    const bgColor = "#0a0a0a";
    const newCellColor = "#4f7cff";
    const oldCellColor = "#7c3aed";

    let width = 0;
    let height = 0;
    let oldPole: number[][] = [];
    let newPole: number[][] = [];
    let alpha: number[][] = [];
    let colorState: number[][] = [];
    let animationId = 0;
    let lastTick = 0;

    function randomRow(w: number) {
      return Array(w)
        .fill(0)
        .map(() => +(Math.random() < aliveProbability));
    }

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      canvas!.width = window.innerWidth * dpr;
      canvas!.height = window.innerHeight * dpr;
      canvas!.style.width = window.innerWidth + "px";
      canvas!.style.height = window.innerHeight + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      width = Math.ceil(window.innerWidth / cellSize);
      height = Math.ceil(window.innerHeight / cellSize);

      oldPole = [];
      for (let i = 0; i < height; i++) {
        oldPole.push(randomRow(width));
      }
      newPole = oldPole.map((r) => [...r]);
      alpha = oldPole.map((row) => row.map((v) => (v ? 1 : 0)));
      colorState = oldPole.map((row) => row.map((v) => (v ? 1 : 0)));
    }

    function cycle() {
      const w = width - 1;
      const h = height - 1;

      oldPole.forEach((row, y) => {
        row.forEach((cell, x) => {
          let aliveAround = 0;

          if (poleType === 1) {
            if (y > 0) aliveAround += +!!oldPole[y - 1][x];
            if (y < h) aliveAround += +!!oldPole[y + 1][x];
            if (x > 0) aliveAround += +!!oldPole[y][x - 1];
            if (x < w) aliveAround += +!!oldPole[y][x + 1];
            if (y > 0 && x > 0) aliveAround += +!!oldPole[y - 1][x - 1];
            if (y > 0 && x < w) aliveAround += +!!oldPole[y - 1][x + 1];
            if (y < h && x > 0) aliveAround += +!!oldPole[y + 1][x - 1];
            if (y < h && x < w) aliveAround += +!!oldPole[y + 1][x + 1];
          } else {
            aliveAround += +!!(y > 0 ? oldPole[y - 1][x] : oldPole[h][x]);
            aliveAround += +!!(y < h ? oldPole[y + 1][x] : oldPole[0][x]);
            aliveAround += +!!(x > 0 ? oldPole[y][x - 1] : oldPole[y][w]);
            aliveAround += +!!(x < w ? oldPole[y][x + 1] : oldPole[y][0]);
            aliveAround += +!!(y > 0 && x > 0
              ? oldPole[y - 1][x - 1]
              : y > 0
              ? oldPole[y - 1][w]
              : x > 0
              ? oldPole[h][x - 1]
              : oldPole[h][w]);
            aliveAround += +!!(y > 0 && x < w
              ? oldPole[y - 1][x + 1]
              : y > 0
              ? oldPole[y - 1][0]
              : x < w
              ? oldPole[h][x + 1]
              : oldPole[h][0]);
            aliveAround += +!!(y < h && x > 0
              ? oldPole[y + 1][x - 1]
              : y < h
              ? oldPole[y + 1][w]
              : x > 0
              ? oldPole[0][x - 1]
              : oldPole[0][w]);
            aliveAround += +!!(y < h && x < w
              ? oldPole[y + 1][x + 1]
              : y < h
              ? oldPole[y + 1][0]
              : x < w
              ? oldPole[0][x + 1]
              : oldPole[0][0]);
          }

          if (oldPole[y][x] === 2) {
            newPole[y][x] = 1;
          }

          if (!cell) {
            if (aliveAround === 3) {
              newPole[y][x] = 2;
            }
            if (allowRandomLife && Math.random() < randomLifeProbability) {
              newPole[y][x] = 2;
            }
          } else {
            if (aliveAround !== 2 && aliveAround !== 3) {
              newPole[y][x] = 0;
            }
          }

          // запоминаем последний "живой" цвет клетки — понадобится для плавного затухания
          if (newPole[y][x]) {
            colorState[y][x] = newPole[y][x];
          }
        });
      });
    }

    function draw() {
      ctx!.fillStyle = bgColor;
      ctx!.fillRect(0, 0, window.innerWidth, window.innerHeight);

      for (let y = 0; y < newPole.length; y++) {
        for (let x = 0; x < newPole[y].length; x++) {
          // плавно двигаем alpha к целевому значению (живая=1, мёртвая=0)
          const target = newPole[y][x] ? 1 : 0;
          alpha[y][x] += (target - alpha[y][x]) * fadeSpeed;
          if (Math.abs(target - alpha[y][x]) < 0.004) alpha[y][x] = target;

          const a = alpha[y][x];
          if (a <= 0.004) continue;

          ctx!.globalAlpha = a;
          ctx!.fillStyle = colorState[y][x] === 2 ? newCellColor : oldCellColor;
          ctx!.fillRect(x * cellSize, y * cellSize, cellSize - 1, cellSize - 1);
        }
      }
      ctx!.globalAlpha = 1;
    }

    function loop(timestamp: number) {
      if (timestamp - lastTick >= tickMs) {
        lastTick = timestamp;
        cycle();
        oldPole = newPole;
        newPole = oldPole.map((r) => [...r]);
      }
      draw();
      animationId = requestAnimationFrame(loop);
    }

    resize();
    window.addEventListener("resize", resize);
    animationId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="sticky w-screen h-screen overflow-hidden inset-0 z-0 mb-[-100vh]">
        <canvas
        ref={canvasRef}
        style={{
            width: "100vw",
            height: "100vh",
            display: "block",
        }}
        />
    </div>
  );
}