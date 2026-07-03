import AboutCard from "../widgets/aboutCard";

const About = () => {
    return <>
        <section className="bg-[#555452] text-green-100 flex flex-col w-full
        md:flex-row md:flex-wrap md:justify-around">
            <AboutCard>
                <h2 className="text-2xl p-1 pt-4">
                    🎓 Студент НГТУ НЭТИ
                </h2>
                <ul className="list-disc list-inside p-4">
                    <li>
                        3 курс факультета автоматики и вычислительной техники ("Программная инженерия")
                    </li>
                    <li>
                        <a href="https://www.nstu.ru/studies/stud_account/student_portfolio/c56574b65a606a6f18e56499e30a5bc1792ece62">Бланк успеваемости</a>
                    </li>
                    <li>
                        Университетские проекты
                    </li>
                </ul>
            </AboutCard>
            <AboutCard>
                <h2 className="text-2xl p-1 pt-4">🧑‍🏫 Преподаватель программирования</h2>
                <ul className="list-disc list-inside p-4">
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
                <h2 className="text-2xl p-1 pt-4">👩‍💻 Стэки с которыми работал</h2>
                <ul className="list-disc list-inside p-4">
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