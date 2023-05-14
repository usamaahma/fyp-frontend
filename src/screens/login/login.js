import React, { useEffect } from "react";
import { Row, Col } from "antd";
import "./login.css";
import { Form, Input, Button, message } from "antd";
import { login, users } from "../../config/axios.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoginState, setUserState } from "../../redux/actions";

function Login() {
  const abc = localStorage.getItem("feathers-jwt-token");
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = (values) => {
    const data1 = {
      email: values.email,
      password: values.password,
      strategy: "local",
    };

    login({
      method: "post",
      data: data1,
    })
      .then((res) => {
        if (res.data.user.role === 0) {
          localStorage.setItem("feathers-jwt-token", res.data.accessToken);
          localStorage.setItem("feathers-id", res.data.user._id);
          dispatch(setLoginState(true));
          dispatch(setUserState(res.data.user));
          navigate("/dashboard");
        } else {
          message.error("paj jaoe shoryo");
        }
      })

      .catch(() => {
        message.error("Email or Password is incorrect, please try again!");
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  useEffect(() => {
    if (abc === null) {
      navigate("/");
    } else {
      const id = localStorage.getItem("feathers-id");

      users(`/${id}`, {
        method: "get",
        headers: {
          Authorization: `Bearer ${abc}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          localStorage.setItem("feathers-id", res.data._id);

          dispatch(setLoginState(true));
          dispatch(setUserState(res.data));

          navigate("/dashboard");
        })

        .catch(() => {
          message.error("Email or Password is incorrect, please try again!");
        });
    }
  }, []);

  return (
    <div>
      {" "}
      <Row>
        <Col span={12} className="column1">
          <div>
            <img
              className="imgelgu"
              alt="sasa"
              src="https://paperpk.com/uploads/co_img/1551094690.png"
            ></img>
          </div>
          <div>
            <h1 className="h11">
              Welcome To!
              <br /> Login Page of FYP E'S SYSTEM
            </h1>
          </div>
        </Col>
        <Col span={12} className="column2login">
          <div>
            <h2 className="h22">Login Account </h2>
          </div>
          <br />
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input className="formitem1" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password className="formitem1" />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit" className="btnnn">
                Submit
              </Button>
            </Form.Item>
          </Form>
          <br />
          <br />
        </Col>
      </Row>
    </div>
  );
}

export default Login;
