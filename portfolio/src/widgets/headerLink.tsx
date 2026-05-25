import type { PropsWithChildren } from "react"

type HeaderLinkProps = {
    href: string
} & PropsWithChildren

const HeaderLink = ({children, href} : HeaderLinkProps) => {
    return <a href={href} className="hover:text-amber-400 hover:bg-gray-900 transition-all">
        {children}
    </a>
}

export default HeaderLink