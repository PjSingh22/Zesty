# Flask React Project

This is the starter for the Flask React project.

## Tools Used
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) ![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white) ![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white) ![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)

## Index
![image](https://github.com/PjSingh22/Zesty/assets/47789898/c0c715aa-d140-4069-86a0-1a237ae58c7c)

## Listing
![image](https://github.com/PjSingh22/Zesty/assets/47789898/2dbce85c-dd5d-4f61-b8d6-d0698885b1e3)

## Favorites
![image](https://github.com/PjSingh22/Zesty/assets/47789898/cae7d153-e954-4e5b-ab6b-ffb801343472)

## Cart
![image](https://github.com/PjSingh22/Zesty/assets/47789898/2cd21183-755c-45e3-8285-29f248a52772)


## My Thoughts
working on this capstone project was pretty fun. It seemed daunting at first with all the features and coming up with how to implement them. Slowly it came along and I had a lot of fun tackling all the problems that came about. Working with Flask for the back end was really nice since Flask makes creating routes and serving assets really easy. Once I got the hang of redux then creating stores and manipulating what is returned was pretty easy. The styling of the application was cool since I got to play around with many different CSS properties that I didn't have much experience with before. Overall I liked that I also went above and beyond and added extra features such as search functionality and liking listings to save to your favorites page.

## Endpoints
| Request | Purpose | Return Value 
--------- | ------- | ----------- 
GET /api/auth/ | Fetches the current logged in user or returns null | { id: int, username: STRING, email: STRING } |
POST /api/auth/login | Logs in user | { id: int, username: STRING, email: STRING } |
GET /api/auth/logout | Logsout user | {'message': 'User logged out'} |
POST /api/auth/signup | Signs up user | { id: int, username: STRING, email: STRING } |
GET /api/likes/ | get likes of a post | { user_id: INT, listing_id: INT, totalReviews: INT, avgReviews: INT, owner: user obj, images: ARRAY }
POST /api/likes/listing/:id | add like to listing | { "message": "listing added to likes" }
DELETE /api/likes/listing/:id | remove like from listing | { "message": "listing removed from likes" }
GET /api/listings | get all listings | { id: INT, name: STRING, userId: INT, price: INT, category: STRING, description: STRING, totalReviews: INT, avgRating: INT, owner: user, images: ARRAY }
GET /api/listings/search | get listings that match query | { id: INT, name: STRING, userId: INT, price: INT, category: STRING, description: STRING, totalReviews: INT, avgRating: INT, owner: user, images: ARRAY }
POST /api/listings/new | create a new listing | { id: INT, name: STRING, userId: INT, price: INT, category: STRING, description: STRING, totalReviews: INT, avgRating: INT, owner: user, images: ARRAY }
GET /api/listings/:id | get listing | { id: INT, name: STRING, userId: INT, price: INT, category: STRING, description: STRING, totalReviews: INT, avgRating: INT, owner: user, images: ARRAY }
PUT /api/listings/:id | update listing | { id: INT, name: STRING, userId: INT, price: INT, category: STRING, description: STRING, totalReviews: INT, avgRating: INT, owner: user, images: ARRAY }
DELETE /api/listings/:id | delete a listing | {"message": "Listing successfully deleted"}
POST /api/reviews/:id | create a review for a listing | { context: STRING, rating: INT, user_id: INT, listing_id: INT }
PUT /api/reviews/:id | update a review | { context: STRING, rating: INT, user_id: INT, listing_id: INT }
DELETE /api/reviews/:id | delete a review | { "message": "Review succesfully deleted" }

 






## Getting started
1. Clone this repository (only this branch)

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.
