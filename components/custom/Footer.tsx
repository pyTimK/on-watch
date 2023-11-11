import { MutableRefObject } from "react";
import RedPhoneIcon from "../svg/icon/RedPhoneIcon";
import ClockOutlinedIcon from "../svg/icon/outlined/ClockOutlinedIcon";
import PinOutlinedIcon from "../svg/icon/outlined/PinOutlinedIcon";
import ProfileOutlinedIcon from "../svg/icon/outlined/ProfileOutlinedIcon";
import RadarOutlinedIcon from "../svg/icon/outlined/RadarOutlinedIcon";

interface FooterProps {
  divRef: MutableRefObject<HTMLDivElement | null>;
}

const Footer: React.FC<FooterProps> = ({ divRef }) => {
  return (
    <div
      ref={divRef}
      className="absolute bottom-0 w-full h-10 flex justify-between items-center z-10 bg-white px-5 py-8 shadow-2xl"
    >
      <FooterIcon title="Watch">
        <ClockOutlinedIcon size={30} />
      </FooterIcon>
      <FooterIcon title="Path">
        <PinOutlinedIcon size={30} />
      </FooterIcon>
      <div className="flex flex-col items-center -translate-y-3">
        <RedPhoneIcon />
        <p className="text-xs font-semibold text-zinc-800">Call</p>
      </div>
      <FooterIcon title="Alarm">
        <RadarOutlinedIcon size={30} />
      </FooterIcon>
      <FooterIcon title="Profile">
        <ProfileOutlinedIcon size={30} />
      </FooterIcon>
    </div>
  );
};

interface FooterIconProps {
  title: string;
  children: React.ReactNode;
}

const FooterIcon: React.FC<FooterIconProps> = ({ children, title }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-1">
      {children}
      <p className="text-xs font-semibold text-zinc-700">{title}</p>
    </div>
  );
};

export default Footer;
