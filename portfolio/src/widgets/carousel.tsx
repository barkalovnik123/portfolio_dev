// Тут описана карусель под проекты
import { type ReactNode } from "react";

interface CarouselProp {
    children: ReactNode[]
}

const Carousel = ({children}: CarouselProp) => {
    return <>
        <div className="w-full h-full overflow-scroll flex shrink overflow-y-hidden m-auto
       [&::-webkit-scrollbar]:w-2 md:w-[90vw]
                [&::-webkit-scrollbar-track]:bg-gray-100
                [&::-webkit-scrollbar-thumb]:bg-[#fff1]
                [&::-webkit-scrollbar-thumb]:rounded-full
                dark:[&::-webkit-scrollbar-track]:bg-[#000a]
                dark:[&::-webkit-scrollbar-thumb]:bg-[#000a]]">
            <div className="flex">
                {children}
            </div>
        </div>
        <ul className="flex justify-evenly text-2xl p-7">
            {children.map((_, i: number) => <a href={`#top_prj_${i}`}>O</a>)}
        </ul>
    </>
}

export default Carousel;