import { MutableRefObject, useContext } from "react";
import RedPhoneIcon from "../svg/icon/RedPhoneIcon";
import ClockOutlinedIcon from "../svg/icon/outlined/ClockOutlinedIcon";
import PinOutlinedIcon from "../svg/icon/outlined/PinOutlinedIcon";
import ProfileOutlinedIcon from "../svg/icon/outlined/ProfileOutlinedIcon";
import RadarOutlinedIcon from "../svg/icon/outlined/RadarOutlinedIcon";
import { PageWrapperContext, Pages } from "@/app/wrappers/PageWrapper";
import { twMerge } from "tailwind-merge";

interface FooterProps {
  divRef: MutableRefObject<HTMLDivElement | null>;
}

const Footer: React.FC<FooterProps> = ({ divRef }) => {
  const { page, setPage, setCallBSOpen } = useContext(PageWrapperContext);
  return (
    <div
      ref={divRef}
      className="absolute bottom-0 w-full h-10 flex justify-between items-center z-10 bg-white px-5 py-8 drop-shadow-2xl"
    >
      <FooterIcon title="Watch" page={Pages.Watch}>
        <ClockOutlinedIcon size={30} selected={page === Pages.Watch} />
      </FooterIcon>
      <FooterIcon title="Path" page={Pages.Main}>
        <PinOutlinedIcon size={30} selected={page === Pages.Main} />
      </FooterIcon>
      <div className="flex flex-col items-center -translate-y-3">
        <RedPhoneIcon onClick={() => setCallBSOpen((open) => !open)} />
        <p className="text-xs font-semibold text-zinc-800">Call</p>
      </div>
      <FooterIcon title="Alarm" page={Pages.Proximity}>
        <RadarOutlinedIcon size={30} selected={page === Pages.Proximity} />
      </FooterIcon>
      <FooterIcon title="Profile" page={Pages.Profile}>
        <ProfileOutlinedIcon size={30} selected={page === Pages.Profile} />
      </FooterIcon>
    </div>
  );
};

interface FooterIconProps {
  title: string;
  page: Pages;
  children: React.ReactNode;
}

const FooterIcon: React.FC<FooterIconProps> = ({ children, page, title }) => {
  const { page: currentPage, setPage } = useContext(PageWrapperContext);
  return (
    <div
      className="flex flex-col justify-center items-center gap-1"
      onClick={() => setPage(page)}
    >
      {children}
      <p
        className={twMerge(
          "text-xs font-semibold text-zinc-700",
          page === currentPage && "text-red"
        )}
      >
        {title}
      </p>
    </div>
  );
};

export default Footer;
