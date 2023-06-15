import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Provider } from 'react-redux';
import App from './App'
import { Home } from './pages/Home';
import { Create } from './pages/Create';
import { store } from './redux/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/create",
    element: <Create />
  },
]);
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
