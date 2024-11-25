import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Scrollbar from 'src/components/scrollbar';
import TableHeadCustom from 'src/components/table/table-head-custom';
import { Button, Chip, Skeleton } from '@mui/material';
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
}
export default function ResultTable({
    data,
    loading = false,
    handleDetailQuiz
}: QuizTableProps) {
    const renderLoading = (
        <TableBody>
            {
                [...new Array(5)].map((row, index) => (
                    <TableRow key={index}>
                        <TableCell>
                            <Skeleton
                                variant='rounded'
                                width='50px'
                                height='20px'
                            />
                        </TableCell>
                        <TableCell>
                            <Skeleton
                                variant='rounded'
                                width='50px'
                                height='20px'
                            />
                        </TableCell>
                        <TableCell>
                            <Skeleton
                                variant='rounded'
                                width='50px'
                                height='20px'
                            />
                        </TableCell>
                    </TableRow>
                ))
            }
        </TableBody>
    )
    return (
        <TableContainer
            sx={{
                overflowX: 'unset',
                overflowY: "auto",
                maxHeight: 300,
                '&::-webkit-scrollbar': {
                    width: 6,
                    height: 6,
                },
                '&::-webkit-scrollbar-thumb': {
                    borderRadius: 3,
                    bgcolor: 'error.dark',
                }
            }}
        >
            <Scrollbar>
                <Table sx={{ minWidth: 800 }}>
                    <TableHeadCustom headLabel={TABLE_HEAD} />
                    {
                        loading ? renderLoading
                            :
                            <TableBody>
                                {data.map((row, index) => (
                                    <TableRow key={`row_${index}`}>
                                        <TableCell>
                                            {`${row.patient.firstName} ${row.patient.lastName}`}
                                        </TableCell>
                                        <TableCell >
                                            {
                                                row.result
                                            }

                                        </TableCell>
                                        <TableCell >
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
                                        <TableCell >{row?.examDate ? new Date(row.examDate).toLocaleString().replace('AM', 'ص').replace('PM', 'م') : 'لا يوجد تاريخ'}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                color="error"
                                                size="small"
                                                onClick={() => handleDetailQuiz?.(row)}
                                            >
                                                تفاصيل
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                    }
                </Table>
            </Scrollbar>
        </TableContainer >
    );
}

