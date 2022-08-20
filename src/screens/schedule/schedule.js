import React, { useState, useEffect } from "react";
import "./schedule.css";
import { DatePicker, message, Space } from "antd";
import Container from "react-bootstrap/Container";
import { schedule } from "../../config/axios";
import { useSelector } from "react-redux";
import moment from "moment";

const { RangePicker } = DatePicker;

function Schedule() {
  const user = useSelector((state) => state.authReducer.user);
  const [loading, setloading] = useState(false);

  const [data, setdata] = useState({});

  const handleChange = (moment, datestring, valuechange) => {
    console.log(moment);
    let data = {};

    switch (valuechange) {
      case "supervisor":
        data.supervisor = datestring;

        break;

      default:
        break;
    }

    const abc = localStorage.getItem("feathers-jwt-token");

    schedule(`/${user.scheduleid}`, {
      method: "patch",
      headers: {
        Authorization: `Bearer ${abc}`,
        "Content-Type": "application/json",
      },
      data: data,
    })
      .then((res) => {
        setdata(res.data);
      })

      .catch(() => {
        message.error("something went wrong, please try again!");
      });
  };

  useEffect(() => {
    setloading(true);
    const abc = localStorage.getItem("feathers-jwt-token");

    schedule(`/${user.scheduleid}`, {
      method: "get",
      headers: {
        Authorization: `Bearer ${abc}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setdata(res.data);
        setloading(false);
      })

      .catch(() => {
        message.error("something went wrong, please try again!");
        setloading(false);
      });
  }, []);

  return (
    <div>
      <div>
        <h1 className="scheduleeee">Schedule</h1>
      </div>
      {loading ? (
        <p>loading...</p>
      ) : (
        <Container>
          <div className="space">
            <h3>Select Supervisor</h3>
            <div className="updatebuttondiv">
              <Space direction="vertical" size={12}>
                <RangePicker
                  onChange={(moment, datestring) =>
                    handleChange(moment, datestring, "supervisor")
                  }
                  defaultValue={[moment()]}
                />
              </Space>
            </div>
          </div>
          <div className="space">
            <h3>Proposal Submission</h3>
            <div className="updatebuttondiv">
              <Space direction="vertical" size={12}>
                <RangePicker
                  onChange={(moment, datestring) =>
                    handleChange(moment, datestring, "supervisor")
                  }
                  defaultValue={data?.supervisor}
                />
              </Space>
            </div>
          </div>
          <div className="space">
            <h3>SRS Submission</h3>
            <div className="updatebuttondiv">
              <Space direction="vertical" size={12}>
                <RangePicker
                  onChange={(moment, datestring) =>
                    handleChange(moment, datestring, "supervisor")
                  }
                  defaultValue={data?.supervisor}
                />
              </Space>
            </div>
          </div>
          <div className="space">
            <h3>Mid Defence Submission</h3>
            <div className="updatebuttondiv">
              <Space direction="vertical" size={12}>
                <RangePicker
                  onChange={(moment, datestring) =>
                    handleChange(moment, datestring, "supervisor")
                  }
                  defaultValue={data?.supervisor}
                />
              </Space>
            </div>
          </div>
          <div className="space">
            <h3>Final Defence Submission</h3>
            <div style={{ display: "flex" }}>
              <Space direction="vertical" size={12}>
                <RangePicker
                  onChange={(moment, datestring) =>
                    handleChange(moment, datestring, "supervisor")
                  }
                  defaultValue={data?.supervisor}
                />
              </Space>
            </div>
          </div>
        </Container>
      )}
    </div>
  );
}

export default Schedule;
