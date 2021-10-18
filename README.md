# Team-Project-30
<hr style="border:2px solid gray"> </hr>
Topic 1 : Predicting Parking Spot Availability<br/>
1. Introduction <br/>
Parking, especially in the Bay area is a problem that anyone who has a car almost inevitably faces. Finding a parking lot is a hassle but finding an available slot in a parking lot is just as challenging. This project aims to provide users with more information on available slots so as to prevent them spending their time on the menial job of hunting for places to park their car. 

2. Abstract <br/>
We intend to analyze available datasets to predict how many slots are generally available for a parking lot during a certain time of the day. BY analyzing public datasets from Lyft's Baywheel cycles, we hope to provide a better context for when slots will be available and help users in easing the headache of finding spots for parking. In order to collect real-world data, we plan to create an interface for parking lot maintainers and users to modify information related to the number of parking lots available, and when slots are typically filled and are empty. 

2. Approach <br/>
We currently intend to analyze the public dataset offered by Bay Wheels. Once the data is crunched, we expect to predict for a certain parking lot, how many slots are generally available. An interface offered to users will consist of a web application. 


4. Persona <br/>
We are expecting users who want to avail parking lots and parking lot maintainers who want to rent spaces in their parking lots to use the application. 

5. Dataset Links <br/>
https://www.kaggle.com/dcshah/bay-wheels-2019-data/activity
<hr style="border:2px solid gray"> </hr>

Topic 2: Predicting Instagram Influencers’ Popularity

1. Introduction </br>
Social media marketing can play a very important role in promoting a product or a service. A marketer may want to decide between a set of available influncers for their marketing campaigns. They can benefit more by collaboarating with an influencer with more reach and popularity. <br/>
An Instagram influencer is someone who’s built a reputation around a certain niche on Instagram. They are essentially a brand ambassador for your business.<br/>
According to HypeAuditor’s State of Influencer Marketing 2021 report, the Instagram influencer market is expected to grow 15% in 2021, reaching a market cap of $5.8 billion by the end of the year.<br/>

2. Abstract <br/>
We intend to analyze the past data of top Instagram influencers in India and predict whether their popularity will grow or decline in the future.<br/>

3. Approach <br/>
We will retrieve the Instagram influencers data from Starngage website.<br/>
We will preprocess that data and use machine learning alogirthms to predict their popularity. <br/>

4. Persona <br/>
This model can be used by a marketer to decide which Instagram influencer will be more popular in future based on the predicted popularity, they can then collaborate with those influencers to increase their outreach and get a better return on their social media marketing investment. <br/>

5. Dataset links <br/>
https://starngage.com/app/id/influencer/ranking/india  <br/>


<hr style="border:2px solid gray"> </hr>

Topic 3: Twitter named entity identifier

1. Introduction to the problem statement <br/>
Twitter is a popular social media site where around 500 million tweets are shared per day. Twitter offers an abundance of data that can be a huge source of personal data. With so much data floating around in the form of short tweets, it can be in any informal format without following any grammatical syntaxes or structure. This informal nature of tweets makes it difficult to analyze and get valuable information from them. There are few tools available to recognize named entities from the text however, they are not that efficient due to the informal nature of tweets.
A NAMED ENTITY is a real-world object, such as persons, locations, organizations, products, etc., that can be denoted with a proper name.
For eg. Donald Trump, New York, Apple Inc., etc.

2. Abstract (rough draft)<br/>
To solve the above problem, we plan to build a named entity recognizer that will use contextual information from the tweet to correctly identify the named entity. 

3. Approach <br/>
The Twitter named entity identifier will take the tweet as input, preprocess it, then use a standard segmentation algorithm to get the segments (probable named entities) from the tweet. These candidate named entities are then further processed to identify the real named entities. The last step is achieved with the help of contextual information present in the tweet and comparing that with the background information of each candidate named entity. The best-matched candidate named entity is selected as the real named entity.

4. Persona <br/>
Multinational companies, who want to analyse the tweets related to their product and get firsthand information about any defects or competitors.

5. Dataset links <br/>

The input data source is Twitter. <br/>

Background information on different named entities is available at https://www.dbpedia.org/
DBpedia database basically provides Wikipedia data in the form of key-value pairs for each document. 
It can be queried using SPARQL queries.
https://dbpedia.org/sparql
