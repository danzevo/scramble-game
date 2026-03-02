# 🧩 Scramble Word Game

### Vue 3 + NestJS + PostgreSQL

A full‑stack word scramble game built with a modern frontend and a Clean
Architecture--inspired backend.

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
-   Clean Architecture layering
-   Rich Domain Model

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

The backend follows a layered architecture aligned with Clean
Architecture principles.

Dependency Direction:

Presentation → Application → Domain\
Infrastructure → Domain

------------------------------------------------------------------------

## 📂 Backend Folder Structure

```
src/
 ├─ domain/
 │    ├─ entities/
 │    │    ├─ word.entity.ts
 │    │    └─ game-session.entity.ts
 │    │
 │    └─ repositories/
 │         ├─ word.repository.ts
 │         ├─ game-session.repository.ts
 │         └─ token.ts
 │
 ├─ application/
 │    └─ use-cases/
 │         ├─ create-session.usecase.ts
 │         ├─ get-scramble.usecase.ts
 │         └─ check-answer.usecase.ts
 │
 ├─ infrastructure/
 │    ├─ database/typeorm/
 │    └─ redis/
 │
 ├─ presentation/
 │    ├─ controllers/
 │    └─ dto/
 │
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

------------------------------------------------------------------------

# 🗄 Database Configuration

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

------------------------------------------------------------------------
## Redis Configuration

```
new Redis({
  host: '127.0.0.1',
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

- Add JWT authentication
- Implement leaderboard
- Add integration tests
- Dockerize backend service
- Add CI/CD pipeline

------------------------------------------------------------------------

# 💡 Why This Project Matters

This project demonstrates:

-   Proper separation of concerns
-   Clean backend layering
-   Rich domain modeling
-   Testable business logic
-   Organized Vue 3 frontend structure
-   Real full‑stack architecture thinking

------------------------------------------------------------------------

Built as a learning project focused on architecture clarity and
practical backend design.
