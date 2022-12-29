import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import Spinner from '../MiniComponent/Spinner';

const MyTask = () => {

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    // load the task of a specifi user from database......
    const { data: tasks = [], isLoading } = useQuery({
        queryKey: ['tasks', user?.email],
        queryFn: async () => {
            const res = await fetch(`https://task-management-server-five.vercel.app/tasks/${user?.email}`);
            const data = res.json();
            return data;
        }
    })


    if (isLoading) {
        return <Spinner></Spinner>
    }

    // delete a single task..........
    const handleDeleteTask = (task) => {
        const confirmation = window.confirm("Are you sure to delete this task?");

        if (confirmation) {
            fetch(`https://task-management-server-five.vercel.app/tasks/${task._id}`, {
                method: "DELETE",
            })
                .then(res => res.json())
                .then(result => {
                    if (result.deletedCount > 0) {
                        toast.success("Task Deleted successfully");
                    }
                })
        }
    }

    // update the status of a task........
    const handleTaskStatus = (task) => {
        fetch(`https://task-management-server-five.vercel.app/singleTask/${task._id}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
        })
            .then(res => res.json())
            .then((result) => {
                console.log(result);

                if (result.modifiedCount > 0) {
                    toast.success("Task completed Successfully!")
                    navigate('/completedTask')
                }
            })
    }

    return (

        <div>
            {/* table  */}
            <div className="overflow-x-auto relative  shadow-lg lg:w-3/4  mx-auto p-5">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <caption className='text-2xl font-semibold'>My All Tasks</caption>
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="py-3 px-6">
                                Se No.
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Task
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Task Status
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            tasks.length ?
                                tasks.map((task, index) => {
                                    return (
                                        <tr key={task._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {index + 1}
                                            </th>
                                            <td className="py-4 px-6">
                                                {task.taskMessage}
                                            </td>
                                            <td className="py-4 px-6">
                                                <button
                                                    onClick={() => handleTaskStatus(task)}
                                                    type="button" className="text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Completed</button>
                                            </td>
                                            <td>
                                                <button onClick={() => handleDeleteTask(task)} type="button" className="text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Delete</button>

                                                <Link to={`/updateTask/${task._id}`}

                                                    type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Update</Link>
                                            </td>
                                        </tr>

                                    )
                                })
                                :
                                <tr><td colSpan={4} className='text-center text-2xl'>No Tasks Available</td></tr>
                        }




                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default MyTask;