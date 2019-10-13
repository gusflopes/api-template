# API-Template

This project is intended to become a boilerplate for an API REST using MongoDB and JWT.
This will probably be refactored to implement React Hooks and change the components to Functional Components.



##Techs
Node.js + MongoDB + React

##Setup
- Need a mongodb server running (`docker run -d -p 27017:27017 -v ~/data:/data/db --name mongodb mongo`)
- To start the API just use the following command on backend folder: `yarn dev`
- To start the frontend, use the follwoing command on the frontend folder: `yarn start`

##Features working
- Authentication using JWT Token;
- Storing the hashed password;
- Refresh token and expiration (need to fix the time);

##Backlog
- Needs to implement the Process/AddProcess page;
- Need to refactor the Clients/AddClients page;
- (...)

##Other Informations
This project will be suspended until November while I'll be working on the Rocketseat's Bootcamp.