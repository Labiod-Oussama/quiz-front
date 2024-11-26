import { Button, Card, CardHeader, Container, Skeleton } from "@mui/material";
import Label from "src/components/label";
import Iconify from "src/components/iconify/Iconify";
import { useGetAllTest, useGetTestById } from "src/api/quiz/info-quiz";
import ResultTable from "./result-table";
import { useRouter } from "src/hooks/use-router";
import { useBoolean } from "src/hooks/use-boolean";
import CustomDialog from "src/components/dialog/custom-dialog";
import { useMemo, useState } from "react";
import Quiz from "../quiz/quiz";
import ExcelExport from "./exported-component";
import { etatResult, getType } from "../quiz/quiz-result";

export default function ResultView() {
    const { data: tests, loading: loadingTests } = useGetAllTest();

    const [testId, setTestId] = useState<string | number | undefined>(undefined);

    const { data: testDetail, loading: testLoading } = useGetTestById(testId);

    const openDetailTest = useBoolean();

    const router = useRouter();

    const formattedTests = useMemo(() => {
        return tests.map(test => {
            return {
                ['الاسم واللقب']: `${test.patient.firstName} ${test.patient.lastName}`,
                ['المستوى']: test.patient.educationLevel,
                ['اليوم']: test.examDate ? new Date(test.examDate).toLocaleDateString() : 'لا يوجد',
                ["الساعة"]: test.examDate ?
                    new Date(test.examDate).toLocaleTimeString().replace('AM', 'ص').replace('PM', 'م')
                    : 'لا يوجد',
                ['النتيجة']: test.result,
                ['الملاحظة']: etatResult[getType(test.result)].title
            }
        })
    }, [tests])

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
                                loadingTests ?
                                    <Skeleton variant="rounded" width='20px' height='15px' />
                                    :
                                    <>
                                        <strong
                                            style={{
                                                marginLeft: 5
                                            }}
                                        >
                                            {
                                                tests.length
                                            }
                                        </strong>
                                        {tests.length > 10 ? 'فحص' : 'فحوصات'}
                                    </>
                            }
                        </Label>
                    }
                        subheader={
                            <ExcelExport
                                fileName="نتائج الفحوصات"
                                data={formattedTests}
                            />
                        }
                        action={
                            <Button
                                variant="outlined"
                                color="error"
                                startIcon={<Iconify icon='material-symbols-light:quiz' />}
                                onClick={() => {
                                    router.push('/dashboard')
                                }}

                            >
                                اجراء فحص
                            </Button>
                        }
                    />
                    <ResultTable
                        data={tests}
                        loading={loadingTests}
                        handleDetailQuiz={(test) => {
                            setTestId(test.id);
                            openDetailTest.onTrue();
                        }}
                    />
                </Card>
                <CustomDialog
                    open={openDetailTest.value}
                    onClose={() => {
                        openDetailTest.onFalse();
                        setTestId(undefined)
                    }}
                    loading={testLoading}
                >
                    <Quiz
                        currentAnswers={testDetail.answers || {}}
                        patient={testDetail.patient}
                        readonly
                    />

                </CustomDialog>
            </Container>
        </>
    )
}
