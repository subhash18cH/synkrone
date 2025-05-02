import React from "react";
import logo from "/src/assets/img.png";
import { useNavigate } from "react-router-dom";

interface MiniProfileProps {
  image?: string;
  name: string;
  profession: string;
  joined: string;
  profile: string;
}

const MiniProfile: React.FC<MiniProfileProps> = ({
  image,
  name,
  profession,
  joined,
  profile,
}) => {
  const navigate = useNavigate();

  const handleClick = (profileId: string): void => {
    navigate(`/p/${profileId}`);
  };

  return (
    <>
      <div
        id={profile}
        onClick={() => handleClick(profile)}
        className="w-96 flex border py-4 rounded-2xl hover:shadow-md gap-1 hover:cursor-pointer"
      >
        <div>
          <img
            className="object-contain rounded-lg h-14"
            src={image || logo}
            alt="profile"
          />
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex gap-2">
            <h1 className="font-semibold text-xl">{name}</h1>
            <span className="border px-3 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold pt-1">
              {profession}
            </span>
          </div>
          <div className="flex justify-start">
            <span className="text-gray-500 text-sm">Joined at {joined}</span>
          </div>
        </div>

        <div className="ml-3">
          <button className="border rounded-full px-3 py-1 mt-3 text-sm font-semibold">
            View
          </button>
        </div>
      </div>
    </>
  );
};

export default MiniProfile;
