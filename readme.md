# Polls Web App

This is a simple web poll application where users can vote and create polls. The Backend is built with .NET Core Web API, using Dapper, SQL Server database and Minimal API. These technologies were quite new to me, but I enjoyed experimenting and learning them. The frontend is built with React using Typescript.

## Running the Backend

In order to build the backend, run the **PollAPI.sln** file. Then, in Visual Studio define a connection string in the **appsettings.json** file, like so:   
"ConnectionStrings": {
    "Default": ”put your connection string here”
  } 
After that, right click on the **PollsDB** project and select **publish**. Define a *SQL Server database connection and database name as in your connection string. This will initiate the database with some contents. 
Finally, **build** the project and **run**. Swagger API will open in a browser at https://localhost:7120/.

## Running the Frontend

For the frontend, navigate to the directory and run npm install. NPM package manager required. Then run: **npm start** to start the project. There are also a few e2e tests, which can be run with a command: **npm run cypress**. Both the backend and frontend need to be running while running the tests. I created and used an additional test database for the testing.
