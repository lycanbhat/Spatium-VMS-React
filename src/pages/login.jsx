import React, { useRef, useState } from "react";
import { makeApiCall } from "../Utils/api-funcs";
import spatium from "../assets/images/spatium.png";
import loadingIco from "../assets/images/icons/loading.svg";
import { setToken } from "../redux/auth";
import { useDispatch } from "react-redux";
import { redirect } from "react-router-dom";
const Login = () => {
  const [showOtp, setShowOtp] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const emailInp = useRef();
  const otpInp = useRef();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleRequestOtp = async () => {
    // Here you would make the OTP request call
    // After the call, set showOtp to true to show the OTP input field
    if (!showOtp) {
      setLoading(true);
      const { status, data } = await makeApiCall(
        "POST",
        "v1/auth/verify-email/",
        { email: email }
      );
      if (status == "error") {
        emailInp.current.classList.add("border-red-600");
        setLoading(false);
        return;
      }
      setLoading(false);
      setShowOtp(true);
    } else {
      const { status, data } = await makeApiCall(
        "POST",
        "v1/auth/verify-otp/",
        { email, otp }
      );
      if (status == "error") {
        otpInp.current.classList.add("border-red-600");
        return;
      }
      dispatch(setToken(data));
      redirect("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className=" flex justify-center border-b-2 pb-6">
          <img src={spatium} className="w-44" alt="spatium" />
        </div>
        <div>
          <h2 className="mt-6 text-center text-xl md:text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <div 
              ref={emailInp}
              className="flex gap-2 appearance-none rounded-none relative w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  
                  className=" border-none outline-none bg-transparent grow"
                  placeholder="Email address"
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setShowOtp(false);
                  }}
                />
                {loading && (
                  <img src={loadingIco} className="w-6 aspect-square " alt="" />
                )}
              </div>
            </div>
            {showOtp && (
              <div>
                <label htmlFor="otp" className="sr-only">
                  OTP
                </label>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  required
                  ref={otpInp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Enter OTP"
                />
              </div>
            )}
          </div>

          <div>
            <button
              type="button"
              onClick={handleRequestOtp}
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {showOtp ? "Sign In" : "Request OTP"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
