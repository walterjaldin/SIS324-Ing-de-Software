import requests
from user import User

class UserService:
    def __init__(self):
        self.user_list = []

    def load_users(self):
        url = 'https://jsonplaceholder.typicode.com/users'
        response = requests.get(url)
        if response.status_code == 200:
            users = response.json()
            self.user_list = [User(u['id'], u['name'], u['username'], u['email'], u['phone'], u['website']) for u in users]

    def get_users(self):
        return [user.to_dict() for user in self.user_list]

    def login(self, username, password):
        for user in self.user_list:
            if user.username == username and user.email == password:
                return user.to_dict()
        return None
