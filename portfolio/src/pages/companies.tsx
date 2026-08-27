// Companies.tsx
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import SphereProjection from '../widgets/sphereProjection'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Reveal from '../widgets/reveal'

const companies = [
  {
    id: 1,
    name: 'ProSchool',
    period: '2025 - 2026',
    position: 'Заменяющий преподаватель информатики и математики',
    description: 'Подготовка детей к ЕГЭ и ОГЭ \nПроведение уроков по информатике',
    technologies: ['ЕГЭ', 'ОГЭ', 'Scratch', 'EduBlocks', 'Python'],
    logo: '/_logotype_PROschool_.png',
    color: 'from-purple-500 to-pink-500',
    featured: false,
  },
  {
    id: 2,
    name: 'Movavi',
    period: '2024 - текущее время',
    position: 'Куратор курса, преподаватель',
    description: 'Разработка курса веб-разработки на React, Express\nПреподавание олимпиадного программирования, Python, математики\nДоработка сайта компании',
    technologies: ['React', 'Express', 'JavaScript', 'HTML', 'CSS', 'TailWind', 'HollyHope CRM', 'Python', 'C++', 'FastAPI', 'SQLite3'],
    logo: "/movavi.svg",
    color: 'from-blue-500 to-cyan-500',
    featured: true,
  },
  {
    id: 3,
    name: 'Море',
    period: '2025 - 2026',
    position: 'Преподаватель летней школы',
    description: 'Проведение мастер-классов по разработке сайтов',
    technologies: ['HTML', 'CSS', 'JavaScript', 'jQuery'],
    logo: '/more.webp',
    color: 'from-orange-500 to-red-500',
    featured: false,
  },
  {
    id: 4,
    name: '10-я гимназия',
    period: '2025',
    position: 'Заменяющий преподаватель',
    description: 'Подготовка к ЕГЭ',
    technologies: ['Python', 'ЕГЭ'],
    logo: '/10school.png',
    color: 'from-green-500 to-teal-500',
    featured: false,
  },
]

export default function Companies() {
  return <>
    <section className="snap-section min-h-screen flex flex-col justify-center font-serif from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container flex flex-col mx-auto px-4">
        <Reveal from="up">
          <h2 className="text-3xl pt-3 font-bold text-center mb-4 text-gray-900 dark:text-white">
            Мой опыт работы
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
            Компании, в которых я развивал свои навыки
          </p>
        </Reveal>

        <Reveal from="scale" delay={150}>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          direction="horizontal"
          slidesPerView="1"
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
          className="companies-swiper"
        >
          {companies.map((company) => (
            <SwiperSlide
              key={company.id}
              className={`company-slide ${company.featured ? 'company-slide--featured' : ''}`}
            >
              <div className="h-content bg-white dark:bg-gray-800 shadow-xl overflow-hidden transform transition-transform duration-300 hover:scale-[1.015]
               hover:shadow-2xl flex flex-col m-2">
                {/* Градиентная шапка */}
                <div className={`shrink-0 bg-linear-to-br ${company.color} flex items-center justify-center
                max-h-48 md:h-full`}>
                  <div className="overflow-hidden">
                    <img src={company.logo} alt="" className='p-4 max-h-48'/>
                  </div>
                </div>

                {/* Контент карточки */}
                <div className="p-6 overflow-y-auto">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {company.name}
                    </h3>
                    {company.featured && (
                      <span className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wide bg-blue-600 text-white">
                        Текущее место
                      </span>
                    )}
                  </div>

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

                  {company.description.split("\n").map(item => <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {item}
                  </p>)}
                  

                  {/* Технологии */}
                  <div className="flex flex-wrap gap-2">
                    {company.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
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
        </Reveal>
      </div>
    </section>
  </>
}
