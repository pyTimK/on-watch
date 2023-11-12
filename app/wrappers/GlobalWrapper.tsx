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

interface GlobalWrapperProps {}
export const GlobalContext = createContext({
  user: {} as User,
  myUser: {} as MyUser,
  watch: {} as Watch | null,
});

const GlobalWrapper: React.FC<GlobalWrapperProps> = ({}) => {
  const { setLoading } = useContext(LoadingContext);
  const [user, loadingUser] = useUser();
  const [myUser, loadingMyUser] = useMyUser(user);
  const watch = useWatch(myUser);

  const [quasar, loadingQuasar] = useQuasar();

  useEffect(() => {
    setLoading(loadingUser || loadingMyUser || loadingQuasar);
  }, [loadingUser, loadingMyUser, loadingQuasar, setLoading]);

  if (loadingQuasar || loadingMyUser || loadingUser) return <></>;
  if (quasar) return <QuasarPage />;
  if (user === null) return <SignInPage />;
  if (myUser === null) return <RegisterPage user={user} />;
  return (
    <GlobalContext.Provider value={{ user, myUser, watch }}>
      <PageWrapper />
    </GlobalContext.Provider>
  );
};

export default GlobalWrapper;
