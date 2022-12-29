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
const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <h1 className="text-5xl text-red-500">This is error page</h1>,
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
                // loader: () => fetch(`http://localhost:5000/completedTask`)
            },
            {
                path: '/updateTask/:id',
                element: <PrivateRoute> <UpdateTask></UpdateTask> </PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/singleTask/${params.id}`)
            }
        ]
    }
])

export default router;