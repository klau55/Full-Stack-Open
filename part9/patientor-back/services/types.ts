export type Diagnosis = {
    code: string;
    name: string;
    latin?: string;
    };

export type Patient = {
    id: string;
    name: string;
    dateOfBirth: string;
    gender: string;
    ssn: string;
    occupation: string;
    entries: Entry[];
    };

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
    }
export type NonSensitivePatient = Omit<Patient, 'ssn'| 'entries'>;
export type NewPatient = Omit<Patient, 'id'>;

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
  }


export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
  }
  
interface HealthCheckEntry extends BaseEntry {
type: "HealthCheck";
healthCheckRating: HealthCheckRating;
}

interface HospitalEntry extends BaseEntry {
type: "Hospital";
discharge: {
    date: string;
    criteria: string;
};
}

interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: {
    startDate: string;
    endDate: string;
    };
}

export type NewHospitalEntryType = Omit<HospitalEntry, "id">

export type NewOccupationalHealthcareEntryType = Omit<OccupationalHealthcareEntry, "id">

export type NewHealthCheckEntryType = Omit<HealthCheckEntry, "id">

export interface SickLeave {
    startDate: string;
    endDate: string;
  }
export interface Discharge {
    date: string;
    criteria: string;
}
interface HospitalEntry extends BaseEntry {
    type: 'Hospital';
    discharge: Discharge;
  }

  type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
  export type EntryWithoutId = UnionOmit<Entry, 'id'>;
  export type BaseEntryWithoutId = UnionOmit<BaseEntry, 'id'>;