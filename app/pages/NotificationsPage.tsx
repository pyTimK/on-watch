import { motion } from "framer-motion";
import HeaderSettings from "@/components/custom/HeaderSettings";
import { Pages } from "../wrappers/PageWrapper";
import Switch from "@/components/templates/Switch";
import { useContext } from "react";
import { GlobalContext } from "../wrappers/GlobalWrapper";
import FirebaseHelper from "@/classes/FirebaseHelper";

interface NotificationsPageProps {}

const NotificationsPage: React.FC<NotificationsPageProps> = ({}) => {
  const { myUser } = useContext(GlobalContext);
  return (
    <div className="flex flex-col px-5 pt-1">
      {/* //! HEADER */}
      <HeaderSettings title="Notifications" page={Pages.Settings} />

      {/* //! PROXIMITY ALARM */}
      <SettingsBlock>
        <SettingsRow title="Emergency Notification">
          <Switch
            checked={myUser?.emergency_notif}
            onChange={(e) =>
              FirebaseHelper.MyUser.update(myUser, {
                emergency_notif: e.target.checked,
              })
            }
          />
        </SettingsRow>
      </SettingsBlock>
    </div>
  );
};

//! SETTINGS BLOCK
interface SettingsBlockProps {
  title?: string;
  children: React.ReactNode;
}

const SettingsBlock: React.FC<SettingsBlockProps> = ({ title, children }) => {
  return (
    <div className="flex flex-col gap-5 pb-10">
      {title && <p className="text-lg font-semibold text-zinc-500">{title}</p>}
      <div className="flex flex-col gap-5">{children}</div>
    </div>
  );
};

//! SETTINGS ROW
interface SettingsRowProps {
  children: React.ReactNode;
  title: string;
}

const SettingsRow: React.FC<SettingsRowProps> = ({ children, title }) => {
  return (
    <motion.div className="flex items-center justify-between px-3 py-3 bg-white rounded-xl">
      <p className="text text-zinc-800">{title}</p>
      {children}
    </motion.div>
  );
};

export default NotificationsPage;
