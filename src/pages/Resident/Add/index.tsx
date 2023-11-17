//Third party
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { AxiosError } from 'axios';

//Page specific
import { Box } from '../../../Components/Box';
1;
import AccountForm from '../../RegisteredVehicle/Components/AccountForm';
import { ResidentAddFormProps, ResidentRecord } from '../models';

//components|hooks|utils
import RetryButtonForMessage from '../../../Components/RetryButtonForMessage';
import createResident from '../../../api/Data/Resident/createResident';

export default function AddResident() {
  const [collapsed, setCollapsed] = useState(false); //To pass into the sidebar and navbar

  const initialState: ResidentAddFormProps = {
    // id: 0,
    // name: '',
    // mobileNumber: '',
    // shiftStartTime: '',
    // shiftEndTime: '',
    // gender: null,
    // email: null,
    // readableDOB: null,
    // DOB: undefined,
    firstName: '',
    lastName: '',
    wing: '',
    flatNumber: 0,
    vehicleRegistration: [''],
    allocatedSpaces: 0
  };
  const [operatorData, setOperatorData] = useState<ResidentAddFormProps>(initialState);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const handleRestore = () => {
    setOperatorData(initialState);
  };

  const handleAdd = async () => {
    try {
      const APIOperatorData = {
        ...operatorData,
        id: null
      };
      delete APIOperatorData['id'];
      console.log('APIOperatorData', APIOperatorData);
      await createResident(APIOperatorData);
      messageApi.success({
        content: `Resident added successfully`,
        duration: 3
      });
    } catch (err) {
      const error = err as AxiosError;
      if (!error.response) {
        messageApi.error({
          content: 'No server response',
          duration: 2.5,
          icon: <RetryButtonForMessage onRetryClick={() => handleAdd()} />
        });
      } else {
        messageApi.error({
          content: 'Could not add Resident',
          duration: 3,
          icon: <RetryButtonForMessage onRetryClick={() => handleAdd()} />
        });
      }
    }
  };

  return (
    <>
      {contextHolder}
      <Box collapsed={collapsed} setCollapsed={setCollapsed}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            // height: '100vh',
            backgroundColor: `var(--background-color)`,
            position: 'relative',
            flexDirection: 'column',
            padding: '0.5rem 1rem'
          }}
        >
          <AccountForm
            formType="add"
            initialState={initialState}
            operatorData={operatorData}
            handleRestore={handleRestore}
            setOperatorData={setOperatorData}
            handleAdd={handleAdd}
          />
        </div>
      </Box>
    </>
  );
}
