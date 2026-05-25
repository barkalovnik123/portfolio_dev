import type { ProjectData } from "../shared/projectLoader";

type ProjectCardProps = {
  project: ProjectData;
  onOpen: (slug: string) => void;
};

const ProjectCard = ({ project, onOpen }: ProjectCardProps) => {
    return <>
        <article className="flex flex-col min-w-min bg-gray-800 text-blue-300 p-4 rounded w-1/4">
            <figure className="p-[5%] min-w-50">
                <img className="w-full" src={project.image} alt=""/>
            </figure>

            <h3 className="text-center font-bold text-[1.3rem]">{project.title}</h3>

            <h4>{project.description}</h4>

            <a className="mt-auto bg-gray-700 p-3 hover:bg-gray-600 transition-all" onClick={() => onOpen(project.slug)}>Подробнее...</a>

        </article>
    </>
}

export default ProjectCard;