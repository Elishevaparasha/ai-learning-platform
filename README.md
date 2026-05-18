# 🧠 AI Learning Platform

A full-stack AI-driven learning platform where users select a topic, submit a prompt, and receive a personalized AI-generated lesson.

## Technologies Used

| Layer | Technology |
|---|---|
| Frontend | Angular 21, Bootstrap 5, TypeScript |
| Backend | Node.js, Express, TypeScript |
| Database | MySQL (via XAMPP or Docker) |
| ORM | Sequelize v6 |
| AI | Google Gemini 2.5 Flash (`@google/genai`) |
| Auth | JWT (jsonwebtoken + bcryptjs) |

## Project Structure

```
ai-learning-platform/
├── client/                        # Angular frontend
│   └── src/app/
│       ├── components/
│       │   ├── login/             # Login page
│       │   ├── register/          # Registration page
│       │   ├── dashboard/         # User learning dashboard
│       │   └── admin/             # Admin dashboard (pagination & search)
│       ├── services/
│       │   ├── api.ts             # HTTP service
│       │   └── auth.ts            # Auth helpers
│       └── pipes/
│           └── unique.pipe.ts
├── server/                        # Express backend
│   └── src/
│       ├── config/                # DB + env config
│       ├── models/                # Sequelize models
│       ├── controllers/           # Business logic
│       ├── routes/                # API routes
│       ├── services/              # AI service (Gemini integration)
│       └── middlewares/           # JWT auth middleware
└── docker-compose.yml             # MySQL DB container (alternative to XAMPP)
```

## Database Models

- `users` — id, name, phone, email, passwordHash, role
- `categories` — id, name, description
- `sub_categories` — id, name, description, categoryId
- `prompts` — id, userId, categoryId, subCategoryId, prompt, response, createdAt

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/users/register` | Register new user |
| POST | `/api/users/login` | Login, returns JWT |
| GET | `/api/categories` | Get all categories with subcategories |
| GET | `/api/categories/:id/subcategories` | Get subcategories by category |
| POST | `/api/subcategories/create` | Create subcategory |
| POST | `/api/prompts/generate` | Send prompt to AI, save & return response |
| GET | `/api/prompts/history/:userId` | User's learning history |
| GET | `/api/prompts/admin/all` | All prompts with user info (admin only) |

## Assumptions

- The first registered user can be promoted to admin manually via DB, or the seed script creates an admin user.
- A valid `GEMINI_API_KEY` is required for live AI responses. Without it, the service will throw an error.
- MySQL is running on port `3306` (via XAMPP or Docker).
- The backend runs on port `5001` and the frontend dev server on port `4200`.

## 💻 How to Run Locally

### Prerequisites
- Node.js v18+
- XAMPP (MySQL on port 3306) **or** Docker Desktop

### 1. Clone & Install

```bash
git clone <repo-url>
cd ai-learning-platform

cd server && npm install
cd ../client && npm install
```

### 2. Configure Environment

```bash
cd server
cp .env.example .env
# Edit .env and fill in your GEMINI_API_KEY and JWT_SECRET
```

`.env` example:
```
PORT=5001
DATABASE_URL=mysql://root:@localhost:3306/ai_learning
JWT_SECRET=your_jwt_secret_here
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Start the Database

**Option A — Docker:**
```bash
# From project root
docker-compose up -d
```

**Option B — XAMPP:**
Start XAMPP and ensure MySQL is running on port 3306. Create a database named `ai_learning`.

### 4. Run the Backend

```bash
cd server
npm run dev
# Server starts at http://localhost:5001
```

On first run, Sequelize will auto-create all tables (`alter: true`).

### 5. Seed Categories & Subcategories

```bash
cd server
npm run seed
```

This populates the database with sample categories (Science, Technology, History, Math, Languages) and their subcategories.

### 6. Run the Frontend

```bash
cd client
ng serve
# App available at http://localhost:4200
```

### 7. Usage

1. Open `http://localhost:4200`
2. Register a new account
3. Log in — you'll be redirected to the dashboard
4. Select a category → subcategory → enter a prompt → click **Send to AI**
5. View your learning history on the right panel
6. Admin users are redirected to `/admin` where all user prompts are listed with search & pagination

## Bonus Features Implemented

- ✅ TypeScript — both frontend and backend
- ✅ JWT authentication
- ✅ Pagination and search in admin dashboard
- ✅ Docker Compose for database
- ✅ Modular architecture (routes / controllers / services / models)
- ✅ Input validation and error handling
