import { ProjectLoader, type ProjectData } from '../shared/projectLoader';
import { useEffect, useState } from 'react';
import ProjectCard from '../widgets/projectCard';
import { ProjectModal } from '../widgets/projectModal';

const ProjectList = () => {

    const [projects, setProjects] = useState<ProjectData[]>([]); 

    const [activeSlug, setActiveSlug] = useState<string| null>(null);

    useEffect(() => {
        const pl: ProjectLoader = ProjectLoader.getInstance();
        pl.getProjects().then(e => {setProjects(e); console.log(e)});
    })

    return <>
            <section className="flex flex-wrap gap-2 justify-around content-stretch bg-gray-900 p-4">
                {projects.map((e, i) => <ProjectCard project={e} onOpen={setActiveSlug} key={i}/>)}
            </section>
            <ProjectModal slug={activeSlug} onClose={() => setActiveSlug(null)} />
    </>
}

export default ProjectList;