//Third party
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

//Page specific
import { Box, FilterBoxComponent, TableBoxComponent } from '../../Components/Box';
import LogsFilter from './FilterHeader/LogsFilter';
import LogsTable from './Table/Table';
import { FilterProps, LogRecord } from './models';

export default function Logs() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialState: FilterProps = {
    startDate: queryParams.get('startDate') || '',
    endDate: queryParams.get('endDate') || '',
    vehicleRegistration: queryParams.get('vehicleRegistration') || ''
  };
  const [filters, setFilters] = useState(initialState);
  const [collapsed, setCollapsed] = useState(false);
  const [reloadTrigger, setReloadTrigger] = useState(0);
  const [reloadingCurrentlyOrNot, setReloadingCurrentlyOrNot] = useState(true);
  const [together, setTogether] = useState(0);
  const [data, setData] = useState<LogRecord[]>([]);

  return (
    <>
      <Box collapsed={collapsed} setCollapsed={setCollapsed}>
        <FilterBoxComponent>
          <LogsFilter
            data={data}
            setData={setData}
            together={together}
            setTogether={setTogether}
            filters={filters}
            setFilters={setFilters}
            reloadingCurrentlyOrNot={reloadingCurrentlyOrNot}
            setReloadTrigger={setReloadTrigger}
          />
        </FilterBoxComponent>
        <TableBoxComponent>
          <LogsTable
            data={data}
            setData={setData}
            together={together}
            filters={filters}
            reloadTrigger={reloadTrigger}
            reloadingCurrentlyOrNot={reloadingCurrentlyOrNot}
            setReloadingCurrentlyOrNot={setReloadingCurrentlyOrNot}
            setReloadTrigger={setReloadTrigger}
          />
        </TableBoxComponent>
      </Box>
    </>
  );
}
