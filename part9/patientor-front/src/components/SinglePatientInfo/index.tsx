import {
    Container,
    Typography,
    Card,
    CardContent,
    CardHeader,
  } from "@mui/material"
  import { useParams } from "react-router-dom"
  import { Patient } from "../../types"
  import FemaleIcon from "@mui/icons-material/Female"
  import MaleIcon from "@mui/icons-material/Male"
  import { useState, useEffect } from "react"
  import patinetService from "../../services/patients"
  
  const SinglePatientInfo = () => {
    const { id } = useParams<{ id: string }>()
    const [patient, setPatient] = useState<Patient | undefined>()
  
    useEffect(() => {
      const fetchPatient = async (id: string) => {
        try {
          const patient = await patinetService.getOne(id)
          setPatient(patient)
        } catch (err) {
          console.error(err)
        }
      }
      if (id) void fetchPatient(id)
    }, [id])
  
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
      </Container>
    )
  }
  
  export default SinglePatientInfo