const express = require("express");

const app = express();
app.use(express.json());

const questions = require("./questions");

// Shuffle the arrays
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
// route to get all the questions
app.get("/all", (req, res) => {
  shuffleArray(questions);
  res.json(questions);
});

// route to get questions based on topics and constraint of: 20% Easy, 50% Medium, 30% Hard
app.get("/questions", (req, res) => {
  const topics = req.query; // recieve the topics and their percentage
  const numOfQuestions = {
    Easy: 4,
    Medium: 10,
    Hard: 6,
  };
  // if the topics mentioned do not consist 100% weightage then add the remaining percentage from the topics not mentioned
  const questionsOfTopicNotMentioned = {
    Easy: [],
    Medium: [],
    Hard: [],
  };
  const selectedQuestions = [];
  for (const key in topics) {
    if (topics.hasOwnProperty(key)) {
      topics[key] = topics[key] / 5; 
      // questions per topic since all questions carry 5 marks (converting percentage to number of questions)
    }
  }
  for (const question of questions) {
    if (
      topics.hasOwnProperty(question.topic) &&
      topics[question.topic] > 0 &&
      numOfQuestions[question.difficulty] > 0
    ) {
      selectedQuestions.push(question);
      topics[question.topic] -= 1;
      numOfQuestions[question.difficulty] -= 1;
    }
    if (!topics.hasOwnProperty(question.topic)) {
      questionsOfTopicNotMentioned[question.difficulty].push(question);
    }
  }
  questionsOfTopicNotMentioned.Easy = shuffleArray(
    questionsOfTopicNotMentioned.Easy
  );
  questionsOfTopicNotMentioned.Medium = shuffleArray(
    questionsOfTopicNotMentioned.Medium
  );
  questionsOfTopicNotMentioned.Hard = shuffleArray(
    questionsOfTopicNotMentioned.Hard
  );

  const QuestionPaper = selectedQuestions.concat(
    questionsOfTopicNotMentioned.Easy.slice(0, numOfQuestions.Easy),
    questionsOfTopicNotMentioned.Medium.slice(0, numOfQuestions.Medium),
    questionsOfTopicNotMentioned.Hard.slice(0, numOfQuestions.Hard)
  );
  shuffleArray(QuestionPaper);
  res.status(200).json(QuestionPaper);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
