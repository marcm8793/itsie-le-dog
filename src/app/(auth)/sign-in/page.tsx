"use client";

import { auth } from "@/config/firebase";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Home } from "lucide-react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await signInWithEmailAndPassword(email, password);
      if (result) {
        return router.push("/upload");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <div className="flex justify-center items-center h-[calc(100vh-88px)] dark:bg-inherit p-4">
      <Card className="w-full max-w-[350px] flex flex-col">
        <CardHeader className="flex-shrink-0">
          <CardTitle>Sign In</CardTitle>
          <CardDescription>
            Enter your email and password to sign in.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow overflow-y-auto">
          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error.message}</AlertDescription>
              </Alert>
            )}
          </form>
          <p className="mt-4 text-sm text-gray-500">
            If you don&apos;t have credentials, please ask Marc for access.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 flex-shrink-0">
          <Button className="w-full" onClick={handleSignIn} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
          <Button variant="outline" className="w-full" onClick={handleGoHome}>
            <Home className="mr-2 h-4 w-4" />
            Go Back Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignIn;
