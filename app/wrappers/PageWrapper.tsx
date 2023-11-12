import FirebaseHelper from "@/classes/FirebaseHelper";
import EmergencyBottomSheet from "@/components/custom/EmergencyBottomSheet";
import Footer from "@/components/custom/Footer";
import { useCalculateDivHeight } from "@/hooks/useCalculateDivHeight";
import { createContext, useContext, useState } from "react";
import MainPage from "../pages/MainPage";
import { GlobalContext } from "./GlobalWrapper";
import SettingsPage from "../pages/SettingsPage";
import ProximityPage from "../pages/ProximityPage";
import ProfilePage from "../pages/ProfilePage";
import ContactsPage from "../pages/ContactsPage";
import WatchPage from "../pages/WatchPage";
import NotificationsPage from "../pages/NotificationsPage";
import AboutPage from "../pages/AboutPage";
import LocationBottomSheet from "@/components/custom/LocationBottomSheet";

export const PageWrapperContext = createContext({
  page: Pages.Main,
  setPage: (page: Pages) => {},
});

export const enum Pages {
  Main,
  Settings,
  Profile,
  Proximity,
  Contacts,
  Watch,
  Notifications,
  About,
}
interface PageWrapperProps {}

const PageWrapper: React.FC<PageWrapperProps> = ({}) => {
  const { watch } = useContext(GlobalContext);

  //! Page
  const [page, setPage] = useState<Pages>(Pages.Main);

  //! EMERGENCY BOTTOM SHEET
  const onCloseEmergencyBS = () => {
    if (!watch?.id) return;

    FirebaseHelper.Watch.update(watch?.id, { emergency: "0" });
  };

  //! AUTOMATIC MAP HEIGHT
  const [sourceRef, targetRef] = useCalculateDivHeight(
    (sourceHeight) =>
      `calc(100vh - ${sourceHeight - (page === Pages.Main ? 12 : 0)}px)`,
    []
  );

  return (
    <PageWrapperContext.Provider value={{ page, setPage }}>
      <div className="bg-bg" ref={targetRef} style={{ width: "100%" }}>
        {page === Pages.Main ? (
          <MainPage />
        ) : page === Pages.Settings ? (
          <SettingsPage />
        ) : page === Pages.Profile ? (
          <ProfilePage />
        ) : page === Pages.Proximity ? (
          <ProximityPage />
        ) : page === Pages.Contacts ? (
          <ContactsPage />
        ) : page === Pages.Watch ? (
          <WatchPage />
        ) : page === Pages.Notifications ? (
          <NotificationsPage />
        ) : page === Pages.About ? (
          <AboutPage />
        ) : (
          <div>404: Page not found</div>
        )}
      </div>
      <Footer divRef={sourceRef} />
      <EmergencyBottomSheet
        open={watch?.emergency === "1"}
        onClose={onCloseEmergencyBS}
      />
    </PageWrapperContext.Provider>
  );
};

export default PageWrapper;
