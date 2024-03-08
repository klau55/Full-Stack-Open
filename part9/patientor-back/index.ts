import express from 'express';
import diagnosesService from './services/diagnosesService';
import patientsService from './services/patientsService';
var cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;

app.get('/api/diagnoses', (_req, res) => {
  res.send(diagnosesService.getDiagnoses())
});

app.get('/api/patients', (_req, res) => {
  res.send(patientsService.getNonSensitivePatients())
});

app.post('/api/patients', (req, res) => {
  const { name, dateOfBirth, gender, ssn , occupation} = req.body;
  const newPatient = patientsService.addPatient(name, dateOfBirth, gender, ssn, occupation);
  res.json(newPatient);
}
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});