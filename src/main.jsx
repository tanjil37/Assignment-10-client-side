// main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router'; 
import { ToastContainer } from 'react-toastify';
import { router } from './router/Routes';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
    <ToastContainer position='top-center' autoClose={2000}/>
  </StrictMode>,
);
