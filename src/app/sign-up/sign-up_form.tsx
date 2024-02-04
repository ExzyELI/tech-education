import {useState} from "react";
import {sendEmailVerification} from "firebase/auth";
import {useCreateUserWithEmailAndPassword, SendEmailVerificationHook} from 'react-firebase-hooks/auth'
import {auth, db} from '@/app/firebase/init_app'
import {useRouter} from "next/navigation";
import {doc, setDoc} from "firebase/firestore";
import Radio from "../../../comps/radio";


export default function Sign_up_form() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const router = useRouter();
    const [role, selectedRole] = useState('');

    const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
  
    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const res = await createUserWithEmailAndPassword(email, password);
        console.log({res});
        if (res){
          await setDoc(doc(db,'users',res.user.uid),{email:res.user.email, firstName:firstName, lastName:lastName, role:role});
          //Sending email verification
          await sendEmailVerification(res.user);
        }
        sessionStorage.setItem('user','true');
        setEmail('');
        setPassword('');

        if (res !== undefined){
          router.push('/');
        }
      } catch (error) {
        console.error(error)
      }
    };

    return (
      <div>
        <title>Tech Education | Sign Up</title>
        <div className="flex h-screen min-h-screen items-center bg-gradient-to-br from-[#fdf4ed] to-[#ffecde] text-[#434343]">
          <div className="mx-auto flex w-full max-w-lg rounded-lg bg-white shadow-lg lg:max-w-4xl">
            
            <div className="w-full px-4 py-3 md:px-8 lg:w-1/2">
                <p className="mt-3 text-center text-xl font-bold text-[#ff6865]">
                  TECH EDUCATION
                </p>
                <p className="mt-2 text-center font-medium">Welcome!</p>
              <form className="space-y-6" onSubmit={handleSignup}>
                <div>
                    <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
                      First Name
                    </label>
                    <div className="mt-2">
                      <input
                        id="firstName"
                        name="firstName"
                        type="firstName"
                        autoComplete="firstName"
                        required
                        onChange={(e) => setfirstName(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">
                      Last Name
                    </label>
                    <div className="mt-2">
                      <input
                        id="lastName"
                        name="lastName"
                        type="lastName"
                        autoComplete="lastName"
                        required
                        onChange={(e) => setlastName(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                        Password
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>   
                  
                  <Radio role={role} setradioButton={selectedRole}/>

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                    Sign up
                    </button>
                  </div>
                  <p className="mt-10 text-center text-sm text-gray-500">
                    Already have a account?{' '}
                    <a href="/sign-in" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                      Sign in
                    </a>
                  </p>

                  <p className="text-center text-xs text-[#ff6865]">
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
              backgroundImage: 'url("https://i.imgur.com/kwC41wV.jpg")',
              }} 
            />

          </div>
        </div>
      </div>
    );
}