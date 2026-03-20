<div align="center">

# 📖 StoryNasi

### AI-Powered Story Creation & Publishing Platform

[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Gemini AI](https://img.shields.io/badge/Vertex%20AI-Gemini%201.5%20Pro-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white)](https://cloud.google.com/vertex-ai)

---

> **StoryNasi** is a cutting-edge, full-stack web application that harnesses the power of artificial intelligence to transform how stories are created and shared. Designed for children ages 3–11, it combines a rich-text editor, AI-generated text continuations, and image search to make storytelling accessible, creative, and engaging.

</div>

---

## Table of Contents

- [Abstract](#abstract)
- [Key Features](#key-features)
- [Technical Highlights](#technical-highlights)
- [Architecture](#architecture)
- [Database Schema](#database-schema)
- [Application Pages](#application-pages)
- [API Endpoints](#api-endpoints)
- [Tech Stack](#tech-stack)
- [NPM Packages](#npm-packages)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Agile Development Process](#agile-development-process)
- [Design & UX](#design--ux)
- [Deployment](#deployment)
- [Future Work](#future-work)
- [Credits & References](#credits--references)

---

## Abstract

The traditional publishing process is burdened with time-consuming hurdles that stifle creativity. StoryNasi addresses these challenges by offering a suite of AI-powered tools that streamline content creation, enhance originality, and elevate user experience.

By leveraging advanced technologies including **Google Vertex AI (Gemini 1.5 Pro)**, **Bing Image Search API**, and a **Plagiarism Detection** system, the platform enables anyone — including children — to craft, illustrate, and publish their own stories. Built entirely with **JavaScript, React, and Node.js**, the application boasts an agile, scalable architecture.

**The platform was successfully deployed on April 23, 2024, and is publicly accessible.**

---

## Key Features

| Feature | Description |
|---|---|
| ✍️ **Story Editor** | Craft stories with a user-friendly, rich-text interface powered by Slate.js |
| 📚 **Story Reader** | Immersive, book-like reading experience with page-flip animation |
| 🤖 **AI Text Generator** | Spark creativity with AI-powered text suggestions and story continuations via Gemini 1.5 Pro |
| 🖼️ **Image Generator** | Automatically search and embed images that capture story scenes via Bing Image Search API |
| 🎨 **Story Styler** | Customize the look and feel of your story with typography and color controls |
| 🔍 **Plagiarism Detector** | Flag and remove plagiarized content to ensure originality |
| 🔐 **User Authentication** | Secure registration and login using JWT and bcrypt password hashing |
| 🏛️ **Public Story Library** | Browse a curated collection of published stories by all users |
| 🗂️ **My Books Library** | Manage drafts, works-in-progress, and published stories in a personal dashboard |

---

## Technical Highlights

This project demonstrates significant technical depth across multiple domains:

- **AI Integration**: Direct integration with **Google Cloud Vertex AI** using service-account credentials, calling the `gemini-1.5-pro-preview-0409` model with configurable generation parameters and four-category safety filtering.
- **Rich Text Editing**: Custom Slate.js editor with support for marks (bold, italic, underline, code), block types (headings, quotes, lists), image embedding, and hotkey bindings — built entirely from scratch without a pre-built editor template.
- **Security**: JWT-based stateless authentication, bcrypt password hashing, CORS policy enforcement, and environment-variable-isolated secrets (no credentials in source code).
- **Performance**: React `useMemo` and `useCallback` hooks used throughout to prevent redundant re-renders; API response caching in Context providers.
- **Accessibility & Responsive Design**: Chakra UI component library used for accessible, WCAG-compliant components; custom `useMediaQuery` hook gracefully redirects screens below 768px.
- **Animated UX**: `react-spring` used to implement a realistic 3D book page-flip animation for the reader view.
- **Client-Server Separation**: Fully decoupled frontend (React SPA) and backend (Express REST API), deployed independently on Render.com.

---

## Architecture

### System Overview

```
┌──────────────────────────────────────────────────────────┐
│                     CLIENT (Browser)                      │
│                                                           │
│  ┌───────────┐  ┌────────────┐  ┌──────────────────────┐ │
│  │  AuthCtx  │  │ StoryCtx   │  │  LibraryCtx          │ │
│  │  (JWT)    │  │ (CRUD ops) │  │  (Published books)   │ │
│  └───────────┘  └────────────┘  └──────────────────────┘ │
│                                                           │
│  ┌───────────────────────────────────────────────────┐   │
│  │                App Router (React Router v6)        │   │
│  │  /login  /signup  /  /write  /read  /mystories    │   │
│  └───────────────────────────────────────────────────┘   │
│                                                           │
│  Pages: HomePage │ StoryPage │ StoryReader │ MyStories    │
│  Components: SlateEditor │ ImageEditor │ BookThumbnail    │
└────────────────────────┬─────────────────────────────────┘
                         │ HTTPS REST (Axios)
                         ▼
┌──────────────────────────────────────────────────────────┐
│               SERVER (Node.js / Express)                  │
│                                                           │
│  Routes: /api/users  /api/stories  /api/pages            │
│                                                           │
│  Middleware: authMiddleware (JWT verify) │ errorHandler   │
│                                                           │
│  Controllers: userCtrl │ storyCtrl │ pageCtrl             │
│               textGeneratorCtrl │ imageGeneratorCtrl      │
└──────┬────────────────────────────────────────┬──────────┘
       │                                        │
       ▼                                        ▼
┌─────────────┐                    ┌────────────────────────┐
│  MongoDB    │                    │  External APIs         │
│  (Mongoose) │                    │                        │
│             │                    │  • Google Vertex AI    │
│  Users      │                    │    (Gemini 1.5 Pro)    │
│  Stories    │                    │  • Bing Image Search   │
│  Pages      │                    │    API v7.0            │
└─────────────┘                    └────────────────────────┘
```

### Frontend State Management

```mermaid
graph TD
    App["App.js (Root)"]
    Auth["AuthContext\nJWT · getUserProfile · setCurrentUser"]
    Story["CurrentStoryContext\nfetchBook · fetchPages · createPage · updatePage"]
    Library["MyBooksContext\ngetMyBooks · myBooks cache"]
    Router["AppRouter\nProtected Routes"]

    App --> Auth
    App --> Library
    Auth --> Router
    Router --> Story
```

### Request Lifecycle

```mermaid
sequenceDiagram
    participant User
    participant React as React (Frontend)
    participant Express as Express (Backend)
    participant Auth as authMiddleware
    participant DB as MongoDB
    participant AI as Vertex AI / Bing

    User->>React: Clicks "Write with AI"
    React->>Express: POST /api/pages/generate-text
    Express->>Auth: verifyToken(JWT)
    Auth-->>Express: token valid, attach req.user
    Express->>AI: Gemini 1.5 Pro generateContent()
    AI-->>Express: AI-generated text
    Express-->>React: { generatedText }
    React->>User: Insert text into Slate editor
```

---

## Database Schema

```
┌──────────────────────┐         ┌──────────────────────────────┐
│        User          │         │           Story               │
├──────────────────────┤         ├──────────────────────────────┤
│ _id: ObjectId (PK)   │◄────┐   │ _id: ObjectId (PK)           │
│ name: String         │     └───│ author: ObjectId (FK→User)   │
│ email: String UNIQUE │         │ title: String                │
│ password: String     │         │ description: String          │
│ age: Number          │         │ image: String (URL)          │
│ token: String        │         │ author_age: Number           │
│ createdAt: Date      │         │ author_name: String          │
│ updatedAt: Date      │         │ html_content: String         │
└──────────────────────┘         │ isEnd: Boolean               │
                                 │ createdAt: Date              │
                                 │ updatedAt: Date              │
                                 └──────────────┬───────────────┘
                                                │ 1 : many
                                                ▼
                                 ┌──────────────────────────────┐
                                 │            Page              │
                                 ├──────────────────────────────┤
                                 │ _id: ObjectId (PK)           │
                                 │ story: ObjectId (FK→Story)   │
                                 │ pageNumber: Number           │
                                 │ content: Mixed (Slate JSON)  │
                                 │ imageUrl: String             │
                                 │ createdAt: Date              │
                                 │ updatedAt: Date              │
                                 └──────────────────────────────┘
```

---

## Application Pages

### User Flow

```mermaid
flowchart TD
    Start([User visits app]) --> Auth{Authenticated?}
    Auth -- No --> Login[Login / Signup Page]
    Login --> Home
    Auth -- Yes --> Home[Home Page\nPublic story library]
    Home --> Read[Story Reader\nBook-flip animation]
    Home --> MyBooks[My Books\nPersonal library]
    MyBooks --> Write[Story Editor\nSlate.js rich text]
    Write --> AI[AI Text Generator\nGemini 1.5 Pro]
    Write --> Img[Image Generator\nBing Image Search]
    Write --> Publish{Publish?}
    Publish -- Yes --> Home
    Publish -- No --> MyBooks
```

### Page Descriptions

| Page | Route | Description |
|---|---|---|
| **Login** | `/login` | Email/password sign-in with JWT token stored to `sessionStorage` |
| **Signup** | `/signup` | User registration with name, email, password, and age |
| **Home** | `/` | Public library of all published (completed) stories |
| **My Stories** | `/mystories` | Personal dashboard of the user's stories — drafts and published |
| **Story Editor** | `/write/page/:pageNumber` | Full rich-text editor per page with AI text and AI image tools |
| **Story Reader** | `/read` | Book-format reader with animated page-flip transitions |
| **Mobile** | `*` (small screen) | Graceful fallback page for screens below 768px |

---

## API Endpoints

### Users — `/api/users`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/users/register` | Public | Register new user (name, email, password, age) |
| `POST` | `/api/users/login` | Public | Authenticate user, return JWT |
| `GET` | `/api/users/` | 🔒 JWT | Get authenticated user's profile |

### Stories — `/api/stories`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/stories/` | Public | Fetch all stories |
| `GET` | `/api/stories/complete` | Public | Fetch all published/completed stories |
| `GET` | `/api/stories/user` | 🔒 JWT | Fetch stories belonging to authenticated user |
| `GET` | `/api/stories/:id` | Public | Fetch a single story by ID |
| `POST` | `/api/stories/` | 🔒 JWT | Create a new story |
| `PUT` | `/api/stories/:id` | 🔒 JWT | Update a story |
| `DELETE` | `/api/stories/:id` | 🔒 JWT | Delete a story |

### Pages — `/api/pages`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/pages/:storyId` | 🔒 JWT | Get all pages for a story |
| `POST` | `/api/pages/` | 🔒 JWT | Create a new page |
| `PUT` | `/api/pages/:id` | 🔒 JWT | Update page content (Slate JSON + imageUrl) |
| `POST` | `/api/pages/generate-text` | 🔒 JWT | Generate AI text via Vertex AI (Gemini 1.5 Pro) |
| `POST` | `/api/pages/generate-image` | 🔒 JWT | Search relevant image via Bing Image Search API |

---

## Tech Stack

### Frontend

| Technology | Version | Role |
|---|---|---|
| **React** | 18.2 | Core UI library and component model |
| **React Router DOM** | 6.22 | Client-side routing and protected routes |
| **Slate.js** | 0.102 | Customizable rich-text editor framework |
| **Chakra UI** | 2.8 | Accessible UI component library |
| **react-spring** | 9.7 | Physics-based book page-flip animation |
| **@use-gesture/react** | 10.3 | Touch/mouse gesture handling |
| **Axios** | 1.6 | HTTP client for API requests |
| **Framer Motion** | 11.0 | Supplemental animation library |

### Backend

| Technology | Version | Role |
|---|---|---|
| **Node.js** | LTS | JavaScript runtime |
| **Express** | 4.18 | Web framework and REST API routing |
| **Mongoose** | 8.1 | MongoDB ODM for schema definition and queries |
| **MongoDB** | Cloud Atlas | Document database for users, stories, pages |
| **JSON Web Token** | 9.0 | Stateless authentication tokens |
| **bcryptjs** | 2.4 | Password hashing (10 salt rounds) |
| **dotenv** | 16.3 | Environment variable management |
| **cors** | 2.8 | Cross-Origin Resource Sharing policy |

### AI & External APIs

| Service | Purpose |
|---|---|
| **Google Vertex AI — Gemini 1.5 Pro** | AI text generation and story continuation |
| **Bing Image Search API v7.0** | Context-aware image discovery for story pages |

### DevOps & Tooling

| Tool | Purpose |
|---|---|
| **Render.com** | Cloud deployment (frontend + backend, separate services) |
| **MongoDB Atlas** | Managed cloud database |
| **GitHub** | Version control and Agile project management (issues, milestones) |
| **Figma** | UI/UX design and user flow diagrams |
| **npm** | Package management for both frontend and backend |

---

## NPM Packages

### Frontend (`frontend/package.json`)

| Package | Purpose |
|---|---|
| `react` / `react-dom` | Core React library |
| `react-router-dom` | Protected client-side routing |
| `slate` / `slate-react` / `slate-history` | Rich text editor foundation |
| `@chakra-ui/react` | Accessible UI component system |
| `react-spring` | Book page-flip animations |
| `@use-gesture/react` | Drag/swipe gesture detection |
| `axios` | Promise-based REST API client |
| `framer-motion` | Declarative animations |
| `react-icons` | SVG icon library |
| `is-hotkey` | Keyboard shortcut detection in editor |
| `localforage` | Client-side storage abstraction |

### Backend (`backend/package.json`)

| Package | Purpose |
|---|---|
| `express` | HTTP server and routing |
| `mongoose` | MongoDB schema modelling and queries |
| `bcryptjs` | Secure password hashing |
| `jsonwebtoken` | JWT creation and verification |
| `@google-cloud/vertexai` | Google Vertex AI (Gemini) client |
| `axios` | HTTP client (Bing API requests) |
| `cors` | Cross-origin policy middleware |
| `dotenv` | `.env` file loader |
| `express-async-handler` | Async error propagation to error middleware |
| `nodemon` *(dev)* | Auto-restart server on file changes |

---

## Project Structure

```
storyAOkay/
├── backend/
│   ├── server.js                  # Express app entry point
│   ├── config/
│   │   └── db.js                  # MongoDB connection (Mongoose)
│   ├── models/
│   │   ├── userModel.js           # User schema
│   │   ├── storyModel.js          # Story schema
│   │   └── pageModel.js           # Page schema (Slate JSON content)
│   ├── controllers/
│   │   ├── userController.js      # Auth: register, login, profile
│   │   ├── storyController.js     # CRUD for stories
│   │   ├── pageController.js      # CRUD for pages
│   │   ├── textGeneratorController.js   # Vertex AI (Gemini 1.5 Pro)
│   │   └── imageGeneratorController.js  # Bing Image Search
│   ├── middlewares/
│   │   ├── authMiddleware.js      # JWT verification
│   │   └── errorMiddleware.js     # Centralized error handler
│   └── routes/
│       ├── userRouter.js
│       ├── storyRouter.js
│       └── pageRouter.js
│
└── frontend/
    └── src/
        ├── App.js                 # Provider wrapping + global styles
        ├── axios/index.js         # Axios instance with auth interceptor
        ├── contexts/
        │   ├── AuthContext.js          # Global auth state + JWT
        │   ├── CurrentStoryContext.js  # Active story + page state
        │   └── MyBooksContext.js       # User's personal library
        ├── pages/
        │   ├── HomePage.js        # Public story library
        │   ├── StoryPage.js       # Editor shell + page navigation
        │   ├── MyStoriesPage.js   # User's book dashboard
        │   ├── StoryPage.js       # Writing page wrapper
        │   ├── LoginPage.js       # Authentication
        │   ├── SignupPage.js      # Registration
        │   └── MobilePage.js      # Responsive fallback (<768px)
        ├── Editor/
        │   ├── SlateEditor.js     # Core rich-text editor (Slate.js)
        │   ├── ImageEditor.js     # Image embedding component
        │   └── CollabEditor.js    # Collaboration layer
        ├── Helpers/
        │   ├── CustomEditor.js    # Slate editor command helpers
        │   ├── CustomHtml.js      # HTML serialization/deserialization
        │   └── Reader.js          # Reader utilities
        ├── reader/
        │   └── StoryReader.js     # Book-flip animated reader
        ├── components/            # Shared UI components (buttons, header, footer, etc.)
        ├── hooks/
        │   └── useMediaQuery.js   # Breakpoint detection hook
        └── routes/
            └── app-routes.js      # Route definitions + auth guards
```

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x
- A **MongoDB** connection string (Atlas or local)
- A **Google Cloud** service account with Vertex AI enabled
- A **Bing Image Search** API subscription key

### 1. Clone the Repository

```bash
git clone https://github.com/StoryAOkay/storyAOkay.git
cd storyAOkay
```

### 2. Configure Environment Variables

Create `backend/.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string

# JWT
JWT_SECRET=your_jwt_secret

# Google Vertex AI (Gemini 1.5 Pro)
PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\n...\n-----END RSA PRIVATE KEY-----\n"
CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com

# Bing Image Search
BING_KEY=your_bing_subscription_key
```

Create `frontend/.env`:

```env
REACT_APP_BASE_URL=http://localhost:5000/api
```

### 3. Install & Run the Backend

```bash
cd backend
npm install
npm run server       # development (nodemon)
# or
npm start            # production
```

Backend runs on `http://localhost:5000`

### 4. Install & Run the Frontend

```bash
cd frontend
npm install
npm start
```

Frontend runs on `http://localhost:3000`

---

## Agile Development Process

Development followed an **Agile methodology** using **GitHub** as the project management tool:

- A **product backlog** of all required features was created upfront.
- Tasks were prioritized and grouped into **iteration cycles**.
- Each GitHub issue tracked: status, size (complexity), description, priority, and estimated completion date.
- After each iteration, the working prototype was reviewed and the plan adjusted accordingly.
- This approach enabled on-schedule delivery of all core features.

---

## Design & UX

### Design Tooling

UI/UX design was conducted in **Figma**, starting with a high-fidelity user flow diagram to map every interaction path before any code was written.

### Color Palette

The primary application color is **Rebecca Purple** (`#663399`) — a deliberate choice for the target audience of children aged 3–11. The color is vibrant, memorable, and child-friendly. It also carries a meaningful legacy as a web standard color named in honor of Rebecca Meyer.

```
Primary color:   #663399  (Rebecca Purple)
```

### Responsive Design

The application targets devices with a **minimum width of 768px**. The custom `useMediaQuery` hook detects viewport width and renders a dedicated mobile fallback page (`MobilePage`) on smaller screens, ensuring users are not presented with a broken layout.

### Editor Selection

The original design called for a custom Unity WebGL editor to allow freeform text and image placement. After encountering challenges integrating the Unity WebGL build with the JavaScript codebase, the team pivoted to **Slate.js** — a highly customizable rich-text editor framework for React. This decision allowed faster iteration and a more maintainable codebase.

---

## Future Work

| Enhancement | Description |
|---|---|
| 📱 **Responsive Design** | Full support for screens below 768px (mobile-first layout) |
| 📌 **Precise Positioning** | Drag-and-drop text and image placement within book pages |
| 🖼️ **User-Uploaded Images** | Allow authors to upload their own images instead of AI-generated ones |
| 🎨 **Background Customization** | User-selectable background colors and patterns for book pages |
| 🤝 **Collaborative Editing** | Multi-author real-time collaboration on a single story |
| 🌍 **Multilingual Support** | AI text generation in multiple languages |

---

## Credits & References

### Acknowledgements

Special thanks to **Jonathan Engelsma** for his mentorship throughout this project — guiding the integration decisions, providing strategic direction when the Unity WebGL path proved untenable, and helping navigate institutional challenges.

### Tooling

| Tool | URL |
|---|---|
| Figma (UI Design) | https://www.figma.com/ |
| MongoDB Atlas | https://www.mongodb.com/ |
| Render (Deployment) | https://render.com/ |
| Diagrams.net | https://app.diagrams.net/ |
| dbdiagram.io | https://dbdiagram.io/home |
| npm | https://www.npmjs.com/ |

### Bibliography

1. Vanier, D.J. *Market Structure and the Business of Book Publishing*. Pitman Publishing Company, New York, 1973.
2. Algaze, V. ["The 'Hidden' Purple Memorial in Your Web Browser."](https://medium.com/@valgaze/the-hidden-purple-memorial-in-your-web-browser-7d84813bb416) Medium, April 5, 2017.
3. Slate. [*Slate Documentation*](https://docs.slatejs.org/). Slate, 2022.
4. React Spring. [*useSpring API*](https://www.react-spring.dev/docs/components/use-spring). React Spring, 2024.
5. NPM. [*@use-gesture/react*](https://www.npmjs.com/package/@use-gesture/react). NPM, 2024.

---

<div align="center">

**StoryNasi** — *Empowering the next generation of storytellers.*

Built with JavaScript · React · Node.js · MongoDB · Google Vertex AI

</div>
