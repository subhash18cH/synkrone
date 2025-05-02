import React, { useEffect, useState } from "react";
import MySideBar from "./MySideBar";
import MiniProfile from "./MiniProfile";
import api from "./Api";
import toast from "react-hot-toast";
import moment from "moment";

// Define the shape of a request object
interface MatchRequest {
  profileId: string;
  fullName: string;
  profession: string;
  joining: string;
}

const Matches: React.FC = () => {
  const formatDate = (unformatted: string): string => {
    return moment(unformatted).format("DD MMM YYYY");
  };

  const [loading, setLoading] = useState<boolean>(false);
  const [sentRequests, setSentRequests] = useState<MatchRequest[]>([]);
  const [incomingRequests, setIncomingRequests] = useState<MatchRequest[]>([]);

  const loadSentRequests = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await api.get<MatchRequest[]>("/swipe/sent");
      if (response.status === 200) {
        setSentRequests(response.data);
      }
    } catch (error) {
      toast.error(error?.message || "Failed to load sent requests");
    } finally {
      setLoading(false);
    }
  };

  const loadReceivedRequests = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await api.get<MatchRequest[]>("/swipe/received");
      if (response.status === 200) {
        setIncomingRequests(response.data);
      }
    } catch (error) {
      toast.error(error?.message || "Failed to load incoming requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSentRequests();
    loadReceivedRequests();
  }, []);

  return (
    <>
      <div>
        <MySideBar />
      </div>

      <div className="w-full">
        <div className="flex gap-36 mt-32 ml-18">
          {/* Sent Requests */}
          <div>
            <h1 className="text-3xl font-bold mb-10 ml-14">Sent Requests</h1>
            {sentRequests.length > 0 ? (
              <div className="flex flex-col gap-6">
                {sentRequests.map((sent) => (
                  <MiniProfile
                    key={sent.profileId}
                    profile={sent.profileId}
                    name={sent.fullName}
                    profession={sent.profession}
                    joined={formatDate(sent.joining)}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 ml-6">No request sent</p>
            )}
          </div>

          {/* Incoming Requests */}
          <div>
            <h1 className="text-3xl font-bold mb-10 ml-6">Incoming Requests</h1>
            {incomingRequests.length > 0 ? (
              <div className="flex flex-col gap-6">
                {incomingRequests.map((receive) => (
                  <MiniProfile
                    key={receive.profileId}
                    profile={receive.profileId}
                    name={receive.fullName}
                    profession={receive.profession}
                    joined={formatDate(receive.joining)}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 ml-6">No incoming requests</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Matches;
