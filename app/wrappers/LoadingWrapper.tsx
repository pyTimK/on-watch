import { Dispatch, SetStateAction, createContext, useState } from "react";
import { ToastContainer } from "react-toastify";
import LoadingPage from "../pages_outer/LoadingPage";
import GlobalWrapper from "./GlobalWrapper";

export const LoadingContext = createContext({
  loading: false,
  setLoading: {} as Dispatch<SetStateAction<boolean>>,
});

interface LoadingWrapperProps {}

const LoadingWrapper: React.FC<LoadingWrapperProps> = ({}) => {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <LoadingContext.Provider value={{ loading, setLoading }}>
        <GlobalWrapper />
      </LoadingContext.Provider>
      {loading && <LoadingPage />}

      <ToastContainer
        className="toast-custom"
        theme="colored"
        autoClose={2000}
        closeButton={false}
      />
    </>
  );
};

export default LoadingWrapper;
