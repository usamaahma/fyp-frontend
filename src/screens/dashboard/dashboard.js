import React, { useEffect, useState } from "react";
import "./dashboard.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  UsergroupAddOutlined,
  ScheduleOutlined,
  WindowsOutlined,
} from "@ant-design/icons";
import Students from "../Student/Students";
import Supervisor from "../supervisors/supervisor";
import Groups from "../groups/groups";
import Schedule from "../schedule/schedule";
import Dashboardd from "../dashboardd/dashboardd";

const { Sider } = Layout;

function Dashboard() {
  let navigate = useNavigate();
  const isloggedin = useSelector((state) => state.authReducer.isLoggedIn);
  const [menub, setmenub] = useState(1);
  const [menub1, setmenub1] = useState(2);
  const [menub2, setmenub2] = useState(3);
  const [menub4, setmenub4] = useState(4);

  const [show, setshow] = useState(false);

  const logout = () => {
    localStorage.removeItem("feathers-jwt-token");
    navigate("/");
  };

  useEffect(() => {
    
      setshow(true);
   
  }, []);

  return (
    <div>
      {show ? (
        <Layout hasSider>
          <Sider
            className="dashboardmain"
            style={{
              overflow: "auto",
              height: "100vh",
              position: "fixed",
              left: 0,
              top: 0,
              bottom: 0,
            }}
          >
            <Menu
              className="dashboardmain"
              mode="inline"
              defaultSelectedKeys={["1"]}
            >
              <Menu.Item
                className="menuitems"
                onClick={() => setmenub(1)}
                key="1"
                icon={<WindowsOutlined />}
              >
                Dashboard
              </Menu.Item>
              <Menu.Item
                className="menuitems"
                onClick={() => setmenub(2)}
                key="2"
                icon={<UserOutlined />}
              >
                Students
              </Menu.Item>
              <Menu.Item
                className="menuitems"
                onClick={() => setmenub(3)}
                key="3"
                icon={<UserOutlined />}
              >
                Supervisors
              </Menu.Item>
              <Menu.Item
                className="menuitems"
                onClick={() => setmenub(4)}
                key="4"
                icon={<UsergroupAddOutlined />}
              >
                Groups
              </Menu.Item>
              <Menu.Item
                className="menuitems"
                onClick={() => setmenub(5)}
                key="5"
                icon={<ScheduleOutlined />}
              >
                Schedule
              </Menu.Item>

              <Menu.Item
                className="menuitems"
                onClick={logout}
                key="6"
                icon={<LogoutOutlined />}
              >
                Logout
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout" style={{ marginLeft: 200 }}>
            {menub === 1 && <Dashboardd />}
            {menub === 2 && <Students />}
            {menub === 3 && <Supervisor />}
            {menub === 4 && <Groups />}
            {menub === 5 && <Schedule />}
          </Layout>
        </Layout>
      ) : (
        <p style={{ textAlign: "center" }}>Loading...</p>
      )}
    </div>
  );
}
export default Dashboard;
