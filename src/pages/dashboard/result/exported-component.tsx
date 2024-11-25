import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { IconButton } from '@mui/material';
import Iconify from 'src/components/iconify/Iconify';

export default function ExcelExport({
    data,
    fileName
}: {
    data: Record<string, any>[];
    fileName: string;
}) {
    const exportToExcel = () => {
        // Convert JSON data to a worksheet
        const worksheet = XLSX.utils.json_to_sheet(data);
        // Create a new workbook and append the worksheet
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        // Write the workbook to an Excel buffer
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        // Create a Blob from the buffer and trigger the download
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(blob, `${fileName}.xlsx`);
    };
    return (
        <IconButton
            onClick={exportToExcel}
        >
            <Iconify icon='file-icons:microsoft-excel' color='primary.main' />
        </IconButton>
    )
}

