import React from 'react';
import logo from './logo.svg';
import { createBrowserRouter, RouterProvider, RouteObject } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
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
    path: '*',
    element: <SignIn /> // Redirect to SignIn for any undefined routes
  }
];

const App = () => {
  const router = createBrowserRouter(routes);
  return  <RouterProvider router={router} />;
}


export default App;
