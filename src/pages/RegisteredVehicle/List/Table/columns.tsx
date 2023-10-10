import { UserRecord, genderOptionsArray, genderLiteral } from '../../models';
import type { ColumnsType } from 'antd/es/table';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

interface tableColumnProps {
  handleDeleteRecord: (record: UserRecord) => void;
  handleEditRecord: (record: UserRecord) => void;
  width: number;
}

export default function userTableColumns({ handleDeleteRecord, handleEditRecord, width }: tableColumnProps) {
  const genderFilters = genderOptionsArray.map((gender) => {
    return { value: gender, text: gender };
  });

  const columns: ColumnsType<UserRecord> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      fixed: width > 550 ? 'left' : undefined,
      sorter: (a: UserRecord, b: UserRecord) => a.id - b.id,
      ellipsis: true,
      width: width <= 992 ? 70 : 80
    },
    {
      title: 'Wing-Flat',
      dataIndex: 'name',
      key: 'name',
      fixed: width > 550 ? 'left' : undefined,
      ellipsis: true,
      width: 130
    },
    {
      title: 'Vehicle Type',
      dataIndex: 'vehicleType',
      key: 'vehicleType',
      // fixed: width > 550 ? 'left' : undefined,
      ellipsis: true,
      width: 130
    },
    {
      title: 'Vehicle Number',
      dataIndex: 'vehicleNumber',
      key: 'vehicleNumber',
      // fixed: width > 550 ? 'left' : undefined,
      ellipsis: true,
      width: 170
    },
    {
      title: 'Resident Name',
      dataIndex: 'residentName',
      key: 'residentName',
      // fixed: width > 550 ? 'left' : undefined,
      ellipsis: true,
      width: 450
    },
    {
      title: 'Vehicle Fuel Type',
      dataIndex: 'vehicleFuelType',
      key: 'vehicleFuelType',
      // fixed: width > 550 ? 'left' : undefined,
      ellipsis: true
    },
    {
      title: 'Parking Lot Name',
      dataIndex: 'parkingLotType',
      key: 'parkingLotType',
      // fixed: width > 550 ? 'left' : undefined,
      ellipsis: true
    },
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
    //   onFilter: (value: genderLiteral, record: UserRecord) => record.gender === value,
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
      render: (value: string, record: UserRecord) => {
        return (
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <EditOutlined className="action-button edit" onClick={() => handleEditRecord(record)} />
            <DeleteOutlined className="action-button delete" onClick={() => handleDeleteRecord(record)} />
          </div>
        );
      }
    }
  ];
  return columns;
}
