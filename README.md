## Spaced Repetition: North American Medicinal Herbs

Spaced Repetition is a Node/Express and React application which showcases data structures and algorithms. The site uses authentication and JWTs through the passport and bcyrpt libraries. A user can create an account, practice learning plant Latin names, sign out, and return to their previous progress.

## Motivation
Spaced repetition is a method for efficient learning that has you practice concepts or skills over increasing periods of time. As a student of Western Herbalism and botany, I've had to memorize the common and scientific names of many, many plants. This app is a great solution to the problem and can easily be expanded or changed simply by updating the database. 

## Project Links
- [Live application](https://sr-solo-client.herokuapp.com/)
- [Server code repository](https://github.com/neillsom/spaced-repetition-server) 
- [Client code repository](https://github.com/neillsom/spaced-repetition-client)

## Screenshots
Landing page:
![Landing page](https://lh3.googleusercontent.com/oksv4qG4iq1XFAAw7NAuxEFIPQBOIw4ge7F8X9MjaSmm0M_Yi8X3PQM936VLYlewes2prbx24GuE9WwO8-fV=w1920-h980-rw "Landing page")

Sample question:
![Sample question](https://lh4.googleusercontent.com/FnLSoIcR9Xb2kVUN-NLkPi8o44LQM5jq_CE1ZfdkYLTEpLRGkWaMKvatYVC7IhYTwjSvcEZtzwdR8ZvLv2gq=w1920-h980 "Sample question")

Feedback:
![Feedback](https://lh5.googleusercontent.com/EiB7s4X0AkCnY7-0e-xim94uxQnzXUMwQD4ugZSpKsn_k6AoZgCqlq4VzAngFtMU2ExfX0haQfsJ_6E-O0_b=w1920-h980 "Feedback")

Study guide:
![Study guide](https://lh6.googleusercontent.com/TEWBVvK7kmARYxAzUMZpl--uN685R8ibFxPfXxDhqu8ABcK6tFluS8rHNXqQyYIFqIt1wWuSOGlwVUmjBmfj=w1920-h980-rw "Study guide")

## Tech/framework used
<b>Built with</b>
- Javascript 
- Node
- Express
- HTML
- CSS
- React
- MongoDB
- Mongoose
- Passport
- Bcrypt


## Installation
- Set up Server
  - Clone the server repository: `git clone https://github.com/neillsom/spaced-repetition-server.git YOUR_SERVER_PROJECT_NAME`
  - Move into the project directory: `cd YOUR_SERVER_PROJECT_NAME`
  - Install dependencies: `npm install`
  - Start the server: `npm start`
- Set up Client
  - Clone the client repository: `git clone https://github.com/neillsom/spaced-repetition-client.git YOUR_CLIENT_PROJECT_NAME`
  - Move into the project directory: `cd YOUR_CLIENT_PROJECT_NAME`
  - Install dependencies: `npm install`
  - Start the client: `npm start`
  - React should open a new browser window pointing to [localhost:3000](localhost:3000). If it does not, simply visit the address in the browser. 
- Set up local database
  - Start Mongo database: `mongod`
  - Seed database:
    - From `YOUR_SERVER_PROJECT_NAME` directory: `node db/seed/questions.json`

## License
MIT License
Copyright (c) 2018 Neill Somerville

#### http://neillsomerville.com