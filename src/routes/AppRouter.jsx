import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../components/Common/Layout';
import Dashboard from '../pages/Dashboard';
import Transactions from '../pages/Transactions';
import Inventory from '../pages/Inventory';
import Insights from '../pages/Insights';
import Voice from '../pages/Voice';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Landing from '../pages/Landing';
import ProtectedRoute from './ProtectedRoute';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/voice" element={<Voice />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;