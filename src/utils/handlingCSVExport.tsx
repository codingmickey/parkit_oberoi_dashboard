import Papa from 'papaparse';
import { convertNullInArrayOfObjectsToString } from './helperFunctions';

interface TableData {
  data: Record<string, unknown>[];
  columns: columnType[];
}
interface columnType {
  [key: string]: string;
  dataKey: string;
  header: string;
}

const handlingCSVExport = (
  tableData: TableData,
  fileName: string,
  setIsExportLoading: React.Dispatch<React.SetStateAction<boolean>>
): Promise<void> => {
  return new Promise((resolve, reject) => {
    setIsExportLoading(true);
    try {
      const header = tableData.columns.map((column) => column.header);
      const csvData = Papa.unparse([header, ...tableData.data.map((item) => Object.values(item))]);
      // const csvDataWithNoNull = convertNullInArrayOfObjectsToString(
      //   tableData.data
      // );
      // console.log(csvDataWithNoNull);
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `${fileName}.csv`);
      link.style.display = 'none';

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setIsExportLoading(false);
      resolve();
    } catch (err) {
      console.log(err);
      setIsExportLoading(false);
      reject();
    }
  });
};

export default handlingCSVExport;
