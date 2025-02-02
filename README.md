# Status Page Application

[![Project Status](https://img.shields.io/badge/status-in%20development-yellow)](https://shields.io/) <!-- You can replace this with a real status badge later -->

A simplified status page application, inspired by services like StatusPage, Cachet, Betterstack, and Openstatus. This application allows administrators to manage services and their statuses, providing a public-facing page for users to view the current operational status of all services.

## Tech Stack

This project utilizes the following technologies:

*   **Frontend Framework:** NextJs
*   **Backend Framework:** NextJs API Routes 
*   **Database:** PostgreSQL
*   **ORM/Database Tool:** Prisma
*   **Authentication & User Management:** Clerk
*   **Real-time Updates:** WebSockets
*   **Deployment:** Vercel
*   **AI Tools:** v0, GitHub Copilot, Claude Sonnet

## Key Features

*   **User Authentication:** Secure user login for administrators.
*   **Team Management:**  Functionality to manage teams and user roles (if applicable).
*   **Organization (Multi-tenant):** Support for multiple organizations or tenants to manage their own services.
*   **Service Management:**
    *   CRUD operations for services (e.g., Website, API, Database).
    *   Ability to set and update service statuses (Operational, Degraded Performance, Partial Outage, Major Outage).
*   **Incident/Maintenance Management:**
    *   Create, update, and resolve incidents or scheduled maintenance.
    *   Association of incidents with specific services.
    *   Real-time updates and logging of incident events.
*   **Real-time Status Updates:** WebSockets for pushing status changes to clients in real-time.
*   **Public Status Page:**
    *   Displays the current status of all services.
    *   Shows active incidents and scheduled maintenance.
    *   Timeline of recent incidents and status changes.
*   **Clean, Minimalistic UI:**  Utilizing Shadcn UI for a modern and user-friendly interface.

## Getting Started

These instructions will guide you on how to set up and run the application locally.

### Prerequisites

Before you begin, ensure you have the following installed:

*   [Node.js](https://nodejs.org/) (for frontend and potentially backend if using Node.js) -  [Specify minimum version if needed]
*   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) or [pnpm](https://pnpm.io/) (package managers)
*   [Database system - e.g., PostgreSQL, MySQL] and necessary client tools installed and running.
*   [Any other specific dependencies like a CLI for your chosen framework]

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/shubhranka/status-page
    cd status-page
    ```

2.  **Install dependencies:**

    *   **Frontend | Backend:**
        ```bash
        npm install  # or yarn install or pnpm install
        ```

3.  **Database Setup:**

    *   Create a database named `[your_database_name]` (or as configured in your application).
    *   Run database migrations (if using an ORM):
        ```bash
        # Example for Prisma:
        npx prisma migrate dev --name init
        # Example for TypeORM or Sequelize:
        # ... your ORM migration command ...
        ```

4.  **Environment Variables:**

    *   Create `.env` files in both the `frontend` and `backend` directories (if applicable) based on the `.env.example` files provided (if you included them in your repo).
    *   Set the necessary environment variables, such as database connection strings, API keys, authentication credentials, etc.

    ```
    # Example .env (Backend)
    DATABASE_URL="postgresql://user:password@host:port/database"
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=xxxx
    CLERK_SECRET_KEY=xxxxx
    NEXT_PUBLIC_WEB_SOCKET_URL=xxxx
    # ... other backend environment variables ...
    ```

### Running the Application

1.  **Start the Application:** (If applicable)

    ```bash
    npm run dev  # or yarn dev or pnpm dev (or your backend run command)
    ```

3.  **Access the application:** Open your browser and navigate to the frontend development server address (usually `http://localhost:3000` or as specified in your frontend framework).

## Deployment

The application is deployed on Vercel.

You can access the deployed application here: [Deployment URL]

## Loom Demo

[Insert Loom Demo Video Link Here] -  A short video demonstrating the application's features and a quick codebase walkthrough.

## Optional Stretch Goals (Not Implemented)

*   [ ] Email notifications for status changes (Implemented/Not Implemented - and briefly describe if implemented)
*   [ ] Metric graphs for service uptime percentage (Implemented/Not Implemented - and briefly describe if implemented)
*   [ ] Simple API for external status checks (Implemented/Not Implemented - and briefly describe if implemented)

## Evaluation Criteria - Match with the Project

*   **Code Quality:** Clean, well-organized, and commented code.
*   **Architecture:** Proper separation of concerns and scalable design.
*   **Frontend Skills:** Responsive design, state management, and component structure.
*   **Backend Skills:** API design, database integration, and authentication implementation.
*   **Problem-Solving:** Approach to challenges and solutions implemented.
*   **AI-First Development:** Effective use of AI LLMs/IDEs to fast-track development.

## AI Tools Used

During the development of this application, I utilized the following AI tools to enhance productivity and accelerate development:

*   v0
*   GitHub Copilot
*   Claude Sonnet

These tools assisted in code generation, debugging, and brainstorming solutions, contributing to a more efficient development process.
