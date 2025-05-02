import React from 'react';
import MySideBar from './MySideBar';
import { useNavigate } from 'react-router-dom';
import api from './Api';
import toast from 'react-hot-toast';

const Settings: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("JWT");
    navigate("/");
  };

  const handleDelete = async (): Promise<void> => {
    try {
      const response = await api.delete("/user/profile");
      if (response.status === 200) {
        toast.success("User Profile deleted successfully!");
        localStorage.removeItem("JWT");
        navigate("/");
      }
    } catch (error) {
      toast.error(error?.message || "Failed to delete profile.");
    }
  };

  return (
    <>
      <div>
        <MySideBar />
      </div>

      <div className="w-full mt-20 ml-52">
        <h1 className="text-3xl font-bold">Settings</h1>
        <div className="mt-8">
          <h1 className="text-2xl font-semibold mb-10">Account</h1>
          <button
            onClick={handleLogout}
            className="border px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white"
          >
            Logout
          </button>
        </div>
        {/* <div className='mt-16'>
          <h1 className='text-2xl text-red-600 font-semibold mb-2'>Danger Zone</h1>
          <button onClick={handleDelete} className='text-red-600 text-xs'>Delete Account</button>
        </div> */}
      </div>
    </>
  );
};

export default Settings;
