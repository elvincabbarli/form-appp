import { Outlet } from "react-router-dom";
import Tabs from "../components/Tabs";

const Profile = () => {
  const tabs = [
    { label: "Tab 1", path: "/page1" },
    { label: "Tab 2", path: "/page2" },
    { label: "Tab 3", path: "/page3" },
  ];
  return (
    <div>
      <Tabs tabs={tabs} />
      <Outlet />
    </div>
  );
};

export default Profile;
