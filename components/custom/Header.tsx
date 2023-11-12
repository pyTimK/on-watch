import { useContext } from "react";
import MenuBarIcon from "../svg/icon/MenuBarIcon";
import Avatar from "../templates/Avatar";
import Title from "./Title";
import { GlobalContext } from "@/app/wrappers/GlobalWrapper";
import { PageWrapperContext, Pages } from "@/app/wrappers/PageWrapper";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
  const { myUser } = useContext(GlobalContext);
  const { setPage } = useContext(PageWrapperContext);
  return (
    <div className="absolute w-full h-10 bg-white z-10 flex items-center justify-between px-5 py-8 rounded-b-3xl shadow">
      <MenuBarIcon onClick={() => setPage(Pages.Settings)} />
      <Title size={85} withoutMargin />
      <Avatar src={myUser?.photoURL} size={40} />
    </div>
  );
};

export default Header;
