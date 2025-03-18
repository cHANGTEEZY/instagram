# 🚧 UNDER DEVELOPMENT 🚧

# Instagram Clone (PostgreSQL Version)

**Note:** This project is currently under active development. Features and functionalities may change or be incomplete.

This is a full-stack Instagram clone where users can post pictures, add stories, like posts, and more. This version utilizes PostgreSQL instead of MongoDB for data storage.

## Features

- **User Authentication**: Sign up, log in, and log out functionality.
- **Post Creation**: Users can create posts, upload images, and write captions.
- **Story Feature**: Users can add and view stories.
- **Likes and Comments**: Posts can be liked, and users can comment on them.
- **Responsive Design**: The app is fully responsive and works on both desktop and mobile devices.
- **Dark Mode**: A toggle to switch between light and dark themes.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) - Ensure Node.js is installed on your machine.
- [PostgreSQL](https://www.postgresql.org/) - You need a PostgreSQL instance for data storage.
- [Git](https://git-scm.com/) - To clone the repository.
- [pgAdmin](https://www.pgadmin.org/) (Optional, for database management)

### Steps to Install and Run the App

1.  Clone the repository:

    ```bash
    git clone [https://github.com/cHANGTEEZY/instagram.git](https://github.com/cHANGTEEZY/instagram.git)
    ```

2.  Navigate to the project directory:

    ```bash
    cd instagram
    ```

3.  Install server dependencies:

    ```bash
    cd server
    npm install
    ```

4.  Configure environment variables for the server:

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

5.  Run database migrations (or create tables manually):
    -Install the necessary packages if needed.
    -Use a tool like Sequelize or Knex to run migrations or manually create the tables.
    -Adapt your models to match the database schema.
    -Example using node-postgres directly to create tables:

    ````javascript
    //Example inside your server/server.js or a separate migration file.
    const { Pool } = require('pg');
    const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    });

        async function createTables() {
          try {
            await pool.query(`
              CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(255) UNIQUE NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                profile_picture VARCHAR(255)
              );
              CREATE TABLE IF NOT EXISTS posts (
                id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(id),
                image_url VARCHAR(255) NOT NULL,
                caption TEXT,
                created_at TIMESTAMP DEFAULT NOW()
              );
              //Add tables for stories, likes, comments, etc.
            `);
            console.log('Tables created successfully.');
          } catch (err) {
            console.error('Error creating tables:', err);
          } finally {
            pool.end();
          }
        }
        createTables();
        ```

    ````

6.  Start the server:

    ```bash
    npm run dev
    ```

    - This will start the backend server.

7.  Open a new terminal and navigate to the client directory:

    ```bash
    cd ../client
    npm install
    ```

8.  Configure environment variables for the client:

    - Create a `.env.local` file in the `client` directory.
    - Add the following variable:

      ```
      REACT_APP_API_URL=http://localhost:5000/api # Or your server URL
      ```

9.  Start the client:

    ```bash
    npm start
    ```

    - This will open the app in your default browser.

## Technologies Used

- **Frontend**: React.js, Redux, Axios, Material-UI, Styled Components
- **Backend**: Node.js, Express.js, PostgreSQL, node-postgres (or Sequelize/Knex), JWT, Cloudinary
