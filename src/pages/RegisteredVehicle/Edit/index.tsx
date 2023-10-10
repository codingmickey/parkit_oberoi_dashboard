// Third Party
import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { message } from 'antd';
import { AxiosError } from 'axios';

// Page specific
import AccountForm from '../Components/AccountForm';
import { UserRecord } from '../models';
import getSingleOperatorData from '../../../api/Data/Users/getSingleOperator';
import updateUser from '../../../api/Data/Users/updateUser';

// Components | hooks | utils
import RetryButtonForMessage from '../../../Components/RetryButtonForMessage';
import dayjs from 'dayjs';
import SkeletonInForm from '../../../Components/Form/SkeletonInForm';

export default function EditOperator() {
  const navigate = useNavigate();
  const { id } = useParams();
  if (!id) {
    navigate(-1);
  }
  const [operatorData, setOperatorData] = useState<UserRecord>();
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setIsLoading] = useState(true);

  const initialStateRef = useRef();

  const handleEdit = async () => {
    try {
      await updateUser(operatorData);
      messageApi.success({
        content: 'Operator details updated',
        duration: 3
      });
    } catch (err) {
      const error = err as AxiosError;
      if (!error.response) {
        messageApi.error({
          content: 'No server response',
          duration: 2.5,
          icon: <RetryButtonForMessage onRetryClick={() => handleEdit()} />
        });
      } else {
        messageApi.error({
          content: 'There was an error editing the data',
          duration: 3,
          icon: <RetryButtonForMessage onRetryClick={() => handleEdit()} />
        });
      }
    }
  };

  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();

    const getOperatorData = async () => {
      try {
        setIsLoading(true);
        const data = await getSingleOperatorData(parseInt(id.substring(1)), abortController);
        setOperatorData(() => data);

        // Store the initial state using the useRef hook
        const dateInDayjsFormat = data.DOB && dayjs(data.DOB).isValid() ? dayjs(data.DOB) : undefined;
        const shiftStartTimeInDayjsFormat = data.shiftStartTime ? dayjs(data.shiftStartTime, 'HH:mm:ss') : null;
        const shiftEndTimeInDayjsFormat = data.shiftEndTime ? dayjs(data.shiftEndTime, 'HH:mm:ss') : null;
        initialStateRef.current = {
          id: data.id || 0,
          name: data.name || '',
          gender: data.gender || undefined,
          email: data.email || '',
          DOB: dateInDayjsFormat,
          mobileNumber: data.mobileNumber || '',
          shiftStartTime: shiftStartTimeInDayjsFormat,
          shiftEndTime: shiftEndTimeInDayjsFormat,
          readableDOB: data.readableDOB
        } as any;
      } catch (err) {
        if (isMounted) {
          console.log(err);
          const error = err as AxiosError;
          if (!error.response) {
            messageApi.error({
              content: 'No server response',
              duration: 2.5,
              icon: <RetryButtonForMessage onRetryClick={() => getOperatorData()} />
            });
          } else {
            messageApi.error({
              content: 'Could not find user',
              duration: 3
            });
          }
        }
        navigate(-1);
      } finally {
        setIsLoading(false);
      }
    };
    getOperatorData();
    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, []);

  // When restoring the state, use the initialStateRef.current
  const handleRestore = () => {
    setOperatorData(initialStateRef.current);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '110vh',
        backgroundColor: `var(--background-color)`,
        flexDirection: 'column'
      }}
    >
      {isLoading ? (
        <>
          <div
            className="edit-add-card"
            style={{
              margin: ' 0px auto',
              backgroundColor: 'var(--background-color-secondary)',
              borderRadius: '20px',
              width: '60%',
              display: 'block',
              padding: '20px'
            }}
          >
            <SkeletonInForm numberOfSkeletons={15} typeOfSkeleton="input" />
          </div>
        </>
      ) : (
        <AccountForm
          formType="edit"
          operatorData={operatorData}
          initialState={initialStateRef.current}
          setOperatorData={setOperatorData}
          handleEdit={handleEdit}
          handleRestore={handleRestore}
        />
      )}
    </div>
  );
}
