import { HealthCheckEntry, Diagnosis } from "../../types";
import CircleIcon from "@mui/icons-material/Circle";
import WorkIcon from "@mui/icons-material/Work";

interface Props {
  entry: HealthCheckEntry;
  diagnoses: Diagnosis[];
}

const HealthCheck = ({ entry, diagnoses }: Props) => {
  let color: "green" | "yellow" | "orange" | "red";

  switch (entry.healthCheckRating) {
    case 0:
      color = "green";
      break;
    case 1:
      color = "yellow";
      break;
    case 2:
      color = "orange";
      break;
    case 3:
      color = "red";
      break;
    default:
      color = "green";
      break;
  }
  if (entry.diagnosisCodes) {
    return (
      <div>
        <p>
          {entry.date}
          <WorkIcon />
        </p>
        <p>{entry.description}</p>
        <CircleIcon sx={{ color: { color } }} />
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
          <WorkIcon />
        </p>
        <p>{entry.description}</p>
        <CircleIcon sx={{ color: { color } }} />
        <p>by {entry.specialist}</p>
      </div>
    );
  }
};

export default HealthCheck;