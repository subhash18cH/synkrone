import React, { useEffect, useState } from 'react';
import MySideBar from './MySideBar';
import { Textarea } from './ui/textarea';
import api from './Api';
import toast from 'react-hot-toast';

interface UserProfile {
  fullName: string;
  profession: 'Developer' | 'Marketer' | '';
  about: string;
  vision: string;
  skills: string[];
  availability: 'Part-Time' | 'Full-Time' | '';
}

const availableSkills: string[] = [
  'brand', 'docker', 'Java', 'Tailwind CSS', 'MongoDB',
  'AWS', 'Git',
];

const Profile: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [initialData, setInitialData] = useState<UserProfile | null>(null);
  const [userData, setUserData] = useState<UserProfile>({
    fullName: '',
    profession: '',
    about: '',
    vision: '',
    skills: [],
    availability: '',
  });

  const toggleSkill = (skill: string) => {
    setUserData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const getProfile = async () => {
    setLoading(true);
    try {
      const response = await api.get<UserProfile>('/user/profile');
      if (response.status === 200) {
        console.log('user profile', response.data);
        setUserData(response.data);
        setInitialData(response.data);
      }
    } catch (error) {
      toast.error(error?.message || 'Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  const handleChanges = async () => {
    try {
      const response = await api.put<UserProfile>('/user/profile', userData);
      if (response.status === 200) {
        toast.success('Profile updated successfully!');
        setUserData(response.data);
        setInitialData(response.data);
      }
    } catch (error) {
      toast.error(error?.message || 'Failed to update profile');
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const isDataChanged = JSON.stringify(userData) !== JSON.stringify(initialData);

  return (
    <>
      <div>
        <MySideBar />
      </div>

      <div className='w-[70%] pb-4'>
        <div className='mt-16 ml-6 border-2 px-5 py-4 rounded-xl pb-6'>

          <h1 className='text-2xl font-semibold'>Edit Your Profile</h1>

          {/* Name */}
          <div className='flex flex-col mt-6 gap-2'>
            <label className='ml-1'>Name</label>
            <input
              type='text'
              value={userData.fullName}
              onChange={(e) => setUserData({ ...userData, fullName: e.target.value })}
              placeholder='Name'
              className='border px-3 py-2 rounded-xl'
            />
          </div>

          {/* Profession */}
          <div className='mt-6'>
            <h1>Type</h1>
            <div className='flex justify-center items-center gap-6 mt-2'>
              {['Developer', 'Marketer'].map((type) => (
                <button
                  key={type}
                  onClick={() => setUserData({ ...userData, profession: type as 'Developer' | 'Marketer' })}
                  className={`py-2 border px-4 rounded-2xl ${userData.profession === type ? 'bg-yellow-400' : ''}`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* About */}
          <div className='mt-6 flex flex-col gap-2'>
            <h1>Description</h1>
            <Textarea
              value={userData.about}
              onChange={(e) => setUserData({ ...userData, about: e.target.value })}
              className='h-20 rounded-xl'
              placeholder="E.g. I'm a [role] with [X] years of experience in [main skills]. I specialize in [area] and have a track record of [achievement]."
            />
          </div>

          {/* Skills */}
          <div className='mt-6'>
            <h1>Tags</h1>
            <div className='flex flex-wrap justify-center gap-4'>
              {availableSkills.map((skill) => (
                <button
                  key={skill}
                  onClick={() => toggleSkill(skill)}
                  className={`px-4 py-2 border rounded-2xl transition-all ${userData.skills.includes(skill) ? 'bg-yellow-400' : 'bg-gray-100 hover:bg-gray-200'}`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div className='mt-6'>
            <h1>Availability</h1>
            <div className='flex flex-wrap gap-4 mt-6 justify-center items-center'>
              {['Part-Time', 'Full-Time'].map((option) => (
                <button
                  key={option}
                  onClick={() => setUserData({ ...userData, availability: option as 'Part-Time' | 'Full-Time' })}
                  className={`py-2 border px-4 rounded-2xl ${userData.availability === option ? 'bg-yellow-400' : ''}`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Vision */}
          <div className='mt-6'>
            <h1>Your Vision</h1>
            <div className='flex gap-6 mt-9'>
              <Textarea
                value={userData.vision}
                onChange={(e) => setUserData({ ...userData, vision: e.target.value })}
                className='rounded-xl h-20'
                placeholder='Goals: What specific impact do you want to make?'
              />
            </div>
          </div>

          {/* Save Button */}
          <div className='mt-6 flex justify-end'>
            <button
              onClick={handleChanges}
              disabled={!isDataChanged}
              className={`p-2 rounded-xl ${isDataChanged ? 'bg-yellow-400 hover:bg-yellow-300' : 'bg-yellow-400 cursor-not-allowed'}`}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
