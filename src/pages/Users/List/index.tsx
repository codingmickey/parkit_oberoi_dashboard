//Third party
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

//Page specific
import ResidentsFilter from './FilterHeader/UsersFilter';
import ResidentsTable from './Table/Table';
import { FilterProps, UserRecord } from '../models';

//component|hooks|utils|styles
import '../../../Styles/CSS/TableAndFilters/tableActionButtons.css';
import { Box, FilterBoxComponent, TableBoxComponent } from '../../../Components/Box';

export default function Residents() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialState: FilterProps = {
    name: queryParams.get('name') || '',
    email: queryParams.get('email') || '',
    shiftTimeStart: queryParams.get('shiftTimeStart') || '',
    shiftTimeEnd: queryParams.get('shiftTimeEnd') || ''
  };
  const [filters, setFilters] = useState(initialState);
  const [collapsed, setCollapsed] = useState(false); //To pass into the sidebar and navbar
  const [reloadTrigger, setReloadTrigger] = useState(0); //This is used as a counter, when its value changes we fetcch data again. Its numerical value is useless
  const [reloadingCurrentlyOrNot, setReloadingCurrentlyOrNot] = useState(true); //This is set as true while a request is going on to display appropriate UI
  const [together, setTogether] = useState(0);
  const [data, setData] = useState<UserRecord[]>([]); //The data to be displayed

  return (
    <>
      <Box collapsed={collapsed} setCollapsed={setCollapsed}>
        <FilterBoxComponent>
          <ResidentsFilter
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
          <ResidentsTable
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
