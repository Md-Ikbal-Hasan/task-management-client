import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
const Registration = () => {
    const { createUser, updateUserProfile, createUserWithGoogle } = useContext(AuthContext);
    const [signUpError, setSignUpError] = useState('');



    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    // registere user................
    const handleSignUp = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(name, email, password);


        createUser(email, password)
            .then(result => {
                const user = result.user;
                console.log("email-pass user:", user);
                form.reset();
                setSignUpError('');
                handleUpdateUserProfile(name);

                navigate(from, { replace: true })
            })
            .catch(error => {
                console.error(error);
                setSignUpError(error.message);
            })


        const handleUpdateUserProfile = (name) => {
            const profile = {
                displayName: name
            }

            updateUserProfile(profile)
                .then(() => {
                    // alert("User name updated")
                    saveUser(name, email);
                })
                .then(error => console.error(error))
        }
    }


    const handleGoogleSignUp = () => {
        createUserWithGoogle()
            .then(result => {
                const user = result.user;
                console.log("google user:", user);
                navigate(from, { replace: true });
                saveUser(user.displayName, user.email);
            })
            .then(error => {
                console.error(error);
            })
    }


    // save user info to the database
    const saveUser = (name, email) => {
        const user = { name, email };
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success("User created successfully!");

                }
            })
            .catch(error => {
                toast.error(error.message);
            })

    }





    return (
        <form onSubmit={handleSignUp} className='bg-base-100 shadow-lg lg:w-1/2  mx-auto p-5'>
            <h3 className='text-3xl font-bold text-center my-5'>Registration</h3>

            <div className="mb-6">
                <label htmlFor="default-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                <input required name='name' type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Enter your name' />
            </div>

            <div className="mb-6">
                <label htmlFor="default-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                <input required name='email' type="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Enter your email' />
            </div>

            <div className="mb-6">
                <label htmlFor="default-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input required name='password' type="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Enter  password' />
            </div>

            <p className='text-center my-3 text-red-600'> {signUpError} </p>

            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Registration</button>

            <hr className='my-5' />

            <button onClick={handleGoogleSignUp} type="button" className="text-white w-full bg-green-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Continue with Google</button>


            <p className='text-center my-3'>
                <small> Already have an account ?
                    <Link className='text-orange-600 font-bold' to='/login'>Login</Link>
                </small>
            </p>


        </form>
    );
};

export default Registration;