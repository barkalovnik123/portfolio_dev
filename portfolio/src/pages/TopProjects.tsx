import Markdown from 'react-markdown'
import {content} from '../content/content';
import {type Project} from '../content/content';
import {type ReactNode} from 'react';
import Carousel from '../widgets/carousel';
import TopProjectCard from '../widgets/topProjectCard';

const MarkDownPlay = () => {
    return <section className="relative z-20
    h-screen flex flex-col justify-around bg-[url('/night-sky-bg.webp')] bg-cover text-amber-50" style={{
        boxShadow: "black 0 0 120px"
    }}>
        <Carousel>
            {content.map((elem: Project, i: number): ReactNode => 
                <article className="w-[90vw] flex flex-col items-center justify-evenly 
                bg-radial-[at_50%_50%] from-[#05001c] to-[#000a]" id={`top_prj_${i}`}>

                    <figure className='lg:w-[60vw]'>
                        <img src={elem.image} alt="" />
                    </figure>
                    
                    <div>                        
                        <h2>{elem.title}</h2>
                        <p>{elem.short_desc}</p>
                    </div>

                    <button>Подробнее</button>

                </article>
            )}
        </Carousel>
    </section>
}

export default MarkDownPlay;