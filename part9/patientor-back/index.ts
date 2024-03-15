import express from 'express';
import diagnosesService from './services/diagnosesService';
import patientsService from './services/patientsService';
import toNewPatientEntry from './services/utils';
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
  try{
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientsService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong';
    if (error instanceof Error) {
      errorMessage += 'Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});