import HeaderSettings from "@/components/custom/HeaderSettings";
import { Pages } from "../wrappers/PageWrapper";

interface AboutPageProps {}

const AboutPage: React.FC<AboutPageProps> = ({}) => {
  return (
    <div className="flex flex-col px-5 pt-1">
      {/* //! HEADER */}
      <HeaderSettings title="About" page={Pages.Settings} />
    </div>
  );
};

export default AboutPage;
