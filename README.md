# BiteSpeed Backend Task: Identity Reconciliation


## Introduction
Welcome to FluxKart's customer identity reconciliation service! This Node.js web service provides a solution for Bitespeed to track and consolidate customer identities across multiple purchases. With this service, Bitespeed can ensure a personalized and seamless customer experience for all users.

## Project Type
 Backend

## Deployed Backend
The web service is hosted on Render.

## Directory Structure
``` bash
├─ src/
   ├─ config/
      ├─ connectToDB.js
   ├─ controller/
      ├─ contactController.js
   ├─ Route/
      ├─ contactRoute.js
   ├─ Schema/
      ├─ contact.js
├─ .gitignore
├─ index.js
├─ package.json
├─ README.md
```


## Features
Key Features
- Identity Reconciliation: Consolidate customer identities across multiple purchases using email or phone number.
- Primary and Secondary Contacts: Automatically assign primary and secondary contact statuses based on the oldest contact record.
- Creation of New Contacts: If no existing contacts are found, the service creates a new primary contact.
- Update Contact Status: Update primary contacts to secondary if new information is provided.

## Installation & Getting started
Detailed instructions on how to install, configure, and get the running: </br>

Step 1: Clone the repository:
```git clone https://github.com/Anujkumar960/BiteSpeed.git``` </br>
Step 2:Navigate to the project directory:
```cd BiteSpeed```</br>
Step 3: Install dependencies with the command
``` npm install``` </br>
Step 4: After the node modules have been installed, to start the server, run the command ``` npm srun server``` </br>


## USES
Identity Reconciliation
To reconcile customer identity, send a POST request to the /identify endpoint with JSON body containing either email or phoneNumber.

json
Copy code
```
{
  "email": "example@example.com",
  "phoneNumber": "1234567890"
}
```
Example Request
json
Copy code
```
{
  "email": "example@example.com"
}
```
Example Response
json
Copy code
```bash
{
  "contact": {
    "primaryContactId": 1,
    "emails": ["example@example.com"],
    "phoneNumbers": ["1234567890"],
    "secondaryContactIds": [2, 3]
  }
}
```

## Technology Stack
Technology Stack
- Node.js
- Express.js
- Sql
- Sequelize
- Render (for deployment)



