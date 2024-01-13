import { RouterProvider, createBrowserRouter } from "react-router-dom";

import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Form from "./components/LoginForm"
import Register from "./components/Register";
import Blogs from "./components/Blogs";
import BlogPage from "./pages/BlogPage";
import AddBlog from "./pages/AddBlog";
import LogOut from "./components/LogOut";
const Routers = ()=>{

    const route =createBrowserRouter([{
      path: "/",
      element: <Home />,
      errorElement: <ErrorPage />,
      children :[{
        index:true,
        element:<Blogs/>
      }]
      

    },{
        path:"/login",
        element:<Form/>,
        errorElement: <ErrorPage />,
      },
      {
        path:"/logout",
        element:<LogOut/>,
        errorElement: <ErrorPage />,
      },
    {
        path:"/signup",
        element:<Register/>
      },
      {
        path:"/addBlog",
        element:<AddBlog/>,
        errorElement: <ErrorPage />,
      },
      
    {
        path:"/blog/:id",
        index:true,
        element:<BlogPage/>,
        // loader:{blogpageLoader},
        errorElement: <ErrorPage />,
      },]);


    return <RouterProvider router={route} />;
};

export default Routers;