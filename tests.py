import unittest
from unittest import TestCase
from model import User, UserImage, Event, EventImage, EventRequest, connect_to_db, db
from server import app
import yelp

class PencilMeInTests(unittest.TestCase):
    """Tests for the routes"""
    def setUp(self):
        self.client = app.test_client()
        app.config['TESTING'] = True
        app.config['SECRET_KEY'] = 'key'
        # Connect to the database
        connect_to_db(app)

    def test_home_page(self):
        """Checking the root route"""
        result = self.client.get("/")
        self.assertEqual(result.status_code, 200)

    def test_login(self):
        """Check user login"""
        result = self.client.get('/login',
                            data={"email":"inas.raheema@gmail.com", "password":"123"},
                            follow_redirects=True)
        self.assertIn("Login", result.data)

    def test_login_to_profile(self):
        """Check user login to profile"""
        result = self.client.post('/login',
                            data={"email":"inas.raheema@gmail.com", "password":"123"},
                            follow_redirects=True)
        self.assertIn("Upload", result.data)

    def test_new_event(self):
    	"""Test new event creation"""
    	result = self.client.post("/create_event",
    						data={"user_id":"1", "event_title":"", "date":"datetime.today()", "end_date":"datetime.today()", "study_location":"","latitude":"0.1", "longitude":"0.1", "address":"", "neighborhood":""},
							follow_redirects=True)
    	self.assertIn("Event", result.data)


class TestAPI(unittest.TestCase):

    def setUp(self):
        self.client = app.test_client()
        app.config['TESTING'] = True
        app.config['SECRET_KEY'] = 'key'
        # Connect to the database
        connect_to_db(app)

    def test_yelp_search(self):
    	"""tests route using yelp API"""

        result = self.client.post('/search-location.json',
                                  {'location': 'San Francisco',
                                   'term': 'library'})

        self.assertEqual(result.status_code, 200)



if __name__ == "__main__":
	unittest.main()
