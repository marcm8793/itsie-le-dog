"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import Link from "next/link";
import { Button } from "../ui/button";
import { auth } from "@/config/firebase";
import { useRouter } from "next/navigation";
import { ModeToggle } from "./theme-toggle";

const MainNav = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = () => {
    return router.push("/sign-in");
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <span className="flex space-x-2 items-center">
      <ModeToggle />
      {user ? (
        <>
          <Link href="/upload" className="font-bold hover:text-gray-500">
            Upload documents
          </Link>
          <Button
            variant="ghost"
            className="font-bold hover:text-gray-500 hover:bg-white"
            onClick={handleLogout}
          >
            Log Out
          </Button>
        </>
      ) : (
        <Button
          variant="ghost"
          className="font-bold hover:text-gray-500 hover:bg-white"
          onClick={handleLogin}
        >
          Log In
        </Button>
      )}
    </span>
  );
};

export default MainNav;
