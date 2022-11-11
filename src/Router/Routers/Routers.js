import { createBrowserRouter } from "react-router-dom";
import Main from "../../Laout/Main";
import CheckOut from "../../Pages/CheckOut/CheckOut";
import Home from "../../Pages/Homes/Home/Home";
import Login from "../../Pages/Login/Login";
import Orders from "../../Pages/Orders/Orders";
import SingUp from "../../Pages/Sign Up/SingUp";
import PrivateRout from "../PrivateRout/PrivateRout";

let router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/signup',
        element: <SingUp></SingUp>
      },

      {
        path: '/checkout/:id',
        element: <PrivateRout><CheckOut></CheckOut></PrivateRout>,
        loader: ({ params }) => fetch(`https://genius-car-server-snowy.vercel.app/services/${params.id}`)
      },
      
      {
        path: '/orders',
        element: <PrivateRout><Orders></Orders></PrivateRout>
      }
    ]
  }
])

export default router;