// Companies.tsx
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const companies = [
  {
    id: 1,
    name: 'ProSchool',
    period: '2025 - 2026',
    position: 'Заменяющий преподаватель информатики и математики',
    description: 'Подготовка детей к ЕГЭ / ОГЭ, проведение уроков по информатике',
    technologies: ['ЕГЭ', 'ОГЭ', 'Scratch', 'EduBlocks', 'Python'],
    logo: '/_logotype_PROschool_.png',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 2,
    name: 'Movavi',
    period: '2024 - текущее время',
    position: 'Куратор курса, преподаватель',
    description: 'Разработчик курса веб-разработки на React, Express. Преподаватель олимпиадного программирования, Python, математики',
    technologies: ['React', 'Express', 'JavaScript', 'HTML', 'CSS'],
    logo: "/movavi.svg",
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 3,
    name: 'Море',
    period: '2025 - 2026',
    position: 'Преподаватель в летней школе',
    description: 'Преподаватель разработки сайтов на JavaScript на мастер-классах в летнем лагере',
    technologies: ['HTML', 'CSS', 'JavaScript', 'jQuery'],
    logo: '/more.webp',
    color: 'from-orange-500 to-red-500',
  },
  {
    id: 4,
    name: '10-я гимназия',
    period: '2025',
    position: 'Подготовка к ЕГЭ',
    description: 'Участие в подготовке к ЕГЭ',
    technologies: ['Python'],
    logo: '/10school.png',
    color: 'from-green-500 to-teal-500',
  },
]

export default function Companies() {
  return (
    <section className="py-20 font-serif bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold text-center mb-4 text-gray-900 dark:text-white">
          Мой опыт работы
        </h2>
        <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-12">
          Компании, в которых я развивал свои навыки
        </p>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          className="pb-16"
        >
          {companies.map((company) => (
            <SwiperSlide key={company.id}>
              <div className="mt-4 mb-4 h-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                {/* Градиентная шапка */}
                <div className={`h-32 bg-gradient-to-br ${company.color} flex items-center justify-center`}>
                  <div className="text-6xl overflow-clip">
                    <img src={company.logo} alt="" className='p-4'/>
                  </div>
                </div>

                {/* Контент карточки */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {company.name}
                  </h3>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                      {company.position}
                    </span>
                  </div>

                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-4 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {company.period}
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {company.description}
                  </p>

                  {/* Технологии */}
                  <div className="flex flex-wrap gap-2">
                    {company.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}