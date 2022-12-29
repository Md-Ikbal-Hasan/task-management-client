import React from 'react';
import { Link } from 'react-router-dom';
import NotFound from '../../assets/images/NotFound.jpg'
const ErrorPage = () => {
    return (
        <div className='h-screen'>

            <div className='flex flex-col items-center justify-center h-screen'>
                <img src={NotFound} alt="Error Page" className='h-[600px] w-[600px]' />
                <Link to='/'> <button className='bg-green-600 p-3 text-white rounded-lg'>Go to home page</button> </Link>
            </div>

        </div>
    );
};

export default ErrorPage;