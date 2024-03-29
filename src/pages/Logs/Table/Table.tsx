//Third party
import { useEffect, useState } from 'react';
import { Table, message } from 'antd';
// import { Scrollbar } from "react-scrollbars-custom";

//Page Specific
import { TableProps } from '../models';
import TableColumns from './Columns';
import { AxiosError } from 'axios';
import getLogs from '../../../api/Data/Logs/getLogs';

//components|hooks|utils
import RetryButtonForMessage from '../../../Components/RetryButtonForMessage';
import useWindowDimensions from '../../../Hooks/windowDimension';
import HeightPropsForTable from '../../../Styles/CSS/CommonProps/HeightPropsForTable';

const LogsTable = ({
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
  const [residentialId, setResidentialId] = useState<string | null>(null);
  const [residentialRegisteredVehicleId, setResidentialRegisteredVehicleId] = useState<string | null>(null);
  const [search, setSearch] = useState<string | null>('');
  const [id, setId] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  // const [totalRecords, setTotalRecords] = useState(0);
  const [messageApi, contextHolder] = message.useMessage();
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      try {
        setReloadingCurrentlyOrNot(true);
        const data = await getLogs(
          pageNumber,
          pageSize,
          residentialId,
          residentialRegisteredVehicleId,
          search,
          id,
          abortController
        );
        setData(data.rows);
        console.log(data.pagination);
        // if (!data.pagination.total_data_count) setTotalRecords(data.pagination.total_data_count);
      } catch (error) {
        const err = error as AxiosError;
        if (!err.response) {
          console.log('error from Table in Logs');
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
  }, [reloadTrigger, together]);

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
        rowKey={(record) => record.id}
        pagination={{
          // total: totalRecords,
          // showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
          defaultPageSize: pageSize,
          current: pageNumber,
          pageSize: pageSize,
          onChange: (page: number, size: number) => {
            setPageNumber(page);
            setPageSize(size);
          },
          showSizeChanger: true,
          showQuickJumper: width > 992 ? true : false,
          pageSizeOptions: pageOptions,
          position: ['bottomRight'],
          onShowSizeChange: (current: number, size: number) => {
            setPageSize(() => size);
          }
        }}
      />
    </>
  );
};

export default LogsTable;
