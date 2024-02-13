import React, { useEffect, useLayoutEffect } from "react";
import { useState } from "react";
import { UserService } from "../services/UserService";
import { Container, Row, Col, Table } from "react-bootstrap";

const UserList = () => {
  const [state, setState] = useState({
    crmId: {},
    crmName: {},
    users: [],
    formFields: [],
    phonePositionIndex: 0,
    formFieldsContet: [],
  });
  // crmId: crm_id,
  // crmName: crm_name,
  //  jsonData: data,
  ///  formFields: Object.keys(data[0]),
  //  phonePositionIndex: Object.keys(data[0]).indexOf("phone"),
  //  formFieldsContet: data.map((obj) => {

  /*
  useEffect(() => {
    UserService.getAllUsers()
      .then((response) => {
        setState({
          ...state,
          users: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [state]);
*/
  useLayoutEffect(() => {
    const api_url = window.location.href;
    fetch("users.json", {
      method: "GET",
      mode: "no-cors",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log("response.url= " + response.url);
        return response.json();
      })
      .then((data) => {
        // Save crm-id and crm-name
        const crm_id = data[0].form_name_id;
        const crm_name = data[0].form_name;
        // remove first 2 properties from data[0] crm_id and crm_name from data
        delete data[0].form_name_id;
        delete data[0].form_name;

        //data.shift();
        console.log("data neto follow= " + data);
        console.log(JSON.stringify(data, null, 2));
        setState({
          crmId: crm_id,
          crmName: crm_name,
          users: data,
          formFields: Object.keys(data[0]),
          phonePositionIndex: Object.keys(data[0]).indexOf("phone"),
          formFieldsContet: data.map((obj) => {
            return Object.values(obj);
          }),
        });
        console.log("data[0] = " + data[0]);
        let fields = Object.keys(data[0]);
        console.log(
          "phonePositionIndex = " + Object.keys(data[0]).indexOf("phone")
        );
        console.log("data = " + data);
        console.log("fields =" + fields);
        console.log("keys = " + state.keys);
        //console.log("values = " + values);
        return data;
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const checkboxChangedHnadler = (e) => {
    console.log("click");
  };

  return (
    <>
      User List
      {/*} <pre>{JSON.stringify(state.users)}</pre>
      <pre>{JSON.stringify(state.users,null,2)}</pre>*/}
      <Container fluid className="mt-3">
        <Row>
          <Col>
            <h3 className="text-primary">User List</h3>
            <p className="fst-italic">oioioi</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped border hover className="shadow-lg text-center">
              <thead>
                <tr>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <th>#</th>
                  {state.formFields.map((field) => {
                    return <th>{field}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                {/* vertical loop */}
                {state.formFieldsContet.map((userLine, userIndex) => {
                  return (
                    <tr key={userIndex}>
                      <td>
                        <input
                          onChange={checkboxChangedHnadler}
                          type="checkbox"
                        />
                      </td>
                      <td>{userIndex + 1}</td>
                      {/* horizontal  loop */}
                      {userLine.map((formField) => {
                        return <td>{formField}</td>;
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserList;
