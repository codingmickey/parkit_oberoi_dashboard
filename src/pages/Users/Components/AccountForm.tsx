//Third Party
import { useState } from 'react';
import { Button, Col, DatePicker, Form, Input, Row, Select, TimePicker, Tooltip } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Dayjs } from 'dayjs';
import Title from 'antd/es/typography/Title';
import { useNavigate } from 'react-router-dom';

//Page specific
import { AccountFormProps, UserRecord, genderLiteral, InputPropsForModal, genderOptionsArray } from '../models';
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
        onChange={(e) => handleInputChange<UserRecord>(e, setCurrentData, true, setErrors)}
      />
    </>
  );
};

const AccountForm = (props: AccountFormProps) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { operatorData, formType, setOperatorData, handleRestore, initialState } = props;
  const updatedCurrentData = convertInObjectNullToString<UserRecord>(operatorData);
  setOperatorData(updatedCurrentData);
  const [errors, setErrors] = useState<UserRecord>(getDynamicInitialState<UserRecord>(operatorData));

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
          padding: '20px'
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
                name="name"
                label="Name"
                id="name"
                rules={[{ required: true, message: 'Please enter the name' }]}
                validateStatus={errors.name ? 'error' : ''}
                help={errors.name}
              >
                <InputWithOnChange
                  type={'name'}
                  setCurrentData={setOperatorData}
                  currentData={operatorData}
                  setErrors={setErrors}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={20} sm={9}>
              <Form.Item name="gender" label="Gender" fieldId="gender" id="gender">
                <Select
                  style={{
                    width: '100%',
                    color: `var(--font-color)`
                  }}
                  id="gender"
                  size="large"
                  placeholder="Gender"
                  value={operatorData.gender}
                  options={genderOptions}
                  onChange={(value) => value && handleGenderChange(value)}
                ></Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={15} style={{ paddingLeft: '18px' }}>
              <Form.Item name="email" label="Email" validateStatus={errors.email ? 'error' : ''} help={errors.email}>
                <InputWithOnChange
                  type="email"
                  setCurrentData={setOperatorData}
                  currentData={operatorData}
                  setErrors={setErrors}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={20} sm={9}>
              <Form.Item name="Date of Birth" label="DOB" id="DOB" fieldId="DOB">
                <DatePicker
                  format="DD-MM-YYYY"
                  placeholder="dd-mm-yyyy"
                  id="DOB"
                  name="DOB"
                  defaultValue={initialState.DOB}
                  placement="bottomRight"
                  size="middle"
                  onChange={handleDateOfBirthChange}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={15}>
              <Form.Item
                name="mobileNumber"
                id="mobileNumber"
                label="Mobile Number"
                rules={[{ required: true, message: 'Please enter the mobile number' }]}
                validateStatus={errors.mobileNumber ? 'error' : ''}
                help={errors.mobileNumber}
              >
                <InputWithOnChange
                  type="mobileNumber"
                  placeholder="Mobile Number"
                  setCurrentData={setOperatorData}
                  currentData={operatorData}
                  setErrors={setErrors}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col>
              <Form.Item
                id="shiftTimeRange"
                name="ShiftTimeRange"
                label="Shift Time Range"
                rules={[
                  {
                    required: true,
                    message: 'Please enter the shift time range'
                  }
                ]}
              >
                <TimePicker.RangePicker
                  format="HH:mm:ss"
                  placeholder={['Shift Start Time', 'Shift End Time']}
                  onChange={(values, formatString) => handleTimeRangeChange(formatString)}
                  defaultValue={[initialState.shiftStartTime, initialState.shiftEndTime]}
                />
              </Form.Item>
            </Col>
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
