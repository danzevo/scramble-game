# Scramble Game (Vue 3 + NestJS + PostgreSQL)

A modern word scramble game built with:

-   Vue 3 (Composition API)
-   Tailwind CSS
-   NestJS
-   TypeORM
-   PostgreSQL
-   Timer, animations, and streak rewards

------------------------------------------------------------------------

## Features

-   Random scrambled words by difficulty
-   30-second countdown timer per word
-   Prevent multiple submissions for the same word
-   Score and streak system
-   Shake animation on wrong answer
-   Confetti on streak milestones
-   Clean frontend structure
-   Backend structured with modules and TypeORM

------------------------------------------------------------------------

# Backend Folder Structure

    src/
     ├─ domain/
     │    ├─ entities/
     │    │    └─ word.entity.ts
     │    │
     │    └─ repositories/
     │         └─ word.repository.ts
     │
     ├─ infrastructure/
     │    └─ database/
     │    |    └─ typeorm/
     │    |         ├─ typeorm.module.ts
     │    |         ├─ word.repository.impl.ts
     │    |         └─ entities/
     │    |              └─ word.orm-entity.ts
     |    |- game-session.store.ts
     │
     ├─ presentation/
     │    ├─ controllers/
     │    │    └─ scramble.controller.ts
     │    │
     │    └─ dto/
     │         └─ check-answer.dto.ts
     │
     │
     ├─ app.module.ts
     └─ main.ts

------------------------------------------------------------------------

# Layer Explanation

## Domain

-   `entities/word.entity.ts`\
    Core business entity. No framework dependency.

-   `repositories/word.repository.ts`\
    Repository interface defining contract for data access.

Pure business logic layer.

------------------------------------------------------------------------

## Infrastructure

-   `database/typeorm/typeorm.module.ts`\
    Database configuration using PostgreSQL.

-   `database/typeorm/entities/word.orm-entity.ts`\
    TypeORM mapping for database table.

-   `database/typeorm/word.repository.impl.ts`\
    Concrete implementation of the domain repository using TypeORM.

-   `game-session.store.ts`\
    In-memory session management:
    -   Tracks active sessions
    -   Handles score & streak
    -   Prevents duplicate submissions

Depends on framework and database.

------------------------------------------------------------------------

## Presentation

-   `controllers/scramble.controller.ts`\
    Handles HTTP endpoints.

-   `dto/check-answer.dto.ts`\
    Request validation and data transfer object.

Responsible for request/response layer.

------------------------------------------------------------------------

# Database Configuration

Located in:

    src/infrastructure/database/typeorm/typeorm.module.ts

Example:

``` ts
TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'yourpassword',
  database: 'scramble_game',
  autoLoadEntities: true,
  synchronize: true, // development only
});
```

No `.env` file is used in this setup.

------------------------------------------------------------------------

# Frontend Structure

    src/
     ├─ components/
     │    ├─ GameBoard.vue
     │    ├─ DifficultySelect.vue
     │    ├─ ScoreBoard.vue
     ├─ composables/
     │    └─ useGame.js
     ├─ services/
     │    └─ api.js
     ├─ App.vue
     └─ main.js

------------------------------------------------------------------------

# Getting Started

## Backend

Install dependencies:

    npm install

Make sure PostgreSQL is running and the database exists:

    CREATE DATABASE scramble_game;

Run backend:

    npm run start:dev

------------------------------------------------------------------------

## Frontend

Install dependencies:

    npm install

Run development server:

    npm run dev

------------------------------------------------------------------------

# Future Improvements

-   Replace in-memory `game-session.store.ts` with Redis
-   Add authentication (JWT)
-   Add leaderboard
-   Introduce use-case layer for stricter Clean Architecture
-   Docker deployment

------------------------------------------------------------------------

This structure keeps the project clean, scalable, and aligned with
layered architecture principles without unnecessary overengineering.
