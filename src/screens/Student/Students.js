import React, { useState, useEffect } from "react";
import "./students.css";
import DataTable from "react-data-table-component";
import { DeleteOutlined } from "@ant-design/icons";
import { users } from "../../config/axios";
import {
  Modal,
  Row,
  Col,
  Form,
  Input,
  Button,
  message,
  Typography,
} from "antd";
const { Paragraph } = Typography;

function Students() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [data, setdata] = useState([]);
  const [refresh, setrefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [total, settotal] = useState();
  const [page, setpage] = useState(1);
  const [rowData, setrowData] = useState({});
  const [loadingEdit, setloadingEdit] = useState(false);

  const handleDelete = (_id) => {
    const abc = localStorage.getItem("feathers-jwt-token");

    users(`/${_id}`, {
      method: "delete",
      headers: {
        Authorization: `Bearer ${abc}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
        setrefresh(!refresh);
        message.success("Student Deleted!");
      })

      .catch(() => {
        message.error("something went wrong, please try again!");
      });
  };

  const handleUpdate = () => {
    setloadingEdit(true);
    const abc = localStorage.getItem("feathers-jwt-token");

    let copydata = rowData;

    delete copydata.createdAt;
    delete copydata.updatedAt;

    users(`/${rowData?._id}`, {
      method: "patch",
      data: copydata,
      headers: {
        Authorization: `Bearer ${abc}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
        setrefresh(!refresh);
        setloadingEdit(false);
        setIsModalVisible1(false);
        message.success("student edited");
      })

      .catch(() => {
        setloadingEdit(false);

        message.error("something went wrong, please try again!");
      });
  };
  const onFinish = (values) => {
    console.log("Success:", values);

    const data1 = {
      email: values.email,
      password: values.password,
      fullName: values.fullName,
      rollNumber: values.rollNumber,
      department: values.department,
      degree: values.degree,
      section: values.section,
      subjects: [],
      groupid: "",
      role: 2,
    };

    users({
      method: "post",
      data: data1,
    })
      .then((res) => {
        console.log(res);
        message.success("student added");
      })

      .catch(() => {
        message.error("something went wrong, please try again!");
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };
  const showModal1 = (r) => {
    setrowData(r);
    console.log(r);
    setIsModalVisible1(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsModalVisible1(false);
  };

  const handlePageChange = (page) => {
    setpage(page);
  };
  useEffect(() => {
    if (isModalVisible === false) {
      setLoading(true);
      const abc = localStorage.getItem("feathers-jwt-token");

      users("?role=2", {
        method: "get",
        headers: {
          Authorization: `Bearer ${abc}`,
          "Content-Type": "application/json",
        },
        params: {
          $skip: (page - 1) * 10,
        },
      })
        .then((res) => {
          console.log(res);
          setdata(res.data.data);
          settotal(res.data.total);
          setLoading(false);
        })

        .catch(() => {
          message.error("something went wrong, please try again!");
          setLoading(false);
        });
    }
  }, [isModalVisible, refresh, page]);

  const columns = [
    {
      name: "Name",
      selector: (row) => row.fullName,
    },
    {
      name: "Roll Number",
      selector: (row) => row.rollNumber,
    },
    {
      name: "Department",
      selector: (row) => row.department,
    },
    {
      name: "Degree",
      selector: (row) => row.degree,
    },
    {
      name: "Section",
      selector: (row) => row.section,
    },
    {
      name: "Delete",
      cell: (row) => {
        return (
          <DeleteOutlined
            style={{ color: "red", fontSize: "16 px" }}
            onClick={() => handleDelete(row._id)}
          />
        );
      },
    },
  ];

  return (
    <div style={{ backgroundColor: "white" }}>
      <h1 className="txxxxxxt">Students</h1>
      <DataTable
        columns={columns}
        data={data}
        onRowClicked={(row) => showModal1(row)}
        progressPending={loading}
        pagination
        paginationServer
        paginationTotalRows={total}
        onChangePage={handlePageChange}
      />
      <button className="addsupervisor" onClick={showModal}>
        Add student
      </button>
      <Modal
        title="Add a Student"
        footer={null}
        visible={isModalVisible}
        onCancel={handleCancel}
      >
        <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Row justify="space-between">
            <Col span={10}>
              <p style={{ marginBottom: "-2px" }}>Name</p>
              <Form.Item
                name="fullName"
                rules={[
                  {
                    required: true,
                    message: "Please input your full name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={10}>
              <p style={{ marginBottom: "-2px" }}>Roll Number</p>
              <Form.Item
                name="rollNumber"
                rules={[
                  {
                    required: true,
                    message: "Please input your Roll Number!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row justify="space-between">
            <Col span={10}>
              <p style={{ marginBottom: "-2px" }}>Department</p>
              <Form.Item
                name="department"
                rules={[
                  {
                    required: true,
                    message: "Please input your department!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={10}>
              <p style={{ marginBottom: "-2px" }}>Degree</p>
              <Form.Item
                name="degree"
                rules={[
                  {
                    required: true,
                    message: "Please input your degree!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row justify="space-between">
            <Col span={10}>
              <p style={{ marginBottom: "-2px" }}>Section</p>
              <Form.Item
                name="section"
                rules={[
                  {
                    required: true,
                    message: "Please input your section!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={10}>
              <p style={{ marginBottom: "-2px" }}>Email</p>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row justify="center">
            <Col span={10}>
              <p style={{ marginBottom: "-2px" }}>Password</p>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Update  Student"
        footer={null}
        visible={isModalVisible1}
        onCancel={handleCancel}
      >
        <Row>
          <Col span={12}>
            <p>Name</p>
            <Paragraph
              editable={{
                onChange: (str) => {
                  setrowData((prevState) => ({
                    ...prevState,
                    fullName: str,
                  }));
                },
              }}
            >
              {rowData?.fullName}
            </Paragraph>
          </Col>
          <Col span={12}>
            <p>Roll Number</p>
            <Paragraph
              editable={{
                onChange: (str) => {
                  setrowData((prevState) => ({
                    ...prevState,
                    rollNumber: str,
                  }));
                },
              }}
            >
              {rowData?.rollNumber}
            </Paragraph>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <p>Department</p>
            <Paragraph
              editable={{
                onChange: (str) => {
                  setrowData((prevState) => ({
                    ...prevState,
                    department: str,
                  }));
                },
              }}
            >
              {rowData?.department}
            </Paragraph>
          </Col>
          <Col span={12}>
            <p>Degree</p>
            <Paragraph
              editable={{
                onChange: (str) => {
                  setrowData((prevState) => ({
                    ...prevState,
                    degree: str,
                  }));
                },
              }}
            >
              {rowData?.degree}
            </Paragraph>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <p>Section</p>
            <Paragraph
              editable={{
                onChange: (str) => {
                  setrowData((prevState) => ({
                    ...prevState,
                    section: str,
                  }));
                },
              }}
            >
              {rowData?.section}
            </Paragraph>
          </Col>
          <Col span={12}>
            <p>Email</p>
            <Paragraph
              editable={{
                onChange: (str) => {
                  setrowData((prevState) => ({
                    ...prevState,
                    email: str,
                  }));
                },
              }}
            >
              {rowData?.email}
            </Paragraph>
          </Col>
        </Row>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button loading={loadingEdit} onClick={handleUpdate}>
            Update
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default Students;
