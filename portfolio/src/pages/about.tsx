import AboutCard from "../widgets/aboutCard";

const About = () => {
    return <>
        <section className="bg-gray-900 text-green-100 flex flex-col w-full
        md:flex-row md:flex-wrap md:justify-around">
            <AboutCard>
                <h2 className="text-2xl p-1">
                    🎓 Студент НГТУ НЭТИ
                </h2>
                <ul className="list-disc list-inside">
                    <li>
                        3 курс факультета автоматики и вычислительной техники ("Программная инженерия")
                    </li>
                    <li>
                        <a href="">Бланк успеваемости</a>
                    </li>
                    <li>
                        Университетские проекты
                    </li>
                </ul>
            </AboutCard>
            <AboutCard>
                <h2 className="text-2xl p-1">🧑‍🏫 Преподаватель программирования</h2>
                <ul className="list-disc list-inside">
                    <li>
                        "Movavi"
                        <ul className="list-disc pl-5 list-inside">
                            <li>Куратор курсов "Олимпиадное программирование" и "Разработка сайтов"</li>
                            <li>Преподаватель на направлениях "Python" и "Подготовка к ЕГЭ/ОГЭ"</li>
                        </ul>
                    </li>
                    <li>
                        "ProSchool"
                        <ul className="pl-5">
                            <li>Информатика и подготовка к экзаменам</li>
                        </ul>
                    </li>
                    <li>
                        "Море" - it-лагерь
                        <ul className="pl-5">
                            <li>Проведение интенсивов по JS</li>
                        </ul>
                    </li>
                    <li>
                        10-я гимназия
                        <ul className="pl-5">
                            <li>Подготовка к ЕГЭ</li>
                        </ul>
                    </li>
                </ul>
            </AboutCard>
            <AboutCard>
                <h2 className="text-2xl p-1">👩‍💻 Стэки с которыми работал</h2>
                <ul className="list-disc list-inside">
                    <li>TypeScript: React, Node (express), WebSocket</li>
                    <li>Vanilla JS: HTML, CSS (SASS, LESS), TailWind</li>
                    <li>Java: Javalin, JavaFX</li>
                    <li>Python: FastAPI, PyQt6</li>
                </ul>
            </AboutCard>
        </section>
    </>
}

export default About;