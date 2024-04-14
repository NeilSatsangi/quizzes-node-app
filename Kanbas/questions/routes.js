import db from "../Database/index.js";
function QuestionRoutes(app) {
    app.post("/api/quizzes/:qid/questions", (req, res) => {
        const { qid } = req.params;
        const newQuestion = {
          ...req.body,
          quizId: qid,
          _id: new Date().getTime().toString(),
        };
        db.questions.push(newQuestion);
        res.send(newQuestion);
      });
    
  app.get("/api/quizzes/:qid/questions", (req, res) => {
    const { qid } = req.params;
    const questions = db.questions
      .filter((q) => q.quizId === qid);
    res.send(questions);
  });

  app.delete("/api/questions/:qid", (req, res) => {
    const { qid } = req.params;
    db.questions = db.questions.filter((q) => q._id !== qid);
    res.sendStatus(200);
  });
  app.put("/api/questions/:qid", (req, res) => {
    const { qid } = req.params;
    const questionIndex = db.modules.findIndex(
      (q) => q._id === qid);
    db.questions[questionIndex] = {
      ...db.questions[questionIndex],
      ...req.body
    };
    res.sendStatus(204);
  });

  app.post("/api/questions/:qid/options", (req, res) => {
    const { qid } = req.params;
    const { option } = req.body;

    const question = db.questions.find((q) => q._id === qid);

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    question.options.push(option);
    question.numOptions++;

    res.json({ message: "Option added successfully", question });
  });


}
export default QuestionRoutes;

