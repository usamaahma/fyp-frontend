import React, { useState, useEffect } from "react";
import "./supervisor.css";
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

function Supervisor() {
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
        message.success("Supervisor Deleted!");
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
        message.success("Supervisor edited");
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
      department: values.department,
      section: values.section,
      subjects: [],
      role: 1,
    };

    users({
      method: "post",
      data: data1,
    })
      .then((res) => {
        console.log(res);
        message.success("Supervisor added");
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

      users("?role=1", {
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
      name: "Department",
      selector: (row) => row.department,
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
      <h1 className="txxxxxxt">Supervisors</h1>
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
        Add Supervisor
      </button>
      <Modal
        title="Add a Supervisor"
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
          </Row>
          <Row justify="space-between">
            <Col span={10}>
              <p style={{ marginBottom: "-2px" }}>Sections</p>
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
          </Row>
          <Row justify="space-between">
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
        title="Update Supervisor"
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
            <p>Subjects</p>
            <Paragraph
              editable={{
                onChange: (str) => {
                  setrowData((prevState) => ({
                    ...prevState,
                    subjects: str,
                  }));
                },
              }}
            >
              {rowData?.subjects}
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

export default Supervisor;
