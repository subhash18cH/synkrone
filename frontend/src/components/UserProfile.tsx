import React, { useState } from 'react';
import { FaRegEye } from 'react-icons/fa';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

import api from './Api';
import { useNavigate } from 'react-router-dom';
import { Textarea } from './ui/textarea';

interface UserData {
  fullName: string;
  profession: string;
  about: string;
  vision: string;
  skills: string[];
  availability: string;
}

const UserProfile: React.FC = () => {
  const navigate = useNavigate();

  const availableSkills: string[] = [
    'frontend', 'growth', 'seo', 'full-stack', 'backend', 'socila-media',
    'AWS', 'Git', 'ui/ux', 'Docker', 'brand', 'devops'
  ];

  const [userData, setUserData] = useState<UserData>({
    fullName: '',
    profession: '',
    about: '',
    vision: '',
    skills: [],
    availability: ''
  });

  const [step, setStep] = useState<number>(1);

  const toggleSkill = (skill: string) => {
    setUserData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await api.post('/user/profile/add-info', userData);
      if (response.status === 200) {
        navigate('/partner');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const nextStep = () => {
    if (step < 6) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <>
      <div className='h-[450px]'>
        <div className='flex items-center justify-center mt-10 border-b'>
          <h2 className='text-3xl font-bold mb-4'>Your Profile</h2>
        </div>

        {step === 1 && (
          <div className='flex flex-col justify-center items-center mt-10'>
            <h1 className='text-2xl font-bold'>What's Your Name?*</h1>
            <input
              type='text'
              onChange={(e) =>
                setUserData({ ...userData, fullName: e.target.value })
              }
              className='border py-3 h-16 px-4 w-[50%] mt-7 rounded-full border-yellow-500 outline-yellow-500 border-1'
              placeholder='aman rawat'
            />
          </div>
        )}

        {step === 2 && (
          <div className='flex flex-col justify-center items-center mt-10'>
            <h1 className='text-2xl font-bold'>What is your role?*</h1>
            <span className='text-gray-500'>Are you a marketer or a developer?</span>
            <div className='flex gap-6 mt-14'>
              <button
                onClick={() =>
                  setUserData({ ...userData, profession: 'Developer' })
                }
                className={`py-2 border px-4 rounded-2xl ${
                  userData.profession === 'Developer' ? 'bg-yellow-400' : ''
                }`}
              >
                Developer
              </button>
              <button
                onClick={() =>
                  setUserData({ ...userData, profession: 'Marketer' })
                }
                className={`py-2 border px-4 rounded-2xl ${
                  userData.profession === 'Marketer' ? 'bg-yellow-400' : ''
                }`}
              >
                Marketer
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className='flex flex-col justify-center items-center mt-10'>
            <h1 className='text-2xl font-bold'>About You*</h1>
            <span className='text-gray-500'>Give us a short intro about yourself</span>
            <div className='flex gap-6 mt-9'>
              <Textarea
                onChange={(e) =>
                  setUserData({ ...userData, about: e.target.value })
                }
                className='w-[600px] h-16'
                placeholder="E.g. I'm a [role] with [X] years of experience in [main skills]..."
              />
            </div>
          </div>
        )}

        {step === 4 && (
          <div className='flex flex-col justify-center items-center mt-10'>
            <h1 className='text-2xl font-bold'>Your Skills*</h1>
            <span className='text-gray-500'>What are your areas of expertise?</span>
            <div className='flex flex-wrap gap-4 mt-6 max-w-xl justify-center'>
              {availableSkills.map((skill) => (
                <button
                  key={skill}
                  onClick={() => toggleSkill(skill)}
                  className={`px-4 py-2 border rounded-2xl transition-all ${
                    userData.skills.includes(skill)
                      ? 'bg-yellow-400'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 5 && (
          <div className='flex flex-col justify-center items-center mt-10'>
            <h1 className='text-2xl font-bold'>Availability*</h1>
            <span className='text-gray-500'>What's your current availability?</span>
            <div className='flex flex-wrap gap-4 mt-6 max-w-xl justify-center'>
              <button
                onClick={() =>
                  setUserData({ ...userData, availability: 'Part Time' })
                }
                className={`py-2 border px-4 rounded-2xl ${
                  userData.availability === 'Part Time' ? 'bg-yellow-400' : ''
                }`}
              >
                Part Time
              </button>
              <button
                onClick={() =>
                  setUserData({ ...userData, availability: 'Full Time' })
                }
                className={`py-2 border px-4 rounded-2xl ${
                  userData.availability === 'Full Time' ? 'bg-yellow-400' : ''
                }`}
              >
                Full Time
              </button>
            </div>
          </div>
        )}

        {step === 6 && (
          <div className='flex flex-col justify-center items-center mt-10'>
            <h1 className='text-2xl font-bold'>Your Vision*</h1>
            <span className='text-gray-500'>
              Help us understand your passion for building startups
            </span>
            <div className='flex gap-6 mt-9'>
              <Textarea
                onChange={(e) =>
                  setUserData({ ...userData, vision: e.target.value })
                }
                className='w-[600px] h-16'
                placeholder={`🎯 Goals: What specific impact do you want to make?
💡 Innovation: What unique perspective do you bring?
🤝 Collaboration: How do you want to work with others?
📈 Growth: What excites you about scaling products?`}
              />
            </div>
          </div>
        )}
      </div>

      <div className='flex justify-between'>
        <button
          onClick={prevStep}
          className={`flex px-5 py-3 items-center hover:bg-gray-100 ml-16 gap-2 border rounded-full ${
            step === 1 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={step === 1}
        >
          <MdKeyboardArrowLeft />
          Previous
        </button>

        <button
          onClick={nextStep}
          className='flex items-center mr-16 gap-2 bg-yellow-400 px-6 py-3 rounded-full hover:bg-yellow-300'
        >
          <span className='text-sm'>{step === 6 ? 'Submit' : 'Next'}</span>
          <MdKeyboardArrowRight />
        </button>
      </div>
    </>
  );
};

export default UserProfile;
