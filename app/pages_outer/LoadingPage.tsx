import { Colors } from "@/styles/styles";
import React, { useState } from "react";
import { RingLoader } from "react-spinners";

interface LoadingPageProps {
  hideIcon?: boolean;
}

const LoadingPage: React.FC<LoadingPageProps> = ({ hideIcon = false }) => {
  return (
    <div className="flex items-center justify-center h-screen">
      {!hideIcon && (
        <RingLoader
          color={`${Colors.darker_primary}`}
          loading={true}
          size={150}
        />
      )}
    </div>
  );
};

export default LoadingPage;
