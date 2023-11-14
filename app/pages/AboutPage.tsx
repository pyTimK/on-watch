import HeaderSettings from "@/components/custom/HeaderSettings";
import { Pages } from "../wrappers/PageWrapper";
import Title from "@/components/custom/Title";

interface AboutPageProps {}

const AboutPage: React.FC<AboutPageProps> = ({}) => {
  return (
    <div className="flex flex-col px-5 pt-1 text-center items-center">
      {/* //! HEADER */}
      <HeaderSettings title="About" page={Pages.Settings} />
      <img
        src="/images/icons/icon.png"
        alt="watch icon"
        className="h-40 mx-auto mt-20 mb-6"
      />
      <Title withoutMargin />
      <p className="mt-10">
        Discover our innovative Arduino-powered child&apos;s watch with GPS
        functionality. Keep track of your child&apos;s location, receive instant
        notifications, and ensure they&apos;re always on time – all accessible
        through our user-friendly website.
      </p>
    </div>
  );
};

export default AboutPage;
