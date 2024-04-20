import { Outlet  } from "react-router-dom";

function Tabs() {

  return (
    <div className="top-container">
      <div className="side-links">

      </div>
      <div className="side-cont">
        <Outlet />
      </div>
    </div>
  );
}

export default Tabs;
