import Database from "../Database/index.js";
export default function QuizRoutes(app) {

  app.get("/api/quizzes", (req, res) => {
    const quizzes = Database.quizzes;
    res.send(quizzes);
  });

  app.post("/api/quizzes", (req, res) => {
    const quiz = { ...req.body,
      _id: new Date().getTime().toString() };
    Database.quizzes.push(quiz);
    res.send(quiz);
  });

  app.delete("/api/quizzes/:id", (req, res) => {
    const { id } = req.params;
    Database.quizzes = Database.quizzes
      .filter((c) => c._id !== id);
    res.sendStatus(204);
  });

  app.put("/api/quizzes/:id", (req, res) => {
    const { id } = req.params;
    const quiz = req.body;
    Database.quizzes = Database.quizzes.map((c) =>
      c._id === id ? { ...c, ...quiz } : c
    );
    res.sendStatus(204);
  });
   
  app.get("/api/quizzes/:id", (req, res) => {
    const { id } = req.params;
    const quiz = Database.quizzes
      .find((c) => c._id === id);
    if (!quiz) {
      res.status(404).send("quiz not found");
      return;
    }
    res.send(quiz);
  });



}
