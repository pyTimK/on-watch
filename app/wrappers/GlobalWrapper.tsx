import { useWatch } from "@/hooks/custom/useLocationData";
import { useMyUser } from "@/hooks/custom/useMyUser";
import { useUser } from "@/hooks/useUser";
import { createContext, useContext, useEffect } from "react";
import { LoadingContext } from "./LoadingWrapper";
import { useQuasar } from "@/hooks/useQuasar";
import { User } from "firebase/auth";
import { MyUser } from "@/classes/MyUser";
import { Watch } from "@/classes/Watch";
import QuasarPage from "@/components/templates/QuasarPage";
import SignInPage from "../pages_outer/SignInPage";
import RegisterPage from "../pages/RegisterPage";
import PageWrapper from "./PageWrapper";
import { Proximity } from "@/classes/Proximity";
import { useProximity } from "@/hooks/custom/useProximity";

interface GlobalWrapperProps {}
export const GlobalContext = createContext({
  user: {} as User,
  myUser: {} as MyUser | null,
  watch: {} as Watch | null,
  proximity: {} as Proximity | null,
});

const GlobalWrapper: React.FC<GlobalWrapperProps> = ({}) => {
  const { loading, setLoading } = useContext(LoadingContext);
  const [user, loadingUser] = useUser();
  const [myUser, loadingMyUser] = useMyUser(user);
  const [proximity, loadingProximity] = useProximity(user);
  const watch = useWatch(myUser);

  const [quasar, loadingQuasar] = useQuasar();

  useEffect(() => {
    setLoading(
      loadingUser || loadingMyUser || loadingProximity || loadingQuasar
    );
  }, [loadingUser, loadingMyUser, loadingQuasar, loadingProximity, setLoading]);

  if (loadingUser || loadingMyUser || loadingProximity || loadingQuasar)
    return <></>;
  if (quasar) return <QuasarPage />;
  if (user === null) return <SignInPage />;
  if (myUser === null) return <RegisterPage user={user} />;
  return (
    <GlobalContext.Provider value={{ user, myUser, watch, proximity }}>
      <PageWrapper />
    </GlobalContext.Provider>
  );
};

export default GlobalWrapper;
