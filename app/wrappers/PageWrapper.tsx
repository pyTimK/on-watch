import FirebaseHelper from "@/classes/FirebaseHelper";
import EmergencyBottomSheet from "@/components/custom/EmergencyBottomSheet";
import Footer from "@/components/custom/Footer";
import { useCalculateDivHeight } from "@/hooks/useCalculateDivHeight";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
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
import EditWatchPage from "../pages/EditWatchPage";
import { Watch } from "@/classes/Watch";
import { Contact } from "@/classes/Contact";
import EditContactPage from "../pages/EditContactPage";
import AddContactPage from "../pages/AddContactPage";
import OutOfBoundsBottomSheet from "@/components/custom/OutOfBoundsBottomSheet";
import haversineDistanceKm from "@/myfunctions/haversineDistanceKm";
import CallBottomSheet from "@/components/custom/CallBottomSheet";

export const enum Pages {
  Main,
  Settings,
  Profile,
  Proximity,
  Contacts,
  Watch,
  Notifications,
  About,
  EditWatch,
  EditContact,
  AddContact,
}

export const PageWrapperContext = createContext({
  page: Pages.Main,
  setPage: (page: Pages) => {},
  editWatch: null as Watch | null,
  setEditWatch: (watch: Watch | null) => {},
  editContact: null as Contact | null,
  setEditContact: (contact: Contact | null) => {},
  setCallBSOpen: ((open: boolean) => {}) as Dispatch<SetStateAction<boolean>>,
});

interface PageWrapperProps {}

const PageWrapper: React.FC<PageWrapperProps> = ({}) => {
  const { myUser, watch, proximity } = useContext(GlobalContext);

  //! Page
  const [page, setPage] = useState<Pages>(Pages.Main);

  //! ON CLOSE OF EMERGENCY BOTTOM SHEET
  const onCloseEmergencyBS = () => {
    if (!watch?.id) return;

    FirebaseHelper.Watch.update(watch, { emergency: "0" });
  };

  //! ON CLOSE OF OUT OF BOUNDS BOTTOM SHEET
  const onCloseOutOfBoundsBS = () => {
    if (!proximity?.id) return;

    FirebaseHelper.Proximity.update(proximity, { oob_notified: true });
  };

  //! AUTOMATIC MAP HEIGHT
  const [sourceRef, targetRef] = useCalculateDivHeight(
    (sourceHeight) =>
      `calc(100vh - ${sourceHeight - (page === Pages.Main ? 12 : 0)}px)`,
    []
  );

  //! EDIT WATCH
  const [editWatch, setEditWatch] = useState<Watch | null>(null);

  //! EDIT CONTACT
  const [editContact, setEditContact] = useState<Contact | null>(null);

  //! CALL BOTTOM SHEET
  const [callBSOpen, setCallBSOpen] = useState(false);

  //! Check if watch is out of bounds
  useEffect(() => {
    if (!watch || !proximity) return;

    if (!proximity.oob && !proximity.oob_notified) {
      const distanceKm = haversineDistanceKm(
        parseFloat(watch.latitude),
        parseFloat(watch.longitude),
        proximity.lat,
        proximity.lng
      );
      const distanceLimitKm = proximity.distance_limit_m / 1000;

      if (distanceKm > distanceLimitKm) {
        FirebaseHelper.Proximity.update(proximity, { oob: true });
      }
    } else if (proximity.oob && proximity.oob_notified) {
      const distanceKm = haversineDistanceKm(
        parseFloat(watch.latitude),
        parseFloat(watch.longitude),
        proximity.lat,
        proximity.lng
      );
      const distanceLimitKm = proximity.distance_limit_m / 1000;

      if (distanceKm <= distanceLimitKm) {
        FirebaseHelper.Proximity.update(proximity, {
          oob: false,
          oob_notified: false,
        });
      }
    }
  }, [watch, proximity]);

  return (
    <PageWrapperContext.Provider
      value={{
        page,
        setPage,
        editWatch,
        setEditWatch,
        editContact,
        setEditContact,
        setCallBSOpen,
      }}
    >
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
        ) : page === Pages.EditWatch ? (
          <EditWatchPage />
        ) : page === Pages.EditContact ? (
          <EditContactPage />
        ) : page === Pages.AddContact ? (
          <AddContactPage />
        ) : (
          <div>404: Page not found</div>
        )}
      </div>
      <Footer divRef={sourceRef} />
      <EmergencyBottomSheet
        open={watch?.emergency === "1" && myUser?.emergency_notif === true}
        onClose={onCloseEmergencyBS}
      />
      <OutOfBoundsBottomSheet
        open={proximity !== null && proximity.oob && !proximity.oob_notified}
        onClose={onCloseOutOfBoundsBS}
      />
      <CallBottomSheet open={callBSOpen} onClose={() => setCallBSOpen(false)} />
    </PageWrapperContext.Provider>
  );
};

export default PageWrapper;
