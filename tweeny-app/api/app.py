# from flask import Flask, render_template, request
# from flask_jwt import JWT, jwt_required, current_identity
# from werkzeug.security import safe_str_cmp

# class User(object):
#     def __init__(self, id, username, password):
#         self.id = id
#         self.username = username
#         self.password = password

#     def __str__(self):
#         return "User(id='%s')" % self.id

# users = [
#     User(1, 'prathamesh', 'prathamesh'),
#     User(2, 'mike', 'mike'),
# ]

# username_table = {u.username: u for u in users}
# userid_table = {u.id: u for u in users}

# def authenticate(username, password):
#     user = username_table.get(username, None)
#     if user and safe_str_cmp(user.password.encode('utf-8'), password.encode('utf-8')):
#         return user

# def identity(payload):
#     user_id = payload['identity']
#     return userid_table.get(user_id, None)

# #app = Flask(__name__)
# app = Flask(__name__, template_folder='static/dist')
# app.debug = True
# app.config['SECRET_KEY'] = 'super-secret'


# @app.route('/')
# def index():
#     return render_template("index.html")



# jwt = JWT(app, authenticate, identity)

# @app.route('/protected')
# @jwt_required()
# def protected():
#     return '%s' % current_identity

# if __name__ == '__main__':
#     app.run()

# encode = jwt.encode({"email":"gogawaleprathamesh@gmail.com","password":"prathamesh42"}, key, algorithm= "HS256")
# print(type(encode))
# print(jwt.decode(encode, key, algorithms="HS256"))





# user_data = [{
#         'email' : 'gogawaleprathamesh@gmail.com',
#         'password': 'prathamesh42'
#         },
#         {
#             'email' : 'prathamesh@gmail.com',
#             'password': 'prathamesh42'
#         },
#         {
#             'email' : 'nilesh@gmail.com',
#             'password': 'prathamesh42'
#         },
#         {
#             'email' : 'siddhesh@gmail.com',
#             'password': 'prathamesh42'
#         },
#         {
#             'email' : 'tweeny@gmail.com',
#             'password': 'prathamesh42'
#         },

# ]

from flask import Flask,request,Response,jsonify
from flask_cors import cross_origin, CORS
import datetime
import pymongo
app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
import jwt

key = 'Secret'
URI = "mongodb://127.0.0.1:27017"
Client = pymongo.MongoClient(URI)
Db = Client["User"]
user_data = Db["user_data"]


@app.route('/api/users/signin', methods=["POST"])
@cross_origin()
def login():
    if request.method == 'POST':
        data = request.get_json()
        # print(data)
        # print(user_data.find_one({'email': data['email'], 'password':data['password']}))
        if user_data.find_one({'email': data['email'], 'password':data['password']}) != None:
            encode = jwt.encode(data, key, algorithm="HS256")
           
            return {"msg":"Success",'access_token':encode}

        
               

    return {"msg":"Invalid Credential"} 
        
        
    # print(user_data)
    # return "got it"

def parse(request):
    access_token = request.headers.get('acess_token')
    return access_token
    ''' 
    1. Parse authoriazation header
    2. decode token 
    3. return payload.
    '''



@app.route("/api/users/my-profile", methods=["GET"])
@cross_origin()
def my_profile():
    if request.method =="GET":
        access_token = request.headers.get('Authorization')
        # print((access_token))
        # print(access_token.strip("Bearer"))
        # decode = jwt.decode(access_token, key, algorithms="HS256")
        try:
            decode = jwt.decode(access_token, key, algorithms="HS256")
            # print("I am decode")
            email = decode['email']
            if user_data.find_one(decode):
                return {'msg':"Welcome {}".format(email)}
        except Exception as e:
            return {"msg":str(e)}

       
       
    # return {'msg': 'welcome {}'.format(access_token)}   
    

        # return {"access_token":access_token}
    # return {"msg": "Please have a valid request"}



'''# Backend APIs

POST /login

Request Body:
    : email
    : password

Response Body:
    : access_token


GET /my-profile

Request Headers:
    : Authorization: Bearer access_token

Response Body:
    : user_id
    : user_email
    : ... (profile-picture, is-active, roles ...)


# Frontend Routes

/login

    > login form

/profile

    > user details
'''

@app.route('/api/users/signup', methods = ["POST"])
@cross_origin()
def signup():
    if request.method == 'POST':
        data = request.get_json()
       
        if user_data.find_one({'email': data['email']}) == None:
            user_data.insert_one(data)
            return {'msg':'Success'}
        

    return {'msg': "User Already Exist Please login"}

        
   
    


if __name__ == '__main__':
    app.run(debug = True)
