//Third party
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

//Page specific
import IndexForFilters from './FilterHeader/ReportFilters';
import IndexForTable from './Table/Table';
import { CurrentData, FilterProps, ReportTypes } from './Models/models';

//components|hooks|utils
import { Box, FilterBoxComponent, TableBoxComponent } from '../../Components/Box';

export default function Report() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const reportTypeFromLocalStorage = localStorage.getItem('reportType');
  const [reportType, setReportType] = useState(
    (queryParams.get('reportType') || reportTypeFromLocalStorage || 'daily') as ReportTypes
  );

  const initialState: FilterProps = {
    reportType: reportType,
    date: queryParams.get('date') || '',
    month: queryParams.get('month') || '',
    year: queryParams.get('year') || '',
    shift: queryParams.get('shift') || ''
  };
  const [filters, setFilters] = useState(initialState);
  const [together, setTogether] = useState(0);
  const [collapsed, setCollapsed] = useState(false);
  const [reloadTrigger, setReloadTrigger] = useState(0);
  const [reloadingCurrentlyOrNot, setReloadingCurrentlyOrNot] = useState(true);
  const [data, setData] = useState<CurrentData>();

  return (
    <>
      <Box collapsed={collapsed} setCollapsed={setCollapsed}>
        <FilterBoxComponent>
          <IndexForFilters
            reportType={reportType}
            setReportType={setReportType}
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
          <IndexForTable
            data={data}
            setData={setData}
            together={together}
            filters={filters}
            reloadTrigger={reloadTrigger}
            reloadingCurrentlyOrNot={reloadingCurrentlyOrNot}
            setReloadingCurrentlyOrNot={setReloadingCurrentlyOrNot}
            setReloadTrigger={setReloadTrigger}
          />
          <></>
        </TableBoxComponent>
      </Box>
    </>
  );
}
