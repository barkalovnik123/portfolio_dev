type ProjectCardProps = {
  project: any;
  onOpen?: (slug: string) => void;
};

const TopProjectCard = ({ project}: ProjectCardProps) => {
    return <>
        <article className="flex flex-col min-w-min bg-gray-800 text-blue-300 p-4 rounded w-1/4">
            <figure className="p-[5%] min-w-50">
                <img className="w-full" src={project.image} alt=""/>
            </figure>

            <h3 className="text-center font-bold text-[1.3rem]">{project.title}</h3>

            <h4>{project.desc}</h4>

        </article>
    </>
}

export default TopProjectCard;