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
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient();


createRoot(document.getElementById('root')).render(
  <StrictMode>

<QueryClientProvider client={queryClient}>
<AuthProvider>
     <RouterProvider router={router} />
     <Toaster/>
     </AuthProvider>
    </QueryClientProvider>
     
  </StrictMode>,
)
