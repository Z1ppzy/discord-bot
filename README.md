# HeavenlyWeiner Discord Bot

Официальный бот сервера [HeavenlyWeiner](http://heavenlyweiner.ru) — показывает онлайн игроков Minecraft в статусе и предоставляет slash-команды.

## Возможности

- Отображает количество игроков онлайн в статусе бота (обновляется каждые 5 минут)
- Показывает статус «Сервер недоступен» если сервер упал
- `/info` — эмбед со ссылками на сайт, донат и Telegram

## Стек

- **Node.js** 20+
- **TypeScript** 5
- **discord.js** 14
- **dotenv**
- **vitest** — юнит-тесты

## Установка

### 1. Клонировать репозиторий

```bash
git clone https://github.com/Z1ppzy/discord-bot.git
cd discord-bot
```

### 2. Установить зависимости

```bash
pnpm install
```

### 3. Настроить переменные окружения

```bash
cp .env.example .env
```

Открыть `.env` и заполнить:

```
DISCORD_BOT_TOKEN=токен_бота
DISCORD_CLIENT_ID=id_приложения
MC_SERVER_IP=ip_minecraft_сервера
```

- **DISCORD_BOT_TOKEN** — Bot → Reset Token в [Developer Portal](https://discord.com/developers/applications)
- **DISCORD_CLIENT_ID** — General Information → Application ID
- **MC_SERVER_IP** — IP или домен Minecraft сервера

### 4. Сборка

```bash
pnpm build
```

### 5. Запуск

```bash
pnpm start
```

## Тесты

```bash
pnpm test
```

## Структура проекта

```
discord-bot/
├── src/
│   ├── commands/
│   │   ├── info.ts          # Slash-команда /info
│   │   └── info.test.ts     # Тесты /info
│   ├── index.ts             # Точка входа, клиент Discord
│   ├── index.test.ts        # (зарезервировано)
│   └── minecraft.ts         # Логика запроса к MC API
├── dist/                    # Скомпилированные JS файлы
├── .env.example             # Пример переменных окружения
├── tsconfig.json
├── vitest.config.ts
└── package.json
```

## Ссылки

- 🌐 [heavenlyweiner.ru](http://heavenlyweiner.ru)
- 💎 [donate.heavenlyweiner.ru](http://donate.heavenlyweiner.ru)
- 📢 [t.me/heavenlyweiner](https://t.me/heavenlyweiner)
