---
title: "Игра в жизнь Конвэя"
description: "Клеточный автомат на Vanilla JS"
date: "2023-02-22"
role: "Изучающий JS"
stack: ["JS", "HTML", "CSS"]
github: "https://github.com/barkalovnik123/JavaScript-Conway-s-game-of-Life"
demo: "https://barkalovnik123.github.io/JavaScript-Conway-s-game-of-Life/"
image: "../public/gameoflife.png"
tags: ["edtech", "realtime", "websockets", "pet-project"]
featured: true
---

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