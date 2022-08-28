# Welcome to RBAC-REACT-TS-ASPNETCORE
A starter template for implementing JWT token from ASP.NET Core Identity project and applying that JWT token authentication on React TS application

This is a basic implementation of role-based access control which can be fully controlled from an Admin panel instead of hard coding the permissions inside of your code. 
This implementation covers the scenario of a basic microservice based system where the users can be having different roles and based on their roles, their permission will be different accross both in the Client side and in the Server side. 

## Technology used

This repository uses a number of frameworks and libraries to work:

* [ReactJS](https://reactjs.org/) - A JavaScript library for building user interfaces
* [Firebase/Storage](https://firebase.google.com/docs/storage) - Cloud Storage for Firebase is a powerful, simple, and cost-effective object storage service built for Google scale.
* [ASP.NET Core Identity](https://docs.microsoft.com/en-us/aspnet/core/security/authentication/identity?view=aspnetcore-6.0&tabs=visual-studio) - Is an .NET Core API that supports login functionality. Manages users, passwords, profile data, roles, claims, tokens, email confirmation, and more.
* [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) - SQL Server 2019 Express is a free edition of SQL Server

## Installation and Run

The database file (App_Data/AspNetIdentity-Localdb) is already in the project, so you do not have to worry about setup and running the web API application locally. You can simply run it in VSCode

To run server 

```sh
    cd .\API\src\RS_Services_API
    dotnet restore
    dotnet run
``` 

If you want to create your database by yourself, here is what need to do.

- Open the file appSettings.json in RS_Services_API folder and change it.

```sh
    "DefaultConnection": "YOUR CONNECTION STRING"
``` 

- Then run the following command for migrations.

```sh
    dotnet ef migrations add InitialCreate --context ProfileDbContext
    dotnet ef database update --context ProfileDbContext
``` 

- If dotnet-ef tool is not installed

```sh
    dotnet tool install --global dotnet-ef
``` 

Verify the deployment by navigating to your server address in your preferred browser.

```sh
    http://localhost:5000/swagger/index.html
``` 

To run client

```sh
    cd .\React_Client
    npm install
    npm start
``` 

Verify the deployment by navigating to your server address in your preferred browser.

```sh
    http://localhost:3002/
``` 

# Watch the video
