import { useState, useEffect } from "react";
import { sendEmailVerification } from "firebase/auth";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, db } from "@/app/firebase/init_app";
import { useRouter } from "next/navigation";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import Radio from "./radio";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function Sign_up_form() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //confirm password state
  const [confirmPassword, setConfirmPassword] = useState("");
  //error state
  const [passwordError, setPasswordError] = useState("");
  //role error state
  const [roleError, setRoleError] = useState("");
  //Email error state
  const [emailError, setEmailError] = useState("");
  //password length error state
  const [passwordLengthError, setPasswordLengthError] = useState("");
  // password visibility
  const [passwordVisible, setPasswordVisible] = useState(false);
  // confirm password visibility
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const router = useRouter();
  const [role, selectedRole] = useState("");
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);
  const [showConfirmPasswordMatch, setShowConfirmPasswordMatch] = useState(false);


  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);

  const [passwordValidity, setPasswordValidity] = useState({
    minLength: false,
    hasNumber: false,
    hasUpper: false,
    hasLower: false,
    hasSpecialChar: false,
  });

  useEffect(() => {
    const minLength = password.length >= 8;
    const hasNumber = /[0-9]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    setPasswordValidity({
      minLength,
      hasNumber,
      hasUpper,
      hasLower,
      hasSpecialChar,
    });
  }, [password]);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowPasswordRequirements(true);
    //if passwords do not match, set error message here
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    } else {
      setPasswordError("");
    }

    // password requirements are met before submitting the form
    const allRequirementsMet = Object.values(passwordValidity).every(Boolean);
    //if password Requirements are not met 
    if (!allRequirementsMet) {
      setPasswordLengthError("Password must meet all requirements.");
      return;
    } else {
      setPasswordLengthError("");
    }
    //if role is not met 
    if (!role ) {
      setRoleError("Please select a role.");
      return;
    } else {
      setRoleError("");
    }
    try {
      const res = await createUserWithEmailAndPassword(email, password);
      console.log({ res });
      if (res) {
        await setDoc(doc(db, "users", res.user.uid), {
          email: res.user.email,
          firstName: firstName,
          lastName: lastName,
          role: role,
        });
        if (role == "Student") {
          const code = generateStudentCode();
          await updateDoc(doc(db, "users", res.user.uid), {
            studentCode: code,
          });
        }
        //Sending email verification
        await sendEmailVerification(res.user);
      }
      sessionStorage.setItem("user", "true");
      setEmail("");
      setPassword("");
      setConfirmPassword("");


      if (res !== undefined) {
        toast.success("Account created! Please check your email to verify and then sign in."); // show email verification has been sent message
        //router.push("/HomePage");
        (document.getElementById('myform') as HTMLFormElement).reset();
      }
      if (res == undefined) {
        //If the user attempts to sign up with the same email, they are thrown an error
        setEmailError(
          "Account already created with this email, please try a new email or Login!"
        );
      } else {
        setEmailError("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Function to generate a random 5-digit number
  function generateStudentCode(): string {
    const min = 10000;
    const max = 99999;
    return (Math.floor(Math.random() * (max - min + 1)) + min).toString();
  }

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible((prev) => !prev);
  };

  return (
    <div>
      <title>Tech Education | Sign Up</title>
      <div className="flex min-h-screen items-center bg-gradient-to-br from-[#FAF9F6] to-[#FAF9F6] text-[#434343]">
        <div className="mx-auto flex w-full max-w-lg rounded-lg bg-white shadow-lg lg:max-w-5xl">
          <div className="relative w-full px-4 py-8 md:px-8 lg:w-1/2">
            <div className="absolute left-0 top-0 ml-4 mt-4">
              <button
                onClick={() => router.push("/")}
                className="flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
              </button>
            </div>
            <p className="text-center text-xl font-bold text-[#ff6865]">
              TECH EDUCATION
            </p>
            <p className="mt-2 pb-5 text-center font-medium">Welcome!</p>
            <form id="myform" className="space-y-2" onSubmit={handleSignup}>
              <div className="flex space-x-3">
                <div className="flex-1">
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium"
                  >
                    First name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="firstName"
                    autoComplete="firstName"
                    required
                    onChange={(e) => setfirstName(e.target.value)}
                    className="block w-full rounded-lg border bg-white px-4 py-1 focus:border-[#ffcf4f] focus:outline-none focus:ring focus:ring-[#ffe08d] focus:ring-opacity-40"
                  />
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium"
                  >
                    Last name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="lastName"
                    autoComplete="lastName"
                    required
                    onChange={(e) => setlastName(e.target.value)}
                    className="block w-full rounded-lg border bg-white px-4 py-1 focus:border-[#ffcf4f] focus:outline-none focus:ring focus:ring-[#ffe08d] focus:ring-opacity-40"
                  />
                </div>
              </div>

              <div className="pt-3">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-lg border bg-white px-4 py-1 focus:border-[#ffcf4f] focus:outline-none focus:ring focus:ring-[#ffe08d] focus:ring-opacity-40"
                />
                {/*error message here if there is one for the email section*/}
                {emailError && (
                  <p className="mt-2 text-sm text-red-500">{emailError}</p>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between pt-3">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium"
                  >
                    Password
                  </label>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={passwordVisible ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setShowPasswordRequirements(true)} // show popup on focus
                    onBlur={() => setShowPasswordRequirements(false)} // hide popup on blur
                    className="block w-full rounded-lg border bg-white px-4 py-1 focus:border-[#ffcf4f] focus:outline-none focus:ring focus:ring-[#ffe08d] focus:ring-opacity-40"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    <FontAwesomeIcon
                      icon={passwordVisible ? faEyeSlash : faEye}
                      className="text-gray-400 hover:text-gray-600"
                    />
                  </button>
                </div>
                {/* Display password length error message if it exists */}
                {passwordLengthError && (
                  <p className="mt-2 text-sm text-red-500">{passwordLengthError}</p>
                )}
                {/* password requirements popup */}
                {showPasswordRequirements && !emailError && !roleError && !showConfirmPasswordMatch &&(
                  <div className="absolute z-10 w-96 p-4 mt-2 bg-white rounded-lg shadow-lg border border-gray-200">
                    <p className={`text-sm ${passwordValidity.minLength ? "text-green-500" : "text-red-500"}`}>
                      {passwordValidity.minLength ? "✓" : "✗"} At least 8 characters
                    </p>
                    <p className={`text-sm ${passwordValidity.hasNumber ? "text-green-500" : "text-red-500"}`}>
                      {passwordValidity.hasNumber ? "✓" : "✗"} Contains a number
                    </p>
                    <p className={`text-sm ${passwordValidity.hasUpper ? "text-green-500" : "text-red-500"}`}>
                      {passwordValidity.hasUpper ? "✓" : "✗"} Contains an uppercase letter
                    </p>
                    <p className={`text-sm ${passwordValidity.hasLower ? "text-green-500" : "text-red-500"}`}>
                      {passwordValidity.hasLower ? "✓" : "✗"} Contains a lowercase letter
                    </p>
                    <p className={`text-sm ${passwordValidity.hasSpecialChar ? "text-green-500" : "text-red-500"}`}>
                      {passwordValidity.hasSpecialChar ? "✓" : "✗"} Contains a special character
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-3">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium"
                >
                  Confirm password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={confirmPasswordVisible ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onFocus={() => setShowConfirmPasswordMatch(true)} // show popup on focus
                    onBlur={() => setShowConfirmPasswordMatch(false)} // hide popup on blur
                    className="block w-full rounded-lg border bg-white px-4 py-2 focus:border-yellow-400 focus:outline-none focus:ring focus:ring-yellow-200 focus:ring-opacity-40"
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    <FontAwesomeIcon
                      icon={confirmPasswordVisible ? faEyeSlash : faEye}
                      className="text-gray-400 hover:text-gray-600"
                    />
                  </button>
                </div>
                {/* Conditional rendering of the confirm password match popup */}
                {showConfirmPasswordMatch && (
                  <div className="absolute z-10 w-96 p-4 mt-2 bg-white rounded-lg shadow-lg border border-gray-200">
                    <p className={`text-sm ${password === confirmPassword && confirmPassword ? "text-green-500" : "text-red-500"}`}>
                      {password === confirmPassword && confirmPassword ? "✓" : "✗"} Passwords match
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-3">
                <label htmlFor="roles" className="block text-sm font-medium">
                  Select a role:
                </label>
                <Radio role={role} setradioButton={selectedRole} />
                {/*error message here if there is one*/}
                {roleError && (
                  <p className="mt-2 text-sm text-red-500">{roleError}</p>
                )}
              </div>

              <div className="mt-5">
                <button
                  type="submit"
                  className="w-full transform rounded-lg bg-[#ffe08d] px-6 py-3 text-sm font-medium tracking-wide transition-colors duration-300 hover:bg-[#ffe9b0] focus:outline-none focus:ring focus:ring-[#ffe08d] focus:ring-opacity-50"
                >
                  Sign up
                </button>
                <ToastContainer
                  className="Toast-position -mt-[15px]"
                  style={{ width: "600px" }}
                  position="top-center"
                />
              </div>
              <p className="mt-10 text-center text-sm text-gray-500">
                Already have an account?{" "}
                <a
                  href="/sign-in"
                  className="font-semibold leading-6 text-[#ffc21e]"
                >
                  Login
                </a>
              </p>
            </form>
          </div>
          <div
            className="rounded-r-lg bg-cover object-center lg:block lg:w-1/2"
            style={{
              backgroundImage: 'url("https://i.imgur.com/LZZApNB.jpeg")',
            }}
          />
        </div>
      </div>
    </div>
  );
}
