# Welcome to RBAC-REACT-TS-ASPNETCORE
A starter template for implementing JWT token from ASP.NET Core Identity project and applying that JWT token authentication on React TS application

This is a basic implementation of role-based access control which can be fully controlled from an Admin panel instead of hard coding the permissions inside of your code. 
This implementation covers the scenario of a basic microservice based system where the users can be having different roles and based on their roles, their permission will be different accross both in the Client side and in the Server side. 

## Technology used

This repository uses a number of frameworks and libraries to work:

* [ReactJS] - A JavaScript library for building user interfaces
* [ASP.NET Core Identity] - Is an API that supports login functionality. Manages users, passwords, profile data, roles, claims, tokens, email confirmation, and more.
* [SQL Server] - SQL Server 2019 Express is a free edition of SQL Server

## Installation and Run

Install the dependencies and dev dependencies and start the server.

You can manually install the database servers and configure the connections string by yourself. 
Or you can simply go to API\src\RS_Services_API open in VS Code and execute the commands below. 

```sh
dotnet build
dotnet run
``` 
