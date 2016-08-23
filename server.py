"""Pencil me in"""

import os
from datetime import datetime
from jinja2 import StrictUndefined
# from flask import send_from_directory
# using Katie L. info
import psycopg2
import urlparse
import yelp
import logging
import sys




from flask import Flask, render_template, redirect, request, flash, session, jsonify
from flask_debugtoolbar import DebugToolbarExtension
# using to hash passwords


from model import User, UserImage, Event, EventImage, EventRequest, connect_to_db, db
from werkzeug import secure_filename






UPLOAD_FOLDER = '/Users/Inashyatt1/desktop/pencilmein/static/images'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

app = Flask(__name__)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['TEMPLATES_AUTO_RELOAD'] = True


app.secret_key = "19kittiesareawesome89"



app.jinja_env.undefined = StrictUndefined

@app.route('/')
def localhost():

	return render_template("homepage.html")

@app.route('/register', methods=['GET'])
def register_form():
    """Shows user sign-up"""

    return render_template("register.html")

@app.route('/register', methods=['POST'])
def register_process():
	"""Process registration."""

	first_name = request.form.get("first_name")
	last_name = request.form.get("last_name")
	email = request.form.get("email")
	password = request.form.get("password")
	file_ = request.files.get("image-upload")

	if User.query.filter(User.email == email).all():
		flash('You are already a user!')
		return render_template("login.html")

	elif password == '':
		flash('Please type in a password')
		return render_template("register.html")

	elif email == '':
		flash('Please type in your email')
		return render_template("register.html")

	elif first_name == '':
		flash('Please type in your first name')
		return render_template("register.html")

	elif last_name == '':
		flash('Please type in your last name')
		return render_template("register.html")

	else:
		
		flash('You were successfully logged in')


		if file_:
			filename = secure_filename(file_.filename)
			file_.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

		user = User(email=email, password=password, first_name=first_name, last_name=last_name)
		db.session.add(user)
		db.session.commit()
	  
		session["user_id"] = user.user_id

		user_image = UserImage(user_id=session["user_id"], image=filename)
		db.session.add(user_image)

		db.session.commit()

		flash("Hello %s!" % user.first_name)

		return redirect("/users/%s" % user.user_id)


@app.route('/login', methods=['GET'])
def login_form():
	"""Show login form"""

	return render_template("login.html")


@app.route('/login', methods=['POST'])
def login_process():
	"""Process Login"""
	email = request.form.get("email")
	password = request.form.get("password")

	user = User.query.filter_by(email=email).first()

	if not user:
		flash("Your email is not recorded")
		return redirect("/login")

	if user:
		if user.verify_password(password):
			session["user_id"] = user.user_id
			flash("Welcome Back! %s" % user.first_name)
			return redirect("/users/%s" % user.user_id)
		else:
			flash("Password incorrect")
			return redirect('/login')

@app.route('/logout')
def logout():
	"""user logout"""

	del session["user_id"]
	flash("Thank you, come again!")

	return redirect("/login")


@app.route("/users/<int:user_id>")
def user_page(user_id):
	"""Users profile page"""
   
	user = User.query.get(user_id)
 	image = user.user_image

 	
 	event_request = []

 	user_events = Event.query.filter(Event.user_id == user.user_id).all()
 	print user_events

 	upcoming_events = EventRequest.query.filter(EventRequest.user_id == user.user_id).all()

 	for request in upcoming_events:
 		if request.accepted == True:
 			study_event = request.event
 		event_request.append(study_event)
 	

	return render_template("profile.html", user=user, image=image, user_events=user_events, upcoming_events=upcoming_events, event_request=event_request)


    

@app.route('/uploadajax', methods=['POST'])
def image_update():

	user = User.query.get(session["user_id"])
	u_image = user.user_image
	file_ = request.files["file"]
	print file_
	if file_:
		filename = secure_filename(file_.filename)
		file_.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

		u_image.image = filename
		
		db.session.commit()

	return "succes"


