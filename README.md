# 🎓 Coursify: A Full-Stack E-Learning Platform with a Modern Architecture

## 📜 Project Abstract

**Coursify** is a high-performance, scalable Learning Management System (LMS) built from the ground up using modern web technologies. This project not only delivers a feature-rich end-user product but also serves as a reference application showcasing current architectural patterns and best practices, including the Next.js App Router, React Server Components (RSC), type-safe database access with Prisma, and containerized development environments with Docker.

---

## 🏛️ Architectural Philosophy & Core Concepts

The primary goal of this project is to create a modern full-stack application architecture within a monolithic structure that effectively manages the boundary between the server and the client.

- **Server-Centric Architecture:** Utilizing the Next.js 13 App Router, rendering and data-fetching operations are shifted to the server whenever possible. This reduces the amount of JavaScript sent to the client, resulting in exceptional performance and faster page load times.
- **End-to-End Type Safety:** The combination of TypeScript, Zod (for schema validation), React Hook Form, and most importantly, the Prisma ORM, guarantees data integrity and type safety at every stage of the development process—from the UI to the database. This minimizes runtime errors and makes refactoring safe and predictable.
- **Isolated & Reproducible Development Environment:** The PostgreSQL development database is managed with Docker and Docker Compose. This approach completely eliminates "it works on my machine" issues and allows every developer to set up a consistent working environment with a single command.

---

## ✨ Feature Deep Dive

### 👨‍🏫 Instructor Dashboard

- **Dynamic Course & Chapter Management:** Instructors can create courses and chapters through an intuitive interface. The reordering of chapters via drag-and-drop, powered by `@hello-pangea/dnd`, is instantly reflected on the server.
- **Advanced Media Uploads & Processing:**
  - **UploadThing:** Used for secure and scalable file uploads. Upload operations are handled directly from the client to UploadThing's servers, reducing the load on our own backend.
  - **Mux Video Streaming:** Uploaded videos are processed through the Mux platform. Mux provides **adaptive bitrate streaming** (ABR) technology, which adjusts to different internet speeds to ensure a seamless viewing experience for every user.
- **Payment & Revenue Management with Stripe:** Course sales are managed via the Stripe API. Post-payment operations are handled asynchronously through Stripe Webhooks, increasing the system's resilience.

### 👨‍🎓 Student Experience

- **Secure & Modern Authentication:** **Clerk** handles user registration, login, and session management entirely. It abstracts away complex processes like JWT management and social logins, providing a secure authentication layer.
- **Interactive Progress Tracking:** When a chapter is completed, this information is saved to the database, and the user's progress is updated instantly. This feature is consistently reflected across the platform thanks to a global state managed with `Zustand`.
- **Performant Course Discovery:** Course search and filtering operations are performed on the server-side using Prisma's optimized `full-text search` capabilities for PostgreSQL, thus minimizing the load on the client.

---

## 🔧 Technology Stack & Rationale

| Category             | Technology                             | Rationale & Role                                                                                                                                |
| :------------------- | :------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------- |
| **Framework**        | **Next.js 13 (App Router)**            | Leverages Server-Side Rendering (SSR) and React Server Components (RSC) for performance, SEO, and an enhanced developer experience.             |
| **Language**         | **TypeScript**                         | Chosen to ensure code quality, maintainability, and type safety in a large-scale application.                                                   |
| **Database Stack**   | **PostgreSQL**, **Prisma**, **Docker** | The flexibility of PostgreSQL, the type-safe ORM capabilities of Prisma, and the isolated dev environment of Docker create a robust data layer. |
| **Authentication**   | **Clerk**                              | Accelerates the development process by abstracting secure user management, session, and JWT operations.                                         |
| **Styling**          | **Tailwind CSS** & **Shadcn/UI**       | Provides a utility-first CSS approach and accessible components for rapid, consistent, and modern UI development.                               |
| **File & Video**     | **UploadThing** & **Mux**              | Enables a scalable and secure file upload infrastructure along with a professional, adaptive video streaming service.                           |
| **State Management** | **Zustand**                            | Simplifies global state management with its minimalist, flexible, and performance-oriented design.                                              |
| **Form Management**  | **React Hook Form** & **Zod**          | Ensures user input security through performant form handling and schema-based validation.                                                       |

