import { createBrowserRouter } from "react-router-dom";
import JobOfferPage from "../Pages/JobOfferPage";
import App from "../App";
import HomePage from "../Pages/HomePage";
import LoginPage from "../Pages/LoginPage";
import RegisterPage from "../Pages/RegisterPage";
import MyApplicationsPage from "../Pages/MyApplicationsPage";
import ApplyPage from "../Pages/ApplyPage";
import ExaminerPage from "../Pages/ExaminerPage";

export const router = createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:[
            {path:"",element:<HomePage/>},
            {path:"job-offers-page",element:<JobOfferPage/>},
            {path:"login-page",element:<LoginPage/>},
            {path:"register-page",element:<RegisterPage/>},
            {path:"my-applications-page",element:<MyApplicationsPage/>},
            {path:"apply/:jobOfferId",element:<ApplyPage/>},
            {path:"examiner-page",element:<ExaminerPage/>},
        ]
    }
])