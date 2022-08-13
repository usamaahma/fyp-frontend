import React from "react";
import "./schedule.css";
import { DatePicker, Space } from "antd";
import { Container } from "react-bootstrap";

const { RangePicker } = DatePicker;
const onChange = (value, dateString) => {
  console.log("Selected Time: ", value);
  console.log("Formatted Selected Time: ", dateString);
};

const onOk = (value) => {
  console.log("onOk: ", value);
};

function Schedule() {
  return (
    <div>
      <div>
        <h1 className="scheduleeee">Schedule</h1>
      </div>
      <Container>
        <div className="space">
          <h3>Select Supervisor</h3>
          <Space direction="vertical" size={12}>
            <RangePicker
              showTime={{
                format: "HH:mm",
              }}
              format="YYYY-MM-DD HH:mm"
              onChange={onChange}
              onOk={onOk}
            />
          </Space>
        </div>
        <div className="space">
          <h3>Proposal Submission</h3>
          <Space direction="vertical" size={12}>
            <RangePicker
              showTime={{
                format: "HH:mm",
              }}
              format="YYYY-MM-DD HH:mm"
              onChange={onChange}
              onOk={onOk}
            />
          </Space>
        </div>
        <div className="space">
          <h3>SRS Submission</h3>
          <Space direction="vertical" size={12}>
            <RangePicker
              showTime={{
                format: "HH:mm",
              }}
              format="YYYY-MM-DD HH:mm"
              onChange={onChange}
              onOk={onOk}
            />
          </Space>
        </div>
        <div className="space">
          <h3>Mid Defence Submission</h3>
          <Space direction="vertical" size={12}>
            <RangePicker
              showTime={{
                format: "HH:mm",
              }}
              format="YYYY-MM-DD HH:mm"
              onChange={onChange}
              onOk={onOk}
            />
          </Space>
        </div>
        <div className="space">
          <h3>Final Defence Submission</h3>
          <Space direction="vertical" size={12}>
            <RangePicker
              showTime={{
                format: "HH:mm",
              }}
              format="YYYY-MM-DD HH:mm"
              onChange={onChange}
              onOk={onOk}
            />
          </Space>
        </div>
      </Container>
    </div>
  );
}

export default Schedule;
