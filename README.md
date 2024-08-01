# Node.js Movie App Backend Server

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Project](#running-the-project)

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) >= 20.x
- [npm](https://www.npmjs.com/) >= 10.x
- [MongoDB](https://www.mongodb.com/) or your preferred database

## Installation

1. *Clone the repository:*
    bash
    git clone https://github.com/Hemil0804/movieApp_backend
    cd your-repo-name
    

2. *Install dependencies:*
    bash
    npm install
    

## Configuration

1. *Create a `.env` file:*

    Copy the provided `.env.example` to `.env` and update the values as necessary:

    bash
    cp .env.example .env
    

    Example `.env` file:

    plaintext
    # Configuration
    1. PORT=4000
    2. APP_URL="http://localhost:4000"
    3. JWT_AUTH_TOKEN_SECRET="Your JWT Authentication secret key"
    4. JWT_EXPIRES_IN="Token Expiry time" # For example, 24h (for 24 hours)
    5. DB_AUTH_URL="Your MongoDB link with database collection name"
    6. RESET_TOKEN_EXPIRES="1h"



## Running the Project
1. *Start the Development Server*

    Start the development server:

    bash
    npm start
    

    The server should now be running at `http://localhost:4000`.


Now you're all set to build awesome movie backend server! 🌟

For more details, visit [MultiQoS.](https://multiqos.com/)
Contact us for collaboration or support:
Email: biz@multiqos.com