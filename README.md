Hello HBC,

Just wanted to add some quick documentation for the application.

**Run locally:**
1. navigate to root of directory and run npm install
2. run node app.js
3. server is up and running on port localhost:1234
4. Open Postman
5. Make this post request,which should return a token
_localhost:1234/api/login_
6. To call other endpoints, include this token in the headers with key: Authorization and value: Bearer [your token]

**Run on heroku:**
1. Open Postman
2. Make this post request,which should return a token
 _https://yusefresthomework.herokuapp.com/api/login_
4. To call other endpoints, include this token in the headers with key: Authorization and value: Bearer [your token]

**Docker:**
To run docker version of app simply run
_docker build -t resthomework .
docker run -p [DESIRED PORT]:1234 resthomework_


Notes:
I’ve included my postman files, please feel free to import and use them
The database is stored on mLab hosted on aws
