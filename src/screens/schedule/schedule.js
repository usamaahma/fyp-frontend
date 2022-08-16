import React, { useState } from "react";
import "./schedule.css";
import { DatePicker, Button, Space, Radio } from "antd";
import Container from "react-bootstrap/Container";
import { schedule } from "../../config/axios";

const { RangePicker } = DatePicker;

function Schedule() {
  const [size, setSize] = useState();

  const handleSizeChange = (moment, datestring) => {
    console.log(moment, datestring);
  };
  const onSchedulecreate = () => {
    console.log("ckicked");
  };

  return (
    <div>
      <div>
        <h1 className="scheduleeee">Schedule</h1>
      </div>
      <Container>
        <div className="space">
          <h3>Select Supervisor</h3>
          <div className="updatebuttondiv">
            <Space direction="vertical" size={12}>
              <RangePicker onChange={handleSizeChange} size={size} />
            </Space>
          </div>
        </div>
        <div className="space">
          <h3>Proposal Submission</h3>
          <div className="updatebuttondiv">
            <Space direction="vertical" size={12}>
              <Radio.Group
                value={size}
                onChange={onSchedulecreate}
              ></Radio.Group>

              <RangePicker size={size} />
            </Space>
          </div>
        </div>
        <div className="space">
          <h3>SRS Submission</h3>
          <div className="updatebuttondiv">
            <Space direction="vertical" size={12}>
              <Radio.Group
                value={size}
                onChange={onSchedulecreate}
              ></Radio.Group>

              <RangePicker size={size} />
            </Space>
          </div>
        </div>
        <div className="space">
          <h3>Mid Defence Submission</h3>
          <div className="updatebuttondiv">
            <Space direction="vertical" size={12}>
              <Radio.Group
                value={size}
                onChange={onSchedulecreate}
              ></Radio.Group>

              <RangePicker size={size} />
            </Space>
          </div>
        </div>
        <div className="space">
          <h3>Final Defence Submission</h3>
          <div style={{ display: "flex" }}>
            <Space direction="vertical" size={12}>
              <Radio.Group
                value={size}
                onChange={onSchedulecreate}
              ></Radio.Group>
              <RangePicker size={size} />
            </Space>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Schedule;
