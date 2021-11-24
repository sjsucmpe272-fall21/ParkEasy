# parkingSpot API end point details--
<hr style="border:2px solid gray"> </hr>

1- post a parkingspot   <br/>
http://127.0.0.1:8070/park-easy/api/parkingSpot/add     <br/>
REQUEST->       <br/>
{
"description" : "asdshdsa", <br/>
"address" : "Test address 1",<br/>
"latitude" : 123.56,<br/>
"longitude" : -234.678,<br/>
"rate" : 4,<br/>
"email" : "test1@xyz.com",<br/>
"contactNumber" : 12345,<br/>
"availableFrom" : "2021-11-25T14:45:44.225z",<br/>
"availableTo" : "2021-11-26T18:45:44.225z"<br/>
}<br/>

<br/>

2- get a parkingSpot based on parkingSpot id    <br/>
http://127.0.0.1:8070/park-easy/api/parkingSpot/619df8a82464bb0c4fd38b18    <br/>

response-   <br/>
{
"_id": "619df8a82464bb0c4fd38b18",  <br/>
"description": "asdshdsa",<br/>
"address": "Test address 1",<br/>
"latitude": 123.56,<br/>
"longitude": -234.678,<br/>
"rate": 4,<br/>
"email": "test1@xyz.com",<br/>
"contactNumber": 12345,<br/>
"availableFrom": "2021-11-25T14:45:44.225Z",<br/>
"availableTo": "2021-11-26T18:45:44.225Z",<br/>
"createdDate": "2021-11-24T08:32:40.268Z",<br/>
"__v": 0<br/>
}
<br/>
<br/>

3- delete a parkingSpot based on parkingSpot id     <br/>
http://127.0.0.1:8070/park-easy/api/parkingSpot/delete  
REQUEST->   
{   
"parkingSpotId" : "619df8a82464bb0c4fd38b18"    
}
<br/><br/>

4- update a parkingSpot based on parkingSpot id     <br/>
http://127.0.0.1:8070/park-easy/api/parkingSpot/619ddf981c1cbeaaa3eedcc3    

REQUEST->   
{   
"description" : "asdshdsa",     
"address" : "Test address 1, updated",   
"latitude" : 323.56,        
"availableFrom" : "2021-11-25T14:45:44.225z",   
"availableTo" : "2021-11-26T18:45:44.225z"  
}   
RESPONSE->  
{   
"_id": "619ddf981c1cbeaaa3eedcc3",  
"description": "asdshdsa",  
"address": "Test address 1, updated",   
"latitude": 323.56, 
"longitude": -234.678,  
"rate": 4,  
"email": "test1@xyz.com",   
"contactNumber": 12345, 
"createdDate": "2021-11-24T06:45:44.225Z",  
"__v": 0,   
"availableFrom": "2021-11-25T14:45:44.225Z",    
"availableTo": "2021-11-26T18:45:44.225Z"   
}

<br/><br/>

5- get all parkingspots for a given user        <br/>
Work In Progress

