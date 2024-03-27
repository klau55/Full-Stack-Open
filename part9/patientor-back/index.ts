import express from 'express';
import diagnosesService from './services/diagnosesService';
import patientsService from './services/patientsService';
import { toNewPatientEntry, toNewEntry}  from './services/utils';
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

app.get('/api/patients/:id', (req, res) => {
  const patient = patientsService.getPatient(req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
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
app.post('/api/patients/:id/entries', (req, res) => {
  try{
    const newEntry = toNewEntry(req.body);
    const patientId = req.params.id;
    if (patientId) {
      const updatedPatient = patientsService.addEntry(newEntry, patientId);
      res.json(updatedPatient);
    } else {
      res.sendStatus(404);
    }
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