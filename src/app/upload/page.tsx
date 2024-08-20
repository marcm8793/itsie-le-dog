"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import CardUploader from "@/components/uploader/CardUploader";

const UploadPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        router.push("/");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth, router]);

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  if (!isAuthenticated) {
    return null; // This shouldn't render as we're redirecting unauthenticated users
  }

  return (
    <div className="container">
      <CardUploader />
    </div>
  );
};

export default UploadPage;
