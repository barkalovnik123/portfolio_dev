// Тут описана карусель под проекты
import { type ReactNode } from "react";

interface CarouselProp {
    children: ReactNode[]
}

const Carousel = ({children}: CarouselProp) => {
    return <>
        <div className="w-[90vw] h-[90vh] overflow-scroll flex shrink overflow-y-hidden m-auto">
            <div className="w-[300%] flex">
                {children}
            </div>
        </div>
        <ul className="flex justify-evenly text-2xl">
            {children.map((_, i: number) => <a href={`#top_prj_${i}`}>O</a>)}
        </ul>
    </>
}

export default Carousel;