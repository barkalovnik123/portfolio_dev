// Education.tsx
import { useState } from 'react'
import Reveal from '../widgets/reveal'

export default function Education() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section className="snap-section min-h-screen flex flex-col justify-center py-16 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800
    font-serif">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Заголовок секции */}
          <Reveal from="up" className="text-center mb-10">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Образование
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Текущий этап обучения
            </p>
          </Reveal>

          {/* Карточка университета */}
          <Reveal from="scale" delay={150}>
          <div
            className="relative bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Декоративный градиент сверху */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

            <div className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Логотип университета */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className={`w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-300 ${isHovered ? 'scale-110 rotate-3' : ''}`}>
                      <img
                        src="/nstu-logo.png"
                        alt="НГТУ НЭТИ"
                        className="w-20 h-20 md:w-24 md:h-24 object-contain filter brightness-0 invert"
                        onError={(e) => {
                          // Fallback если логотип не загружен
                          e.currentTarget.style.display = 'none'
                          e.currentTarget.parentElement!.innerHTML = `
                            <div class="text-white text-center">
                              <div class="text-4xl font-bold">НГТУ</div>
                              <div class="text-xs mt-1">НЭТИ</div>
                            </div>
                          `
                        }}
                      />
                    </div>
                    {/* Декоративный элемент */}
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-md">
                      <svg className="w-4 h-4 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Информация */}
                <div className="flex-1 text-center md:text-left">
                  {/* Название университета */}
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    НГТУ НЭТИ
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Новосибирский государственный технический университет
                  </p>

                  {/* Уровень образования */}
                  <div className="inline-flex items-center gap-3 bg-blue-50 dark:bg-blue-900/30 rounded-full px-5 py-2.5 mb-4">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      </svg>
                      <span className="text-sm font-semibold text-blue-900 dark:text-blue-100">
                        Бакалавриат
                      </span>
                    </div>
                    <div className="h-4 w-px bg-blue-300 dark:bg-blue-700" />
                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                      3 курс
                    </span>
                  </div>

                  {/* Дополнительная информация */}
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm text-gray-600 dark:text-gray-400 mb-6">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>2024 - 2028</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>Новосибирск, Россия</span>
                    </div>
                  </div>

                  {/* Кнопка успеваемости */}
                  <a
                    href="https://www.nstu.ru/studies/stud_account/student_portfolio/c56574b65a606a6f18e56499e30a5bc1792ece62"
                    download
                    className="group inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105"
                  >
                    <svg className="w-5 h-5 transition-transform group-hover:translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V16a2 2 0 01-2 2z" />
                    </svg>
                    <span>Бланк успеваемости</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Декоративный элемент снизу */}
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}