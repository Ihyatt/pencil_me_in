"""Database for Pencil Me In"""

from flask_sqlalchemy import SQLAlchemy
import bcrypt
import os

db = SQLAlchemy()


#Model definitions 
##############################################################################

class User(db.Model):
	"""User info"""

	__tablename__ = 'users'

	user_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
	email = db.Column(db.String(64), nullable=True)
	password = db.Column(db.String(64), nullable=True)
	first_name = db.Column(db.String(20), nullable=True)
	last_name = db.Column(db.String(20), nullable=True)
	salt = db.Column(db.String(50), nullable=True)

	user_image = db.relationship('UserImage', uselist=False, backref=db.backref("users"))


	def __init__(self, email, password, first_name, last_name):
		"""initializer"""

		self.salt = bcrypt.gensalt()
		self.email = email
		self.first_name = first_name
		self.last_name = last_name
		self.password = bcrypt.hashpw(password.encode('utf-8'), self.salt)

	def verify_password(self, password):
		"""verifies user's password"""

		# return self.bcrypt.check_password_hash(secret)
		return self.password == bcrypt.hashpw(password.encode('utf-8'), self.salt.encode('utf-8'))

##############################################################################

class UserImage(db.Model):
	"""points to direction of users image"""
	__tablename__ = "user_images"

	image_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
	user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))
	image = db.Column(db.String(1500), nullable=True)

	user = db.relationship('User', backref=db.backref("user_images"))



##############################################################################

class Event(db.Model):
	"""User's events"""

	__tablename__ = "events"

	event_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
	user_id = user_id =  db.Column(db.Integer, db.ForeignKey('users.user_id'))
	event_title = db.Column(db.String(100), nullable=True)
	date = db.Column(db.DateTime)
	study_location = db.Column(db.String(100), nullable=True)
	latitude = db.Column(db.Float, nullable=True)
	longitude = db.Column(db.Float, nullable=True)
	address = db.Column(db.String(100), nullable=True)
	neighborhood = db.Column(db.String(100), nullable=True)

	event_image = db.relationship('EventImage', uselist = False, backref=db.backref("events"))
	user = db.relationship('User', backref=db.backref("events"))

	def request_count(self):
		count = 0 
		for request in self.event_requests:
			count += 1
		return count


##############################################################################

class EventImage(db.Model):
	"""points to direction of users image"""
	__tablename__ = "event_images"

	image_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
	event_id = db.Column(db.Integer, db.ForeignKey('events.event_id'))
	image = db.Column(db.String(1500), nullable=True)

	event = db.relationship('Event', backref=db.backref("event_images"))


##############################################################################

class EventRequest(db.Model):
	"""User's events request"""

	__tablename__ = "event_requests"

	event_request_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
	user_id =  db.Column(db.Integer, db.ForeignKey('users.user_id'))
	event_id = db.Column(db.Integer, db.ForeignKey('events.event_id'))
	accepted = db.Column(db.Boolean, nullable = True)

	user = db.relationship('User', backref=db.backref("event_requests"))
	event = db.relationship('Event', backref=db.backref("event_requests"))


##############################################################################
 #Helper functions

def connect_to_db(app, db_uri=None):
	"""Connect the database to our Flask app."""

	# Configure to use our PstgreSQL database
	app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///pencilmein'
	db.app = app
	db.init_app(app)

if __name__ == "__main__":
	# As a convenience, if we run this module interactively, it will leave
	# you in a state of being able to work with the database directly.

	from server import app
	connect_to_db(app)
	print "Connected to DB."
	



	















