# 🚧 UNDER DEVELOPMENT 🚧

# Instagram Clone (PostgreSQL Version)

**Note:** This project is currently under active development. Features and functionalities may change or be incomplete.

This is a fully-fledged Instagram clone built using modern technologies, where users can post pictures, add stories, like posts, and more. This version utilizes **PostgreSQL** for data storage and **Prisma** as the ORM.

## Features

- **User Authentication**: Users can sign up, log in, and log out.
- **Post Creation**: Users can create posts, upload images, and write captions.
- **Story Feature**: Users can add and view stories.
- **Likes and Comments**: Posts can be liked and commented on.
- **Responsive Design**: The app is fully responsive and works seamlessly on both desktop and mobile devices.
- **Dark Mode**: A toggle to switch between light and dark themes.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) - Ensure Node.js is installed on your machine.
- [PostgreSQL](https://www.postgresql.org/) - You need a PostgreSQL instance for data storage.
- [Git](https://git-scm.com/) - To clone the repository.
- [Prisma](https://www.prisma.io/) - ORM for interacting with the PostgreSQL database.
- [Cloudinary](https://cloudinary.com/) (Optional, for storing images).
- [pgAdmin](https://www.pgadmin.org/) (Optional, for database management).

### Steps to Install and Run the App

1. Clone the repository:

    ```bash
    git clone https://github.com/cHANGTEEZY/instagram.git
    ```

2. Navigate to the project directory:

    ```bash
    cd instagram
    ```

3. Install server dependencies:

    ```bash
    cd server
    npm install
    ```

4. Configure environment variables for the server:

    - Create a `.env` file in the `server` directory.
    - Add the following variables, replacing the placeholders with your actual values:

      ```
      PORT=5000 # Or any port you prefer
      DB_USER=your_postgres_username
      DB_PASSWORD=your_postgres_password
      DB_HOST=your_postgres_host
      DB_PORT=your_postgres_port
      DB_NAME=your_postgres_database_name
      JWT_SECRET=your_jwt_secret_key
      CLOUD_NAME=your_cloudinary_cloud_name
      CLOUD_API_KEY=your_cloudinary_api_key
      CLOUD_API_SECRET=your_cloudinary_api_secret
      ```

    - **Note:** You'll need to create a Cloudinary account to store images and get these credentials.
    - **Note:** Ensure your PostgreSQL database is created and configured.

5. Set up the database using Prisma:

    - Install Prisma CLI if you haven't already:

      ```bash
      npm install prisma --save-dev
      ```

    - Create your Prisma schema by running:

      ```bash
      npx prisma init
      ```

    - Define your schema in `prisma/schema.prisma`. For example:

      ```prisma
      datasource db {
        provider = "postgresql"
        url      = env("DATABASE_URL")
      }

      generator client {
        provider = "prisma-client-js"
      }

      model User {
        id             Int      @id @default(autoincrement())
        username       String   @unique
        email          String   @unique
        password       String
        profile_picture String?
        posts          Post[]
      }

      model Post {
        id        Int      @id @default(autoincrement())
        userId    Int
        imageUrl  String
        caption   String?
        createdAt DateTime @default(now())
        user      User     @relation(fields: [userId], references: [id])
      }
      ```

    - Run the Prisma migration to create the tables:

      ```bash
      npx prisma migrate dev --name init
      ```

6. Start the server:

    ```bash
    npm run dev
    ```

    - This will start the backend server.

7. Open a new terminal and navigate to the client directory:

    ```bash
    cd ../client
    npm install
    ```

8. Configure environment variables for the client:

    - Create a `.env.local` file in the `client` directory.
    - Add the following variable:

      ```
      REACT_APP_API_URL=http://localhost:5000/api # Or your server URL
      ```

9. Start the client:

    ```bash
    npm start
    ```

    - This will open the app in your default browser.

## Technologies Used

- **Frontend**: React.js, Redux, Axios, Shadcnui, Styled Components, Tailwind CSS, React Hook Form, TypeScript
- **Backend**: Node.js, Express.js, PostgreSQL, Prisma, JWT, Cloudinary/AWS, Bcrypt
