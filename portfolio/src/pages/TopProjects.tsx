import Markdown from 'react-markdown'
import {content} from '../content/content';
import {type Project} from '../content/content';
import {type ReactNode} from 'react';
import Carousel from '../widgets/carousel';
import TopProjectCard from '../widgets/topProjectCard';

const MarkDownPlay = () => {
    return <section className="h-screen flex flex-col justify-around bg-[#555452]">
        <Carousel>
            {content.map((elem: Project, i: number): ReactNode => 
                <article className="w-[90vw] flex flex-col items-center justify-evenly" id={`top_prj_${i}`}>

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