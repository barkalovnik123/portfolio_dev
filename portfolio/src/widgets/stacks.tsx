import React, { useMemo } from "react";
import {
  FileJson,
  FileCode2,
  Terminal,
  Coffee,
  Cpu,
  Triangle,
  Atom,
  Server,
  Zap,
  Database,
  GitBranch,
  Paintbrush,
  Gamepad2,
  Code,
  Blocks,
  Cat,
  Rocket,
  Kanban,
  CircuitBoard,
  Binary,
} from "lucide-react";

type Skill = {
  name: string;
  icon: React.ReactNode;
};

type SkillCategory = {
  title: string;
  accent: string;
  skills: Skill[];
  span: string;
};

const categories: SkillCategory[] = [
  {
    title: "Языки",
    accent: "text-amber-400",
    span: "md:col-span-2 md:row-span-1",
    skills: [
      { name: "JavaScript", icon: <FileJson size={16} /> },
      { name: "TypeScript", icon: <FileCode2 size={16} /> },
      { name: "Python", icon: <Terminal size={16} /> },
      { name: "Java", icon: <Coffee size={16} /> },
      { name: "C / C++", icon: <Cpu size={16} /> },
    ],
  },
  {
    title: "Фреймворки",
    accent: "text-blue-400",
    span: "md:col-span-2 md:row-span-1",
    skills: [
      { name: "Next.js", icon: <Triangle size={16} /> },
      { name: "React", icon: <Atom size={16} /> },
      { name: "Express", icon: <Server size={16} /> },
      { name: "Javalin", icon: <Coffee size={16} /> },
      { name: "FastAPI", icon: <Zap size={16} /> },
    ],
  },
  {
    title: "Базы данных",
    accent: "text-emerald-400",
    span: "md:col-span-1 md:row-span-1",
    skills: [
      { name: "SQLite3", icon: <Database size={16} /> },
      { name: "PostgreSQL", icon: <Database size={16} /> },
    ],
  },
  {
    title: "Инструменты",
    accent: "text-fuchsia-400",
    span: "md:col-span-3 md:row-span-1",
    skills: [
      { name: "Git", icon: <GitBranch size={16} /> },
      { name: "Figma", icon: <Paintbrush size={16} /> },
      { name: "Game Maker", icon: <Gamepad2 size={16} /> },
      { name: "Visual Studio Code", icon: <Code size={16} /> },
      { name: "IntelliJ IDEA", icon: <Blocks size={16} /> },
    ],
  },
  {
    title: "Обучение",
    accent: "text-cyan-400",
    span: "md:col-span-2 md:row-span-1",
    skills: [
      { name: "EduBlocks", icon: <Blocks size={16} /> },
      { name: "Scratch", icon: <Cat size={16} /> },
      { name: "TurboWarp", icon: <Rocket size={16} /> },
    ],
  },
  {
    title: "Электроника",
    accent: "text-lime-400",
    span: "md:col-span-1 md:row-span-1",
    skills: [
      { name: "Arduino", icon: <CircuitBoard size={16} /> },
      { name: "Micro Python", icon: <Binary size={16} /> },
    ],
  },
  {
    title: "Менеджмент",
    accent: "text-rose-400",
    span: "md:col-span-1 md:row-span-1",
    skills: [{ name: "Яндекс Трекер", icon: <Kanban size={16} /> }],
  },
];

type Star = {
  top: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
};

function useStars(count: number): Star[] {
  return useMemo(
    () =>
      Array.from({ length: count }, () => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 1.6 + 0.6,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 4,
      })),
    [count]
  );
}

export default function Stacks() {
  const stars = useStars(90);

  return (
    <section
      className="relative snap-section w-screen h-screen font-serif px-6 py-10 sm:px-12 overflow-y-auto"
      style={{
        background:
          "radial-gradient(circle at bottom left, #374151 0%, #000000 75%)",
        boxShadow: "black 0px -100px 180px"
      }}
    >
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.15; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1); }
        }
      `}</style>

      {/* Звёзды */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {stars.map((star, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col">
        {/* Бейдж SKILLS */}
        <span className="inline-block w-fit border border-gray-500 bg-gray-700 px-5 py-1.5 text-xs font-bold tracking-widest text-gray-200">
          SKILLS
        </span>

        {/* Заголовок */}
        <h2 className="mt-4 text-4xl font-bold text-white sm:text-5xl">
          Tech Stack
        </h2>

        {/* Bento-сетка */}
        <div className="mt-10 grid flex-1 grid-cols-1 grid-rows-[repeat(4,minmax(0,1fr))] gap-4 md:grid-cols-4 md:grid-rows-[repeat(3,minmax(0,1fr))]">
          {categories.map((category) => (
            <div
              key={category.title}
              className={`flex flex-col gap-4 border border-gray-600 bg-gray-700 p-5 ${category.span}`}
            >
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                {category.title}
              </p>

              <div className="flex flex-wrap content-start gap-2.5">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center gap-2 border border-gray-600 bg-gray-800 px-3.5 py-2 text-sm font-semibold text-gray-100"
                  >
                    <span className={category.accent}>{skill.icon}</span>
                    {skill.name}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}