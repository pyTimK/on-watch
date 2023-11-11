import Footer from "@/components/custom/Footer";
import MainPage from "./MainPage";
import { useCalculateDivHeight } from "@/hooks/useCalculateDivHeight";

interface PageWrapperProps {}

const PageWrapper: React.FC<PageWrapperProps> = ({}) => {
  //! AUTOMATIC MAP HEIGHT
  const [sourceRef, targetRef] = useCalculateDivHeight(
    (sourceHeight) => `calc(100vh - ${sourceHeight - 12}px)`,
    []
  );

  return (
    <div>
      <MainPage divRef={targetRef} />
      <Footer divRef={sourceRef} />
    </div>
  );
};

export default PageWrapper;
