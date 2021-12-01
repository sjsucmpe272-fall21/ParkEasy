# parkingSpot API end point details--
<hr style="border:2px solid gray"> </hr>

1- post a parkingspot   <br/>
http://127.0.0.1:8070/park-easy/api/parkingSpot/add     <br/>
REQUEST->       <br/>
{   
"name" : "Test User2",  
"userId" : "619ee94b1d7566681b629a37" , 
"description" : "description test",  
"addressLine1"  :   "1325 Brook Pl",    
"addressLine2"  :   "line 2 test",  
"city"  :   "Mountain View",    
"state" :   "California",   
"country"   :   "United States",    
"zipCode"   :   "94040" ,  
"latitude" : 123.56,    
"longitude" : -234.678, 
"rate" : 4, 
"email" : "test1@xyz.com",  
"contactNumber" : 12345,    
"availableFrom" : "2021-11-25T07:06",   
"availableTo" : "2021-11-25T19:06", 
"startTime" : "01:00:00",   
"endTime"   : "23:22:56",   
"spotImageUrl"  : "test.image.com"  
}<br/>
for image upload test by providing key for file as spotImage
<br/>

2- get a parkingSpot based on parkingSpot id    <br/>
http://127.0.0.1:8070/park-easy/api/parkingSpot/61a1e1351b78dd59556db7f5    <br/>

response-   <br/>
{   
    "address": {    
        "addressLine1": "1325 Brook Pl",    
        "addressLine2": "line 2 test",  
        "city": "Mountain View",    
        "state": "California",  
        "zipCode": "94040", 
        "country": "United States"  
    },  
    "_id": "61a1e1351b78dd59556db7f5",  
    "name": "Test User2",   
    "userId": "619ee94b1d7566681b629a37",   
    "description": "description test",  
    "latitude": 123.56, 
    "longitude": -234.678,  
    "rate": 4,  
    "email": "test1@xyz.com",   
    "contactNumber": 12345, 
    "availableFrom": "2021-11-25T07:06",    
    "availableTo": "2021-11-25T19:06",  
    "startTime": "01:00:00",    
    "endTime": "23:22:56",  
    "spotImageUrl": "test.image.com",   
    "createdDate": "2021-11-27T07:41:41.721Z",  
    "__v": 0    
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

4- update a parkingSpot {send all the details similar to the post call in form-data, also send _id (this is the parking lot id )}    <br/>
http://127.0.0.1:8070/park-easy/api/parkingSpot/updateSpot    

REQUEST similarly use type as form-data->   
{   
_id : 61a71f96961651cc474ba931,
"name" : "Test User2",  
"userId" : "619ee94b1d7566681b629a37" , 
"description" : "description test",  
"addressLine1"  :   "1325 Brook Pl",    
"addressLine2"  :   "line 2 test",  
"city"  :   "Mountain View",    
"state" :   "California",   
"country"   :   "United States",    
"zipCode"   :   "94040" ,  
"latitude" : 123.56,    
"longitude" : -234.678, 
"rate" : 4, 
"email" : "test1@xyz.com",  
"contactNumber" : 12345,    
"availableFrom" : "2021-11-25T07:06",   
"availableTo" : "2021-11-25T19:06", 
"startTime" : "01:00:00",   
"endTime"   : "23:22:56",   
"spotImageUrl"  : "test.image.com" 
spotImage : file 
}   
RESPONSE->  
{
    "_id": "61a71f96961651cc474ba931",
    "name": "Updated Name",
    "userId": "619ee94b1d7566681b629a37",
    "description": "User Updated",
    "latitude": 10,
    "longitude": 200,
    "rate": 5,
    "email": "new@xyz.com",
    "availableFrom": "2021-11-25T07:06",
    "availableTo": "2021-11-26T07:06",
    "startTime": "15:00:00",
    "endTime": "18:00:00",
    "spotImageUrl": "https://uber-eats-store-0144.s3.us-east-2.amazonaws.com/parkeasy/user/spot/images/BP-1638342549651.png",
    "createdDate": "2021-12-01T07:09:10.315Z",
    "__v": 0,
    "contactNumber": 23112
}

<br/><br/>

5- get all parkingspots for a given user        <br/>
http://127.0.0.1:8070/park-easy/api/parkingSpot/spots       
POST->      
{   
"userId" : "619ee94b1d7566681b629a37"       
}   

