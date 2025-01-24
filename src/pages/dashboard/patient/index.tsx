import { Button, Card, CardHeader, Container, Skeleton } from "@mui/material";
import PatientTable from "./patient-table";
import { removePatient, useGetAllPatient, useGetPatientById } from "src/api/patient/info-patient";
import Label from "src/components/label";
import Iconify from "src/components/iconify/Iconify";
import CustomDialog from "src/components/dialog/custom-dialog";
import { useBoolean } from "src/hooks/use-boolean";
import PatientNewEditForm from "./patient-new-edit-form";
import { useCallback, useState } from "react";
import { mutate } from "swr";
import { endpoints } from "src/types/axios";
import { enqueueSnackbar } from "notistack";
import { useResponsive } from "src/hooks/use-responsive";

export default function PatientView() {
    const { data: patients, loading: loadingPatients } = useGetAllPatient();

    const [patientId, setPatientId] = useState<string | number>('');

    const { data: patient, loading: loadingPatient } = useGetPatientById(patientId);

    const openAddPatient = useBoolean();

    const openEditPatient = useBoolean();


    const handleEditPatient = useCallback((id?: string | number) => {
        if (!id) return;
        setPatientId(id);
        openEditPatient.onTrue();
    }, [openEditPatient]);

    const handleRemovePatient = useCallback(async (id?: string | number) => {
        if (!id) return;
        const confirm = window.confirm('هل انت متأكد من حذف المريض؟');
        if (confirm) {
            await removePatient(id);
            await mutate(endpoints.patient.getAll);
            enqueueSnackbar('تم حذف المريض بنجاح', { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'center' } })
        }
    }, []);

    const mdUp = useResponsive('up', 'md');
    return (
        <>
            <Container
                maxWidth={mdUp ? 'md' : 'xl'}
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
                        onEdit={handleEditPatient}
                        onRemove={handleRemovePatient}
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
                <CustomDialog
                    open={openEditPatient.value}
                    onClose={openEditPatient.onFalse}
                    loading={loadingPatient}
                    maxWidth='xs'
                >
                    <PatientNewEditForm
                        currentPatient={patient}
                        onClose={openEditPatient.onFalse}
                    />
                </CustomDialog>
            </Container>
        </>
    )
}
