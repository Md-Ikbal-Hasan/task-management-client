import React from 'react';
import { toast } from 'react-hot-toast';
import { useLoaderData, useNavigate } from 'react-router-dom';

const UpdateTask = () => {

    const task = useLoaderData();
    const id = task._id
    const navigate = useNavigate();

    // console.log(task);


    const handleUpdateTask = (e) => {
        e.preventDefault();
        const taskMessage = e.target.taskMessage.value;
        const taskInfo = {
            taskMessage
        }

        fetch(`https://task-management-server-five.vercel.app/tasks/${id}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(taskInfo)
        })
            .then(res => res.json())
            .then((result) => {

                if (result.modifiedCount > 0) {
                    toast.success("Task Updated Successfully!")
                    navigate('/myTask')
                }
            })

    }

    return (
        <form onSubmit={handleUpdateTask} className='bg-base-100 shadow-lg lg:w-3/4  mx-auto p-5'>
            <h2 className='text-2xl font-semibold text-center'>Update Task</h2>

            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Task</label>
            <textarea required name='taskMessage' defaultValue={task.taskMessage} rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-5" placeholder="Write your task description here..."></textarea>

            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Update Task</button>

        </form>

    );
};

export default UpdateTask;