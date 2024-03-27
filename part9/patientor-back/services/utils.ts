import { NewPatient, Entry } from './types';

const toNewPatientEntry = (object: unknown): NewPatient => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data: ' + object);
    }
    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object && 'entries' in object)
    {

        const newPatient: NewPatient = {
            name: parseName(object.name),
            dateOfBirth: parseDate(object.dateOfBirth),
            ssn: parseSSN(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation),
            entries: parseEntries(object.entries)
        };
        return newPatient;
    }
    throw new Error('Incorrect or missing data: some fields are missing or incorrect');
}
export default toNewPatientEntry;

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name: ' + name);
    }
    return name;
}
const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
}
const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
}
const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
}
const parseSSN = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn: ' + ssn);
    }
    return ssn;
}
const parseGender = (gender: unknown): Gender => {
    if (!gender || !isString(gender) || !isGender(gender as string)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender as Gender;
}
const isGender = (str: string): str is Gender => {
    return Object.values(Gender).map(g => g.toString()).includes(str);
};
export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
};
const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation: ' + occupation);
    }
    return occupation;
}
const parseEntries = (entries: unknown): Entry[] => {
    if (!entries) {
      throw new Error('Missing entries');  
    }; 
    return entries as Entry[];
  }