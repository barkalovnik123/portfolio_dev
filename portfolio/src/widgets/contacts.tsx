// Contacts.tsx
import { type ReactNode } from 'react'
import Reveal from './reveal'

export default function Contacts(): ReactNode {
  const primaryContacts = [
    {
      name: 'Telegram',
      value: '@barkalovnik',
      url: 'https://t.me/barkalovnik',
      description: 'Отвечаю быстрее всего',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
        </svg>
      ),
      color: 'from-blue-500 to-cyan-500',
      priority: 'primary',
    },
  ]

  const secondaryContacts = [
    {
      name: 'Email',
      value: 'barkalov-2006@yandex.ru',
      url: 'mailto:barkalov-2006@yandex.ru',
      description: 'Для деловых предложений',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      color: 'from-red-500 to-orange-500',
    },
    {
      name: 'Instagram',
      value: '@nikita.barkalov',
      url: 'https://instagram.com/nikita.barkalov',
      description: 'Лайфстайл и закулисье',
      icon: (
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
      color: 'from-pink-500 to-purple-500',
    },
  ]

  return (
    <section
      id="contacts"
      className="snap-section z-0 relative min-h-screen flex flex-col justify-center font-serif py-20 bg-[url('/nightsky.jpg')] bg-no-repeat bg-cover bg-fixed"
    >
      {/* Затемняющий оверлей */}
      <div className="absolute inset-0 bg-linear-to-br from-indigo-950/90 via-purple-950/85 to-blue-950/90" />

      <div className="relative z-10 container mx-auto px-4">
        {/* Заголовок */}
        <Reveal from="up" className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-2xl">
            Контакты
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Выберите удобный способ связи
          </p>
        </Reveal>

        <Reveal from="scale" delay={150} className="max-w-5xl mx-auto space-y-8">
          {/* Основные контакты */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <h3 className="text-2xl font-bold text-white">
                Быстрая связь
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              {primaryContacts.map((contact) => (
                <a
                  key={contact.name}
                  href={contact.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-2xl bg-linear-to-br from-white/10 to-white/5 border border-white/20 p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-white/40"
                >
                  {/* Градиентный фон при hover */}
                  <div className={`absolute inset-0 bg-linear-to-br ${contact.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />

                  <div className="relative z-10 flex items-center gap-6">
                    {/* Иконка */}
                    <div className={`flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br ${contact.color} text-white shadow-lg group-hover:scale-110 transition-transform shrink-0`}>
                      {contact.icon}
                    </div>

                    {/* Информация */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-xl font-bold text-white">
                          {contact.name}
                        </h4>
                        <span className="px-2 py-0.5 bg-green-500/20 text-green-300 text-xs font-semibold rounded-full border border-green-500/30">
                          Отвечаю быстро
                        </span>
                      </div>
                      <p className="text-white/90 font-medium mb-1">
                        {contact.value}
                      </p>
                      <p className="text-white/60 text-sm">
                        {contact.description}
                      </p>
                    </div>

                    {/* Стрелка */}
                    <svg
                      className="w-6 h-6 text-white/60 group-hover:text-white group-hover:translate-x-2 transition-all"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Второстепенные контакты */}
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 bg-yellow-400 rounded-full" />
              <h3 className="text-xl font-bold text-white/90">
                Альтернативные способы связи
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {secondaryContacts.map((contact) => (
                <a
                  key={contact.name}
                  href={contact.url}
                  target={contact.url.startsWith('http') ? '_blank' : undefined}
                  rel={contact.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 p-5 transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-105"
                >
                  {/* Градиентный фон при hover */}
                  <div className={`absolute inset-0 bg-linear-to-br ${contact.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                  <div className="relative z-10 flex items-center gap-4">
                    {/* Иконка */}
                    <div className={`flex items-center justify-center w-12 h-12 rounded-xl bg-linear-to-br ${contact.color} text-white shadow-md group-hover:scale-110 transition-transform`}>
                      {contact.icon}
                    </div>

                    {/* Информация */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-lg font-bold text-white mb-0.5">
                        {contact.name}
                      </h4>
                      <p className="text-white/80 text-sm font-medium truncate mb-0.5">
                        {contact.value}
                      </p>
                      <p className="text-white/50 text-xs">
                        {contact.description}
                      </p>
                    </div>

                    {/* Стрелка */}
                    <svg
                      className="w-5 h-5 text-white/40 group-hover:text-white/80 group-hover:translate-x-1 transition-all shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Дополнительная информация */}
          <div className="text-center pt-8">
            <p className="text-white/60 text-sm">
              Обычно отвечаю в течение нескольких часов в рабочее время
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}