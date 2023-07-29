import React from "react";
import { useNavigate } from "react-router";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db, googleAuth } from "../firebase/firebase.ts";
import { signInWithPopup } from "firebase/auth";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Signup() {
  const navigate = useNavigate();
  const [user, setUser] = React.useState({ name: "", email: "", password: "" });
  const [modalInfo, setModalInfo] = React.useState({
    open: false,
    errorMessage: "",
  });
  const errorMessage = modalInfo.errorMessage.toString();

  const setDefaultAccountBalance = async (id: string) => {
    await setDoc(doc(db, "User Account Details", id), {
      AUD: 10000,
      CAD: 10000,
      EUR: 10000,
      GBP: 10000,
      USD: 10000,
    });
  };

  const handleEmailSignup = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setDefaultAccountBalance(user.uid);
        // console.log(user);
        navigate("/");
        // ...
      })
      .catch((error) => {
        // console.log(error);

        const errorCode = error.code;
        const errorMessage = error.message;
        setModalInfo({
          ...modalInfo,
          open: true,
          errorMessage: errorMessage,
        });
        // console.log(errorCode, errorMessage);
        // ..
      });
  };

  const handleGoogleSignup = () => {
    signInWithPopup(auth, googleAuth)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential!.accessToken;
        if (token) {
          localStorage.setItem("token", token);
        } else {
          localStorage.setItem("token", "no token");
        }

        // The signed-in user info.
        const user = result.user;
        // Save token to local storage
        // localStorage.setItem("token", token ? token : "no user");
        // console.log(user);
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        setDefaultAccountBalance(user.uid);
        navigate("/home");
      })
      .catch((error) => {
        // console.log(error);
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.error({ errorCode, errorMessage, email, credential });
      });
  };
  const handleClose = () => setModalInfo({ ...modalInfo, open: false });
  return (
    <div className="min-h-full w-[40%] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="text-center text-2xl font-bold">Sign up</div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={(e) => {
                    setUser({ ...user, name: e.target.value });
                  }}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={(e) => {
                    setUser({ ...user, email: e.target.value });
                  }}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={(e) => {
                    setUser({ ...user, password: e.target.value });
                  }}
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={handleEmailSignup}
              >
                Sign Up
              </button>
            </div>
            <a
              href="/"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Already have an account? Login
            </a>
          </form>
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-1">
              <div>
                <button
                  onClick={handleGoogleSignup}
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-blue-50"
                >
                  <span className="sr-only">Sign in with Google</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="28"
                    height="28"
                    viewBox="0 0 48 48"
                  >
                    <path
                      fill="#FFC107"
                      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                    ></path>
                    <path
                      fill="#FF3D00"
                      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                    ></path>
                    <path
                      fill="#4CAF50"
                      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                    ></path>
                    <path
                      fill="#1976D2"
                      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={modalInfo.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <span className=" text-lg font-semibold w-max">
              {setErrorTitle(errorMessage)}
            </span>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
function setErrorTitle(errorMessage: string): string {
  return errorMessage ==
    "Firebase: Password should be at least 6 characters (auth/weak-password)."
    ? "Password should be at least 6 characters."
    : errorMessage == undefined
    ? "Sorry we're experiencing technical issues"
    : errorMessage;
}
