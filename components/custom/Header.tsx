import { useContext } from "react";
import MenuBarIcon from "../svg/icon/MenuBarIcon";
import { GlobalContext } from "@/app/page";
import Avatar from "../templates/Avatar";
import Title from "./Title";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
  const { myUser } = useContext(GlobalContext);
  return (
    <div className="absolute w-full h-10 bg-white z-10 flex items-center justify-between px-5 py-8 rounded-b-3xl">
      <MenuBarIcon />
      <Title size={85} withoutMargin />
      <Avatar src={myUser?.photoURL} size={40} />
    </div>
  );
};

export default Header;
