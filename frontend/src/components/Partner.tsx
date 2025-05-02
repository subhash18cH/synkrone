import React, { useEffect, useState } from "react";
import MySideBar from "./MySideBar";
import { motion, useAnimation } from "framer-motion";
import ProfileCard from "./ProfileCard";
import api from "./Api";
import toast from "react-hot-toast";

interface UserProfile {
  userId: number;
  fullName: string;
  profession: "Developer" | "Marketer" | string;
  about: string;
  vision: string;
  skills: string[];
  availability: "Full-Time" | "Part-Time" | string;
}

const Partner: React.FC = () => {
  const [clickedCategory, setClickedCategory] = useState<"Developer" | "Marketer" | null>(null);
  const [developers, setDevelopers] = useState<UserProfile[]>([]);
  const [marketers, setMarketers] = useState<UserProfile[]>([]);
  const controls = useAnimation();
  const [isDragging, setIsDragging] = useState(false);

  const getAllDevelopers = async () => {
    try {
      const response = await api.get<UserProfile[]>("/user/profile/developers");
      if (response.status === 200) {
        setDevelopers(response.data);
      }
    } catch (error) {
      toast.error(error?.message || "Failed to fetch developers.");
    }
  };

  const getAllMarketers = async () => {
    try {
      const response = await api.get<UserProfile[]>("/user/profile/marketers");
      if (response.status === 200) {
        setMarketers(response.data);
      }
    } catch (error) {
      toast.error(error?.message || "Failed to fetch marketers.");
    }
  };

  const handleClick = (category: "Developer" | "Marketer") => {
    if (clickedCategory !== category) {
      setClickedCategory(category);
    }
  };

  useEffect(() => {
    if (clickedCategory === "Developer") {
      getAllDevelopers();
    } else if (clickedCategory === "Marketer") {
      getAllMarketers();
    }
  }, [clickedCategory]);

  useEffect(() => {
    if (!isDragging) {
      controls.start({
        x: ["0%", "-100%"],
        transition: { ease: "linear", duration: 10, repeat: Infinity },
      });
    }
  }, [isDragging, controls]);

  return (
    <>
      <div>
        <MySideBar />
      </div>
      <div className="w-full">
        <div className="flex flex-col items-center mt-36">
          <div className="mb-16 flex flex-col gap-2">
            <h1 className="text-4xl font-bold">FlowHive Matcher</h1>
            <span className="text-gray-600">
              Swipe and &#x2764; your perfect business partner
            </span>
          </div>

          {!clickedCategory && (
            <>
              <div>
                <h1 className="text-2xl font-bold text-center">
                  Who are you looking for?
                </h1>
                <span className="text-gray-500">
                  Choose the type of partner you want to collaborate with
                </span>
              </div>

              <div className="flex gap-5 mt-10">
                <button
                  onClick={() => handleClick("Developer")}
                  className="border rounded-xl bg-yellow-400 hover:bg-yellow-300 py-3 px-8"
                >
                  Developers
                </button>

                <button
                  onClick={() => handleClick("Marketer")}
                  className="border rounded-xl bg-yellow-400 hover:bg-yellow-300 py-3 px-8"
                >
                  Marketers
                </button>
              </div>
            </>
          )}

          {clickedCategory === "Developer" && (
            <motion.div
              style={{ cursor: "default" }}
              className="flex gap-4 mb-8 sm:gap-6 lg:gap-8 cursor-grab active:cursor-grabbing"
              drag="x"
              dragConstraints={{ left: 0, right: -300 }}
              onDragStart={() => {
                setIsDragging(true);
                controls.stop();
              }}
              onDragEnd={() => setIsDragging(false)}
              animate={controls}
            >
              <div className="flex shrink-0 gap-4 sm:gap-6">
                {developers.length > 0 ? (
                  developers.map((dev, index) => (
                    <ProfileCard
                      key={index}
                      userId={dev.userId}
                      name={dev.fullName}
                      role={dev.profession}
                      about={dev.about}
                      vision={dev.vision}
                      spec={dev.skills}
                      avail={dev.availability}
                    />
                  ))
                ) : (
                  <p className="text-gray-500">No developers found.</p>
                )}
              </div>
            </motion.div>
          )}

          {clickedCategory === "Marketer" && (
            <motion.div
              style={{ cursor: "default" }}
              className="flex gap-4 mb-8 sm:gap-6 lg:gap-8 cursor-grab active:cursor-grabbing"
              drag="x"
              dragConstraints={{ left: -300, right: 0 }}
              onDragStart={() => {
                setIsDragging(true);
                controls.stop();
              }}
              onDragEnd={() => setIsDragging(false)}
              animate={controls}
            >
              <div className="flex shrink-0 gap-4 sm:gap-6">
                {marketers.length > 0 ? (
                  marketers.map((dev, index) => (
                    <ProfileCard
                      key={index}
                      userId={dev.userId}
                      name={dev.fullName}
                      role={dev.profession}
                      about={dev.about}
                      vision={dev.vision}
                      spec={dev.skills}
                      avail={dev.availability}
                    />
                  ))
                ) : (
                  <p className="text-gray-500">No marketers found.</p>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default Partner;
