import React from "react";
import "./dashboardd.css";
import { Col, Statistic, Card } from "antd";
import { Zoom, Flip } from "react-reveal";

function Dashboardd() {
  return (
    <div>
      {" "}
      <h1 className="txxxxxxt">Dashboard</h1>
      <div className="carddivvv">
        <div>
          <Flip left>
            <Card
              className="cardd"
              title="Students"
              style={{
                width: 300,
              }}
            >
              <Col span={12}>
                <Statistic style={{ textalign: "center" }} value={250} />
              </Col>
            </Card>
          </Flip>
        </div>
        <div>
          <Flip right>
            <Card
              className="cardd"
              title="Faculty"
              style={{
                width: 300,
              }}
            >
              <Col span={12}>
                <Statistic style={{ textalign: "center" }} value={100} />
              </Col>
            </Card>
          </Flip>
        </div>
      </div>
      <div className="carddivvv">
        <Flip down>
          <Card
            className="cardd"
            title="Session"
            style={{
              width: 300,
            }}
          >
            <Col>
              <p className="fall20">Fall-2018</p>
            </Col>
          </Card>
        </Flip>
      </div>
    </div>
  );
}

export default Dashboardd;
