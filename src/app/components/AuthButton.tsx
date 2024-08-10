"use client";
import { useAddress, useMetamask, useDisconnect } from "@thirdweb-dev/react";
import { useState } from "react";

const AuthButton: React.FC = () => {
  // Get the user's wallet address
  const address = useAddress(); 
   // Function to connect to MetaMask
  const connectWithMetamask = useMetamask();
  // Function to disconnect from the wallet
  const disconnect = useDisconnect(); 
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await connectWithMetamask();
    } catch (error) {
      console.error("Failed to connect:", error);
    }
    setLoading(false);
  };

  const handleLogout = () => {
    disconnect(); 
  };

  if (!address) {
    return (
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={handleLogin}
        disabled={loading}
      >
        {loading ? "Connecting..." : "Connect Wallet"}
      </button>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <p className="p-5">User: {address}</p>
      <button
        className="px-4 py-2 bg-red-500 text-white rounded mt-4"
        onClick={handleLogout}
      >
        Log Out
      </button>
    </div>
  );
};

export default AuthButton;
