import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Verification = () => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleVerification = (e) => {
    e.preventDefault();
    // Add verification logic here (e.g., call API)
    navigate("/login");
  };

  return (
    <div className='flex justify-center items-center h-screen bg-gray-100'>
      <div className='w-full max-w-md'>
        <form
          className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
          onSubmit={handleVerification}>
          <h2 className='text-2xl mb-6 text-center font-bold'>
            Verify Your Email
          </h2>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='code'>
              Verification Code
            </label>
            <input
              type='text'
              id='code'
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              required
            />
          </div>
          <div className='flex items-center justify-between'>
            <button
              type='submit'
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
              Verify
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Verification;
