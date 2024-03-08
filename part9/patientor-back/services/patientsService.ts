import patients from '../data/patients';
import { Patient, NonSensitivePatient } from './types';
import { v4 as uuidv4 } from 'uuid';

const getPatients = (): Array<Patient> => {
  return patients;
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
const addPatient = ( 
    name: string, dateOfBirth: string, gender: string, ssn: string, occupation: string
    ): Patient => {
    const newPatient = {
        id: uuidv4(),
        name,
        dateOfBirth,
        ssn,
        gender,
        occupation
    };
    patients.push(newPatient);
    return newPatient;
}

export default {
    getPatients,
    getNonSensitivePatients,
    addPatient
};