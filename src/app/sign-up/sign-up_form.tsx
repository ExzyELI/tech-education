import { useState } from "react";
import { sendEmailVerification } from "firebase/auth";
import {
  useCreateUserWithEmailAndPassword,
  SendEmailVerificationHook,
} from "react-firebase-hooks/auth";
import { auth, db } from "@/app/firebase/init_app";
import { useRouter } from "next/navigation";
import { doc, setDoc } from "firebase/firestore";
import Radio from "../../../comps/radio";

export default function Sign_up_form() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const router = useRouter();
  const [role, selectedRole] = useState("");

  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try 
    {
      const res = await createUserWithEmailAndPassword(email, password);
      console.log({ res });
      if (res) 
      {
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

      if (res !== undefined) {
        router.push("/HomePage");
      }
    } 
    catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <title>Tech Education | Sign Up</title>
      <div className="flex min-h-screen items-center bg-gradient-to-br from-[#fdf4ed] to-[#ffecde] text-[#434343]">
        <div className="mx-auto flex w-full max-w-lg rounded-lg bg-white shadow-lg lg:max-w-4xl">
          <div className="w-full px-4 py-1 md:px-8 lg:w-1/2">
            <p className="pt-5 text-center text-xl font-bold text-[#ff6865]">
              TECH EDUCATION
            </p>
            <p className="mt-2 pb-5 text-center font-medium">Welcome!</p>
            <form className="space-y-2" onSubmit={handleSignup}>
              <div>
                <label
                  htmlFor="firstName"
                  className="mb-1 block text-sm font-medium"
                >
                  First Name
                </label>
                <div>
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
              </div>

              <div className="pt-3">
                <label
                  htmlFor="lastName"
                  className="mb-1 block text-sm font-medium"
                >
                  Last Name
                </label>
                <div>
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
                <label
                  htmlFor="email"
                  className="mb-1 block text-sm font-medium"
                >
                  Email address
                </label>
                <div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-lg border bg-white px-4 py-1 focus:border-[#ffcf4f] focus:outline-none focus:ring focus:ring-[#ffe08d] focus:ring-opacity-40"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between pt-3">
                  <label
                    htmlFor="password"
                    className="mb-1 block text-sm font-medium"
                  >
                    Password
                  </label>
                </div>
                <div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-lg border bg-white px-4 py-1 focus:border-[#ffcf4f] focus:outline-none focus:ring focus:ring-[#ffe08d] focus:ring-opacity-40"
                  />
                </div>
              </div>

              <div className="py-3">
                <Radio role={role} setradioButton={selectedRole} />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full transform rounded-lg bg-[#ffe08d] px-6 py-3 text-sm font-medium tracking-wide transition-colors duration-300 hover:bg-[#ffe9b0] focus:outline-none focus:ring focus:ring-[#ffe08d] focus:ring-opacity-50"
                >
                  Sign up
                </button>
              </div>
              <p className="mt-10 text-center text-sm text-gray-500">
                Already have a account?{" "}
                <a
                  href="/sign-in"
                  className="font-semibold leading-6 text-[#ffc21e]"
                >
                  Sign in
                </a>
              </p>

              <p className="pb-3 text-center text-xs text-[#ff6865]">
                <a
                  href="https://www.vectorstock.com/royalty-free-vector/children-learn-computer-or-laptop-vector-21390195"
                  target="_blank"
                >
                  img source
                </a>
              </p>
            </form>
          </div>

          <div
            className="rounded-r-lg bg-cover object-center lg:block lg:w-1/2"
            style={{
              backgroundImage: 'url("https://i.imgur.com/Peuslv2.jpg")',
            }}
          />
        </div>
      </div>
    </div>
  );
}
