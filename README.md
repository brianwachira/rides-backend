# rides-backend

#### By [Brian Wachira](https://www.github.com/brianwachira)

## Description
This is a technical assesment to build  a simple API that uses an admin user, which can be hard coded, there is
no need to manage users roles, that can create and suspend drivers and monitor ongoing rides.
Also to simulate passengers calling drivers, create some endpoints to register passengers and
rides simulation (no geolocation calculation is necessary to link the passenger with the best
driver, this can be pass in the API).
## Link to live client site consuming the api
[Here you go ](https://rides-dashboard.herokuapp.com/)

## Prerequites
    - NodeJS required

## Set-up and Installation
- Clone the Repository
- Go to https://www.mongodb.com/cloud/atlas
- Create  new cluster
<br/><a href="https://www.mongodb.com/cloud/atlas" target="_blank"><img src="https://github.com/brianwachira/rides-backend/blob/main/assets/cluster1.png" alt="cluster 1"></a>
<br/>

- Choose AWS provider and any free-tier data center
<br/>
<br/><a href="https://www.mongodb.com/cloud/atlas" target="_blank"><img src="https://github.com/brianwachira/rides-backend/blob/main/assets/cluster2.png" alt="cluster 1"></a>
<br/>  

- use the database access tab for creating user credentials for the database. 
Please note that these are not the same credentials you use for logging into MongoDB Atlas. 
These will be used for your application to connect to the database.
<br/>
<br/><a href="https://www.mongodb.com/cloud/atlas" target="_blank"><img src="https://github.com/brianwachira/rides-backend/blob/main/assets/cluster3.png" alt="cluster 1"></a>
<br/>

- grant the user with permissions to read and write to the databases.
<br/>
<br/><a href="https://www.mongodb.com/cloud/atlas" target="_blank"><img src="https://github.com/brianwachira/rides-backend/blob/main/assets/cluster5.png" alt="cluster 1"></a>    
<br/>

- Define the IP addresses that are allowed access to the database.
<br/><a href="https://www.mongodb.com/cloud/atlas" target="_blank"><img src="https://github.com/brianwachira/rides-backend/blob/main/assets/cluster6.png" alt="cluster 1"></a> 
<br/>

- For the sake of simplicity we will allow access from all IP addresses: 
<br/>
<br/><a href="https://www.mongodb.com/cloud/atlas" target="_blank"><img src="https://github.com/brianwachira/rides-backend/blob/main/assets/cluster7.png" alt="cluster 1"></a> 
<br/>

- Finally we are ready to connect to our database. Start by clicking connect:
<br/>
<br/><a href="https://www.mongodb.com/cloud/atlas" target="_blank"><img src="https://github.com/brianwachira/rides-backend/blob/main/assets/cluster8.png" alt="cluster 1"></a> 
<br/>

- Choose ```  Connect your application:``` 
<br/>
<br/><a href="https://www.mongodb.com/cloud/atlas" target="_blank"><img src="https://github.com/brianwachira/rides-backend/blob/main/assets/cluster9.png" alt="cluster 1"></a> 
<br/>The view displays the MongoDB URI, which is the address of the database that we will supply to the MongoDB client library we will add to our application.
<br/><a href="https://www.mongodb.com/cloud/atlas" target="_blank"><img src="https://github.com/brianwachira/rides-backend/blob/main/assets/cluster10.png" alt="cluster 1"></a> 
<br/>The address looks like this:
```mongodb+srv://<USERNAME>:<PASSWORD>@cluster0-ostce.mongodb.net/<DB-NAME><DB_NAME>?retryWrites=true```

- Copy the Address
- Create a .env file in the root of your project
- Use the following syntax to save mongoDB URI as shown in env.example
    ``` 
    MONGODB_URI=MONGODB_URL
    PORT=3002
    SECRET=SECRET_NUMBER

    ```
- Replace ``` MONGODB_URL ``` with the address you got from mongoDB cloud atlas
- Replace ``` SECRET_NUMBER ``` with an integer eg *10* . This will be used when generating a JWT token
- Run ``` npm install``` . This will install all the dependencies needed for the project

- Run ``` npm run dev```
- If you used vscode as your text editor, you can test the endpoints by using [REST client extension](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)
- <br/> Install the extension in your text editor by going to Extensions tab on your vscode, then search ** REST CLIENT ** ** by Huachao Mao **
- <br/> On the project, navigate to requests folder. Open any of the files, eg ** create_driver.rest ** and a button will pop up with the label **send request**
![SEND REQUEST](https://github.com/brianwachira/rides-backend/blob/main/assets/rest1.png)

<br/>The response is as shown in the image below

![SEND REQUEST](https://github.com/brianwachira/rides-backend/blob/main/assets/rest2.png)

## Example Endpoints

### login
```
POST /login

```
#### Example
```
POST http://localhost:3002/api/login 
Content-Type: application/json

{
    "email": "admin@admin.com", "password": "admin123"

}
```
#### response
```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTYyMjQyMTI3Nn0.cBD_O7BfMjTrb7E1gwnqgQPlL3XNIMTv6Dh7nY-aHZw",
  "email": "admin@admin.com"
}

```

### create driver
```
POST /driver

```
#### Example
```
POST http://localhost:3002/api/driver 
Content-Type: application/json
Authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTYyMTQ5MTgxNH0.ZWP0EgrFdivnvqSflrwNU14MX8E-81S3eRPDcqpf7Is

{
    "name": "makinen", 
    "phoneNumber": "+2567846892"

}
```
#### response
```
{
  "suspended": false,
  "rides": [],
  "name": "makinen",
  "phoneNumber": "+2567846892",
  "id": "60b42936e0dcd92c8989d401"
}

```

### suspend driver
```
POST /driver/<driver-id>/suspend

```
#### Example
```
POST http://localhost:3002/api/driver/60b42a18e0dcd92c8989d402/suspend
Authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTYyMTQ5NDM3N30.CUHYqrlkN8XRBebnGVZTL9MWPH_SQW3-HCIIkRtB9jY
```
#### response
```
HTTP/1.1 204 No Content
X-Powered-By: Express
Access-Control-Allow-Origin: *
Date: Mon, 31 May 2021 00:15:47 GMT
Connection: close
```

### unsuspend driver
```
DELETE /driver/<driver-id>/suspend
```
#### Example
```
POST http://localhost:3002/api/driver/60b42a18e0dcd92c8989d402/unsuspend
Authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTYyMTQ5NDM3N30.CUHYqrlkN8XRBebnGVZTL9MWPH_SQW3-HCIIkRtB9jY
```
#### response
```
HTTP/1.1 204 No Content
X-Powered-By: Express
Access-Control-Allow-Origin: *
Date: Mon, 31 May 2021 00:15:47 GMT
Connection: close
```

### create passenger
```
POST /passanger
```
#### Example
```
POST http://localhost:3002/api/passenger 
Content-Type: application/json
Authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTYyMTQ5MTgxNH0.ZWP0EgrFdivnvqSflrwNU14MX8E-81S3eRPDcqpf7Is

{
    "name": "makinen", 
    "phoneNumber": "+256784689"

}
```
#### response
```
{
  "rides": [],
  "name": "makinen",
  "phoneNumber": "+2567846892",
  "id": "60b42936e0dcd92c8989d401"
}

```


### create ride
```
POST /ride/<passanger-id>/<driver-id>
```
#### Example
```
POST http://localhost:3002/api/ride/60b42c3fe0dcd92c8989d404/60b42c5de0dcd92c8989d406
Content-Type: application/json
Authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTYyMTQ5MTgxNH0.ZWP0EgrFdivnvqSflrwNU14MX8E-81S3eRPDcqpf7Is

{ 
    "pickupPoint": [123.7,199.98],
    "destinationPoint": [132.7,79.98]
}

```
#### response
```

  "pickupPoint": [
    123.7,
    199.98
  ],
  "destinationPoint": [
  ],
  "status": "ongoing",
  "passenger": "60b42c3fe0dcd92c8989d404",
  "driver": "60b42c5de0dcd92c8989d406",
  "id": "60b42c72e0dcd92c8989d407"
}

```


### stop ride
```
POST /ride/<ride-id>/stop
```
#### Example
```
POST http://localhost:3002/api/ride/60b42c72e0dcd92c8989d407/stop
Authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTYyMTQ5NDM3N30.CUHYqrlkN8XRBebnGVZTL9MWPH_SQW3-HCIIkRtB9jY

```
#### response
```

{
  "pickupPoint": [
    123.7,
    199.98
  ],
  "destinationPoint": [
    132.7,
    79.98
  ],
  "status": "done",
  "passenger": {
    "name": "makinen",
    "phoneNumber": "+2567846896",
    "id": "60b42c3fe0dcd92c8989d404"
  },
  "driver": {
    "name": "Lupotent",
    "phoneNumber": "+25367846895",
    "id": "60b42c5de0dcd92c8989d406"
  },
  "id": "60b42c72e0dcd92c8989d407"
}

```




### ongoing rides
```
GET /rides/ongoing
```
#### Example
```
GET http://localhost:3002/api/rides/ongoing/ 
Authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTYyMTQ5NDM3N30.CUHYqrlkN8XRBebnGVZTL9MWPH_SQW3-HCIIkRtB9jY
```
#### response
```

{
  "pickupPoint": [
    123.7,
    199.98
  ],
  "destinationPoint": [
    132.7,
    79.98
  ],
  "status": "ongoing",
  "passenger": {
    "name": "makinen",
    "phoneNumber": "+2567846896",
    "id": "60b42c3fe0dcd92c8989d404"
  },
  "driver": {
    "name": "Lupotent",
    "phoneNumber": "+25367846895",
    "id": "60b42c5de0dcd92c8989d406"
  },
  "id": "60b42c72e0dcd92c8989d407"
}

```

## Technologies used
 - <b>Express</b> : NodeJS-based framework for buidling API'S [https://expressjs.com/ ](https://expressjs.com/)
 - <b>MongoDB</b> : It is a document object database [https://www.mongodb.com/ ](https://www.mongodb.com/)
 - <b>Mongoose</b> : Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node. js that makes it easy to do mongoDB operations [https://mongoosejs.com/](https://mongoosejs.com/) 
 - <b>Jsonwebtoken</b>: A library that allows one to create Json Web Tokens. [https://www.npmjs.com/package/jsonwebtoken ](https://www.npmjs.com/package/jsonwebtoken )
 - <b>Dotenv</b>: A package that loads environment variables from a .env file into process.env. [https://www.npmjs.com/package/dotenv](https://www.npmjs.com/package/dotenv)
 - <b>Cors</b> : package for providing a Connect/Express middleware that can be used to enable CORS with various options.[ https://www.npmjs.com/package/cors]( https://www.npmjs.com/package/cors)

## Known bugs
 - The database transactions (especially create) need to be optimized 

## Support and contact details
Contact me on brianwachira7@gmail.com for any comments, reviews or advice.

### License

This project is licensed under the terms of the **MIT** license.

>You can check out the full license [here](https://github.com/brianwachira/rides-backend/blob/master/LICENSE.md)  

Copyright (c) **Brian Wachira**
