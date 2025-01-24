import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHeadCustom from 'src/components/table/table-head-custom';
import { Button, Chip, Skeleton, Stack, useMediaQuery, Typography, Grid } from '@mui/material';
import { QuizDataType } from 'src/types/quiz';
import { etatResult, getType } from '../quiz/quiz-result';
import Iconify from 'src/components/iconify/Iconify';

const TABLE_HEAD = [
    { id: 'patient', label: 'المريض' },
    { id: 'result', label: 'النتيجة' },
    { id: 'note', label: 'الملاحظة' },
    { id: 'examDate', label: 'تاريخ اجراء الفحص' },
    { id: 'actions', label: 'العمليات', alignRight: true }
];

// ----------------------------------------------------------------------

interface QuizTableProps {
    data: QuizDataType[];
    loading?: boolean;
    handleDetailQuiz?: (quiz: QuizDataType) => void;
    onRemove?: (id?: string | number) => void;
}

export default function ResultTable({
    data,
    loading = false,
    handleDetailQuiz,
    onRemove
}: QuizTableProps) {
    const isSmallScreen = useMediaQuery('(max-width:600px)'); // Responsive check for mobile

    const renderLoading = (
        <TableBody>
            {[...new Array(5)].map((_, index) => (
                <TableRow key={index}>
                    {TABLE_HEAD.map((_, cellIndex) => (
                        <TableCell key={cellIndex}>
                            <Skeleton
                                variant='rounded'
                                width={isSmallScreen ? '80%' : '50%'}
                                height={20}
                            />
                        </TableCell>
                    ))}
                </TableRow>
            ))}
        </TableBody>
    );

    return (
        <TableContainer
            sx={{
                overflowX: 'auto',
                maxHeight: 400,
                '&::-webkit-scrollbar': {
                    width: 6,
                    height: 6,
                },
                '&::-webkit-scrollbar-thumb': {
                    borderRadius: 3,
                    bgcolor: 'error.dark',
                },
                borderRadius: 2,
                bgcolor: 'background.paper',
            }}
        >
            <Table>
                <TableHeadCustom headLabel={TABLE_HEAD} />
                {loading ? (
                    renderLoading
                ) : (
                    <TableBody>
                        {data.map((row, index) => (
                            <TableRow key={`row_${index}`}>
                                <TableCell>
                                    {`${row.patient.firstName} ${row.patient.lastName}`}
                                </TableCell>
                                <TableCell>{row.result}</TableCell>
                                <TableCell>
                                    <Chip
                                        color={etatResult[getType(row.result)].color}
                                        icon={
                                            <Iconify
                                                icon={etatResult[getType(row.result)].icon}
                                            />
                                        }
                                        label={etatResult[getType(row.result)].title}
                                    />
                                </TableCell>
                                <TableCell>
                                    {row?.examDate
                                        ? new Date(row.examDate)
                                            .toLocaleString()
                                            .replace('AM', 'ص')
                                            .replace('PM', 'م')
                                        : 'لا يوجد تاريخ'}
                                </TableCell>
                                <TableCell>
                                    <Stack
                                        direction={isSmallScreen ? 'column' : 'row'}
                                        spacing={1}
                                    >
                                        <Button
                                            variant="contained"
                                            color="info"
                                            size="small"
                                            onClick={() => handleDetailQuiz?.(row)}
                                        >
                                            تفاصيل
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            size="small"
                                            onClick={() => {
                                                onRemove?.(row.id);
                                            }}
                                        >
                                            حذف
                                        </Button>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                )}
            </Table>
            {data.length === 0 && !loading && (
                <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    sx={{ p: 3, textAlign: 'center' }}
                >
                    <Typography variant="body1" color="text.secondary">
                        لا توجد بيانات لعرضها
                    </Typography>
                </Grid>
            )}
        </TableContainer>
    );
}