import { useState } from "react";
import axios from "axios";
import * as Yup from "yup";

const Register = () => {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    gender: "",
  });
  const [status, setStatus] = useState(false);
  const [errors, setErrors] = useState(null);
  const [message, setMessage] = useState("");

  // user validation - schema
  const userSchema = Yup.object().shape({
    fullName: Yup.string()
      .required("Fullname is required")
      .min(3, "Fullname is too short"),
    // .matches(/^[a-zA-Z\s]+$/, "Invalid fullname"),

    username: Yup.string()
      .required("Username is required")
      .min(3, "Username is too short"),
    //.matches(/^[a-zA-Z0-9]+$/, "Invalid username"),

    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format"),

    password: Yup.string()
      .required("Password is required")
      .min(5, "Password is too short")
      .matches(/[0-9]/, "Password must contains at least one number")
      .matches(/[A-Z]/, "Password must contains at least one uppercase letter")
      .matches(/[a-z]/, "Password must contains at least one lowercase letter"),
    gender: Yup.string().required("The field is required"),
  });

  const changeHandler = (e) => {
    //console.log(e.target);
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    // console.log(e);
    // Add registration logic here (e.g., call API)

    try {
      await userSchema.validate(user, { abortEarly: false, strict: false });
      //.then((val) => console.log(val))
      //I've got all the errors just by writing err.errors in message.
      //.catch((err) => console.log(err.errors));
      // validate user based on the userSchema
      // send request to backend
      const res = await axios({
        url: "http://localhost:3000/api/users/register",
        method: "POST",
        data: user,
        withCredentials: true,
      }).catch((error) => {
        console.error(error);
        throw error;
      });

      setStatus(res.statusText === "Created" ? true : false);

      if (res.statusText === "Created") {
        console.log("Created    ");
        e.target.reset();
        setErrors(null);
        setMessage(res.data.message);
      }
    } catch (error) {
      // handle validation errors
      if (error.response) {
        setErrors({ ...errors, res: error.response.data.errors[0].msg });
        console.log("error.response");
      }

      const newErrors = {};
      if (error.name === "ValidationError") {
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <div className='flex justify-center items-center h-screen bg-gray-100'>
      <div className='w-full max-w-md'>
        <div className='mb-10 text-gray-900 text-center'>
          <h3 className='text-3xl'>Register here!</h3>
          <p className='text-sm'>Please provide data for all fields!</p>

          {status && (
            <div className='text-green-700 my-4 flex gap-x-2 justify-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='1em'
                height='1em'
                viewBox='0 0 12 12'
                fill='green'
                className='animate-pulse w-5 h-5'>
                <path
                  fill='irishgreen'
                  fillRule='evenodd'
                  d='M6 10a4 4 0 1 0 0-8a4 4 0 0 0 0 8m0 2A6 6 0 1 0 6 0a6 6 0 0 0 0 12'
                  clipRule='evenodd'
                />
              </svg>
              <span className='text-sm '>
                Please verify your email by click on Verify link!
              </span>
            </div>
          )}
        </div>
        <form
          autoComplete='off'
          className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
          onSubmit={handleRegister}>
          <h2 className='text-2xl mb-6 text-center font-bold'>Register</h2>
          <div className='mb-4'>
            {status && (
              <div className='text-green-700 my-4 flex gap-x-2 justify-center'>
                <span className='text-sm '>{message}</span>
              </div>
            )}
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='fullName'>
              Full Name
            </label>
            <input
              type='text'
              id='fullName'
              name='fullName'
              onChange={changeHandler}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              required
            />
            {errors?.fullName && (
              <div className='text-red-500 text-sm p-2'>{errors?.fullName}</div>
            )}
          </div>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='username'>
              Username
            </label>
            <input
              type='text'
              id='username'
              name='username'
              onChange={changeHandler}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              required
            />
            {errors?.username && (
              <div className='text-red-500 text-sm p-2'>{errors?.username}</div>
            )}
          </div>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='email'>
              Email
            </label>
            <input
              type='email'
              id='email'
              name='email'
              onChange={changeHandler}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              required
            />
            {errors?.email && (
              <div className='text-red-500 text-sm p-2'>{errors?.email}</div>
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
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
              required
            />
            {errors?.password && (
              <div className='text-red-500 text-sm p-2'>{errors?.password}</div>
            )}
          </div>
          <div className='mb-4'>
            <div className='flex gap-x-6'>
              Gender:
              <div className='flex items-center'>
                <input
                  type='radio'
                  name='gender'
                  value='male'
                  onChange={changeHandler}
                  className='shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none'
                  id='Male'
                />
                <label htmlFor='female' className='text-sm text-gray-500 ms-2'>
                  Male
                </label>
              </div>
              <div className='flex'>
                <input
                  type='radio'
                  name='gender'
                  value='female'
                  className='shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none'
                  id='female'
                  onChange={changeHandler}
                />
                <label htmlFor='female' className='text-sm text-gray-500 ms-2'>
                  Female
                </label>
              </div>
            </div>
          </div>

          <div className='flex items-center justify-between'>
            <button
              type='submit'
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
