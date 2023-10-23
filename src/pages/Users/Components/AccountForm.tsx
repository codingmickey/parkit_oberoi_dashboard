//Third Party
import { useState } from 'react';
import { Button, Col, DatePicker, Form, Input, Row, Select, TimePicker, Tooltip } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Dayjs } from 'dayjs';
import Title from 'antd/es/typography/Title';
import { useNavigate } from 'react-router-dom';

//Page specific
import {
  AccountFormProps,
  UserRecord,
  genderLiteral,
  InputPropsForModal,
  genderOptionsArray,
  ResidentAddFormProps
} from '../models';
import './AccountFormStyles.css';

//components|hooks|utils
import { handleInputChange } from '../../../utils/setDataIntoInputBasedOfId';
import getDynamicInitialState from '../../../utils/dynamicInitialFilterStates';
import { convertInObjectNullToString } from '../../../utils/helperFunctions';

const InputWithOnChange = ({
  type,
  placeholder = type.charAt(0).toUpperCase() + type.slice(1),
  currentData,
  setCurrentData,
  disabled = false,
  setErrors
}: InputPropsForModal) => {
  return (
    <>
      <Input
        disabled={disabled}
        id={`${type}`}
        name={`${type}`}
        placeholder={`${placeholder}`}
        value={`${currentData[type]}`}
        onChange={(e) => handleInputChange<ResidentAddFormProps>(e, setCurrentData, true, setErrors)}
      />
    </>
  );
};

const AccountForm = (props: AccountFormProps) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { operatorData, formType, setOperatorData, handleRestore, initialState } = props;
  const updatedCurrentData = convertInObjectNullToString<ResidentAddFormProps>(operatorData);
  setOperatorData(updatedCurrentData);
  const [errors, setErrors] = useState<ResidentAddFormProps>(
    getDynamicInitialState<ResidentAddFormProps>(operatorData)
  );

  const genderOptions = genderOptionsArray.map((gender) => {
    return { label: gender };
  });

  const handleGenderChange = (gender: genderLiteral) => {
    setOperatorData((prevData) => ({
      ...prevData,
      gender: gender
    }));
  };

  const handleTimeRangeChange = (formatString: [string, string]) => {
    setOperatorData((prevData) => ({
      ...prevData,
      shiftStartTime: formatString[0],
      shiftEndTime: formatString[1]
    }));
  };

  const handleSubmit = () => {
    if (formType === 'add') {
      props.handleAdd();
    } else if (formType === 'edit') {
      props.handleEdit();
    }
  };

  const handleDateOfBirthChange = (date: Dayjs | null) => {
    setOperatorData((prevData) => ({
      ...prevData,
      DOB: date?.toDate()
    }));
  };

  const handleAddVehicle = () => {
    setOperatorData((prevData) => ({
      ...prevData,
      vehicleRegistration: [...prevData.vehicleRegistration, '']
    }));
  };

  return (
    <>
      <div style={{ display: 'flex' }}>
        <Title style={{ display: 'flex' }}>
          <Tooltip title={'Go back'}>
            <ArrowLeftOutlined
              style={{
                marginTop: '8px',
                marginRight: '15px',
                fontSize: '2.063rem'
              }}
              onClick={() => {
                navigate('/dashboard/operator');
              }}
            />
          </Tooltip>
          {formType === 'edit' ? 'Edit' : 'Add'} Operator
        </Title>
      </div>
      <div
        className="edit-add-card"
        style={{
          backgroundColor: 'var(--background-color-secondary)',
          borderRadius: '20px',
          padding: '20px',
          minWidth: '50%',
          maxWidth: '75%'
        }}
      >
        <Form form={form} onFinish={handleSubmit} initialValues={initialState}>
          <Row gutter={16}>
            {formType === 'edit' && (
              <Col xs={24} sm={9}>
                <Form.Item name="id" label="ID">
                  <InputWithOnChange
                    disabled={true}
                    type={'id'}
                    setCurrentData={setOperatorData}
                    currentData={operatorData}
                    setErrors={setErrors}
                  />
                </Form.Item>
              </Col>
            )}
            <Col xs={24} sm={operatorData.id !== 0 ? 15 : 24}>
              <Form.Item
                name="firstName"
                label="First Name"
                id="fName"
                rules={[{ required: true, message: 'Please enter the First Name' }]}
                validateStatus={errors.firstName ? 'error' : ''}
                help={errors.firstName}
              >
                <InputWithOnChange
                  type={'firstName'}
                  setCurrentData={setOperatorData}
                  currentData={operatorData}
                  setErrors={setErrors}
                />
              </Form.Item>
              <Form.Item
                name="lastName"
                label="Last Name"
                id="lName"
                rules={[{ message: 'Please enter the Last Name' }]}
                validateStatus={errors.lastName ? 'error' : ''}
                help={errors.lastName}
              >
                <InputWithOnChange
                  type={'lastName'}
                  setCurrentData={setOperatorData}
                  currentData={operatorData}
                  setErrors={setErrors}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={9}>
              <Form.Item
                name="wing"
                label="Wing"
                id="wing"
                rules={[{ required: true, message: 'Please enter the wing' }]}
                validateStatus={errors.wing ? 'error' : ''}
                help={errors.wing}
              >
                <InputWithOnChange
                  type={'wing'}
                  setCurrentData={setOperatorData}
                  currentData={operatorData}
                  setErrors={setErrors}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={9}>
              <Form.Item
                name="flatNumber"
                label="Flat Number"
                id="flatNumber"
                rules={[{ required: true, message: 'Please enter the flat number' }]}
                validateStatus={errors.flatNumber ? 'error' : ''}
                help={errors.flatNumber}
              >
                <InputWithOnChange
                  type={'flatNumber'}
                  setCurrentData={setOperatorData}
                  currentData={operatorData}
                  setErrors={setErrors}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={9}>
              <Form.Item
                name="allocatedSpaces"
                label="Allocated Spaces"
                id="allocatedSpaces"
                rules={[{ required: true, message: 'Please enter the allocated spaces' }]}
                validateStatus={errors.allocatedSpaces ? 'error' : ''}
                help={errors.allocatedSpaces}
              >
                <InputWithOnChange
                  type={'allocatedSpaces'}
                  setCurrentData={setOperatorData}
                  currentData={operatorData}
                  setErrors={setErrors}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            {operatorData.vehicleRegistration.map((vehicle, index) => (
              <Col>
                <div key={index}>
                  <Form.Item
                    name={['vehicles', index]}
                    label={`Vehicle ${index + 1}`}
                    rules={[{ required: true, message: 'Please input the vehicle registration number!' }]}
                  >
                    <Input placeholder="Enter registration number" />
                  </Form.Item>
                </div>
              </Col>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={handleAddVehicle} style={{ width: '100%' }}>
                + Add Vehicle
              </Button>
            </Form.Item>
          </Row>
          <Row>
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              <Button
                className="negative-action-button"
                onClick={() => {
                  handleRestore();
                }}
              >
                {formType === 'edit' ? 'Restore' : 'Clear'}
              </Button>
              <Button className="positive-action-button" onClick={handleSubmit}>
                Submit
              </Button>
            </div>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default AccountForm;
