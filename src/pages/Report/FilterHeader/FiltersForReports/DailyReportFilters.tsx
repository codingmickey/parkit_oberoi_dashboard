import { FilterProps } from '../../Models/models';
import { useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { DatePicker } from 'antd';

type DailyReportFiltersTypes = {
  setFilters: React.Dispatch<React.SetStateAction<FilterProps>>;
  filters: FilterProps;
};

export default function DailyReportFilters({ setFilters, filters }: DailyReportFiltersTypes) {
  const [searchParams, setSearchParams] = useSearchParams();
  const onDateChange = (date: string) => {
    setFilters((prev) => ({ ...prev, date: date }));
    setSearchParams({ date: date });
  };

  return (
    <DatePicker
      size="large"
      presets={[
        { label: 'Yesterday', value: dayjs().add(-1, 'd') },
        { label: 'Last Week', value: dayjs().add(-7, 'd') },
        { label: 'Last Month', value: dayjs().add(-1, 'month') }
      ]}
      onChange={(_, date) => onDateChange(date)}
      value={filters.date ? dayjs(filters.date) : null}
    />
  );
}
