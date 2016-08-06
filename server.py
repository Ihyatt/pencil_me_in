"""Pencil me in"""

import os
from datetime import datetime
# from jinja2 import StrictUndefined
# from flask import send_from_directory
# using Katie L. info
import psycopg2
import urlparse
import yelp
import logging
import sys




from flask import Flask, render_template, redirect, request, flash, session, jsonify, abort
# from flask_debugtoolbar import DebugToolbarExtension
# using to hash passwords


# gets access to yelp.py file
import yelp
# import uber
import logging
import sys

from model import User, UserImage, Event, EventImage, EventRequest, connect_to_db, db
from werkzeug import secure_filename






UPLOAD_FOLDER = '/Users/Inashyatt1/desktop/pencilmein/static/images'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

app = Flask(__name__)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['TEMPLATES_AUTO_RELOAD'] = True


app.secret_key = "19kittiesareawesome89"
app.logger.addHandler(logging.StreamHandler(sys.stdout))
app.logger.setLevel(logging.DEBUG)

urlparse.uses_netloc.append("postgres")
url = urlparse.urlparse(os.environ["DATABASE_URL"])

conn = psycopg2.connect(
    database=url.path[1:],
    user=url.username,
    password=url.password,
    host=url.hostname,
    port=url.port
)


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
 	
	   
	return render_template("profile.html", user=user, image=image)


# @app.route("/uploadajax", methods=['POST'])
# def update_image():
# 	"""Updates image"""

# 	image_info = request.form.get("imageInfo")
# 	# user_email = image_info["email"]

# 	user = User.query.get(session["user_id"])
# 	user_email = request.form.get("email")


# 	print image_info
# 	print "poop"
# 	print user_email 
# 	print user
# 	u_image = user.user_image
# 	print u_image

# 	# file_ = request.files.args.get("image")
# 	# print file_

# 	# if file_:
# 	# 	filename = secure_filename(file_.filename)
# 	# 	file_.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

# 	# 	# db.session.add(u_image)
# 	# 	u_image.image = filename
		
# 	# 	db.session.commit()

# 	return "image added"
    

@app.route('/upload-image', methods=['POST'])
def image_update():

	user = User.query.get(session["user_id"])
	u_image = user.user_image
	file_ = request.files["image-upload"]
	print file_
	if file_:
		filename = secure_filename(file_.filename)
		file_.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

		# db.session.add(u_image)
		u_image.image = filename
		
		db.session.commit()

	return redirect("/users/%s" % user.user_id)


@app.route('/create_event', methods=['GET'])
def create_event():
    """Show event creation page"""

    return render_template("event.html")







if __name__ == "__main__":
	app.debug = False
	app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
	connect_to_db(app, os.environ.get("DATABASE_URL"))
	# Use the DebugToolbar
	# DebugToolbarExtension(app)
	DEBUG = "NO_DEBUG" not in os.environ
	PORT = int(os.environ.get("PORT", 5000))
	app.run(host="0.0.0.0", port=PORT, debug=DEBUG)

