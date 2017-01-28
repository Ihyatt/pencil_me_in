#PencilMeIn
PencilMeIn is a social platform that allows for users to create and share study dates. Study dates are visible on the user's profile where each event has a clickable modal window that contains event details such as attendees, location and time. When creating events, users type in term and location which calls Yelp's API and returns ten matches. Once a match is clicked, the the match's location is shown on the google maps.


##Contents

* [Technologies Used](#technologiesused)
* [Features](#feautures)
* [User Profile Page](#profile)
* [Event Creation Page](#event)
* [How to locally run PencilMeIn](#run)

### <a name="technologiesused"></a>Technologies Used

* [SQLAlchemy](http://www.sqlalchemy.org/)
* [PostgreSQL](https://www.postgresql.org/)
* [Python](https://www.python.org/)
* [Flask](http://flask.pocoo.org/)
* [Jinja](http://jinja.pocoo.org/)
* [Javascript](https://www.javascript.com/)
* [JQuery](https://jquery.com/)
* [JSON](http://www.json.org/)
* [AJAX](http://api.jquery.com/jquery.ajax/)
* [HTML/CSS](http://www.w3schools.com/html/html_css.asp)
* [Bootstrap](http://getbootstrap.com/)
* [Sessions](http://www.allaboutcookies.org/cookies/session-cookies-used-for.html)
* [Google Maps API](https://developers.google.com/maps/)
* [Yelp API](https://www.yelp.com/developers/documentation/v2/overview)

###<a name="features"></a>Features

####Current

- [x] User login and registration
- [x] Flask image upload
- [x] User profile page
- [x] Create event page
- [x] Yelp API calls that return matches for term and location
- [x] Google Maps that render the location of an event or match
- [x] Send requests to other users who are in the database
 

####Future

- [ ] Create friends table within the database, so that a user has a set group of friends that they may request to study with them. 
- [ ] Allow for users to query their friends in order to find the specific friends that they would like to study with.



####<a name="profile"></a>User Profile Page
![pencilmein_profile](https://cloud.githubusercontent.com/assets/11432315/18238574/19920ea2-72f3-11e6-882a-7b361368f45a.gif)
The user's profile page comprises of the user's profile image, upcoming user created events, event requests from other users, past events, and upcoming events. Event details are visible via a modal window upon clicking on the event name. All study events are ordered by their datetime, where events closer to the current datetime are ordered first. Only for upcoming events can the event's location be shown via google maps. The user's profile image is editable through and image AJAX request. 


####<a name="event"></a>Event Page
![pencilmein_event](https://cloud.githubusercontent.com/assets/11432315/18238956/8cbe4f00-72f6-11e6-9a19-e60ba5e780a9.gif)

Through clicking "Create Event," user's are then directed to the new event page where they are able to upload an image, estabelish a start and end time, and name for the event. The location of the event is determined through the use of the Yelp API where ten clickable matches are displayed on the page. Once a match is clicked, the location is then displayed through using the Google Maps API. User's are also able to send requests to all users within the PencilMeIn's database, however requests can only be sent once per event.


###<a name="run"></a>How to locally run PencilMeIn

####Run PencilMeIn Flask App

#####Yelp API Setup
* Go to Yelp's API page and retrieve your secret keys. Once retrieved, create a file titled secrets.sh within Pencilmein' main directory. Within the secrets.sh file, setup your secret keys as follows:
   * `export yelp_consumer_key="PlaceKeyHere"`
   * `export yelp_consumer_secret="PlaceKeyHere"`
   * `export yelp_token="PlaceKeyHere"`
   * `export yelp_token_secret="PlaceKeyHere"`

#####General Setup
* Set up and activate a python virtualenv, and install all dependencies:
    * `pip install -r requirements.txt`
  * Make sure you have PostgreSQL running. Create a new database in psql named pencilmein:
* `psql`
  * `createdb pencilmein`
 * Source Secrets
 	*`source secrets.sh`
 * Create the tables in your database:
    * `python -i model.py`
 * Start up the flask server:
    * `python server.py`
 * Go to localhost:5000 to see the web app
