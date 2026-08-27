// ProjectsCarousel.tsx
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import { useState } from 'react';
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
      'Десктоп платформа для живого ревью кода',
    tags: ['Javalin', 'JavaFX', 'WebSocket', 'Argon2d'],
    image: '/middletalk.png',
    link: '/projects/ecommerce',
  },
  {
    id: 2,
    title: 'МОДА',
    description:
      'Сайт арт-агенства с добавлением и поиском статей',
    tags: ['Next.JS', 'Framer Motion', 'Fuse.JS', 'Express', 'SQLite3', 'Multer', 'BCrypt', 'After Effects', 'Yandex Map'],
    image: '/moda.png',
    link: 'http://217.71.129.139:4650/',
  },
]

export default function ProjectsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  return <>
    <section className="snap-section relative h-screen w-full overflow-hidden bg-black font-serif"
    style={{boxShadow: "black 0 0 120px",
                zIndex: "10"
            }}>
      <Swiper
        modules={[EffectFade, Autoplay, Pagination, Navigation]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={1200}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
          el: '.custom-pagination',
          bulletClass: 'swiper-bullet',
          bulletActiveClass: 'swiper-bullet-active',
        }}
        onSlideChange={(swiper: SwiperType) => {
          setActiveIndex(swiper.realIndex)
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
              className="absolute inset-0 bg-cover bg-center transition-transform duration-8000 ease-out"
              style={{ backgroundImage: `url(${project.image})` }}
            >
              {/* Лёгкий zoom при показе слайда */}
              <div className="h-full w-full scale-100 animate-[slowZoom_8s_ease-out_forwards]" />
            </div>

            {/* Градиентные затемнения для читаемости текста */}
            <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-black/30" />
            <div className="absolute inset-0 bg-linear-to-r from-black/80 via-transparent to-transparent" />

            {/* Контент слайда */}
            <div className="relative z-10 flex h-full flex-col justify-end p-8 md:p-16 lg:p-24">
              <div className="max-w-2xl space-y-6">
                {/* Теги проекта */}
                <div className="flex flex-wrap gap-2 max-w-lg">
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
        <div className="swiper-button-prev-custom absolute left-6 top-1/3 lg:top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20 hover:scale-110 md:left-10">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </div>
        <div className="swiper-button-next-custom absolute right-6 top-1/3 lg:top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20 hover:scale-110 md:right-10">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </Swiper>

      {/* Кастомная пагинация (точки) */}
      <div className="custom-pagination absolute bottom-32 left-8 z-20 flex gap-2 md:bottom-40 md:left-16 lg:bottom-24" />

      {/* Индикатор текущего слайда */}
      <div className="absolute left-8 top-8 z-20 flex items-center gap-3 md:left-16 md:top-12">
        <span className="text-xs font-medium uppercase tracking-widest text-white/60">
          Проекты
        </span>
        <div className="h-px w-12 bg-white/30" />
        <span className="text-xs text-white/60">
          <span className="text-white font-semibold">{String(activeIndex + 1).padStart(2, '0')}</span> / {String(projects.length).padStart(2, '0')}
        </span>
      </div>

      {/* Кнопка "Все проекты" - пока отключена */}
      {/* <AllProjectsButton></AllProjectsButton> */}
      
    </section>
    </>
}

//123456☺☻♥-тmТ