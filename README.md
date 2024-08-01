# Steps to start the Project

1) copy .env.example file and rename as .env file 
2) Pass jwt auth token secret key as  JWT_AUTH_TOKEN_SECRET in .env file
3) Pass jwt expiry time as  JWT_EXPIRES_IN,DB_AUTH_URL in .env file
4) Mongo DB URL  as DB_AUTH_URL in .env file
5) jwt reset token expiry time as RESET_TOKEN_EXPIRES in .env file
6) Install node modules using "npm i" command
7) check the mongo conection and run the backend code by "node src/app.js"