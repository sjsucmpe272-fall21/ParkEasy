# Team-Project-30

<hr style="border:2px solid gray"> </hr>

Topic 2: California Wild Fire Detection and Prevetion

Introduction:


Almost every year California experiences wildfire outbreaks which brings about serious concerns for the people living in California. From the available statistics, there are about 7.5k wildfire outbreaks happening in California every year. The wildfire also comes with huge damage to the property and the environment. The California locals have to displace themselves from their homes either due to property damage, bad air quality, extreme heat, or other indirect consequences. As per the available statistics in 2018 alone, 22k structures were destroyed in California because of the wildfires. In the same year, the administration spent nearly 635 million dollars to suppress the wildfires. We need to look at the ways how we could use technology to reduce the impact of wildfires.

Abstract: 


We intend to analyze the datasets available to identify high-risk-prone areas for wildfires in California and answer some of the questions like what time of the year wildfires occur, how frequent and devastating they are. We would like to offer a portal, for California locals and the administration, through which they can report wildfires and ask for help. The system we build will also be capable of notifying the California locals whenever there is a chance of a wildfire outbreak as predicted by our ML model or when someone reports it on the portal.

Approach:

We will analyze the dataset to predict which areas are more prone to wildfires and show their spatial distribution and other insights.  <br/>
Based on the past data notify the concerned authority about the likelihood of wildfire in a particular month.  <br/>
We will develop a web application(MERN stack) which will notify the user of the likelihood of a wildfire in that area, it will also have a feature through which user can notify the authority of a wildfire. <br/>


Persona:

California Locals - They will get notified in case of a wildfire in their neighbourhood, they will also have a feature to notify the authority of a possible wildfire event. <br/>
Admininstration/Authority - Administration will notify the locals and also receive alerts from them, they will also receive alerts from the ML model so that they can be better prepared. <br/>

Dataset links:
https://www.kaggle.com/ananthu017/california-wildfire-incidents-20132020 


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
