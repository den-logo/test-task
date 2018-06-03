# CMDb

**Custom Movie Database**

## Launch instructions

*Remark*: I've been using Redux DevTools for debugging Redux, and this project has built-in redux-devtools-extension package. You can download extension here https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=ru

After cloning, open your console and follow these instructions:

* Install all dependencies in folders *client / server*:
	*  `npm install` ( in each folder )

* MySQL setup:

	* You should have MySQL installed on your computer. You can download a free MySQL database at https://www.mysql.com/downloads/

	* After installation make sure that MySQL server is running on your computer.

	* Now take host, user, password and port from your MySQL server and type it in `server/dbconfig.js` and `server/index.js` files (you'll find these fields in the beginning of each file).

* Server start:

	* in *server* folder run `npm run dev`

* Client start:

	* in *client* folder run `npm start`

* Go to http://localhost:3000/ and see what you've got

## About structure of project

**CMDb** has been made using ReactJS for client side and NodeJS for backend. Client side of project has Redux for saving state of mostly everything you actually see, It consists of ALL films that you have, filter and search options. All searching and filtering stuff, txt file reading ( for importing films from file ) and adding film through modal window is getting handled by client side. Backend is responsible only for saving films to database and returning films if needed.

## TODO / Refactoring things

**CMDb** is not the best example of "How project should work and look like", so there is a list of some things that may / must be changed:

* Prevent massing styles with code in react components 
* Do requests to server asynchronously
* Move some things from front side to back side so it could work faster
* Page shouldn't show ALL films, so adding some pagination or smth like that would be pretty ok
* Add some tests
* ... `¯\_(ツ)_/¯`