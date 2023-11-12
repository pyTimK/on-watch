import { motion } from "framer-motion";
import SettingsSearchBar from "@/components/custom/SettingsSearchBar";
import AboutIcon from "@/components/svg/icon/AboutIcon";
import BackAndroidIcon from "@/components/svg/icon/BackAndroidIcon";
import BackIcon from "@/components/svg/icon/BackIcon";
import ChevronRight from "@/components/svg/icon/ChevronRight";
import BellOutlinedIcon from "@/components/svg/icon/outlined/BellOutlinedIcon";
import ProfileOutlinedIcon from "@/components/svg/icon/outlined/ProfileOutlinedIcon";
import RadarOutlinedIcon from "@/components/svg/icon/outlined/RadarOutlinedIcon";
import Avatar from "@/components/templates/Avatar";
import MyButton from "@/components/templates/MyButton";
import MyInput from "@/components/templates/MyInput";
import { useInputField } from "@/hooks/useInputField";
import useMyInput from "@/hooks/useMyInput";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import Modal from "react-modal";
import { GlobalContext } from "../wrappers/GlobalWrapper";
import { PageWrapperContext, Pages } from "../wrappers/PageWrapper";

const SettingsPageContext = createContext({});

interface SettingsPageProps {}

const data = [
  {
    key: "john",
    value: "John Doe",
  },
  {
    key: "jane",
    value: "Jane Doe",
  },
  {
    key: "mary",
    value: "Mary Phillips",
  },
  {
    key: "robert",
    value: "Robert",
  },
  {
    key: "karius",
    value: "Karius",
  },
];

const SettingsPage: React.FC<SettingsPageProps> = ({}) => {
  const { myUser } = useContext(GlobalContext);
  const { setPage } = useContext(PageWrapperContext);
  return (
    <SettingsPageContext.Provider value={{}}>
      <div className="px-5 pt-1">
        {/* //! HEADER */}
        <div className="flex justify-between items-center">
          <BackAndroidIcon size={25} />
          <p className="font-semibold">Settings</p>
          <BackAndroidIcon size={25} hidden />
        </div>

        {/* //! SEARCH BAR */}
        <SettingsSearchBar />

        {/* //! PROFILE */}
        <SettingsBlock title="Profile">
          <SettingsRow
            title={myUser?.name}
            onClick={() => setPage(Pages.Profile)}
          >
            <Avatar src={myUser?.photoURL} />
          </SettingsRow>
        </SettingsBlock>

        {/* //! SETTINGS */}
        <SettingsBlock title="Settings">
          <SettingsRow title="Contact" onClick={() => setPage(Pages.Contact)}>
            <ProfileOutlinedIcon />
          </SettingsRow>
          <SettingsRow
            title="Proximity Controller"
            onClick={() => setPage(Pages.Proximity)}
          >
            <RadarOutlinedIcon />
          </SettingsRow>
          <SettingsRow
            title="Notifications"
            onClick={() => setPage(Pages.Notifications)}
          >
            <BellOutlinedIcon />
          </SettingsRow>
          <SettingsRow title="About Us" onClick={() => setPage(Pages.About)}>
            <AboutIcon />
          </SettingsRow>
        </SettingsBlock>
      </div>
    </SettingsPageContext.Provider>
  );
};

interface SettingsBlockProps {
  title: string;
  children: React.ReactNode;
}

const SettingsBlock: React.FC<SettingsBlockProps> = ({ title, children }) => {
  return (
    <div className="flex flex-col gap-5 pb-10">
      <p className="text-lg font-semibold text-zinc-500">{title}</p>
      <div className="flex flex-col gap-5">{children}</div>
    </div>
  );
};

interface SettingsRowProps {
  children: React.ReactNode;
  title: string;
  onClick?: () => void;
}

const SettingsRow: React.FC<SettingsRowProps> = ({
  children,
  title,
  onClick,
}) => {
  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="flex items-center justify-between px-3 py-3 bg-white rounded-xl"
    >
      <div className="flex gap-3 items-center">
        <div className="min-w-min w-10">{children}</div>
        <p className="text text-zinc-800">{title}</p>
      </div>
      <ChevronRight />
    </motion.div>
  );
};

export default SettingsPage;
