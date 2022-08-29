# Welcome to RBAC-REACT-TS-ASPNETCORE
A starter template for implementing JWT token from ASP.NET Core Identity project and applying that JWT token authentication on React TS application

This is a basic implementation of role-based access control which can be fully controlled from an Admin panel instead of hard coding the permissions inside of your code. 
This implementation covers the scenario of a basic microservice based system where the users can be having different roles and based on their roles, their permission will be different accross both in the Client side and in the Server side. 

## Technology used

This repository uses a number of frameworks and libraries to work:

* [ReactJS](https://reactjs.org/) - A JavaScript library for building user interfaces.
* [TypeScript](https://www.typescriptlang.org/) - TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale. 
* [Redux](https://redux.js.org/) - A Predictable State Container for JS Apps. 
* [Firebase/Storage](https://firebase.google.com/docs/storage) - Cloud Storage for Firebase is a powerful, simple, and cost-effective object storage service built for Google scale.
* [ASP.NET Core Identity](https://docs.microsoft.com/en-us/aspnet/core/security/authentication/identity?view=aspnetcore-6.0&tabs=visual-studio) - Is an API that supports user login functionality. Manages users, passwords, profile data, roles, claims, tokens, email confirmation, and more.
* [CQRS pattern](https://docs.microsoft.com/en-us/azure/architecture/patterns/cqrs) - CQRS stands for Command and Query Responsibility Segregation, a pattern that separates read and update operations for a data store.
* [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) - SQL Server Express is a free edition of SQL Server
* [Swagger UI](https://swagger.io/swagger-ui/) - Swagger (OpenAPI) is a language-agnostic specification for describing REST APIs. It allows both computers and humans to understand the capabilities of a REST API without direct access to the source code.

## Installation and Run

The database file (App_Data/AspNetIdentity-Localdb) is already in the project, so you do not have to worry about setting up the database and running the application locally. You can simply run the application through Visual Studio or VS Code IDE.

To run server 

```sh
    cd API/src/RS_Services_API
    dotnet restore
    dotnet run
``` 
Verify the deployment by navigating to your server address in your preferred browser.

```sh
    http://localhost:5000/swagger/index.html
``` 

If you want to create your database by yourself, here is what need to do.

- Open the file appSettings.json inside the RS_Services_API folder and provide your connection string.

```sh
    "DefaultConnection": "YOUR CONNECTION STRING"
``` 

- Then run the following command for migrations.

```sh
    dotnet ef migrations add InitialCreate --context ProfileDbContext
    dotnet ef database update --context ProfileDbContext
``` 

- If dotnet-ef tool is not installed then

```sh
    dotnet tool install --global dotnet-ef
``` 

To run client

```sh
    cd React_Client
    npm install
    npm start
``` 

Verify the deployment by navigating to your client address in your preferred browser.

```sh
    http://localhost:3002/
``` 

## Screenshots

* [Login Page](https://github.com/rodtsan/rbac-react-ts-aspnetcore/blob/master/screenshots/react-ts-login.png?raw=true)
* [Manage Users](https://github.com/rodtsan/rbac-react-ts-aspnetcore/blob/master/screenshots/react-ts-manage-users.png?raw=true)
* [Manage Roles](https://github.com/rodtsan/rbac-react-ts-aspnetcore/blob/master/screenshots/react-ts-manage-roles.png?raw=true)
* [My Profile](https://github.com/rodtsan/rbac-react-ts-aspnetcore/blob/master/screenshots/react-ts-my-profile.png?raw=true)
* <a href="https://github.com/rodtsan/rbac-react-ts-aspnetcore/blob/master/screenshots/react-ts-my-profile.png?raw=true" target="_blank" rel="noopener">My Profile</a>
