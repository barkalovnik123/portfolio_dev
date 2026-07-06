import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectFade, Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const projects = [
  {
    id: 1,
    title: 'MiddleTalk',
    description:
      'Платформа для менторства при написании кода',
    tags: ['Javalin', 'JavaFX', 'WebSocket', 'RichText', 'SQLite'],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1920&q=80',
    link: '/projects/ecommerce',
  },
  {
    id: 2,
    title: 'CRM-система для агентства',
    description:
      'Внутренняя система управления клиентами, сделками и аналитикой для маркетингового агентства.',
    tags: ['Next.js', 'Prisma', 'Tailwind', 'tRPC'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=80',
    link: '/projects/crm',
  },
  {
    id: 3,
    title: 'Мобильное приложение для фитнеса',
    description:
      'PWA-приложение с тренировками, трекингом прогресса и интеграцией с носимыми устройствами.',
    tags: ['React Native', 'Redux', 'Firebase'],
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1920&q=80',
    link: '/projects/fitness',
  },
  {
    id: 4,
    title: 'Корпоративный портал',
    description:
      'Внутренний портал компании с системой задач, базой знаний и чатом в реальном времени.',
    tags: ['Vue 3', 'WebSocket', 'Docker', 'MongoDB'],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80',
    link: '/projects/portal',
  },
  {
    id: 5,
    title: 'Образовательная платформа',
    description:
      'LMS-система с видеокурсами, тестированием, выдачей сертификатов и геймификацией обучения.',
    tags: ['React', 'GraphQL', 'AWS', 'Stripe'],
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=1920&q=80',
    link: '/projects/lms',
  },
]

export default function ProjectsCarousel() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black font-serif">
      <Swiper
        modules={[EffectFade, Autoplay, Pagination, Navigation]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={1200}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
          el: '.custom-pagination',
          bulletClass: 'swiper-bullet',
          bulletActiveClass: 'swiper-bullet-active',
        }}
        navigation={{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }}
        className="h-full w-full"
      >
        {projects.map((project) => (
          <SwiperSlide key={project.id}>
            {/* Фоновое изображение */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[8000ms] ease-out"
              style={{ backgroundImage: `url(${project.image})` }}
            >
              {/* Лёгкий zoom при показе слайда */}
              <div className="h-full w-full scale-100 animate-[slowZoom_8s_ease-out_forwards]" />
            </div>

            {/* Градиентные затемнения для читаемости текста */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />

            {/* Контент слайда */}
            <div className="relative z-10 flex h-full flex-col justify-end p-8 md:p-16 lg:p-24">
              <div className="max-w-2xl space-y-6">
                {/* Теги проекта */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Название */}
                <h2 className="text-4xl font-bold leading-tight text-white md:text-6xl lg:text-7xl drop-shadow-2xl">
                  {project.title}
                </h2>

                {/* Описание */}
                <p className="text-base text-white/80 md:text-lg lg:text-xl max-w-xl leading-relaxed drop-shadow-lg">
                  {project.description}
                </p>

                {/* Кнопка "Подробнее" */}
                <Link
                  to={project.link}
                  className="group inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-all hover:bg-white/90 hover:gap-4 md:text-base"
                >
                  Смотреть проект
                  <svg
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Кастомные стрелки навигации */}
        <div className="swiper-button-prev-custom absolute left-6 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20 hover:scale-110 md:left-10">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </div>
        <div className="swiper-button-next-custom absolute right-6 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20 hover:scale-110 md:right-10">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </Swiper>

      {/* Кастомная пагинация (точки) */}
      <div className="custom-pagination absolute bottom-32 left-8 z-20 flex gap-2 md:bottom-40 md:left-16 lg:bottom-24" />

      {/* Блок с предложением перейти на страницу всех проектов */}
      <div className="absolute bottom-8 right-8 z-20 md:bottom-12 md:right-16 lg:bottom-12 lg:right-24">
        <Link
          to="/projects"
          className="group flex items-center gap-3 rounded-full border border-white/30 bg-white/10 px-5 py-3 backdrop-blur-md transition-all hover:bg-white/20 hover:border-white/50"
        >
          <div className="flex flex-col">
            <span className="text-xs text-white/60">Все работы</span>
            <span className="text-sm font-semibold text-white">Смотреть все проекты →</span>
          </div>
        </Link>
      </div>

      {/* Индикатор текущего слайда */}
      <div className="absolute left-8 top-8 z-20 flex items-center gap-3 md:left-16 md:top-12">
        <span className="text-xs font-medium uppercase tracking-widest text-white/60">
          Проекты
        </span>
        <div className="h-px w-12 bg-white/30" />
        <span className="text-xs text-white/60">
          <span className="text-white font-semibold">01</span> / {String(projects.length).padStart(2, '0')}
        </span>
      </div>
    </section>
  )
}