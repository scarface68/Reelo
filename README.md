# Reelo

Steps to run locally:-

```bash
  git clone https://github.com/scarface68/Reelo.git
```

open the project folder on terminal then run following commands:-

Install the reqired dependencies:-

```bash
npm install
```

Start the server:-

```bash
npm run start
```

The server runs on port 5000.

The API has 2 routes:-

This gets all the questions present in questions.js

http://localhost:5000/all

This gets the questions based on the constraints (20% Easy, 50% Medium, 30% Hard)

http://localhost:5000/questions

" if we want to mention the percentages of questions from each Topic that the question paper should accommodate too":

we can add the topic name and their percentage as query to "http://localhost:5000/questions" :-

In the question set the topics currently present are:-
```bash
World Capitals,
Elements,
Arithmetic,
Equations,
OOP,
Oceans,
Data Structures and Algorithms,
Miscellaneous,
Geographical Features,
Celestials,
Waves
```

For example we want to have-
20% questions from Waves, 40% from Elements and 40% from Arithmetic (the percentages should be multiples of 5)

we use - http://localhost:5000/questions?Waves=20&Elements=40&Arithmetic=40

This will also follow the previous constraint of 20% Easy, 50% Medium, 30% Hard

The results can be checked using Postman or directly using the links mentioned above in a browser after starting the server.
