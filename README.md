# stroynova-site

сборка для фронтенд-разработки: **HTML5 + SCSS (BEM) + ES6+ JS + Vite**.

## Стек технологий

- **HTML5** — семантическая вёрстка, WCAG 2.1 AA
- **SCSS** — BEM-методология, компонентная архитектура
- **JavaScript** (ES6+) — модульная структура, без jQuery
- **Vite** — сборщик с HMR и tree shaking
- **ESLint** + **Stylelint** + **Prettier**

## Быстрый старт

```bash
# Установка зависимостей
npm install

# Запуск dev-сервера (http://localhost:3000)
npm run dev

# Production-сборка
npm run build

# Предпросмотр production-сборки
npm run preview
```

## Команды

| Команда | Описание |
|---|---|
| `npm run dev` | Dev-сервер с hot reload |
| `npm run build` | Production-сборка в `/dist` |
| `npm run preview` | Просмотр production-сборки |
| `npm run lint:js` | Линтинг JS (ESLint) |
| `npm run lint:css` | Линтинг SCSS (Stylelint) |
| `npm run lint` | JS + CSS линтинг |
| `npm run format` | Форматирование кода (Prettier) |

## Структура проекта

```
/
├── public/                  # Статичные ассеты (favicon, robots.txt)
├── src/
│   ├── assets/
│   │   ├── images/          # Изображения
│   │   ├── svg/             # SVG-спрайт
│   │   └── fonts/           # Шрифты
│   ├── styles/
│   │   ├── abstracts/       # Переменные, миксины, функции, брейкпоинты
│   │   ├── base/            # Reset, типографика, базовые стили
│   │   ├── components/      # BEM-компоненты (кнопки, карточки, аккордеоны...)
│   │   ├── layout/          # Контейнер, хедер, футер, сетка
│   │   └── main.scss        # Точка входа CSS
│   └── scripts/
│       ├── modules/         # JS-модули по логическим блокам
│       ├── utils/           # Вспомогательные утилиты (dom, a11y)
│       └── main.js          # Точка входа JS
├── index.html
├── vite.config.js
├── .eslintrc.json
├── .stylelintrc.json
└── .prettierrc.json
```


## Требования

- Node.js ≥ 18
- npm ≥ 9
