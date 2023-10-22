//Third party
import { useEffect, useState } from 'react';
import { Table, message, Modal, Row, Tooltip } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
// import { Scrollbar } from "react-scrollbars-custom";

//Page Specific
import { UserRecord, TableProps, ResidentRecord } from '../../models';
import userTableColumns from './columns';
import { AxiosError } from 'axios';
import getUserData from '../../../../api/Data/Users/getusers';
import deleteUserData from '../../../../api/Data/Users/deleteUser';

//components|hooks|utils
import RetryButtonForMessage from '../../../../Components/RetryButtonForMessage';
import useWindowDimensions from '../../../../Hooks/windowDimension';
import HeightPropsForTable from '../../../../Styles/CSS/CommonProps/HeightPropsForTable';
import getResidents from '../../../../api/Data/Resident/getResident';

const ResidentsTable = ({
  reloadTrigger,
  setReloadTrigger,
  reloadingCurrentlyOrNot,
  setReloadingCurrentlyOrNot,
  filters,
  data,
  setData,
  together
}: TableProps) => {
  const navigate = useNavigate();
  const pageOptions = ['10', '15', '20', '30'];
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [messageApi, contextHolder] = message.useMessage();
  const { width, height } = useWindowDimensions();
  let currentDataTemporarilyStored: ResidentRecord[]; //used for optimistic updated in delete

  const expandSearchParamsForAPICall = () => {
    const searchParams = Object.values(filters).join(' ').trim();
    return searchParams;
  };

  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      try {
        setReloadingCurrentlyOrNot(true);
        // const search = expandSearchParamsForAPICall();
        const data = await getResidents(pageNumber, pageSize, abortController);
        // (pageNumber, pageSize, together, search, abortController);
        setData(data.data);
        setTotalRecords(data.total_data_count);
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
    fetchData();
    return () => {
      abortController.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reloadTrigger, pageSize, pageNumber, together]);

  const handleDeleteRecord = async (record: UserRecord) => {
    currentDataTemporarilyStored = data.slice();
    const deleteData = async () => {
      try {
        setData(currentDataTemporarilyStored.filter((item) => item.mobileNumber !== record.mobileNumber));
        const abortController = new AbortController();
        await deleteUserData(record.mobileNumber, abortController);
        messageApi.success({
          content: `User ${record.name} deleted`,
          duration: 3
        });
      } catch (err) {
        const error = err as AxiosError;
        if (!error.response) {
          messageApi.error({
            content: 'No server response',
            duration: 2.5,
            icon: <RetryButtonForMessage onRetryClick={() => handleDeleteRecord(record)} />
          });
        } else {
          messageApi.error({
            content: 'Error deleting user',
            duration: 3,
            icon: <RetryButtonForMessage onRetryClick={() => handleDeleteRecord(record)} />
          });
        }
        setData(currentDataTemporarilyStored);
      }
    };

    Modal.confirm({
      title: 'Delete Operator',
      content: `Are you sure you want to delete the Operator ${record.name} with id=${record.id}?`,
      okText: 'Yes',
      cancelText: 'Cancel',
      centered: true,
      okButtonProps: {
        tabIndex: 3,
        className: 'positive-action-button'
      },
      cancelButtonProps: {
        tabIndex: 2,
        className: 'negative-action-button'
      },
      onOk: deleteData
    });
  };

  const columns = userTableColumns({
    handleDeleteRecord,
    handleEditRecord: (record) => {
      navigate(`/dashboard/operator/edit/:${record.id}`);
    },
    width
  });

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
        pagination={{
          total: totalRecords,
          defaultCurrent: pageNumber,
          defaultPageSize: pageSize,
          pageSizeOptions: pageOptions,
          onChange: (page: number) => {
            setPageNumber(page);
          },
          onShowSizeChange: (current: number, size: number) => {
            setPageSize(size);
          },
          showSizeChanger: true,
          showQuickJumper: width > 992 ? true : false,
          position: ['bottomRight']
        }}
        footer={() =>
          data.length > 0 && (
            <Row>
              <div className="add-user-svg">
                <Tooltip title={'Add Operator'} placement="bottomLeft">
                  <UserAddOutlined
                    style={{
                      color: `var(--font-color)`,
                      fontSize: `${width > 992 ? '19px' : '15px'}`,
                      position: 'absolute',
                      marginTop: '20px',
                      marginLeft: '19px'
                    }}
                    onClick={() => {
                      navigate('/dashboard/operator/add');
                    }}
                  />
                </Tooltip>
              </div>
            </Row>
          )
        }
      />
    </>
  );
};

export default ResidentsTable;
