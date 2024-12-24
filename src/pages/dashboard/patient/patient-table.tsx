import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Scrollbar from 'src/components/scrollbar';
import TableHeadCustom from 'src/components/table/table-head-custom';
import { Button, Skeleton, Stack } from '@mui/material';
import { PatientType } from 'src/types/quiz';


const TABLE_HEAD = [
    { id: 'firstName', label: 'الاسم' },
    { id: 'lastName', label: 'اللقب' },
    { id: 'age', label: 'العمر' },
    { id: 'educationLevel', label: 'المستوى التعليمي' },
    { id: 'actions', label: 'العمليات', alignRight: true }
];

// ----------------------------------------------------------------------

interface PatientTableProps {
    data: PatientType[];
    loading?: boolean;
    onEdit?: (id?: string | number) => void;
    onRemove?: (id?: string | number) => void;
}
export default function PatientTable({
    data,
    loading = false,
    onEdit,
    onRemove
}: PatientTableProps) {
    const renderLoading = (
        <TableBody>
            {
                [...new Array(3)].map((_, index) => (
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
                            <TableBody

                            >
                                {data.map((row, index) => (
                                    <TableRow key={`row_${index}`}>
                                        <TableCell>{row.firstName}</TableCell>
                                        <TableCell >{row.lastName}</TableCell>
                                        <TableCell >{row.age}</TableCell>
                                        <TableCell >{row.educationLevel}</TableCell>
                                        <TableCell>
                                            <Stack direction='row' spacing={1}>

                                                <Button
                                                    variant="contained"
                                                    color="warning"
                                                    size="small"
                                                    onClick={() => {
                                                        onEdit?.(row.id)
                                                    }}
                                                >
                                                    تعديل
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    size="small"
                                                    onClick={() => {
                                                        onRemove?.(row.id)
                                                    }}
                                                >
                                                    حذف
                                                </Button>
                                            </Stack>
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

