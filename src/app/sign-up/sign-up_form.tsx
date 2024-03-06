import { useState } from "react";
import { sendEmailVerification } from "firebase/auth";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, db } from "@/app/firebase/init_app";
import { useRouter } from "next/navigation";
import { doc, setDoc } from "firebase/firestore";
import Radio from "./radio";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

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

  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //if passwords do not match, set error message here
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    } else {
      setPasswordError("");
    }
    //if role is not selected
    if (!role) {
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
        //Sending email verification
        await sendEmailVerification(res.user);
      }
      sessionStorage.setItem("user", "true");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      //if (setPassword.length <= 7){
      //setPasswordLengthError("Password must be at least 8 Characters, please use a different password!");
      //}

      if (res !== undefined) {
        router.push("/HomePage");
      }
      if (res == undefined) {
        //If the user attempts to sign up with the same email, they are thrown an error
        setEmailError(
          "Account already created with this email, please reload and try a new email or sign in!",
        );
      } else {
        setEmailError("");
      }
    } catch (error) {
      console.error(error);
    }
  };

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
          <div className="w-full px-4 py-1 pb-8 md:px-8 lg:w-1/2">
            <p className="pt-5 text-center text-xl font-bold text-[#ff6865]">
              TECH EDUCATION
            </p>
            <p className="mt-2 pb-5 text-center font-medium">Welcome!</p>
            <form className="space-y-2" onSubmit={handleSignup}>
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
                {/*error message here if there is one*/}
                {/*{passwordLengthError && <p className="mt-2 text-sm text-red-500">{passwordLengthError}</p>}*/}
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
                    className="block w-full rounded-lg border bg-white px-4 py-1 focus:border-[#ffcf4f] focus:outline-none focus:ring focus:ring-[#ffe08d] focus:ring-opacity-40"
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
                {/* error message here if there is one */}
                {passwordError && (
                  <p className="mt-2 text-sm text-red-500">{passwordError}</p>
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
