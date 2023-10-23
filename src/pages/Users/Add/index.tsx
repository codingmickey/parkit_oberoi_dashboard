//Third party
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { AxiosError } from 'axios';

//Page specific
import AccountForm from '../Components/AccountForm';
import { ResidentAddFormProps, ResidentRecord } from '../models';
import createUser from '../../../api/Data/Users/createUser';

//components|hooks|utils
import RetryButtonForMessage from '../../../Components/RetryButtonForMessage';

export default function AddOperator() {
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
      await createUser(APIOperatorData);
      messageApi.success({
        content: `User added successfully`,
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
          content: 'Could not add user',
          duration: 3,
          icon: <RetryButtonForMessage onRetryClick={() => handleAdd()} />
        });
      }
    }
  };

  return (
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
  );
}
