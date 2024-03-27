import {
    Container,
    Typography,
    Card,
    CardContent,
    CardHeader,
  } from "@mui/material"
  import { useParams } from "react-router-dom"
  import { Patient, Diagnosis, Props, assertNever } from "../../types"
  import FemaleIcon from "@mui/icons-material/Female"
  import MaleIcon from "@mui/icons-material/Male"
  import { useState, useEffect } from "react"
  import patientService from "../../services/patients"
  import diagnosesService from "../../services/diagnoses"
  import HospitalEntry from "./Hospital"
  import HealthCheckEntry from "./HealthCheck"
  import OccupationalHealthcareEntry from "./OccupationalHealthcare"
  
  const SinglePatientInfo = () => {
    const { id } = useParams<{ id: string }>()
    const [patient, setPatient] = useState<Patient>()
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>()
  
    useEffect(() => {
      const fetchPatient = async (id: string) => {
        try {
          const patient = await patientService.getOne(id as string)
          setPatient(patient)
        } catch (err) {
          console.error(err)
        }
      }
      if (id) void fetchPatient(id)

      const fetchDiagnoses = async () => {
        try {
          const diagnoses = await diagnosesService.getAll()
          setDiagnoses(diagnoses as unknown as Diagnosis[])
        } catch (err) {
          console.error(err)
        }
      }
      void fetchDiagnoses()
    }, [id])

    const EntryDetails = ({ entry, diagnoses }: Props) => {
      switch (entry.type) {
        case "Hospital":
          return <HospitalEntry entry={entry} diagnoses={diagnoses}/>;
        case "HealthCheck":
          return <HealthCheckEntry entry={entry} diagnoses={diagnoses}/>;
        case "OccupationalHealthcare":
          return <OccupationalHealthcareEntry entry={entry} diagnoses={diagnoses}/>;
        default:
          return assertNever(entry);
      }
    };
  
    return (
      <Container>
        {!patient ? (
          <Typography variant="h4">No patient found...</Typography>
        ) : (
          <Card sx={{ width: 1 / 4 }}>
            <CardContent>
              <CardHeader
                title={patient.name}
                avatar={
                  patient.gender === "male" ? (
                    <MaleIcon />
                  ) : "female" ? (
                    <FemaleIcon />
                  ) : (
                    ""
                  )
                }
              />
              <Typography variant="body2">ssn: {patient.ssn}</Typography>
              <Typography variant="body2">
                occupation: {patient.occupation}
              </Typography>
            </CardContent>
          </Card>
        )}
        <h3>entries</h3>
        { diagnoses && patient?.entries.map((entry, i) => (
          <div key={i}>
            {<EntryDetails entry={entry} diagnoses={diagnoses} />}
          </div>
        ))}
      </Container>
    )
  }
  
  export default SinglePatientInfo