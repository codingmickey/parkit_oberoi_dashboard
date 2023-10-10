import {
  LogRecord,
  laneNumberLiteral,
  laneOptionsArray,
  paymentOptionsArray,
  ReadableEventInTimestampProps,
  ParkingSpot,
  WhitelistReference,
  paymentTypesForToll
} from '../models';
import type { ColumnsType } from 'antd/es/table';
import { Image } from 'antd';
import loadingFailed from '../../../Assets/Images/Miscellaneous/loadingFailed.svg';

interface tableColumnProps {
  width: number;
}

export default function TableColumns({ width }: tableColumnProps) {
  const paymentFilters = paymentOptionsArray.map((paymentOption) => {
    return { value: paymentOption, text: paymentOption };
  });
  const laneOptionsFilter = laneOptionsArray.map((laneOption) => {
    return { value: laneOption, text: `Lane ${laneOption}` };
  });
  const vehicleImageFilters = [
    {
      value: 0,
      text: 'No image captured'
    },
    {
      value: 1,
      text: '1 or more image'
    },
    {
      value: 2,
      text: '2 or more image'
    }
  ];

  const columns: ColumnsType<LogRecord> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      // fixed: width > 550 ? 'left' : undefined,
      sorter: (a: LogRecord, b: LogRecord) => a.id - b.id,
      ellipsis: true,
      width: width <= 992 ? 70 : 80
    },
    {
      title: 'Resident Name',
      dataIndex: 'residentName',
      key: 'residentName',
      width: 151,
      // fixed: width > 550 ? 'left' : undefined,
      ellipsis: true
      // render: (vehicleRegistration: string) => vehicleRegistration || '-'
    },
    {
      title: 'Wing',
      dataIndex: 'wing',
      key: 'wing',
      // fixed: width > 550 ? 'left' : undefined,
      // sorter: (a: LogRecord, b: LogRecord) => a.id - b.id,
      ellipsis: true,
      width: width <= 992 ? 70 : 80
    },
    {
      title: 'Vehicle Number',
      dataIndex: 'vehicleNumber',
      key: 'vehicleNumber',
      width: 130,
      ellipsis: true
    },
    {
      title: 'Vehicle Type',
      dataIndex: 'vehicleType',
      key: 'vehicleType',
      width: 130,
      ellipsis: true
    },
    {
      title: 'Check In',
      key: 'checkInTimeStamp',
      children: [
        {
          title: 'Date',
          dataIndex: 'redableEventInTimestamp',
          render: (redableEventInTimestamp: ReadableEventInTimestampProps) => {
            return redableEventInTimestamp.date;
          },
          ellipsis: true,
          width: 110
        },
        {
          title: 'Time',
          dataIndex: 'redableEventInTimestamp',
          render: (redableEventInTimestamp: ReadableEventInTimestampProps) => redableEventInTimestamp.time,
          ellipsis: true,
          width: 100
        },
        {
          title: 'Gate',
          dataIndex: 'checkInGate',
          key: 'checkInGate',
          width: 100,
          ellipsis: true
        }
      ]
    },
    {
      title: 'Check Out',
      key: 'checkOutTimeStamp',
      children: [
        {
          title: 'Date',
          dataIndex: 'redableEventInTimestamp',
          render: (redableEventInTimestamp: ReadableEventInTimestampProps) => {
            return redableEventInTimestamp.date;
          },
          ellipsis: true,
          width: 110
        },
        {
          title: 'Time',
          dataIndex: 'redableEventInTimestamp',
          render: (redableEventInTimestamp: ReadableEventInTimestampProps) => redableEventInTimestamp.time,
          ellipsis: true,
          width: 100
        },
        {
          title: 'Gate',
          dataIndex: 'checkOutGate',
          key: 'checkOutGate',
          width: 100,
          ellipsis: true
        }
      ]
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
      width: 130,
      ellipsis: true
    }
    // {
    //   title: 'Amount Collected',
    //   dataIndex: 'amountCollected',
    //   key: 'amountCollected',
    //   width: 130,
    //   ellipsis: true
    // },
    // {
    //   title: 'Payment Method',
    //   dataIndex: 'paymentMethod',
    //   key: 'paymentMethod',
    //   width: 130,
    //   ellipsis: true,
    //   filters: paymentFilters,
    //   filterSearch: true,
    //   onFilter: (value: paymentTypesForToll, record: LogRecord) => record.paymentMethod === value,
    //   render: (value: paymentTypesForToll) => value || '-'
    // },
    // {
    //   title: 'Images',
    //   key: 'image',
    //   filters: vehicleImageFilters,
    //   filterSearch: true,
    //   onFilter: (value: number, record: LogRecord) => {
    //     let noOfImages = 0;
    //     if (record.vehicleImage1) noOfImages++;
    //     if (record.vehicleImage2) noOfImages++;
    //     return noOfImages === value;
    //   },
    //   children: [
    //     {
    //       dataIndex: 'vehicleImage1',
    //       title: '1',
    //       width: 126,
    //       render: (vehicleImage1: string) => {
    //         return (
    //           <div style={{ display: 'flex', justifyContent: 'center' }}>
    //             <Image.PreviewGroup preview={vehicleImage1 ? true : false}>
    //               <Image
    //                 width={110}
    //                 height={90}
    //                 src={vehicleImage1}
    //                 fallback={loadingFailed}
    //                 loading="lazy"
    //                 alt="Image Captured"
    //               />
    //             </Image.PreviewGroup>
    //           </div>
    //         );
    //       }
    //     },
    //     {
    //       dataIndex: 'vehicleImage2',
    //       width: 126,
    //       title: '2',
    //       render: (vehicleImage2: string) => {
    //         return (
    //           <div style={{ display: 'flex', justifyContent: 'center' }}>
    //             <Image.PreviewGroup preview={vehicleImage2 ? true : false}>
    //               <Image
    //                 width={110}
    //                 height={90}
    //                 src={vehicleImage2}
    //                 fallback={loadingFailed}
    //                 loading="lazy"
    //                 alt="Image Captured"
    //               />
    //             </Image.PreviewGroup>
    //           </div>
    //         );
    //       }
    //     }
    //   ]
    // },
    // {
    //   title: 'Lane Number',
    //   dataIndex: 'laneNumber',
    //   key: 'laneNumber',
    //   width: 115,
    //   ellipsis: true,
    //   render: (laneNumber: string | null) => laneNumber || '-',
    //   filters: laneOptionsFilter,
    //   filterSearch: true,
    //   onFilter: (value: laneNumberLiteral, record: LogRecord) => record.laneNumber === value
    // },
    // {
    //   title: 'Parking spot',
    //   dataIndex: 'parkingSpot',
    //   key: 'parkingSpotName',
    //   ellipsis: true,
    //   width: 100,
    //   render: (parkingSpot: ParkingSpot) => parkingSpot?.parkingSpotName || '-'
    // },
    // {
    //   title: 'Whitelist',
    //   dataIndex: 'whitelist',
    //   key: 'whitelistReference',
    //   width: 95,
    //   ellipsis: true,
    //   render: (whitelistReference: WhitelistReference) => whitelistReference?.name || '-'
    // }
  ];
  return columns;
}
