import React from 'react'
import Navbar from './Navbar';
import "../node_modules/flowbite/dist/flowbite.min.js"
import "../node_modules/@fortawesome/fontawesome-free/js/all.min"
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './Layout.jsx';
import Home from './componants/Home.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import Products from './componants/Products';
import Brands from './componants/Brands';
import Cart from './componants/Cart';
import Categories from './componants/Categories';
import Wishlist from './componants/Wishlist';
import Signin from './componants/Signin';
import Register from './componants/Register';
import Forgetpassword from './componants/Forgetpassword';
import Verify from './componants/Verify';
import Resetpassword from './componants/Resetpassword';
import Error404 from './componants/Error404.jsx';
import { Toaster } from 'react-hot-toast';
import Authcontext from './context/Authcontext.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProductDetails from './componants/ProductDetails.jsx';
import Cartcontext from './context/Cartcontext.jsx';
import Wishcontext from './context/Wishcontext';
import Payment from './componants/Payment.jsx';
import Allorders from './componants/Allorders.jsx';
import Allorders2 from './componants/Allorders2.jsx';

const router=createBrowserRouter([
  {path:'',element:<Layout/>,children:[
    {path:'',element:<ProtectedRoute><Home/></ProtectedRoute>},
    {path:'/home',element:<ProtectedRoute><Home/></ProtectedRoute>},
    {path:'/products',element:<ProtectedRoute><Products/></ProtectedRoute>},
    {path:'/brands',element:<ProtectedRoute><Brands/></ProtectedRoute>},
    {path:'/cart',element:<ProtectedRoute><Cart/></ProtectedRoute>},
    {path:'/categories',element:<ProtectedRoute><Categories/></ProtectedRoute>},
    {path:'/wishlist',element:<ProtectedRoute><Wishlist/></ProtectedRoute>},
    {path:'/payment',element:<ProtectedRoute><Payment/></ProtectedRoute>},
    {path:'/allorders',element:<ProtectedRoute><Allorders/></ProtectedRoute>},
    {path:'/allorders2',element:<ProtectedRoute><Allorders2/></ProtectedRoute>},
    {path:'/productDetails/:id',element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
    {path:'/signin',element:<Signin/>},
    {path:'/register',element:<Register/>},
    {path:'/forgetpassword',element:<Forgetpassword/>},
    {path:'/verify',element:<Verify/>},
    {path:'/resetpassword',element:<Resetpassword/>},
    {path:'*',element:<Error404/>},
  ]}
])


export default function App() {
 const reactQueryConfig =new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})
  return (
    <>

    <Authcontext>
      <Cartcontext>
    <Wishcontext>
      <QueryClientProvider client={reactQueryConfig}>
    <RouterProvider router={router}/>
      </QueryClientProvider>
    </Wishcontext>
      </Cartcontext>
    </Authcontext>
    <Toaster   position="bottom-center"
    reverseOrder={false}/>
    </>
  )
}
