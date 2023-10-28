import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface TableData {
  data: Record<string, unknown>[];
  columns: columnType[];
}
interface columnType {
  [key: string]: string;
  dataKey: string;
  header: string;
}
export type orientationProps = 'portrait' | 'landscape';

// convert this function to add a promise when resolved
const handlingPDFExport = (
  tableData: TableData,
  filename: string,
  orientation: orientationProps,
  setIsExportLoading: React.Dispatch<React.SetStateAction<boolean>>,
  title = 'export_data'
  // component='logs'
): Promise<void> => {
  return new Promise((resolve, reject) => {
    setIsExportLoading(true);
    try {
      const cellHeight = orientation === 'landscape' ? 70 : 50;
      // if (component === 'logs') cellHeight = orientation === 'landscape' ? 33 : 10;

      const doc = new jsPDF({
        orientation: orientation,
        format: 'a4',
        floatPrecision: 5
      });
      const rightEnd = doc.internal.pageSize.width - 14;
      const dateNow = new Date().toLocaleDateString();
      // Header
      doc.setFontSize(12);

      doc.setLineWidth(0.5);
      doc.line(14, 35, rightEnd, 35);

      // Modify the data according to the required array format

      // Header
      const tableHeader = [tableData.columns.map((column) => column.header)];

      // Body
      const tableBody = Array.from({ length: tableData.data.length }, () => []);
      tableData.columns.forEach((column) => {
        let index = 0;
        tableData.data.forEach((data) => {
          if (column.header === 'Event Timestamp' || column.header === 'Created At' || column.header === 'Updated At')
            tableBody[index].push(new Date(data[column.dataKey] as string).toLocaleString());
          else tableBody[index].push(data[column.dataKey]);
          index++;
        });
      });

      console.log(tableBody);

      const totalPagesExp = '{total_ages_count_sptring}';

      // Table
      autoTable(doc, {
        theme: 'grid',
        head: tableHeader,
        body: Array(5).fill(tableBody).flat(),
        headStyles: { fillColor: '#000' },
        margin: { top: 40, bottom: 20 },

        // New
        pageBreak: 'auto',
        rowPageBreak: 'avoid',
        bodyStyles: { minCellHeight: cellHeight },

        // horizontalPageBreak: true,
        // horizontalPageBreakRepeat: 'ID',

        didDrawPage: function (data) {
          const footerPosX = doc.internal.pageSize.height - 15;
          const footerPosY = doc.internal.pageSize.width / 2 + 20;
          doc.setFontSize(10);
          doc.text(
            `Page ${data.pageNumber} of ${typeof doc.putTotalPages === 'function' && totalPagesExp}`,
            footerPosY,
            footerPosX - 1,
            { align: 'center' }
          );
          doc.setLineWidth(0.5);
          doc.line(14, footerPosX + 2, rightEnd, footerPosX + 2);

          doc.setFontSize(12);
          doc.text(title, 14, 20);
          doc.text(`Date of print: ${dateNow}`, rightEnd, 20, { align: 'right' });

          doc.setLineWidth(0.5);
          doc.line(14, 35, rightEnd, 35);
        },
        // didParseCell: function (data) {
        //   if (data.section === 'body') {
        //     data.cell.styles.fillColor = data.row.index % 2 === 0 ? '#fff' : '#eee';
        //   }
        // }

        didParseCell: function (data) {
          if (
            data.section === 'body' &&
            typeof data.cell.raw === 'string' &&
            (data.cell.raw.includes('jpeg') || data.cell.raw.includes('jpg'))
          ) {
            const td = data.cell.raw;
            console.log(td);
            // const img = td.getElementsByTagName('img')[0];
            // const textPos = data.cell; // doc.text('fking working', textPos.x, textPos.y);
            // doc.addImage(td, 'jpeg', data.cell.x, data.cell.y, 50, 50);

            // data.row.height = 50;
            // data.cell.minWidth = 50;
            // data.column.minWidth = 50;

            // data.cell.text = '';

            // data.cell.contentHeight = 50;
            data.cell.styles.minCellHeight = cellHeight;
            data.cell.styles.cellWidth = cellHeight;

            console.log(data);
          }
        },
        didDrawCell: function (data) {
          console.log(typeof data.cell.raw);
          if (typeof data.cell.raw === 'string' && (data.cell.raw.includes('jpeg') || data.cell.raw.includes('jpg'))) {
            const td = data.cell.raw;
            console.log(td);
            // const img = td.getElementsByTagName('img')[0];
            const dim = data.cell.height - data.cell.padding('vertical');
            const textPos = data.cell.getTextPos();
            // doc.text('fking working', textPos.x, textPos.y);
            doc.addImage(td, 'jpeg', textPos.x, textPos.y, dim, dim);
            // doc
            console.log(textPos.x, textPos.y, dim);
            data.cell.text = [''];
          }
        }
      });

      if (typeof doc.putTotalPages === 'function') {
        doc.putTotalPages(totalPagesExp);
      }

      doc.save(`${filename}.pdf`);

      setIsExportLoading(false);
      resolve();
    } catch (err) {
      setIsExportLoading(false);
      console.log(err);
      reject(err);
    }
  });
};

export default handlingPDFExport;