---

## ⚙️ Environment Variables & Setup (`.env`)

This project integrates with various external services. The API keys for these services must be stored in an `.env` file. **SECURITY WARNING: NEVER commit your `.env` file to your `git` repository!** A template file named `.env.example` is included in the project. Create a copy named `.env` and fill it with your own keys.

| Variable                            | Purpose                                                                      | Where to Get                                                                         |
| :---------------------------------- | :--------------------------------------------------------------------------- | :----------------------------------------------------------------------------------- |
| `DATABASE_URL`                      | The connection string for the PostgreSQL database.                           | Should match the credentials in the `docker-compose.yml` file for local development. |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | The public key for Clerk to be used on the client-side.                      | [Clerk Dashboard](https://dashboard.clerk.dev) -> API Keys                           |
| `CLERK_SECRET_KEY`                  | The secret key for Clerk's server-side operations.                           | [Clerk Dashboard](https://dashboard.clerk.dev) -> API Keys                           |
| `UPLOADTHING_SECRET`                | The secret key for authenticating with the UploadThing service.              | [UploadThing Dashboard](https://uploadthing.com/dashboard) -> API Keys               |
| `UPLOADTHING_APP_ID`                | The unique identifier for your application on UploadThing.                   | [UploadThing Dashboard](https://uploadthing.com/dashboard) -> API Keys               |
| `MUX_TOKEN_ID`                      | The access token ID for the Mux video processing service.                    | [Mux Dashboard](https://dashboard.mux.com/) -> Settings -> API Access Tokens         |
| `MUX_TOKEN_SECRET`                  | The secret token for the Mux service.                                        | [Mux Dashboard](https://dashboard.mux.com/) -> Settings -> API Access Tokens         |
| `STRIPE_API_KEY`                    | The secret key for Stripe payment operations.                                | [Stripe Dashboard](https://dashboard.stripe.com) -> Developers -> API keys           |
| `STRIPE_WEBHOOK_SECRET`             | The key used to verify incoming webhook requests from Stripe.                | [Stripe Dashboard](https://dashboard.stripe.com) -> Developers -> Webhooks           |
| `NEXT_PUBLIC_APP_URL`               | The base URL where the application will run (e.g., `http://localhost:3000`). | Set manually.                                                                        |

---

## 🚀 Setting Up the Local Development Environment

**Prerequisites:** Ensure you have **Git**, **Node.js (v18+ LTS)**, and **Docker** installed on your system.

1.  **Clone the Project:**

    ```bash
    git clone [https://github.com/your-username/coursify.git](https://github.com/your-username/coursify.git)
    cd coursify
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```
3.  **Set Up Environment Variables:**
    Create a `.env` file by copying the `.env.example` template and fill in your API keys as described in the table above.

4.  **Initialize and Sync the Database:**
    The `docker-compose.yml` file will automatically set up the PostgreSQL service.

    ```bash
    # 1. Start the PostgreSQL container in the background (-d)
    docker-compose up -d

    # 2. Run Prisma migrations to create the database schema
    npx prisma migrate dev
    ```

5.  **Start the Development Server:**

    ```bash
    npm run dev
    ```

    The application will now be accessible at [http://localhost:3000](http://localhost:3000).

---

## 🔑 Demo Admin Account

To test the application's features, including the instructor dashboard, you can use the following administrator credentials. This account has full privileges to create, edit, and manage courses.

| Field        | Value                 |
| :----------- | :-------------------- |
| **Email**    | `coursifya@gmail.com` |
| **Password** | `2025admin2026`       |

---
