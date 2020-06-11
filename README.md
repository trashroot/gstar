[![Generic badge](https://img.shields.io/badge/Version-1.0.0-<COLOR>.svg)](https://shields.io/)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/Naereen/StrapDown.js/graphs/commit-activity)
## Features
Built in Authentication using JWT. Support for 3 database Sqlite, MySql and Postgresql

## Prerequisite
* Node version - 12
   
## Install
1. Clone repo
2. Run npm install inside the cloned repo
3. npm start (to run the server)
4. npm stop  (to stop server )

## API
This exposes following endpoints
1. POST - public-ip:2017/api/user/login
2. GET  - public-ip:2017/api/user/logout/?1
3. POST - public-ip:2017/api/user/register
4. GET  - public-ip:2017/api/user/list
5. POST - public-ip:2017/api/user/update-location/?1
6. GET  - public-ip:2017/api/user/location/?1
7. GET  - public-ip:2017/api/user/history/?1

Note: Need to set the following headers. Except login and register all endpoint required Authorization header 
1. content-type: application/json
2. Authorization: Bearer xxxxxxxxxxxxxxxxx

## Example
