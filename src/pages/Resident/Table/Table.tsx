//Third party
import { useEffect, useState } from 'react';
import { Table, message } from 'antd';
// import { Scrollbar } from "react-scrollbars-custom";

//Page Specific
import { TableProps } from '../models';
import TableColumns from './Columns';
import { AxiosError } from 'axios';

//components|hooks|utils
import RetryButtonForMessage from '../../../Components/RetryButtonForMessage';
import useWindowDimensions from '../../../Hooks/windowDimension';
import HeightPropsForTable from '../../../Styles/CSS/CommonProps/HeightPropsForTable';
import getResident from '../../../api/Data/Resident/getResident';

const ResidentTable = ({
  reloadTrigger,
  setReloadTrigger,
  reloadingCurrentlyOrNot,
  setReloadingCurrentlyOrNot,
  filters,
  data,
  setData,
  together
}: TableProps) => {
  const [pageSize, setPageSize] = useState(10);
  const pageOptions = ['10', '15', '20', '30'];
  const [pageNumber, setPageNumber] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [messageApi, contextHolder] = message.useMessage();
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      try {
        // const convertDateTimeFormat = (dateTimeString) => {
        //   if (dateTimeString) {
        //     const [datePart, timePart] = dateTimeString.split(' ');
        //     const [day, month, year] = datePart.split('-');
        //     return `${year}-${month}-${day} ${timePart && timePart}`;
        //   } else {
        //     return '';
        //   }
        // };
        // const startDateConverted = convertDateTimeFormat(filters.startDate);
        // const endDateConverted = convertDateTimeFormat(filters.endDate);
        setReloadingCurrentlyOrNot(true);
        const data = await getResident(
          pageNumber,
          pageSize,
          // together,
          // filters.vehicleRegistration,
          // [startDateConverted, endDateConverted],
          abortController
        );
        console.log(data);
        setData(data.data);
        setTotalRecords(data.total_data_count);
      } catch (error) {
        const err = error as AxiosError;
        if (!err.response) {
          messageApi.error({
            content: 'No server response',
            duration: 2.5,
            icon: <RetryButtonForMessage setReloadTrigger={setReloadTrigger} />
          });
          // setData([]);
        } else {
          messageApi.error({
            content: 'Error displaying data',
            duration: 4,
            icon: <RetryButtonForMessage setReloadTrigger={setReloadTrigger} />
          });
        }
      } finally {
        setReloadingCurrentlyOrNot(false);
      }
    };
    fetchData();
    return () => {
      abortController.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reloadTrigger, pageSize, pageNumber, together]);

  const columns = TableColumns({ width });

  return (
    <>
      {contextHolder}
      <Table
        className={data.length > 0 ? 'data-exist' : ''}
        dataSource={data}
        columns={columns}
        bordered={true}
        scroll={{
          x: 1100,
          y: HeightPropsForTable(height)
        }}
        loading={reloadingCurrentlyOrNot}
        pagination={{
          total: totalRecords,
          defaultPageSize: pageSize,
          current: pageNumber,
          pageSize: pageSize,
          onChange: (page: number) => {
            setPageNumber(page);
          },
          showSizeChanger: true,
          showQuickJumper: width > 992 ? true : false,
          pageSizeOptions: pageOptions,
          position: ['bottomRight'],
          onShowSizeChange: (current: number, size: number) => {
            setPageSize(size);
          }
        }}
      />
    </>
  );
};

export default ResidentTable;
