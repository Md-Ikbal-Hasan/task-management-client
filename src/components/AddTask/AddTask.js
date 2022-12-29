import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
const AddTask = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();


    const handleTask = (e) => {
        e.preventDefault();
        const form = e.target;
        const taskMessage = form.taskMessage.value;

        const taskInfo = {
            taskMessage: taskMessage,
            userEmail: user?.email,
            status: 'incomplete'
        }

        fetch(`https://task-management-server-five.vercel.app/tasks`, {
            method: "POST",
            headers: {
                'content-type': "application/json"
            },
            body: JSON.stringify(taskInfo)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success("Task added successfully!");
                    navigate('/myTask');
                }
            })
            .catch(error => {
                toast.error(error.message);
                console.log(error);
            })
    }
    return (

        <form onSubmit={handleTask} className='bg-base-100 shadow-lg lg:w-3/4  mx-auto p-5'>

            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Task</label>
            <textarea required name='taskMessage' rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-5" placeholder="Write your task description here..."></textarea>

            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add Task</button>

        </form>

    );
};

export default AddTask;