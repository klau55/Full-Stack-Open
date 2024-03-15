import { NewPatient } from './types';

const toNewPatientEntry = (object: any): NewPatient => {
    const newPatient: NewPatient = {
        name: object.name,
        dateOfBirth: object.dateOfBirth,
        ssn: object.ssn,
        gender: object.gender,
        occupation: object.occupation
    };
    return newPatient;
}
export default toNewPatientEntry;

