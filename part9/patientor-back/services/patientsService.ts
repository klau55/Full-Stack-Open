import patients from '../data/patients';
import { Patient, NonSensitivePatient, NewPatient } from './types';
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
        ...entry
    };
    patients.push(newPatient);
    return newPatient;
}

export default {
    getPatients,
    getNonSensitivePatients,
    addPatient,
    getPatient
};