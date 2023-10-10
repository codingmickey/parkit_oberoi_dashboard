//Third party
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ClearOutlined, ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, TimeRangePickerProps, Tooltip, message } from 'antd';

//page specific
import { FilterProps, FilterHeaderComponentProps } from '../models';
import { smallButtonStyleProps } from '../../../Styles/CSS/CommonProps/smallButtonStyleProps';

//components|hooks|utils
import FloatInput from '../../../Components/FloatingInput/FloatingInput';
import FilterOptionsDropDown from '../../../Components/FilterOptionsDropDown';
import getDynamicInitialState from '../../../utils/dynamicInitialFilterStates';
import { handleInputChange } from '../../../utils/setDataIntoInputBasedOfId';
import useWindowDimensions from '../../../Hooks/windowDimension';
import ExportOptionsDropdown from '../../../Components/ExportOptionsDropdown';
import dayjs from 'dayjs';

export default function LogsFilter({
  setReloadTrigger,
  reloadingCurrentlyOrNot,
  filters,
  setFilters,
  data,
  together,
  setTogether
}: FilterHeaderComponentProps) {
  const initialStateOfFilters = getDynamicInitialState(filters);
  const [errors, setErrors] = useState<FilterProps>(initialStateOfFilters);
  const [lastRefreshTime, setLastRefreshTime] = useState<Date>(new Date());
  const [lastRefreshTimeFormatted, setLastRefreshTimeFormatted] = useState('');
  const { width } = useWindowDimensions();
  const [searchParams, setSearchParams] = useSearchParams();
  const [messageApi, contextHolder] = message.useMessage();
  const { RangePicker } = DatePicker;

  const handleDateRangeChange = (dates: [string, string]) => {
    const dateData = { ...filters, startDate: dates[0], endDate: dates[1] };
    setFilters(dateData);
    setSearchParams(dateData);
    setReloadTrigger((prev) => prev + 1);
  };

  //for exporting
  const tableData = {
    columns: [
      { dataKey: 'id', header: 'ID' },
      { dataKey: 'eventTimestamp', header: 'Event Timestamp' },
      { dataKey: 'laneNumber', header: 'Lane Number' },
      { dataKey: 'vehicleRegistration', header: 'Vehicle Registration' },
      { dataKey: 'amountCollected', header: 'Amount Collected' },
      { dataKey: 'paymentMethod', header: 'Payment Method' },
      { dataKey: 'createdAt', header: 'Created At' },
      { dataKey: 'updatedAt', header: 'Updated At' },
      { dataKey: 'parkingSpotId', header: 'Parking Spot' },
      { dataKey: 'tollVehicleTypeId', header: 'Vehicle Type' },
      { dataKey: 'bookingId', header: 'Booking ID' },
      { dataKey: 'whitelistReferenceId', header: 'Whitelist ID' }
    ],
    data: data
  };

  const dealingWithClearFilters = () => {
    setReloadTrigger((prev) => prev + 1);
    setFilters(initialStateOfFilters);
    setSearchParams({});
  };

  const setDataIntoFilters = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange<FilterProps>(e, setFilters, true, setErrors);
  };

  const onSubmitOfSearch = () => {
    setSearchParams(filters);
    const hasErrors = Object.values(errors).some((error) => error !== '');
    if (hasErrors) {
      //! this message never gets displayed
      messageApi.error({
        content: 'Please enter valid data',
        duration: 3
      });
      return;
    }
    setReloadTrigger((prev) => prev + 1);
  };

  const rangePresets: TimeRangePickerProps['presets'] = [
    { label: 'Last 7 Days', value: [dayjs().add(-7, 'd'), dayjs()] },
    { label: 'Last 14 Days', value: [dayjs().add(-14, 'd'), dayjs()] },
    { label: 'Last 30 Days', value: [dayjs().add(-30, 'd'), dayjs()] },
    { label: 'Last 90 Days', value: [dayjs().add(-90, 'd'), dayjs()] }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeDiff = now.getTime() - lastRefreshTime.getTime();
      let message = '';
      const minutes = Math.floor(timeDiff / (1000 * 60));
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

      if (days) {
        message = `${days} day${days > 1 ? 's' : ''} ago`;
      } else if (hours) {
        message = `${hours} hour${hours > 1 ? 's' : ''} ago`;
      } else {
        message = `${minutes} minutes ago`;
      }

      setLastRefreshTimeFormatted(message); // Set the formatted message
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, [lastRefreshTime]);

  useEffect(() => {
    if (reloadingCurrentlyOrNot) {
      setLastRefreshTime(new Date());
      setLastRefreshTimeFormatted('now');
    }
  }, [reloadingCurrentlyOrNot]);

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Form style={{ alignItems: 'center', marginRight: '18px' }} layout="inline">
            <div style={{ display: 'flex' }}>
              <Form.Item
                style={{ marginBottom: 0 }}
                validateStatus={errors.vehicleRegistration ? 'error' : ''}
                help={errors.vehicleRegistration}
              >
                <FloatInput
                  width={width >= 992 ? '12.5rem' : `${width < 992 && width >= 768 ? '9.375rem' : '6.25rem'}`}
                  label="Vehicle Registration"
                  value={filters.vehicleRegistration}
                  placeholder={`${
                    width >= 992
                      ? `Search by vehicle...`
                      : `${width < 992 && width >= 768 ? `Search by vehicle` : `vehicle...`}`
                  }`}
                  SuffixIcon={
                    <SearchOutlined
                      style={{
                        marginRight: '6px',
                        cursor: 'pointer'
                      }}
                      onClick={onSubmitOfSearch}
                    />
                  }
                  required={false}
                  id={`vehicleRegistration`}
                  onSubmitOfSearch={onSubmitOfSearch}
                  onChange={setDataIntoFilters}
                />
              </Form.Item>
              <Form.Item>
                <RangePicker
                  presets={[
                    {
                      label: <span aria-label="Start of day - Now">Start of Day - Now</span>,
                      value: () => [dayjs().startOf('day'), dayjs()]
                    },
                    ...rangePresets
                  ]}
                  showTime
                  size="large"
                  format="DD-MM-YYYY HH:mm"
                  onChange={(_, dates: [string, string]) => {
                    handleDateRangeChange(dates);
                  }}
                />
              </Form.Item>
            </div>
          </Form>
          {width > 762 && <FilterOptionsDropDown together={together} setTogether={setTogether} />}
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: `${width < 768 ? 'wrap' : 'nowrap'}`,
            alignItems: 'center'
          }}
        >
          <ExportOptionsDropdown tableData={tableData} width={width} filename="Logs_data" />

          {width < 762 && (
            <div style={{ marginRight: `${width < 762 ? '0.3rem' : '1.7rem'}` }}>
              <FilterOptionsDropDown together={together} setTogether={setTogether} />
            </div>
          )}

          <Tooltip title={`Clear filters and sorters`}>
            <Button
              onClick={dealingWithClearFilters}
              className="small-button"
              style={{
                ...smallButtonStyleProps,
                marginRight: `${width >= 992 ? '2rem' : `${width < 992 && width >= 768 ? '1.3rem' : '0.3rem'}`}`
              }}
            >
              <ClearOutlined />
            </Button>
          </Tooltip>

          <Tooltip title={`Last refresh ${lastRefreshTimeFormatted}`}>
            <Button
              className="small-button"
              style={{
                ...smallButtonStyleProps,
                marginRight: `${width >= 992 ? '2rem' : `${width < 992 && width >= 768 ? '1.3rem' : '0.3rem'}`}`
              }}
              onClick={() => {
                setReloadTrigger((prev) => prev + 1);
              }}
            >
              {reloadingCurrentlyOrNot ? <ReloadOutlined spin /> : <ReloadOutlined />}
            </Button>
          </Tooltip>
        </div>
      </div>
    </>
  );
}
