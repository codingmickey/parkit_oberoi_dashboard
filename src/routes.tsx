import { Route } from 'react-router-dom';

//Auth
import PersistAuth from './auth/PersistAuth';
import CheckAuth from './auth/CheckAuth';
import RequireAuth from './auth/RequireAuth';

//Pages
import MonthlyPass from './pages/MonthlyPass';
import Users from './pages/Users';
import LoginPage from './auth/Login/LoginPage';
import UserLogs from './pages/UserLogs';
import Pricing from './pages/Pricing';
import VehicleTypes from './pages/VehicleType';
import ErrorPage from './ErrorBoundary/ErrorPage';
import LocalVehicle from './pages/LocalVehicle';
import Logs from './pages/Logs';
import Dashboard from './pages/Dashboard/Dashboard';
import Report from './pages/Report/Report';
import EditOperator from './pages/Users/Edit';
import AddOperator from './pages/Users/Add';
import ColorModeWrapper from './Layouts/ColorModeWrapper';
import Resident from './pages/Resident';
import RegisteredVehicles from './pages/RegisteredVehicle/List';

const routes = (
  <Route path="/" element={<PersistAuth />}>
    <Route element={<ColorModeWrapper />}>
      <Route element={<CheckAuth />}>
        <Route index element={<LoginPage />} />
      </Route>
      <Route element={<RequireAuth />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="dashboard/monthly-pass" element={<MonthlyPass />} />
        <Route path="dashboard/operator" element={<Users />} />
        <Route path="dashboard/operator/edit/:id" element={<EditOperator />} />
        <Route path="dashboard/operator/add" element={<AddOperator />} />
        <Route path="dashboard/operator-logs" element={<UserLogs />} />
        <Route path="dashboard/pricing" element={<Pricing />} />
        <Route path="dashboard/vehicle-types" element={<VehicleTypes />} />
        <Route path="dashboard/local-vehicle" element={<LocalVehicle />} />
        {/* Kaamke */}
        <Route path="dashboard/logs" element={<Logs />} />
        <Route path="dashboard/resident-logs" element={<Resident />} />
        <Route path="dashboard/registered-vehicle" element={<RegisteredVehicles />} />

        <Route path="dashboard/report" element={<Report />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Route>
  </Route>
);

export default routes;
