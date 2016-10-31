Points of Interest Locator


Description: 
A web application that allows one to look up points of interest within the searched city. 


User Story:
Any guests can search any large city and view the images and details of each points of 
interest in that city. But, only signed in users can save down the images and details
onto their logged in account.


Technology that will be used in the web application:
Wireframes to layout the blueprint for the application
CSS to style the application
AJAX to extract data from the database
MongoDB to store and interact with API data
Model, View, and Controller to control the flow of data and interactions between the server databases and client view
Amadeus API to pull the data
Heroku to deploy the application


Wireframe:
![screen shot 2016-10-25 at 10 52 19 pm](https://git.generalassemb.ly/storage/user/58/files/aa261644-9b06-11e6-8ece-f196ce015475)


Installation
Go to website, log in as guest to view the points of interest in the searched city.
To save the points of interest, you must have create a username and password.



Approach Taken
I decided to create the MVC model first to organize how I would connect everything. Once 
everything was connected, I added to user authentication. Once that was set up, I finished
off with the styling. I made sure I hit the requirements before I attempted to patch 
up any user experience issues.


Unsolved problems
1) Points of interest for some of the cities either did not populate or was undefined,
this causes an error when conducting searches. I never got around to creating a if statement
to resolve the issue.
2) I had some issues getting the points of interest to stay on the page after I save 
items to the favorites container or delete items from the container.


