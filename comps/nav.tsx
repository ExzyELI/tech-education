"use client";
import React, { useState, useEffect } from "react";
import { auth } from "@/app/firebase/init_app";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faMouse,
  faBookOpen,
  faClipboardList,
  faChalkboard,
  faUser,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { User } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const Nav: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState<User | null>(null); // logged-in user
  const [role, setRole] = useState<string | null>(null); // user role
  const [loading, setLoading] = useState(true); // loading state
  const [signOutComplete, setSignOutComplete] = useState(false); // sign-out completion state

  const router = useRouter();
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully");
      setSignOutComplete(true);
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleSignInButton = async () => {
    router.push("/sign-in");
  };

  const handleSignUpButton = async () => {
    router.push("/sign-up");
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      // updating user state when auth state changes
      setUser(user);

      if (user) {
        const firestore = getFirestore();

        // reference to user document in Firestore
        const userDocRef = doc(firestore, "users", user.uid);

        // snapshot of user document
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          // user data is grabbed from snapshot if user document exists
          const userData = userDocSnap.data();

          // setting the state with user's first name, last name, and email
          setRole(userData.role);
        }
      }
      setLoading(false); // set loading state to false after auth state is determined
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (signOutComplete) {
      setUser(null); // reset user state to null
    }
  }, [signOutComplete]);

  // objects hold nav items for different user roles
  const navItems: {
    [key: string]: { href: string; label: string; icon: any }[];
  } = {
    // nav items for each role with icons
    Student: [
      { href: "/HomePage", label: "Home", icon: faHome },
      { href: "/activities", label: "Activities", icon: faMouse },
      { href: "/grades", label: "Grades", icon: faBookOpen },
      { href: "/Class", label: "Class", icon: faChalkboard },
      { href: "/profile", label: "Profile", icon: faUser },
    ],
    Teacher: [
      { href: "/HomePage", label: "Home", icon: faHome },
      { href: "/activities", label: "Activities", icon: faMouse },
      { href: "/reports", label: "Reports", icon: faClipboardList },
      { href: "/Classroom", label: "Classroom", icon: faChalkboard },
      { href: "/profile", label: "Profile", icon: faUser },
    ],
    Parent: [
      { href: "/HomePage", label: "Home", icon: faHome },
      { href: "/reports", label: "Reports", icon: faClipboardList },
      { href: "/profile", label: "Profile", icon: faUser },
    ],
  };

  return (
    <nav className="z-50 flex h-16 items-center justify-between bg-[#3f72af] px-8 font-sans text-white">
      <div>
        <a href="/HomePage" className="rounded-md text-xl font-bold">
          Tech Education
        </a>
      </div>

      {/* hamburger menu for small screens */}
      {/* show only if user is logged in and sign-out is not complete */}
      {user && !signOutComplete && (
        <div className="relative lg:hidden">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="ml-2 inline-flex rounded-lg p-2 text-lg hover:bg-[#ed6663] focus:outline-none focus:ring-2 focus:ring-[#ed6663]"
          >
            <FontAwesomeIcon icon={faBars} className="text-lg" />
          </button>
          {showDropdown && (
            <div
              className="absolute right-0 mt-2 rounded bg-white shadow-lg"
              style={{ minWidth: "170px" }}
            >
              <ul className="flex flex-col space-y-1 p-2">
                {role && // check if user role is defined
                  navItems[role].map(
                    (
                      item,
                      index, // mapping through nav items related to user's role
                    ) => (
                      <li key={index}>
                        <a
                          href={item.href}
                          className={`flex items-center rounded-md px-4 py-2 font-bold ${
                            window.location.pathname === item.href
                              ? "text-[#f4a261]"
                              : "text-[#3f72af] hover:text-[#f4a261]"
                          }`}
                          aria-current={
                            window.location.pathname === item.href // determines if current item is active
                              ? "page"
                              : undefined
                          }
                        >
                          {/* render icon */}
                          <FontAwesomeIcon
                            icon={item.icon}
                            className="mr-2 text-lg"
                          />
                          {item.label}
                        </a>
                      </li>
                    ),
                  )}

                {/* sign out button */}
                <button
                  onClick={handleSignOut}
                  className="flex items-center rounded-md bg-[#ed6663] px-4 py-2 font-bold text-[#fff] hover:bg-[#f4a261]"
                >
                  <FontAwesomeIcon icon={faUser} className="mr-2 text-lg" />
                  Sign out
                </button>
              </ul>
            </div>
          )}
        </div>
      )}

      {/* navbar for larger screens */}
      {/* render nav items based on user's role */}
      <ul className="hidden space-x-2 text-base lg:flex">
        {!loading &&
          !signOutComplete &&
          user &&
          role && // check if user role is defined
          navItems[role].map(
            (
              item,
              index, // mapping through nav items related to user's role
            ) => (
              <NavItem
                key={index}
                href={item.href}
                label={item.label}
                icon={item.icon}
              />
            ),
          )}
      </ul>

      {/* sign out button */}
      {/* show only if user is logged in and sign-out is not complete  */}
      {user && !signOutComplete && (
        <button
          onClick={handleSignOut}
          className="hidden rounded-full bg-[#ed6663] px-4 py-2 text-base font-semibold transition duration-300 hover:bg-[#f4a261] lg:flex"
        >
          Sign out
        </button>
      )}

      {/* show only if loading is false, sign-out is not complete, and user state is null */}
      {!loading && !signOutComplete && user === null && (
        <div className="ml-auto flex space-x-2">
          <button
            className="rounded-full bg-[#f4a261] px-4 py-2 font-bold text-[#fff] hover:bg-[#ed6663]"
            onClick={handleSignInButton}
          >
            Login
          </button>
          <button
            className="rounded-full bg-[#ed6663] px-4 py-2 font-bold text-[#fff] hover:bg-[#f4a261]"
            onClick={handleSignUpButton}
          >
            Sign Up
          </button>
        </div>
      )}
    </nav>
  );
};

// prop types for nav items
interface NavItemProps {
  href: string; // URL for nav item
  label: string; // label for nav item
  icon: any; // icon for nav item
}

// component to render nav items in the navbar
const NavItem: React.FC<NavItemProps> = ({ href, label, icon }) => {
  // checking if current page matches the nav item's href
  const isActive = window.location.pathname === href;

  return (
    <li>
      <a
        href={href}
        className={`mt-1 flex w-24 flex-col items-center rounded-md text-base font-bold ${
          isActive ? "text-[#f4a261]" : "hover:text-[#f4a261]"
        }`}
        aria-current={isActive ? "page" : undefined}
      >
        <FontAwesomeIcon icon={icon} className="text-lg" />
        {label}
      </a>
    </li>
  );
};

export default Nav;
