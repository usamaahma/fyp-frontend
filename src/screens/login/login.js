import React, { useEffect } from "react";
import { Row, Col } from "antd";
import "./login.css";
import { Form, Input, Button, message } from "antd";
import { login } from "../../config/axios.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoginState } from "../../redux/actions";

function Login() {
  const abc = localStorage.getItem("feathers-jwt-token");

  let navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = (values) => {
    const data1 = {
      email: values.email,
      password: values.password,
      strategy: "local",    };

    login({
      method: "post",
      data: data1,
    })
      .then((res) => {
        console.log(res.data);
        if (res.data.user.role === 0) {
          localStorage.setItem("feathers-jwt-token", res.data.accessToken);
          dispatch(setLoginState(true));
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
      dispatch(setLoginState(true));
      navigate("/dashboard");
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
              src="/assets/images/lgulogo.png"
            ></img>
          </div>
          <div>
            <h1 className="h11">
              Welcome To!
              <br /> Login Page of LGU FYP
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
