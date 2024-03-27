import patients from '../data/patients';
import { Patient, 
    NonSensitivePatient, 
    NewPatient, 
    NewHospitalEntryType, 
    NewOccupationalHealthcareEntryType, 
    NewHealthCheckEntryType
} from './types';
import { v4 as uuidv4 } from 'uuid';

const getPatients = (): Array<NonSensitivePatient> => {
  return patients;
};

const getPatient = (id: string): Patient => {
    return patients.find(patient => patient.id === id) as Patient;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
}
const addPatient = ( entry: NewPatient ): Patient => {
    const newPatient = {
        id: uuidv4(),
        ...entry,
    };
    patients.push(newPatient);
    return newPatient;
}

const addEntry = (
    entry:
      | NewHospitalEntryType
      | NewOccupationalHealthcareEntryType
      | NewHealthCheckEntryType,
    patientId: string
  ) => {
    const patient = patients.find((p) => p.id === patientId)
    if (!patient) {
      throw new Error(`Patient with id ${patientId} not found`)
    }
    const newEntry = {
      id: uuidv4(),
      ...entry,
    }
    patient.entries.push(newEntry)
    return newEntry
  }

export default {
    getPatients,
    getNonSensitivePatients,
    addPatient,
    getPatient,
    addEntry
};