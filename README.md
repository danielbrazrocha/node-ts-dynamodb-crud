# DynamoDB CRUD Operations with Node.js and AWS SDK v3

<div align="center">

[![TypeScript](https://img.shields.io/badge/TypeScript-4.5.4-blue.svg)](https://www.typescriptlang.org/)
  [![Node.js](https://img.shields.io/badge/Node.js-14.17.5-green.svg)](https://nodejs.org/)
  [![AWS SDK v3](https://img.shields.io/badge/AWS%20SDK%20v3-3.20.0-orange.svg)](https://aws.amazon.com/sdk-for-javascript/)
  [![ESLint](https://img.shields.io/badge/ESLint-8.2.0-purple.svg)](https://eslint.org/)

</div>

> A simple demonstration of performing CRUD operations on DynamoDB using Node.js, TypeScript, and AWS SDK v3.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This project provides a practical example of performing CRUD (Create, Read, Update, Delete) operations on DynamoDB using Node.js, TypeScript, and the AWS SDK v3. It aims to showcase how to interact with DynamoDB for database operations and serve as a reference for integrating DynamoDB into your TypeScript applications.

## Features

- Create and Delete a DynamoDB table
- Insert items into the table
- Retrieve items from the table
- Update items in the table
- Delete items from the table

## Prerequisites

- Node.js (v14.17.5 or higher)
- npm (Node Package Manager)
- AWS CLI
- Docker

## Technologies

- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/)
- [AWS SDK v3 for JavaScript](https://aws.amazon.com/sdk-for-javascript/)
- [DynamoDB](https://aws.amazon.com/dynamodb/)

## Getting Started

To run this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/danielbrazrocha/node-ts-dynamodb-crud.git
   ```

2. Install the dependencies:
   ```bash
   cd node-ts-dynamodb-crud
   npm install
   ```
3. Configure AWS credencials locally
   ```bash
   aws configure
   ```
   Use this simple configuration:
- AWS Access Key ID: anyid
- AWS Secret Access Key: anykey
- Default region name: local

4. Start a DynamoDB Local instance using Docker:
   ```bash
   docker run -p 8000:8000 amazon/dynamodb-local
   ```
   Note: Consider creating a Dockerfile for streamlined setup in the future.

5. Install and run DynamoDB Admin to view database changes:
   ```bash 
   npm install -g dynamodb-admin
   ```

## Running the Project

1. Ensure the DynamoDB Local container is running.

2. Create the DynamoDB table:
   ```bash
   npm run create-table
   ```

3. Seed the table with initial data:
   ```bash
   npm run seed
   ```

4. Start the application:
   ```bash
   npm run start
   ```

## Testing the Application

Once the project is up and running, you can access the following endpoints:

- Home Page: [http://localhost:3221/](http://localhost:3221/)
- Mail List Page: [http://localhost:3221/mail/](http://localhost:3221/mail/)
- Individual Mail Page: [http://localhost:3221/mail/US123456789CE](http://localhost:3221/mail/US123456789CE)

## Additional npm Commands

For convenience, the following CRUD commands are available to test in the `package.json` file:

- Create: `npm run put-item`
- Read: `npm run get-item` or `npm run get-item-by-pk` or `get-all-items`
- Update:  `npm run update-item`
- Delete: `npm run delete-item`

Feel free to explore and modify these commands as needed.

## Acknowledgement

Special thanks to James Hamann for the article and the AWS SDK v2 code base, which served as a reference for creating the v3 implementation with TypeScript. You can find the article [here](https://medium.com/quick-code/node-js-restful-api-with-dynamodb-local-7e342a934a24) and the repository [here](https://github.com/jameshamann/node-dynamo-db-example)


