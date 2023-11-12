import { PageWrapperContext, Pages } from "@/app/wrappers/PageWrapper";
import { useContext } from "react";
import BackAndroidIcon from "../svg/icon/BackAndroidIcon";

interface HeaderSettingsProps {
  title: string;
}

const HeaderSettings: React.FC<HeaderSettingsProps> = ({ title }) => {
  const { setPage } = useContext(PageWrapperContext);
  return (
    <div className="flex justify-between items-center">
      <BackAndroidIcon size={25} onClick={() => setPage(Pages.Main)} />
      <p className="font-semibold">{title}</p>
      <BackAndroidIcon size={25} hidden />
    </div>
  );
};

export default HeaderSettings;
