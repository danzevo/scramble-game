# 🧩 Scramble Word Game

A full‑stack **Word Scramble Game** built with:

-   **Vue 3 (Composition API)** frontend
-   **NestJS** backend
-   **PostgreSQL + Redis**
-   **Clean Architecture principles**

The project demonstrates real-world backend design patterns including
domain-driven logic, layered architecture, caching with Redis,
migrations, seeding, logging, and rate limiting.

------------------------------------------------------------------------

# 🚀 Tech Stack

## Frontend

-   Vue 3 (Composition API)
-   Tailwind CSS
-   Vite
-   Confetti & animation effects
-   Axios API service layer

## Backend

-   NestJS
-   TypeScript
-   TypeORM
-   PostgreSQL
-   Redis
-   Winston logging
-   Class Validator
-   Jest testing
-   Throttler rate limiting

------------------------------------------------------------------------

# 🎮 Game Features

-   Random scrambled words by difficulty
-   30-second countdown timer per word
-   Score & streak tracking
-   +10 points per correct answer
-   +20 bonus every 3 streak
-   Wrong answer resets streak
-   Prevent duplicate submissions
-   Shake animation on wrong answer
-   Confetti celebration on streak milestones
-   Session-based gameplay

------------------------------------------------------------------------

# 🏗 Backend Architecture

The backend follows a **Clean Architecture inspired layering**.

Dependency direction:

Presentation → Application → Domain\
Infrastructure → Domain

This ensures business logic remains independent of frameworks.

------------------------------------------------------------------------

## 📂 Backend Folder Structure

```
├─ src/
│
│  ├─ main.ts
│  ├─ app.module.ts
│  ├─ domain/
│  │  ├─ entities/
│  │  │   ├─ word.entity.ts
│  │  │   ├─ game-session.entity.ts
│  │  │   └─ game-session.spec.ts
│  │  ├─ repositories/
│  │  │   ├─ word.repository.ts
│  │  │   ├─ game-session.repository.ts
│  │  │   └─ token.ts
│  │  └─ services/
│  │      └─ scramble.service.ts
│  ├─ application/
│  │  └─ use-cases/
│  │      ├─ create-session.usecase.ts
│  │      ├─ get-scramble.usecase.ts
│  │      └─ check-answer.usecase.ts
│  ├─ infrastructure/
│  │  ├─ database/
│  │  │  └─ typeorm/
│  │  │      ├─ entities/
│  │  │      │   └─ word.orm-entity.ts
│  │  │      ├─ migrations/
│  │  │      │   └─ 1710000000000-init.ts
│  │  │      ├─ seeds/
│  │  │      │   └─ seed-words.ts
│  │  │      ├─ typeorm.module.ts
│  │  │      ├─ typeorm.datasource.ts
│  │  │      └─ word.repository.impl.ts
│  │  ├─ redis/
│  │  │   └─ redis.module.ts
│  │  ├─ session/
│  │  │   └─ game-session.redis.store.ts
│  │  └─ logger/
│  │      ├─ logger.module.ts
│  │      └─ logger.config.ts
│  ├─ presentation/
│  │  ├─ controllers/
│  │  │   ├─ scramble.controller.ts
│  │  │   └─ health.controller.ts
│  │  └─ dto/
│  │      ├─ get-scramble.dto.ts
│  │      └─ check-answer.dto.ts
│  ├─ common/
│  │  ├─ filters/
│  │  │   └─ global-exception.filter.ts
├─ app.module.ts
└─ main.ts
```

---

# 🐳 Infrastructure Setup (Recommended)

This project uses Docker Compose to run:

- PostgreSQL (port 5433)
- Redis (port 6379)

## Start Infrastructure

From the backend folder:

```
docker compose up -d
```

Check running containers:

```
docker ps
```
Rebuild containers:

``` bash
docker compose up --build
```
------------------------------------------------------------------------

# 🗄 Database Configuration

Located in:

    src/infrastructure/database/typeorm/typeorm.module.ts

Example:

``` ts
TypeOrmModule.forRoot({
  type: 'postgres',
  host: "postgres", //service name in docker-compose
  port: 5432,
  username: 'postgres',
  password: 'yourpassword',
  database: 'scramble_game',
  autoLoadEntities: true,
  synchronize: true, // development only
});
```
Database uses **PostgreSQL with TypeORM**.

Tables are managed using **migrations**.

## Generate Migration

npm run migration:generate

## Run Migration

npm run migration:run

------------------------------------------------------------------------

# 🌱 Seed Data

To populate the database with default words:

npm run seed

This inserts sample words for:

-   easy
-   medium
-   hard

Used for development and testing.

------------------------------------------------------------------------

# 🧾 Logging

The backend uses **Winston logger** with:

-   colored console logs
-   daily rotating log files

Logs are stored in:

logs/

Example log:

2026-03-13T10:20:11 \[GetScrambleUseCase\] info: Fetching word for
difficulty easy

------------------------------------------------------------------------

# ⚡ Rate Limiting

The API includes **request throttling** using:

@nestjs/throttler

Example protection:

-   Prevents spam requests
-   Limits API abuse

------------------------------------------------------------------------

# ❤️ Health Check

Health endpoint available:

GET /health

Returns:

{ "status": "ok" }

Useful for deployment and monitoring.

------------------------------------------------------------------------
## Redis Configuration

```
new Redis({
  host: 'redis', //service name in docker-compose
  port: 6379,
});
```

---

# 🎨 Frontend Structure

    src/
     ├─ components/
     │    ├─ GameBoard.vue
     │    ├─ DifficultySelect.vue
     │    ├─ ScoreBoard.vue
     │
     ├─ composables/
     │    └─ useGame.js
     │
     ├─ services/
     │    └─ api.js
     │
     ├─ App.vue
     └─ main.js

------------------------------------------------------------------------

## 🧩 Frontend Architecture

### Components

UI rendering only. No heavy logic.

### Composables

`useGame.js` handles: - Timer logic - API calls - Score & streak state -
Word fetching - Submission handling

### Services

`api.js` abstracts HTTP communication with backend.

This keeps UI clean and logic reusable.

------------------------------------------------------------------------

# ▶ Getting Started

## Backend

Install dependencies:

```
npm install
```

Start infrastructure:

```
docker compose up -d
```

Run backend:

```
npm run start:dev
```

------------------------------------------------------------------------

## Frontend

Install dependencies:

    npm install

Run development server:

    npm run dev

------------------------------------------------------------------------

# 🧪 Testing

-   Use cases are unit-testable
-   Domain entity contains isolated business logic
-   No need to boot NestJS for logic testing

------------------------------------------------------------------------

# 📈 Future Improvements

-   JWT authentication
-   Leaderboard system
-   Multiplayer sessions
-   WebSocket gameplay
-   CI/CD pipeline
-   Kubernetes deployment

------------------------------------------------------------------------

# 💡 Why This Project Matters

This project demonstrates:

-   Clean Architecture in NestJS
-   Domain-driven design thinking
-   Proper separation of concerns
-   Redis session management
-   Logging & monitoring
-   Migration & seed workflow
-   Scalable backend structure

------------------------------------------------------------------------

Built as a **learning project focused on backend architecture and system
design**.
