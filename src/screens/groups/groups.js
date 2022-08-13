import React, { useState, useEffect } from "react";
import "./groups.css";
import DataTable from "react-data-table-component";
import { DeleteOutlined } from "@ant-design/icons";
import { groups } from "../../config/axios";
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

    groups(`/${_id}`, {
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

    groups(`/${rowData?._id}`, {
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

  useEffect(() => {
    if (isModalVisible === false) {
      setLoading(true);
      const abc = localStorage.getItem("feathers-jwt-token");

      groups({
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
      name: "ID",
      selector: (row) => row._id,
    },
    {
      name: "Group Supervisor",
      selector: (row) => row.groupsupervisor,
    },
    {
      name: "Group Id",
      selector: (row) => row.groupid,
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
      <h1 className="txxxxxxt">Groups</h1>
      <DataTable
        columns={columns}
        data={data}
        progressPending={loading}
        pagination
        paginationServer
        paginationTotalRows={total}
      />
    </div>
  );
}

export default Students;
