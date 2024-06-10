import React from 'react';
import logo from './logo.svg';
import { createBrowserRouter, RouterProvider, RouteObject } from 'react-router-dom';
import SignIn from './components/user/SignIn';
import SignUp from './components/user/SignUp';
import Settings from './components/user/Settings';
import Transactions from './components/user/Transactions';
import Dashboard from './components/user/Dashboard';
import './App.css';
const routes: RouteObject[] = [
  {
    path: '/signin',
    element: <SignIn />
  },
  {
    path: '/signup',
    element: <SignUp />
  },
  {
    path: '/dashboard',
    element: <Dashboard />
  },
  {
    path: '/settings',
    element: <Settings />
  },
  {
    path: '/transactions',
    element: <Transactions />
  },
  {
    path: '*',
    element: <SignUp /> // Redirect to SignIn for any undefined routes
  }
];

const App = () => {
  const router = createBrowserRouter(routes);
  return  <RouterProvider router={router} />;
}
export default App;
