import type { PropsWithChildren } from "react";

const AboutCard = ({children} : PropsWithChildren) =>
    <article className="p-2 md:max-w-1/2 md:self-center">
        <div className="bg-[#3e3f40] p-2">
            {children}
        </div>
    </article>

export default AboutCard;