import { Button, Card, CardHeader, Container, Skeleton } from "@mui/material";
import PatientTable from "./patient-table";
import { useGetAllPatient } from "src/api/patient/info-patient";
import Label from "src/components/label";
import Iconify from "src/components/iconify/Iconify";
import CustomDialog from "src/components/dialog/custom-dialog";
import { useBoolean } from "src/hooks/use-boolean";
import PatientNewEditForm from "./patient-new-edit-form";

export default function PatientView() {
    const { data: patients, loading: loadingPatients } = useGetAllPatient();

    const openAddPatient = useBoolean();
    return (
        <>
            <Container
                maxWidth='md'
            >
                <Card sx={{ width: 1 }}>
                    <CardHeader title={
                        <Label
                            variant="soft"
                            color="error"
                            sx={{
                               typography: 'h6',
                                py: 2,
                                px: 1
                            }}
                        >
                            {
                                loadingPatients ?
                                    <Skeleton variant="rounded" width='20px' height='15px' />
                                    :
                                    <>
                                        <strong
                                            style={{
                                                marginLeft: 5
                                            }}
                                        >
                                            {
                                                patients.length
                                            }
                                        </strong>
                                        {patients.length > 1 ? 'مرضى' : 'مريض'}
                                    </>
                            }
                        </Label>
                    }
                        action={
                            <Button
                                variant="outlined"
                                color="error"
                                startIcon={<Iconify icon='bi:plus' />}
                                onClick={openAddPatient.onTrue}

                            >
                                إضافة مريض
                            </Button>
                        }
                    />
                    <PatientTable
                        data={patients}
                        loading={loadingPatients}
                    />
                </Card>
                <CustomDialog
                    open={openAddPatient.value}
                    onClose={openAddPatient.onFalse}
                    maxWidth='xs'
                >
                    <PatientNewEditForm
                        onClose={openAddPatient.onFalse}
                    />
                </CustomDialog>
            </Container>
        </>
    )
}
