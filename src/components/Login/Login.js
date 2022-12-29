import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

const Login = () => {
    const { login, createUserWithGoogle } = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        login(email, password)
            .then(result => {
                const user = result.user;
                console.log("logged in user:", user);
                toast.success("Successfully login!")

                form.reset();
                navigate(from, { replace: true })
            })
    }




    const handleGoogleSignUp = () => {
        createUserWithGoogle()
            .then(result => {
                const user = result.user;
                console.log("google user:", user);
                saveUser(user.displayName, user.email)
                navigate(from, { replace: true });
            })
            .then(error => {
                console.error(error);
            })
    }


    // save user info to the database
    const saveUser = (name, email) => {
        const user = { name, email };
        fetch('https://task-management-server-five.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success("User loggedin successfully!");

                }
            })
            .catch(error => {
                toast.error(error.message);
            })

    }


    return (
        <form onSubmit={handleLogin} className='bg-base-100 shadow-lg lg:w-1/2  mx-auto p-5'>
            <h3 className='text-3xl font-bold text-center my-5'>Login</h3>


            <div className="mb-6">
                <label htmlFor="default-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                <input required name='email' type="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Enter your email' />
            </div>

            <div className="mb-6">
                <label htmlFor="default-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input required name='password' type="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Enter  password' />
            </div>

            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Login</button>

            <hr className='my-5' />

            <button onClick={handleGoogleSignUp} type="button" className="text-white w-full bg-green-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Continue with Google</button>


            <p className='text-center my-3'>
                <small> New to this site ?
                    <Link className='text-orange-600 font-bold' to='/registration'>Registration</Link>
                </small>
            </p>

        </form>
    );
};

export default Login;