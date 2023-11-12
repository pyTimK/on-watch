import { PageWrapperContext, Pages } from "@/app/wrappers/PageWrapper";
import { useContext } from "react";
import BackAndroidIcon from "../svg/icon/BackAndroidIcon";

interface HeaderSettingsProps {
  title: string;
  page?: Pages;
}

const HeaderSettings: React.FC<HeaderSettingsProps> = ({
  title,
  page = Pages.Main,
}) => {
  const { setPage } = useContext(PageWrapperContext);
  return (
    <div className="flex justify-between items-center">
      <BackAndroidIcon size={25} onClick={() => setPage(page)} />
      <p className="font-semibold">{title}</p>
      <BackAndroidIcon size={25} hidden />
    </div>
  );
};

export default HeaderSettings;
