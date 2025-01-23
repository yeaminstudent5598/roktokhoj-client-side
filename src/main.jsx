import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import router from './Components/Route/router.jsx';
import AuthProvider from './Components/AuthProvider/AuthProvider.jsx';

import {
  QueryClient,
  QueryClientProvider,
  
} from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify';
const queryClient = new QueryClient();


createRoot(document.getElementById('root')).render(
  <StrictMode>

<QueryClientProvider client={queryClient}>
<AuthProvider>
     <RouterProvider router={router} />
     <ToastContainer/>
     </AuthProvider>
    </QueryClientProvider>
     
  </StrictMode>,
)
