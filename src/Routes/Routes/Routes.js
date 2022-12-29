import { createBrowserRouter } from "react-router-dom";
import Main from "../../layout/Main";
import Home from '../../components/Home/Home'
import AddTask from "../../components/AddTask/AddTask";
import MyTask from "../../components/MyTask/MyTask";
import CompletedTask from "../../components/CompletedTask/CompletedTask";
import Registration from "../../components/Registration/Registration";
import Login from "../../components/Login/Login";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import UpdateTask from "../../components/UpdateTask/UpdateTask";
import ErrorPage from "../../components/ErrorPage/ErrorPage";
const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/registration',
                element: <Registration></Registration>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/addTask',
                element: <PrivateRoute> <AddTask></AddTask> </PrivateRoute>
            },
            {
                path: '/myTask',
                element: <PrivateRoute>  <MyTask></MyTask> </PrivateRoute>
            },
            {
                path: '/completedTask',
                element: <PrivateRoute> <CompletedTask></CompletedTask> </PrivateRoute>,
                // loader: () => fetch(`https://task-management-server-five.vercel.app/completedTask`)
            },
            {
                path: '/updateTask/:id',
                element: <PrivateRoute> <UpdateTask></UpdateTask> </PrivateRoute>,
                loader: ({ params }) => fetch(`https://task-management-server-five.vercel.app/singleTask/${params.id}`)
            }
        ]
    }
])

export default router;