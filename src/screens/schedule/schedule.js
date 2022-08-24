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
        let d = { startingdate: datestring[0], endingdate: datestring[1] };
        data.supervisor = d;

        break;

      case "proposal":
        let e = { startingdate: datestring[0], endingdate: datestring[1] };
        data.proposal = e;

        break;
      case "srs":
        let r = { startingdate: datestring[0], endingdate: datestring[1] };
        data.srs = r;

        break;

      case "middefence":
        let h = { startingdate: datestring[0], endingdate: datestring[1] };
        data.middefence = h;

        break;

      case "finaldefence":
        let p = { startingdate: datestring[0], endingdate: datestring[1] };
        data.finaldefence = p;

        break;

      default:
        break;
    }
    setloading(true);

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
        setloading(false);
      })

      .catch(() => {
        message.error("something went wrong, please try again!");
        setloading(false);
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
                {!loading && (
                  <p className="schdes">
                    {data?.supervisor?.startingdate} --{" "}
                    {data?.supervisor?.endingdate}
                  </p>
                )}

                <RangePicker
                  onChange={(moment, datestring) =>
                    handleChange(moment, datestring, "supervisor")
                  }
                />
              </Space>
            </div>
          </div>
          <div className="space">
            <h3>Proposal Submission</h3>
            <div className="updatebuttondiv">
              <Space direction="vertical" size={12}>
                {!loading && (
                  <p className="schdes">
                    {data?.proposal?.startingdate} --{" "}
                    {data?.proposal?.endingdate}
                  </p>
                )}

                <RangePicker
                  onChange={(moment, datestring) =>
                    handleChange(moment, datestring, "proposal")
                  }
                  // defaultValue={data?.supervisor}
                />
              </Space>
            </div>
          </div>
          <div className="space">
            <h3>SRS Submission</h3>
            <div className="updatebuttondiv">
              <Space direction="vertical" size={12}>
                {!loading && (
                  <p className="schdes">
                    {data?.srs?.startingdate} -- {data?.srs?.endingdate}
                  </p>
                )}
                <RangePicker
                  onChange={(moment, datestring) =>
                    handleChange(moment, datestring, "srs")
                  }
                  // defaultValue={data?.supervisor}
                />
              </Space>
            </div>
          </div>
          <div className="space">
            <h3>Mid Defence Submission</h3>
            <div className="updatebuttondiv">
              <Space direction="vertical" size={12}>
                {!loading && (
                  <p className="schdes">
                    {data?.middefence?.startingdate} --{" "}
                    {data?.middefence?.endingdate}
                  </p>
                )}
                <RangePicker
                  onChange={(moment, datestring) =>
                    handleChange(moment, datestring, "middefence")
                  }
                  // defaultValue={data?.supervisor}
                />
              </Space>
            </div>
          </div>
          <div className="space">
            <h3>Final Defence Submission</h3>
            <div>
              <Space direction="vertical" size={12}>
                {!loading && (
                  <p className="schdes">
                    {data?.finaldefence?.startingdate} --{" "}
                    {data?.finaldefence?.endingdate}
                  </p>
                )}
                <RangePicker
                  onChange={(moment, datestring) =>
                    handleChange(moment, datestring, "finaldefence")
                  }
                  // defaultValue={data?.supervisor}
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
