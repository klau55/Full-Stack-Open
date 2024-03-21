export type Diagnosis = {
    code: string;
    name: string;
    latin?: string;
    };

export interface Entry {
    }

export type Patient = {
    id: string;
    name: string;
    dateOfBirth: string;
    gender: string;
    ssn: string;
    occupation: string;
    entries: Entry[];
    };
export type NonSensitivePatient = Omit<Patient, 'ssn'| 'entries'>;
export type NewPatient = Omit<Patient, 'id'>;