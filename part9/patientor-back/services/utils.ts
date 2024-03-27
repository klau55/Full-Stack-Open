import { NewPatient, Entry, EntryWithoutId,
    Discharge, HealthCheckRating, SickLeave,
    Diagnosis, BaseEntryWithoutId } from './types';

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
// ********************
// HERE STARTS ENTRIES

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(param);
  };
  const isNumber = (num: unknown): num is number => {
    return typeof num === 'number' || num instanceof Number;
  };

  const toNewEntry = (object: unknown): EntryWithoutId => {
    if (!object || typeof object !== 'object') {
      throw new Error('Incorrect or missing data');
    }
  
    if ('type' in object && 'description' in object && 'date' in object && 'specialist' in object) {
  
      const baseNewEntry: BaseEntryWithoutId = {
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
      };
  
      if ('diagnosisCodes' in object) baseNewEntry.diagnosisCodes = parseDiagnosisCodes(object);
  
      switch (object.type) {
      case 'Hospital':
        if ('discharge' in object) {
          const newEntry: EntryWithoutId = {
            type: 'Hospital',
            discharge: parseDischarge(object.discharge),
            ...baseNewEntry
          };
          return newEntry;
        }
        throw new Error('Incorrect data: `discharge` field is missing (type = `Hospital`)');
      case 'HealthCheck':
        if ('healthCheckRating' in object) {
          const newEntry: EntryWithoutId = {
            type: 'HealthCheck',
            healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
            ...baseNewEntry
          };
          return newEntry;
        }
        throw new Error('Incorrect data: `healthCheckRating` field is missing (type = `HealthCheck`)');
      case 'OccupationalHealthcare':
        if ('employerName' in object) {
          const newEntry: EntryWithoutId = {
            type: 'OccupationalHealthcare',
            employerName: parseEmployerName(object.employerName),
            ...baseNewEntry
          };
          if ('sickLeave' in object) newEntry.sickLeave = parseSickLeave(object.sickLeave);
          return newEntry;
        }
        throw new Error('Incorrect data: `employerName` field is missing (type = `OccupationalHealthcare`)');
      default:
        throw new Error('Incorrect data: some fields are missing');
      }
    }
  
    throw new Error('Incorrect data: some fields are missing');
  };

const parseDescription = (description: unknown): string => {
    if (!isString(description) || description === '') throw new Error('Incorrect or missing description');
    return description;
};

const parseSpecialist = (specialist: unknown): string => {
    if (!isString(specialist) || specialist === '') throw new Error('Incorrect or missing specialist');
    return specialist;
};

const parseDischarge = (discharge: unknown): Discharge => {
    if (!discharge || typeof discharge !== 'object') throw new Error('Incorrect or missing discharge');
    
    if ('date' in discharge && 'criteria' in discharge) {
        if (!isString(discharge.date) || !isDate(discharge.date)) throw new Error('Incorrect or missing discharge date');
        if (!isString(discharge.criteria) || discharge.criteria === '') throw new Error('Incorrect or missing discharge criteria');
        
        return {
            date: discharge.date,
            criteria: discharge.criteria
        };
    }
    
    throw new Error('Incorrect data: some discharge fields are missing');
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
    if (!isNumber(healthCheckRating) || !isHealthCheckRating(healthCheckRating)) {
        throw new Error('Incorrect or missing healthCheckRating: ' + healthCheckRating);
    }
    return healthCheckRating;
};

const parseEmployerName = (employerName: unknown): string => {
    if (!isString(employerName)) throw new Error('Incorrect or missing employerName');
    return employerName;
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
    if (!sickLeave || typeof sickLeave !== 'object') {
        throw new Error('Incorrect or missing sickLeave');
    }
    
    if ('startDate' in sickLeave && 'endDate' in sickLeave) {
        if (!isString(sickLeave.startDate)) throw new Error('Incorrect or missing sickLeave startDate');
        if (!isString(sickLeave.endDate)) throw new Error('Incorrect or missing sickLeave endDate');
        
        return {
            startDate: sickLeave.startDate,
            endDate: sickLeave.endDate
        };
    }
    throw new Error('Incorrect data: some sickLeave fields are missing');
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
        // we will just trust the data to be in correct form
        return [] as Array<Diagnosis['code']>;
    }
    
    return object.diagnosisCodes as Array<Diagnosis['code']>;
};

export {toNewPatientEntry, toNewEntry};