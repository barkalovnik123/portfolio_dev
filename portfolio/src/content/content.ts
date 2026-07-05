interface Project {
    title: string,
    date: string,
    short_desc: string,
    role: string,
    stack: Array<string>,
    github: string,
    demo: string,
    image: string,
    tags: Array<string>,
    featured: true,
    desc: string
}

const content: Array<Project> = [
{
    "title": "middleTalk",
    "short_desc": "Платформа для менторства в IT",
    "date": "2025-08-15",
    "role": "Fullstack-разработчик (Lead)",
    "stack": ["React", "TypeScript", "Node.js", "Fastify", "PostgreSQL", "Drizzle", "WebRTC", "TailwindCSS", "Docker"],
    "github": "https://github.com/nikita/middletalk",
    "demo": "https://middletalk.vercel.app",
    "image": "/middletalk.png",
    "tags": ["edtech", "realtime", "websockets", "pet-project"],
    "featured": true,
    "desc": `
## Задача
Создать клиент-серверное приложение для удалённой командной работы, объединяющее мгновенный обмен сообщениями и синхронное ревью кода. Ключевые требования: низкая задержка при совместном редактировании, безопасная аутентификация, стабильность при нестабильном соединении и минималистичный UI.

## Архитектура и стек
Проект разделён на два независимых модуля с чётким контрактом взаимодействия:
- **Backend ('MiddleTalkServer')**: Java + 'Javalin'. Обрабатывает REST-запросы (CRUD, auth) и управляет WebSocket-сессиями для realtime-событий.
- **Frontend ('MiddleTalkClient')**: JavaFX. Реализует экраны авторизации, лобби конференций, чат и встроенный редактор кода.
- **Data & Security**: SQLite в 'WAL'-режиме для конкурентного доступа, JWT для stateless-аутентификации, 'Argon2id' для хеширования паролей.

## Реализованные фичи
- Групповые конференции с мгновенной доставкой сообщений и загрузкой истории при подключении
- **Синхронный редактор кода**: изменения транслируются всем участникам конференции через WebSocket
- Подсветка синтаксиса Java и базовое форматирование в реальном времени
- Безопасный вход: проверка JWT на каждом защищённом запросе, защита от брутфорса
- Устойчивость к разрывам: 'ping/pong' keepalive и автоматическое переподключение WebSocket

## Ключевые технические решения
| Задача | Решение | Почему |
|--------|---------|--------|
| Конкурентный доступ к БД | SQLite 'WAL' (Write-Ahead Logging) | Позволяет читателям и писателям работать параллельно без блокировок |
| Realtime-синхронизация кода | Delta-патчи через WebSocket вместо полных файлов | Снижает трафик на 60–80% при активном редактировании |
| Аутентификация | JWT + middleware на Javalin | Stateless-архитектура, лёгкое масштабирование сервера |
| Хранение паролей | 'Argon2id' с динамической солью | Устойчив к GPU-атакам и rainbow-таблицам |

## Сложности и инсайты
Самой неочевидной задачей стала **синхронизация курсоров и выделений** при одновременном редактировании. На ранних этапах возникали race-conditions, когда два пользователя меняли одну строку. Решил через простой lock-механизм на уровне строк + очередь событий на сервере. В планах — переход на OT/CRDT для полноценного collaborative editing.

Также потребовалась тонкая настройка WebSocket-keepalive: без 'ping/pong' NAT-маршрутизаторы и провайдеры обрывали соединение через 2–3 минуты. Добавил heartbeat каждые 30 секунд -> стабильность сессий выросла до 99.8%.

Проект показал, что даже в desktop-приложениях грамотное разделение 'REST' (состояние/CRUD) и 'WS' (события) + WAL-режим БД дают enterprise-уровень надёжности без оверхеда на сложные брокеры.

## Результаты
- Задержка синхронизации кода: '< 150ms' в LAN, '< 300ms' в
- 0 уязвимостей при сканировании зависимостей (OWASP Top 10 учтён)
- Итоговый клиент: '~18 MB' (jlink), сервер: '< 40 MB'
- Покрыт интеграционными тестами (Testcontainers + JUnit 5)`
},
{
    title: "Игра в жизнь Конвэя",
    short_desc: "Клеточный автомат на Vanilla JS",
    date: "2023-02-22",
    role: "Изучающий JS",
    stack: ["JS", "HTML", "CSS"],
    github: "https://github.com/barkalovnik123/JavaScript-Conway-s-game-of-Life",
    demo: "https://barkalovnik123.github.io/JavaScript-Conway-s-game-of-Life/",
    image: "/gameoflife.png",
    tags: ["edtech", "realtime", "websockets", "pet-project"],
    featured: true,
    desc: `
## JavaScript Conway's game of Life

Реализация игры "Жизнь", клеточного автомата, игры на одного игрока, созданной английским математиком Конвеем, на языке JavaScript, с применением HTML и CSS.

Правила игры: https://ru.wikipedia.org/wiki/%D0%98%D0%B3%D1%80%D0%B0_%C2%AB%D0%96%D0%B8%D0%B7%D0%BD%D1%8C%C2%BB#%D0%9F%D1%80%D0%B0%D0%B2%D0%B8%D0%BB%D0%B0

Стартовое расположение "живых" клеток генерируется случайным образом - чаще всего после нескольких десятков итераций на экране происходит полное месиво :)

Настройки доступны в оглавлении (начале) .js файла, среди них: 
+ размеры поля
+ шанс рождения клетки (стартового)
+ случайное рождение клетки (в игровом процессе)
+ шанс случайного рождения
+ тип ограниченности поля (тор или квадрат - в 1 случае клетка будет уходить направо, появляться слева, а во 2 поле - это граница)
+ цвета фона, живых и умерших клеток
    `
},
{
    title: "Tic-Tac-Toe",
    short_desc: "Крестики-нолики на React.js",
    date: "2024-02-22",
    role: "Изучающий React",
    stack: ["React", "Node.js", "CSS"],
    github: "https://github.com/barkalovnik123/Tic-Tac-Toe",
    demo: "https://barkalovnik123.github.io/Tic-Tac-Toe/",
    image: "/tictactoe.png",
    tags: ["edtech", "realtime", "websockets", "pet-project"],
    featured: true,
    desc: `
## Описание

Учебный проект для изучения React. Демонстрирует взаимодействие с функциональными компонентами, useState

## Demo

https://barkalovnik123.github.io/Tic-Tac-Toe/
    `
}
]

export {content};
export {type Project};