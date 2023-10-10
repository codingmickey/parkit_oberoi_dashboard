import {
  LogRecord,
  laneNumberLiteral,
  laneOptionsArray,
  paymentOptionsArray,
  ReadableEventInTimestampProps,
  ParkingSpot,
  WhitelistReference,
  paymentTypesForToll,
  ResidentRegisterVehicle,
  Residential,
  CheckOutLogs
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
      fixed: width > 550 ? 'left' : undefined,
      sorter: (a: LogRecord, b: LogRecord) => a.id - b.id,
      ellipsis: true,
      width: width <= 992 ? 70 : 60
    },
    {
      title: 'Vehicle Registration',
      dataIndex: 'residentialRegisteredVehicle',
      key: 'vehicleRegistration',
      width: 120,
      // fixed: width > 550 ? 'left' : undefined,
      ellipsis: true,
      render: (vehicleRegistration: ResidentRegisterVehicle) => vehicleRegistration.vehicleRegistration || '-'
    },
    {
      title: 'Resident Name',
      dataIndex: 'residential',
      key: 'residentName',
      width: 151,
      ellipsis: true,
      render: (residential: Residential) => residential.name || '-'
    },
    {
      title: 'Wing',
      dataIndex: 'residential',
      key: 'residentialWing',
      width: 55,
      ellipsis: true,
      render: (residential: Residential) => residential.wing || '-'
    },
    {
      title: 'Flat',
      dataIndex: 'residential',
      key: 'residentialFlat',
      width: 65,
      ellipsis: true,
      render: (residential: Residential) => residential.flatNumber || '-'
    },
    {
      title: 'CheckIn',
      key: 'checkInTimestamp',
      children: [
        {
          title: 'Date',
          dataIndex: 'redableCheckInTimestamp',
          render: (redableEventInTimestamp: ReadableEventInTimestampProps) => {
            return redableEventInTimestamp.date;
          },
          ellipsis: true,
          width: 110
        },
        {
          title: 'Time',
          dataIndex: 'redableCheckInTimestamp',
          render: (redableEventInTimestamp: ReadableEventInTimestampProps) => {
            return redableEventInTimestamp.time;
          },
          ellipsis: true,
          width: 85
        },
        {
          title: 'Gate',
          dataIndex: 'checkInGateNo',
          // render: (redableEventInTimestamp: CheckOutLogs) =>
          //   redableEventInTimestamp.length > 0 ? redableEventInTimestamp[0].checkOutGateNo : '-',
          ellipsis: true,
          width: 50
        }
      ]
    },
    {
      title: 'CheckOut',
      key: 'checkOutTimestamp',
      children: [
        {
          title: 'Date',
          dataIndex: 'checkOutLogs',
          render: (redableEventInTimestamp: CheckOutLogs) =>
            redableEventInTimestamp.length > 0 ? redableEventInTimestamp[0].redableCheckOutTimestamp?.date : '-',
          ellipsis: true,
          width: 100
        },
        {
          title: 'Time',
          dataIndex: 'checkOutLogs',
          render: (redableEventInTimestamp: CheckOutLogs) =>
            redableEventInTimestamp.length > 0 ? redableEventInTimestamp[0].redableCheckOutTimestamp?.time : '-',
          ellipsis: true,
          width: 85
        },
        {
          title: 'Gate',
          dataIndex: 'checkOutLogs',
          render: (redableEventInTimestamp: CheckOutLogs) =>
            redableEventInTimestamp.length > 0 ? redableEventInTimestamp[0].checkOutGateNo : '-',
          ellipsis: true,
          width: 50
        }
      ]
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
      width: 130,
      ellipsis: true
    },
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
    {
      title: 'Images',
      key: 'image',
      filters: vehicleImageFilters,
      filterSearch: true,
      onFilter: (value: number, record: LogRecord) => {
        let noOfImages = 0;
        if (record.vehicleImage1) noOfImages++;
        if (record.vehicleImage2) noOfImages++;
        return noOfImages === value;
      },
      children: [
        {
          dataIndex: 'vehicleImage1',
          title: '1',
          width: 126,
          render: (vehicleImage1: string) => {
            return (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Image.PreviewGroup preview={vehicleImage1 ? true : false}>
                  <Image
                    width={110}
                    height={90}
                    src={vehicleImage1}
                    fallback={loadingFailed}
                    loading="lazy"
                    alt="Image Captured"
                  />
                </Image.PreviewGroup>
              </div>
            );
          }
        },
        {
          dataIndex: 'vehicleImage2',
          width: 126,
          title: '2',
          render: (vehicleImage2: string) => {
            return (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Image.PreviewGroup preview={vehicleImage2 ? true : false}>
                  <Image
                    width={110}
                    height={90}
                    src={vehicleImage2}
                    fallback={loadingFailed}
                    loading="lazy"
                    alt="Image Captured"
                  />
                </Image.PreviewGroup>
              </div>
            );
          }
        }
      ]
    }
  ];
  return columns;
}
