//Third party
import { Table, message, Typography } from 'antd';
import { useEffect } from 'react';

//Page specific
import { IndexForTableProps } from '../../Models/models';
import { DailyReportData, DailyReportFilterTypes } from '../../Models/dailyReportTypes';
import { AxiosError } from 'axios';
import TableColumns from '../ColumnsForReports/dailyReportColumns';

//components|hooks|utils
import useWindowDimensions from '../../../../Hooks/windowDimension';
import RetryButtonForMessage from '../../../../Components/RetryButtonForMessage';
import HeightPropsForTable from '../../../../Styles/CSS/CommonProps/HeightPropsForTable';
import getDailyReportData from '../../../../api/Data/Report/getDailyReport';

type DailyReportTableProps = Omit<IndexForTableProps, 'data' | 'filters'> &
  DailyReportData & { filters: DailyReportFilterTypes };

export default function DailyReportTable({
  reloadTrigger,
  setReloadTrigger,
  reloadingCurrentlyOrNot,
  setReloadingCurrentlyOrNot,
  filters,
  data,
  total,
  setData
}: DailyReportTableProps) {
  const [messageApi, contextHolder] = message.useMessage();
  const { width, height } = useWindowDimensions();
  const { Text } = Typography;

  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      try {
        setReloadingCurrentlyOrNot(true);
        const data = await getDailyReportData(1, 24, filters.date, abortController);
        setData((prev) => {
          return {
            ...prev,
            daily: {
              data: data.data,
              total: data.total
            }
          };
        });
        // setTotalRecords((prev) => {
        //   return data.pagination?.total_data_count ;
        // });
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
    !data && fetchData();
    return () => {
      abortController.abort();
    };
  }, [reloadTrigger]);

  const columns = TableColumns(width);

  return (
    <>
      {contextHolder}
      <Table
        // className={data.length > 0 ? "data-exist" : ""}
        dataSource={data}
        columns={columns}
        bordered={true}
        scroll={{
          x: 1100,
          y: HeightPropsForTable(height)
        }}
        loading={reloadingCurrentlyOrNot}
        summary={() => {
          return (
            <Table.Summary.Row>
              <Table.Summary.Cell index={0}>
                <Text strong>TOTAL</Text>
              </Table.Summary.Cell>
              {/*map in columns and get data*/}
              {Object.keys((total) => {
                console.log(total);
              })}
              <Table.Summary.Cell index={1}>{total?.cashPaymentsCount}</Table.Summary.Cell>
            </Table.Summary.Row>
          );
        }}
      />
    </>
  );
}
