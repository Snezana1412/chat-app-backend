import { useState } from "react";

const Profile = () => {
  // Example user data; in a real app, you'd fetch this from an API or context
  const [user, setUser] = useState({
    username: "johndoe",
    email: "johndoe@example.com",
    fullName: "John Doe",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      // If toggling off editing, you could save the updated data here (e.g., via API call)
      setUser(formData);
    }
  };

  return (
    <div className='flex justify-center items-center h-screen bg-gray-100'>
      <div className='w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
        <h2 className='text-2xl mb-6 text-center font-bold'>Profile</h2>
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
            value={formData.username}
            onChange={handleChange}
            disabled={!isEditing}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              isEditing ? "" : "bg-gray-100"
            }`}
          />
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
            value={formData.email}
            onChange={handleChange}
            disabled={!isEditing}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              isEditing ? "" : "bg-gray-100"
            }`}
          />
        </div>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='fullName'>
            Full Name
          </label>
          <input
            type='text'
            id='fullName'
            name='fullName'
            value={formData.fullName}
            onChange={handleChange}
            disabled={!isEditing}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              isEditing ? "" : "bg-gray-100"
            }`}
          />
        </div>
        <div className='flex items-center justify-between'>
          <button
            onClick={handleEditToggle}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              isEditing ? "bg-green-500 hover:bg-green-700" : ""
            }`}>
            {isEditing ? "Save" : "Edit Profile"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
