import HeaderLink from "../widgets/headerLink";

const Header = () => {
    return <header className="overflow-hidden h-[80vh] font-serif bg-[url('../../public/pp.jpg')] bg-right bg-size-[100%] bg-no-repeat text-amber-50 -mask-linear-90">
        <h1 className="pt-[10%] pl-[10%] text-7xl">Никита Баркалов</h1>
        <h2 className="pt-2 pl-[14%] text-5xl">Fullstack-разработчик</h2>
        <nav><ul className="flex gap-1.5 flex-row text-2xl pl-[12%] pt-2">
            <li><HeaderLink href="">GitHub</HeaderLink></li>
            <li><HeaderLink href="">Проекты</HeaderLink></li>
            <li><HeaderLink href="">Контакты</HeaderLink></li>
        </ul></nav>
    </header>
}

export default Header;