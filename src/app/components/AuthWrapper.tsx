"use client"
import { useAddress } from "@thirdweb-dev/react";
import { useState } from "react";
import AuthButton from "./AuthButton";

interface AuthWrapperProps {
  children: React.ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  // Get the user's address
  const address = useAddress();
  const [isSignedUp, setIsSignedUp] = useState<boolean>(false);

  if (!address || !isSignedUp) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        {!address ? (
          <AuthButton />
        ) : (
          <>{children}</>
        )}
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthWrapper;
