# About
A simple fullstack javascript web application boilerplate inspired by [Bones](https://github.com/FullstackAcademy/bones).

# File Structure
```
.
+-- client
|   +-- components          <-- React components
|       +-- Root.js              <-- Sample react component
|   +-- public              <-- Static files
|       +-- bundle.js            <-- Webpack bundle
|       +-- bundle.js.map
|       +-- index.html
|   +-- reducers            <-- Reducer for redux
        +-- dummy.jsx            <-- Dummy reducer
        +-- index.jsx            <-- Combines reducers
|   +-- index.js            <-- Associates top level routes to 'main' div
|   +-- store.js            <-- React Redux Store
+-- db
|   +-- models              <-- Folder for database schemas
        +-- user.js             <-- Defines user schema
    +-- _db.js              <-- Initalizes databse
|   +-- index.js            <-- Defines associations between models
+-- server
|   +-- api            <-- Contains express routes
        +-- auth.js             <-- Sets up oauth and local login/logout routes
        +-- authConfig.js       <-- Config file for oauth. Contains default settings for google
        +-- index.js            <-- Connects routes together
        +-- user.js             <-- User api route
|   +-- index.js            <-- Initiates app settings, database connection, and server
+-- tests              <-- Contains test specs. Files must end with .test.js
|   +-- components          <-- Test specs for react components
    +-- db                  <-- Test specs for database
    +-- api                 <-- Test specs for routes
+-- index.js           <-- Checks for user environment variables and defines app metadata
```
