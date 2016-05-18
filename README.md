# BetterU

Ever find it difficult to keep track of what your diet is and how you are exercising? [BetterU](http://www.betteru.pro/) is a new web application that combines your input with our extensive set of data visualization and recording tools to accurately depict trends, helping you manage your health. 


## Developer Documentation

### Tools Used:

* AngularJS
* Angular bootstrap
* ui-router
* jQuery
* Socket.IO
* Chartist
* Node
* Express
* MySQL
* KnexJS
* JSON Web Tokens
* GoogleMaps API
* Nutritionix API
* Filestack API
* Mocha
* Karma
* Protractor
* Travis CI

### To Install or Contribute:

* Fork the repo
* Clone your fork locally
* Install server & client dependencies

(From the project root folder)

```
bower install
npm install
```

* Set up an .env file with the following information: 

(For the database)
```
DB_HOST=[YOUR INFO HERE]
DB_USER=[YOUR INFO HERE]
DB_PASS=[YOUR INFO HERE]
DB_DB=[YOUR INFO HERE]
```

(For JWT)
```
TOKEN_SECRET=[YOUR SECRET HERE]
```

* Run the server from the respective folder

```
cd server
node server.js
```

* Visit the localhost address indicated.
* To utilize the Nutritionix API, register for an application key at [Nutritionix](http://www.nutritionix.com/business/api).
* To utilize the Filestack API, register for an application key at [Filestack](https://www.filestack.com/docs/).


### Front-end

BetterU utilizes AngularJS to render the front-end. Built-in Angular factories were used to manage state. Additionally, ui-router was implemented to enable application routing. 

All API calls are made in the corresponding factory file associated for the type of data that it is maintaining.

Our chat feature utilizes the Socket.IO library and our data visualizations are created with Chartist.

### Back-end

BetterU’s custom RESTFul API is built with Node.js and Express. Data management is handled by KnexJS and MySQL.

## BetterU Team

* [Eirik Lin](https://github.com/kirie)
* [Eric So](https://github.com/eso001)
* [Jane Fong](https://github.com/janeefongg)
* [Jessica Chou](https://github.com/j4chou)
* [Michelle Tham](https://github.com/mtham8)