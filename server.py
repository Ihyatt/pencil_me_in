"""Pencil me in"""

import os
from datetime import datetime
from jinja2 import StrictUndefined 

from flask import Flask, render_template, redirect, request, flash, session, jsonify, abort

from flask_debugtoolbar import DebugToolbarExtension

from model import User, UserImage, Event, EventImage, EventRequest, connect_to_db, db
from werkzeug import secure_filename




UPLOAD_FOLDER = '/Users/Inashyatt1/desktop/pencilmein/static/images'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

app = Flask(__name__)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['TEMPLATES_AUTO_RELOAD'] = True


app.secret_key = os.getenv("SECRET_KEY", "19kittiesareawesome89")


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


@app.route("/edit_image", methods=['POST'])
def update_image():
	"""Updates image"""

	user = User.query.get(session["user_id"])
	email = request.form.get("email")
	print "poop"
	print email 
	print user
	u_image = user.user_image
	print u_image

	file_ = request.files.get("image")
	print file_

	if file_:
		filename = secure_filename(file_.filename)
		file_.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

		# db.session.add(u_image)
		u_image.image = filename
		
		db.session.commit()

	return "image added"
    









if __name__ == "__main__":
  
	app.debug = True

	connect_to_db(app)

	if app.debug:
		DebugToolbarExtension(app)

	app.run(debug=True)
	print 'I am here'

