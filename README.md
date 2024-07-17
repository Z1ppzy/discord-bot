# Discord Bot

This Discord bot displays the number of players online on a Minecraft server in its status.

## Features

- Fetches and displays the number of online players from a Minecraft server.
- Updates the status every 5 minutes.

## Tech Stack

- **Node.js**: JavaScript runtime built on Chrome's V8 JavaScript engine.
- **TypeScript**: Typed superset of JavaScript that compiles to plain JavaScript.
- **discord.js**: Powerful library for interacting with the Discord API.
- **axios**: Promise-based HTTP client for the browser and Node.js.
- **dotenv**: Module that loads environment variables from a `.env` file.

## Prerequisites

- [Node.js](https://nodejs.org/) (v14.x or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Setup and Installation

### 1. Clone the repository

First, clone the repository to your local machine using the following command:

```bash
git clone https://github.com/Z1ppzy/discord-bot.git
cd discord-bot
```
### 2. Install dependencies

```
npm install
or
yarn install
```

### 3. Configuration

```
cp .env.example .env
```
Open the .env file and add your Discord bot token and Minecraft server IP:
```
DISCORD_BOT_TOKEN=your_discord_bot_token
MC_SERVER_IP=your_minecraft_server_ip
```

### 4. Build the bot

```
npm run build
```

### 5. Run the bot

Start the bot using Node.js:

```
npm start
```

# File Structure

Here's a brief overview of the project's structure:

```
discord-bot/
├── dist/                   # Compiled JavaScript files
├── node_modules/           # Project dependencies
├── src/                    # Source files
│   └── index.ts            # Main bot logic
├── .env                    # Environment (not added to the repository) 
├── .env.example            # Example environment variables file
├── .gitignore              # Git ignore file
├── package.json            # NPM package configuration
├── tsconfig.json           # TypeScript configuration
└── README.md               # This README file
```

# Usage

Once the bot is running, it will automatically update its status on Discord every 5 minutes to display the number of players currently online on the specified Minecraft server.