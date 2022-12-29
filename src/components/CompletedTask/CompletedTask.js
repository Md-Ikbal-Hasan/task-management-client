import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'react-hot-toast';
import { useLoaderData } from 'react-router-dom';

const CompletedTask = () => {
    // const tasks = useLoaderData();

    // load the completed task of a specifi user from database......
    const { data: tasks = [], isLoading, refetch } = useQuery({
        queryKey: ['completedTask'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/completedTask/`);
            const data = res.json();
            return data;
        }
    })


    // delete a single task..........
    const handleDeleteTask = (task) => {
        const confirmation = window.confirm("Are you sure to delete this task?");

        if (confirmation) {
            fetch(`http://localhost:5000/tasks/${task._id}`, {
                method: "DELETE",
            })
                .then(res => res.json())
                .then(result => {
                    console.log(result);
                    if (result.deletedCount > 0) {
                        toast.success("Task Deleted successfully");
                        refetch();
                    }
                })
        }
    }



    return (
        <div>
            {/* table  */}
            <div className="overflow-x-auto relative  shadow-lg lg:w-3/4  mx-auto p-5">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <caption className='text-2xl font-semibold'>My Completed Task</caption>
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="py-3 px-6">
                                Se No.
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Task
                            </th>

                            <th scope="col" className="py-3 px-6">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            tasks.map((task, index) => {
                                return (
                                    <tr key={task._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {index + 1}
                                        </th>
                                        <td className="py-4 px-6">
                                            {task.taskMessage}
                                        </td>

                                        <td>
                                            <button
                                                onClick={() => handleDeleteTask(task)}
                                                type="button" className="text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Delete</button>


                                        </td>
                                    </tr>

                                )
                            })
                        }



                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default CompletedTask;