@app.route('/create_event', methods=['GET'])
def create_event():
    """Show event creation page"""
    event = Event(user_id=session["user_id"], event_title="", event_start_date="", event_end_date="", study_location="", latitude=0.1, longitude=0.1, address="", neighborhood="")
    db.session.add(event)
    db.session.commit()

    return redirect("/event/%s" % event.event_id)

@app.route("/event/<int:event_id>")
def event_page(event_id):
	"""Users event page"""
   	user = User.query.get(session["user_id"])

	event = Event.query.get(event_id)
	friends = User.query.filter(User.first_name != user.first_name).all()
	
	return render_template("event.html", event=event, friends=friends)

@app.route("/save_start_date", methods=['POST'])
def add_start_date():
	"""updates start date"""
	print " i am here"

	event_id = request.form.get('event_id')
	print event_id
	event = Event.query.get(event_id)
	print event

	event_start_date = str(request.form.get('date'))
	print event_start_date
	event.event_start_date = event_start_date

	db.session.commit()
	return "success"


@app.route("/save_end_date", methods=['POST'])
def add_end_date():
	"""updates end date"""
	print " i am here"

	event_id = request.form.get('event_id')
	print event_id
	event = Event.query.get(event_id)
	print event

	event_end_date = str(request.form.get('date'))
	event.event_end_date = event_end_date

	db.session.commit()
	return "success"




@app.route('/search-location.json', methods=['POST'])
def search_restaurant():
    """Allows user to search restaurant based on location and food term"""

    location = request.form.get('location')
    term = request.form.get('term')
  
   
    results = yelp.get_results(location=location, term=term)
   

    return jsonify(results=results)


@app.route('/add-restaurant', methods=['POST'])
def add_restaurant():
    """Allows user to add restaurant to a list"""

    event_id = request.form.get('event_id')
    print event_id
    if event_id[-1] == "#":
    	event_id = event_id[0:-1]
 
    event = Event.query.get(event_id)
    print event
  
  
    event.study_location = request.form.get('restaurant_name')
    event.latitude = request.form.get('latitude')
    event.longitude = request.form.get('longitude')
    event.address = request.form.get('address')
    event.neighborhoods = request.form.get('neighborhoods')
    

    db.session.commit()

    return "success"


@app.route("/send-request", methods=['POST'])
def send_request():
	"""send request"""

	event_id = request.form.get('event_id')
	friend_id = request.form.get('request')

	event_request = EventRequest(user_id=friend_id, event_id=event_id, accepted=True)

	db.session.add(event_request)
	db.session.commit()
	return "friend added"

@app.route("/save-event/<int:event_id>", methods=["POST"])
def save_event_image(event_id):
	"""saves event event"""
	user = User.query.get(session["user_id"])
	
	file_ = request.files["image-upload"]
	print event_id
	event = Event.query.get(event_id)
	event_title = request.form.get("event_title")
	print event
	if file_:
			filename = secure_filename(file_.filename)
			file_.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))


			event_image = EventImage(event_id=event_id, image=filename)
			db.session.add(event_image)
			print event_title
			event.event_title = event_title

			db.session.commit()


	return redirect("/users/%s" % user.user_id)

@app.route("/delete_event", methods=["POST"])
def delete_event():
	"""delete event on profile page"""

	event_id = request.form.get("event_id")
	deleted_event = Event.query.filter(Event.event_id == event_id).first()
	db.session.delete(deleted_event)
	db.session.commit()

	return "event deleted"

@app.route("/decline_event", methods=["POST"])
def decline_event():
	"""decline event request"""
	user = User.query.get(session["user_id"])
	print user
	print "ppop"
	event_id = request.form.get("event_id")
	request_event = EventRequest.query.filter(EventRequest.event_id == event_id, EventRequest.user_id == user.user_id).first()
	
	db.session.delete(request_event)
	db.session.commit()

	return "request deleted"




	




if __name__ == "__main__":

	app.debug = True
	connect_to_db(app)
	# Use the DebugToolbar
	DebugToolbarExtension(app)
	app.run()


	

