import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../Api';

const SignIn = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  interface SignInFromType {
    name: string,
    email: string,
    password: string
  }
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignInFromType>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onTouched",
  });
  const onLoginHandler:SubmitHandler<SignInFromType> = async (data) => {
    try {
      setLoading(true);
      const response = await api.post("/auth/signin", data);
      if (response.status === 200) {
        toast.success("Login Successful");
        reset();
        const jwtToken = response.data.jwtToken;
        localStorage.setItem("JWT", jwtToken);
        await checkUserProfile(); 
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  const checkUserProfile = async () => {
    try {
      const profileResponse = await api.get("/user/profile");
      if (profileResponse.status === 200 && profileResponse.data) {
        navigate("/partner");
      } 
    } catch (error) {
      if (error.response && error.response.status === 404) {
        navigate("/user-profile");
      } else {
        toast.error("Something went wrong!");
      }
    }
};



  return (
    <div className="min-h-screen  flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg space-y-8 bg-white p-6 sm:p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-yellow-500">
            Welcome back
          </h2>
          <p className="mt-2 text-sm sm:text-base text-red-500">
            Free server is being used, it will take 2 minutes to restart. Please wait after clicking on Log In.
          </p>
        </div>

        <form className="mt-6 sm:mt-8 space-y-4 sm:space-y-6" onSubmit={handleSubmit(onLoginHandler)}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm sm:text-base font-semibold text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register("email", { required: "*Email is required" })}
                className="mt-1 block w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm 
                focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-sm sm:text-base"
                placeholder="john@example.com"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"

                {...register("password", { required: "*password is required" })}
                placeholder="*******"
                className="mt-1 block w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm 
                focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-sm sm:text-base"

              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>
          </div>

          <div>
            <button
              disabled={loading}
              type="submit"
              className="w-full flex justify-center py-2 sm:py-3 px-4 border border-transparent rounded-md
              shadow-sm sm:text-base font-bold text-white bg-yellow-500 hover:bg-yellow-400
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors"
            >
              {loading ? <span>Loading...</span> : "Log In"}
            </button>
          </div>

          <p className="text-center text-sm sm:text-base text-slate-700 mt-4 sm:mt-6">
            Don't have an account?{" "}
            <Link
              className="font-semibold underline text-yellow-500"
              to="/signup"
            >
              SignUp
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;