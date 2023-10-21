//Third party
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ClearOutlined, ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Form, Tooltip, message } from 'antd';

//page specific
import { FilterProps, FilterHeaderComponentProps } from '../../models';
import { smallButtonStyleProps } from '../../../../Styles/CSS/CommonProps/smallButtonStyleProps';

//components|hooks|utils
import FloatInput from '../../../../Components/FloatingInput/FloatingInput';
import FilterOptionsDropDown from '../../../../Components/FilterOptionsDropDown';
import getDynamicInitialState from '../../../../utils/dynamicInitialFilterStates';
import { handleInputChange } from '../../../../utils/setDataIntoInputBasedOfId';
import useWindowDimensions from '../../../../Hooks/windowDimension';
import ExportOptionsDropdown from '../../../../Components/ExportOptionsDropdown';

const FloatingInputForFiltersComponent = ({
  nameForTheInputWithFirstLetterCapital,
  data,
  onSubmitOfSearch,
  setDataIntoFilters,
  width
}: FloatingInputProps) => {
  const nameSmallLetters = nameForTheInputWithFirstLetterCapital.toLowerCase();
  return (
    <FloatInput
      width={width >= 992 ? '12.5rem' : `${width < 992 && width >= 768 ? '9.375rem' : '6.25rem'}`}
      label={nameForTheInputWithFirstLetterCapital}
      value={data}
      placeholder={`${
        width >= 992
          ? `Search by ${nameSmallLetters}...`
          : `${width < 992 && width >= 768 ? `Search by ${nameSmallLetters}` : `${nameSmallLetters}...`}`
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
      id={`${nameSmallLetters}`}
      onSubmitOfSearch={onSubmitOfSearch}
      onChange={setDataIntoFilters}
    />
  );
};

export default function ResidentsFilter({
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

  //for exporting
  const tableData = {
    columns: [
      { dataKey: 'id', header: 'ID' },
      { dataKey: 'name', header: 'Name' },
      { dataKey: 'mobileNumber', header: 'Mobile Number' },
      { dataKey: 'shiftStartTime', header: 'Shift Start Time' },
      { dataKey: 'shiftEndTime', header: 'Shift End Time' },
      { dataKey: 'gender', header: 'Gender' },
      { dataKey: 'email', header: 'Email' },
      { dataKey: 'readableDOB', header: 'Date of Birth' }
    ],
    data
  };
  console.log('data', data);

  const dealingWithClearFilters = () => {
    setReloadTrigger((prev) => prev + 1);
    const initialState = initialStateOfFilters;
    setFilters(initialState);
    setSearchParams({});
  };

  const setDataIntoFilters = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange<FilterProps>(e, setFilters, true, setErrors);
  };

  const onSubmitOfSearch = () => {
    setSearchParams(filters as unknown as Record<string, string | string[]>);
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
          justifyContent: 'space-between'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Form style={{ alignItems: 'center' }} layout="inline">
            <div
              style={{
                display: 'flex',
                flexWrap: `${width < 768 ? 'wrap' : 'nowrap'}`
              }}
            >
              <Form.Item style={{ marginBottom: 0 }} validateStatus={errors.name ? 'error' : ''} help={errors.name}>
                <FloatingInputForFiltersComponent
                  nameForTheInputWithFirstLetterCapital="Name"
                  data={filters.name}
                  onSubmitOfSearch={onSubmitOfSearch}
                  width={width}
                  setDataIntoFilters={setDataIntoFilters}
                />
              </Form.Item>
              <Form.Item style={{ marginBottom: 0 }} validateStatus={errors.email ? 'error' : ''} help={errors.email}>
                <FloatingInputForFiltersComponent
                  nameForTheInputWithFirstLetterCapital="Email"
                  data={filters.email}
                  onSubmitOfSearch={onSubmitOfSearch}
                  width={width}
                  setDataIntoFilters={setDataIntoFilters}
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
          <ExportOptionsDropdown tableData={tableData} width={width} filename="Operator_data" />
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
