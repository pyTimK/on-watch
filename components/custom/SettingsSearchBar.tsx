import { PageWrapperContext, Pages } from "@/app/wrappers/PageWrapper";
import MySearchBar from "../templates/MySearchBar";
import { useContext, useMemo } from "react";

interface SettingsSearchBarProps {}

const SettingsSearchBar: React.FC<SettingsSearchBarProps> = ({}) => {
  const pageFields = useMemo(
    () => [
      {
        name: "Profile",
        page: Pages.Profile,
      },
      {
        name: "Proximity",
        page: Pages.Proximity,
      },
      {
        name: "Contact",
        page: Pages.Contacts,
      },
      {
        name: "Watch",
        page: Pages.Watch,
      },
      {
        name: "Notifications",
        page: Pages.Notifications,
      },
      {
        name: "About",
        page: Pages.About,
      },
      {
        name: "Path",
        page: Pages.Main,
      },
      {
        name: "Map",
        page: Pages.Main,
      },
    ],
    []
  );
  const { setPage } = useContext(PageWrapperContext);
  return (
    <div>
      <MySearchBar
        fields={pageFields.map((field) => {
          return {
            name: field.name,
            onClick: () => {
              console.log(field.name);
              setPage(field.page);
            },
          };
        })}
      />
    </div>
  );
};

export default SettingsSearchBar;
