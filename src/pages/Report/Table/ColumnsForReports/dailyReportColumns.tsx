import { DailyDataRecord } from '../../Models/dailyReportTypes';
import type { ColumnsType } from 'antd/es/table';

export default function TableColumns(width: number) {
  const columns: ColumnsType<DailyDataRecord> = [
    {
      title: 'Hour',
      dataIndex: 'hour',
      key: 'hour',
      fixed: width > 550 ? 'left' : undefined,
      width: width <= 992 ? 70 : 80,
      ellipsis: true,
      sorter: (a: DailyDataRecord, b: DailyDataRecord) => (a.hour = b.hour)
    },
    {
      title: 'Cash',
      key: 'cash',
      children: [
        {
          title: 'Count',
          dataIndex: 'cashPaymentsCount',
          key: 'cashPaymentsCount',
          ellipsis: true
        },
        {
          title: 'Sum',
          dataIndex: 'cashPaymentsSum',
          key: 'cashPaymentsSum',
          ellipsis: true
        }
      ]
    },
    {
      title: 'UPI',
      key: 'upi',
      children: [
        {
          title: 'Count',
          dataIndex: 'upiPaymentsCount',
          key: 'upiPaymentsCount',
          ellipsis: true
        },
        {
          title: 'Sum',
          dataIndex: 'upiPaymentsSum',
          key: 'upiPaymentsSum',
          ellipsis: true
        }
      ]
    },
    {
      title: 'Fastag',
      key: 'fastag',
      children: [
        {
          title: 'Count',
          dataIndex: 'fastagPaymentsCount',
          key: 'fastagPaymentsCount',
          ellipsis: true
        },
        {
          title: 'Sum',
          dataIndex: 'fastagPaymentsSum',
          key: 'fastagPaymentsSum',
          ellipsis: true
        }
      ]
    },
    {
      title: 'Total',
      key: 'total',
      children: [
        {
          title: 'Count',
          dataIndex: 'totalNumberOfPayments',
          key: 'totalNumberOfPayments',
          ellipsis: true
        },
        {
          title: 'Sum',
          dataIndex: 'totalCollection',
          key: 'totalCollection',
          ellipsis: true
        }
      ]
    }
  ];

  return columns;
}
