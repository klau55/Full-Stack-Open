import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

const app = express();
app.use(express.json());
const PORT = 3003;

app.get('/', (_req, res) => {
  res.send('HELLO FULL STACK');
}); 

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (isNaN(height) || isNaN(weight)) {
    res.json({ error: "malformatted parameters" });
  }
  const bmi = calculateBmi(height, weight);
  res.json({ weight, height, bmi });
});

app.post('/exercises', (req, res) => {
  const { target, daily_exercises } = req.body;
  console.log('daily_exercises', daily_exercises, 'target', target)

  if (!daily_exercises || !target) {
    return res.status(400).send({ error: 'missing parameters' });
  }
  if (!Array.isArray(daily_exercises) || typeof target !== "number") {
    return res.status(400).send({ error: "malformatted parameters" });
  }
  return res.json(calculateExercises(daily_exercises, target));
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});