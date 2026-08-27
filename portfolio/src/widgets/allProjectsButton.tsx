import { Link } from 'react-router-dom'

export default () => <>
{/* Блок с предложением перейти на страницу всех проектов */}
      <div className="top-5 right-3 md:top-auto absolute bottom-8 z-20 md:bottom-12 md:right-16 lg:bottom-12 lg:right-24">
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
</>