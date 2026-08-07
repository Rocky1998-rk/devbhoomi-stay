import { Outlet } from "react-router-dom";

const WebsiteLayout = () => {
  return (
    <div>
      <h2>Website Layout</h2>

      <Outlet />
    </div>
  );
};

export default WebsiteLayout;