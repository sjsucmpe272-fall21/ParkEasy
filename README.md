# Team-Project-30



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
