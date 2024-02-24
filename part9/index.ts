import express from 'express';

const app = express();

app.get('/', (_req, res) => {
  res.send('HELLO FULL STACK');
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});