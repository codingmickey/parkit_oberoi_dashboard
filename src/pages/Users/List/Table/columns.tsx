import {
  ResidentRecord,
  genderOptionsArray,
  genderLiteral,
  ResidentialAllocatedParkings,
  ResidentialRegisteredVehicles
} from '../../models';
import type { ColumnsType } from 'antd/es/table';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

interface tableColumnProps {
  handleDeleteRecord: (record: ResidentRecord) => void;
  handleEditRecord: (record: ResidentRecord) => void;
  width: number;
}

export default function userTableColumns({ handleDeleteRecord, handleEditRecord, width }: tableColumnProps) {
  const genderFilters = genderOptionsArray.map((gender) => {
    return { value: gender, text: gender };
  });

  const columns: ColumnsType<ResidentRecord> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      fixed: width > 550 ? 'left' : undefined,
      sorter: (a: ResidentRecord, b: ResidentRecord) => a.id - b.id,
      ellipsis: true,
      width: width <= 992 ? 50 : 70
    },
    {
      title: 'Resident Name',
      dataIndex: 'name',
      key: 'name',
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
      title: 'Flat',
      dataIndex: 'flatNumber',
      key: 'flatNumber',
      // fixed: width > 550 ? 'left' : undefined,
      // sorter: (a: LogRecord, b: LogRecord) => a.id - b.id,
      ellipsis: true,
      width: width <= 992 ? 70 : 80
    },
    {
      title: 'Mobile Number',
      dataIndex: 'mobileNumber',
      key: 'mobileNumber',
      width: 130,
      ellipsis: true
    },
    {
      title: 'ALlocated Spaces(ID,Parking Area x Count)',
      dataIndex: 'residentialAllocatedParkings',
      key: 'residentialAllocatedParkings',
      width: 130,
      ellipsis: true,
      render: (residentialAllocatedParkings: ResidentialAllocatedParkings[]) => {
        return (
          <>
            {residentialAllocatedParkings?.map((allocatedParking) => (
              <li>
                {allocatedParking.id}
                {allocatedParking.parkingArea ? `,${allocatedParking.parkingArea}` : ``} x {allocatedParking.count}
              </li>
            ))}
          </>
        );
      }
    },
    {
      title: 'Vehicle Numbers(No. x Type)',
      dataIndex: 'residentialRegisteredVehicles',
      key: 'residentialRegisteredVehicles',
      width: 150,
      ellipsis: true,
      render: (residentialRegisteredVehicles: ResidentialRegisteredVehicles[]) => {
        return (
          <>
            {residentialRegisteredVehicles.map((registeredVehicle) => (
              <div>
                {registeredVehicle.vehicleRegistration}: {registeredVehicle.vehicleType.vehicleTypeName}
              </div>
            ))}
          </>
        );
      }
    },
    // {
    //   title: 'Name',
    //   dataIndex: 'name',
    //   key: 'name',
    //   fixed: width > 550 ? 'left' : undefined,
    //   ellipsis: true
    // },
    // {
    //   title: (
    //     <span
    //       style={{
    //         display: 'block'
    //       }}
    //     >
    //       Mobile Number
    //     </span>
    //   ),
    //   dataIndex: 'mobileNumber',
    //   key: 'mobileNumber',
    //   render: (value: string | null) => value || '-',
    //   ellipsis: true
    // },
    // {
    //   title: 'Email',
    //   dataIndex: 'email',
    //   key: 'email',
    //   render: (value: string | null) => {
    //     return value || '-';
    //   },
    //   ellipsis: true
    // },
    // {
    //   title: 'Gender',
    //   dataIndex: 'gender',
    //   key: 'gender',
    //   className: 'column-border ',
    //   ellipsis: true,
    //   filters: genderFilters,
    //   filterSearch: true,
    //   onFilter: (value: genderLiteral, record: ResidentRecord) => record.gender === value,
    //   render: (value: genderLiteral) => value || '-'
    // },
    // {
    //   title: 'Date of Birth',
    //   dataIndex: 'readableDOB',
    //   key: 'dob',
    //   ellipsis: true,
    //   render: (value: string | null) => value || '-'
    // },
    // {
    //   title: 'Shift Timings',
    //   key: 'Shift Timings',
    //   children: [
    //     {
    //       title: 'Start',
    //       dataIndex: 'shiftStartTime',
    //       key: 'shiftStartTime',
    //       ellipsis: true
    //     },
    //     {
    //       title: 'End',
    //       dataIndex: 'shiftEndTime',
    //       key: 'shiftEndTime',
    //       ellipsis: true
    //     }
    //   ]
    // },
    {
      title: 'Actions',
      key: 'action',
      render: (value: string, record: ResidentRecord) => {
        return (
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <EditOutlined className="action-button edit" onClick={() => handleEditRecord(record)} />
            <DeleteOutlined className="action-button delete" onClick={() => handleDeleteRecord(record)} />
          </div>
        );
      },
      width: 75
    }
  ];
  return columns;
}
