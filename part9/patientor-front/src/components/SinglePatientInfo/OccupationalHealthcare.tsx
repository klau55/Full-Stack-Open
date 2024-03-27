import { OccupationalHealthcareEntry, Diagnosis } from "../../types";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";

interface Props {
  entry: OccupationalHealthcareEntry;
  diagnoses: Diagnosis[];
}
const OccupationalHealthcare = ({ entry, diagnoses }: Props) => {
  if (entry.diagnosisCodes) {
    return (
      <div>
        <p>
          {entry.date}
          <MedicalServicesIcon />
        </p>
        <p>{entry.description}</p>
        {entry.diagnosisCodes.map((code, i) => (
          <div key={i}>
            {code} {diagnoses.map((d) => (d.code === code ? d.name : ""))}
          </div>
        ))}
        <p>by {entry.specialist}</p>
      </div>
    );
  } else {
    return (
      <div>
        <p>
          {entry.date}
          <MedicalServicesIcon />
        </p>
        <p>{entry.description}</p>
        <p>by {entry.specialist}</p>
      </div>
    );
  }
};

export default OccupationalHealthcare;