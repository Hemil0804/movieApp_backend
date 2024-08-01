# movieApp_backend

# Steps to start the Project

First, copy .env.example file and rename as .env file 
second, Pass jwt auth token secret key as  JWT_AUTH_TOKEN_SECRET ,JWT_EXPIRES_IN,DB_AUTH_URL
Third, Pass jwt expiry time as  JWT_EXPIRES_IN,DB_AUTH_URL
Fourth, Mongo DB URL  as DB_AUTH_URL
Fifth, jwt reset token expiry time as RESET_TOKEN_EXPIRES
Sixth, Install node modules using "npm i" command
Seven, check the mongo conection and run the backend code by "node src/app.js"