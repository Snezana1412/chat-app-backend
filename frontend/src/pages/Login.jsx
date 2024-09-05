import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import useAuth from "../context/useAuth";

const Login = () => {
  const { login } = useAuth();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState(null);
  const [beErr, setBeError] = useState(null);
  const [status, setStatus] = useState(false);

  const navigate = useNavigate();

  const changeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // define validation schema for user
  const loginSchema = Yup.object({
    username: Yup.string().required("Email address is required"),

    password: Yup.string()
      .required("Password is required")
      .min(5, "Password is too short")
      .matches(/[a-z]/, "Password should contains lower-case letter")
      .matches(/[A-Z]/, "Password should contains upper-case letter")
      .matches(/[0-9]/, "Password should contains number"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Implement login logic here
    try {
      await loginSchema.validate(user, { abortEarly: false, strict: false });
      login("token"); // login user
      const res = await axios({
        url: "http://localhost:3000/api/users/login",
        method: "POST",
        data: user,
        withCredentials: true,
      }).catch((error) => {
        console.error(error);
        throw error;
      });
      console.log(res);

      setStatus(res.status === 200 ? true : false);
      console.log(res.data);
      login(res.data.user);
      navigate("/chat");
    } catch (error) {
      // backend error
      if (error.response) {
        // console.log(error.response)
        setBeError(error.response.data.msg);
      }

      // validation errors
      const vErrors = {};
      if (error.name === "ValidationError") {
        error.inner.forEach((err) => {
          vErrors[err.path] = err.message;
        });

        setErrors(vErrors);
      }
    }
  };

  return status ? (
    <Navigate to='/posts' replace={true} />
  ) : (
    <div className='flex justify-center items-center h-screen bg-gray-100'>
      <div className='w-full max-w-md'>
        <form
          className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
          onSubmit={handleSubmit}>
          <h2 className='text-2xl mb-6 text-center font-bold'>Login</h2>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='email'>
              Username
            </label>
            <input
              type='text'
              id='username'
              name='username'
              onChange={changeHandler}
              value={user.username}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            />
            {errors?.email && (
              <div className='text-red-500 text-sm'>{errors.email}</div>
            )}
          </div>
          <div className='mb-6'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='password'>
              Password
            </label>
            <input
              type='password'
              id='password'
              name='password'
              onChange={changeHandler}
              value={user.password}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
            />
            {errors?.password && (
              <div className='text-red-500 text-sm'>{errors.password}</div>
            )}
          </div>
          <div className='flex items-center justify-between'>
            <button
              type='submit'
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
              Login
            </button>
            {beErr && (
              <div className='text-red-500 text-small text-center py-4'>
                {beErr}
              </div>
            )}
            <Link
              to='/forgot-password'
              className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800'>
              Forgot Password?
            </Link>
          </div>
          <div className='mt-4 text-center'>
            <Link
              to='/register'
              className='text-sm text-blue-500 hover:text-blue-800'>
              Don&apos;t have an account? Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
