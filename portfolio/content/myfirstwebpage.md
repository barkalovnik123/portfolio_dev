---
title: "barkalovnik123's site"
description: "Сайт написанный в 13 лет"
date: "2019-07-20"
role: "Школьник"
stack: ["HTML", "CSS", "JavaScript"]
github: "https://barkalovnik123.github.io"
demo: "https://barkalovnik123.github.io"
image: "../public/barkalovnik123ssite.png"
tags: ["nostalgia"]
featured: true
---

## 🎯 Задача
Создать платформу для peer-to-peer менторства между junior и middle-разработчиками. Основные требования: видеозвонки без задержек, система бронирования слотов, асинхронный обмен кодом и отзывами после сессий.

## 🏗 Архитектура и ключевые решения
- **Realtime-коммуникация:** Интегрировал WebRTC через `mediasoup` (SFU-архитектура). Это снизило нагрузку на сервер при групповых сессиях по сравнению с классической mesh-сетью.
- **Бэкенд:** Node.js + Fastify + PostgreSQL. Использовал `Drizzle ORM` для типобезопасных запросов. Миграции и сиды автоматизированы через `drizzle-kit`.
- **Фронтенд:** React 18 + Zustand для state management. Кастомные хуки для работы с WebRTC-трейками и WebSocket-событиями.
- **Деплой:** Docker Compose для локальной разработки, CI/CD через GitHub Actions → Vercel (frontend) + Railway (backend/DB).

## 🔑 Реализованные фичи
- ✅ Видеоконференции до 4 участников с общим экраном и текстовым чатом
- ✅ Календарь с бронированием слотов (синхронизация с Google Calendar API)
- ✅ Встроенный code-review редактор с подсветкой синтаксиса (`Monaco Editor`)
- ✅ Система репутации и отзывов после сессий
- ✅ PWA-режим для работы с мобильных устройств

## 📈 Результаты и метрики
- ⏱️ Время подключения к сессии: `< 800ms` (first frame)
- 🌐 Lighthouse: Performance 94, Accessibility 98, Best Practices 100
- 👥 Протестировано на 15+ реальных сессиях, собрано 12 отзывов
- 📦 Итоговый клиентский бандл: `142 KB gzipped` (благодаря code-splitting и tree-shaking)

## 💡 Сложности и инсайты
Самой неочевидной задачей стала синхронизация состояний WebRTC-треков при переключении сетей. Решил через `renegotiation` с fallback на TURN-серверы и оптимизацией ICE-кандидатов. Также внедрил `useSyncExternalStore` для стабильного рендеринга состояний звонка без лишних re-renders.

Проект показал, что даже в pet-проектах важно сразу закладывать наблюдаемость: подключил `Sentry` + `OpenTelemetry` на бэкенде, что ускорило поиск багов в realtime-логике в 3 раза.