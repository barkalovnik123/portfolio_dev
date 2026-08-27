import { type ReactNode } from 'react'
import Reveal from './reveal'

export default function TechStack(): ReactNode {
  const technologies = [
    {
      name: 'React',
      category: 'Frontend',
      icon: '⚛️',
      description: 'Основной фреймворк для SPA',
      bg: '/react.png',
      gradient: 'from-cyan-500 to-blue-600',
      size: 'col-span-2 row-span-2',
    },
    {
      name: 'TypeScript',
      category: 'Язык',
      icon: '📘',
      description: 'Типизация JavaScript',
      bg: '/ts.png',
      gradient: 'from-blue-600 to-indigo-700',
      size: 'col-span-1 row-span-1',
    },
    {
      name: 'Tailwind CSS',
      category: 'Стилизация',
      icon: '🎨',
      description: 'Utility-first CSS',
      bg: '/tw.jpg',
      gradient: 'from-sky-400 to-cyan-500',
      size: 'col-span-1 row-span-1',
    },
    {
      name: 'Node.js',
      category: 'Backend',
      icon: '🟢',
      bg: '/nodejs-logo.svg',
      description: 'Серверная разработка',
      gradient: 'from-green-500 to-emerald-600',
      size: 'col-span-1 row-span-2',
    },
    {
      name: 'Next.js',
      category: 'Framework',
      icon: '▲',
      bg: "/nextjs.jpg",
      description: 'React с SSR и SSG',
      gradient: 'from-gray-900 to-gray-700',
      size: 'col-span-1 row-span-1',
    },
    {
      name: 'PostgreSQL',
      category: 'База данных',
      icon: '🐘',
      bg: "/postgre.webp",
      description: 'Реляционная БД',
      gradient: 'from-blue-700 to-indigo-800',
      size: 'col-span-1 row-span-1',
    },
    {
      name: 'Git',
      category: 'Инструменты',
      icon: '🔀',
      bg: "/git.webp",
      description: 'Контроль версий',
      gradient: 'from-orange-500 to-red-600',
      size: 'col-span-1 row-span-1',
    },
    {
      name: 'Docker',
      category: 'DevOps',
      icon: '🐳',
      bg: "docker.jpeg",
      description: 'Контейнеризация',
      gradient: 'from-blue-500 to-cyan-600',
      size: 'col-span-1 row-span-1',
    },
    {
      name: 'Python',
      category: 'Backend',
      icon: '🐍',
      bg: "python.webp",
      description: 'Автоматизация и API',
      gradient: 'from-yellow-500 to-orange-600',
      size: 'col-span-2 row-span-1',
    },
    {
      name: 'Figma',
      category: 'Дизайн',
      icon: '🎯',
      bg: "/figma.jpg",
      description: 'UI/UX прототипы',
      gradient: 'from-purple-500 to-pink-600',
      size: 'col-span-1 row-span-1',
    },
    {
      name: 'MongoDB',
      category: 'База данных',
      icon: '🍃',
      bg: '/mongo.webp',
      description: 'NoSQL база данных',
      gradient: 'from-green-600 to-emerald-700',
      size: 'col-span-1 row-span-1',
    },
  ]

  return (
    <section className="snap-section min-h-screen flex flex-col justify-center font-serif
    py-20 bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 bg-[url('/nightsky.jpg')] bg-no-repeat bg-cover"
    style={{
        boxShadow: "black 0 0 120px",
                zIndex: "10"
            }}>
      <div className="container mx-auto px-4">
        {/* Заголовок */}
        <Reveal from="up" className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Стэки
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Инструменты и технологии, с которыми я работаю ежедневно
          </p>
        </Reveal>

        {/* Bento Grid */}
        <Reveal from="scale" delay={150} className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[140px]">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className={`${tech.size} group relative overflow-hidden rounded-3xl bg-linear-to-br ${tech.gradient} p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer`}
              style={{
                backgroundImage: tech.bg
                  ? `url(${tech.bg})`
                  : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* Декоративный круг */}
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all" />
              
              {/* Контент */}
              <div className="relative z-10 h-full flex flex-col justify-between">
                {/* Иконка */}
                {/* <div className="text-4xl md:text-5xl mb-2 transform group-hover:scale-110 transition-transform">
                  {tech.icon}
                </div> */}

                {/* Информация */}
                <div style={{textShadow: "black 0 0 5px"}}>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                    {tech.name}
                  </h3>
                  <p className="text-xs md:text-sm text-white/80 mb-2">
                    {tech.category}
                  </p>
                  <p className="text-sm text-white/90 opacity-0 group-hover:opacity-100 transition-opacity">
                    {tech.description}
                  </p>
                </div>
              </div>

              {/* Эффект свечения при hover */}
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-300" />
            </div>
          ))}
        </Reveal>

        {/* Дополнительная информация */}
        <Reveal from="up" delay={100} className="mt-16 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Постоянно изучаю новые технологии и инструменты
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Redux', 'GraphQL', 'Jest', 'Webpack', 'AWS', 'Linux'].map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-shadow"
              >
                {skill}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}