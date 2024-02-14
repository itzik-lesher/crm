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
  // holds the deleted lines as array. For instance if we check
  // checkboxes 2 and 4  deleteArraylist = [2, 4]
  const [deleteArraylist, setDeleteArrayList] = useState([]);

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
    if (e.target.checked) {
      console.log("chaecked");
      setDeleteArrayList((deleteArraylist) => {
        return [...deleteArraylist, parseInt(e.target.id)];
      });
    } else {
      console.log("unchaecked");
      setDeleteArrayList((deleteArraylist) => {
        return [...deleteArraylist].filter((element) => {
          return element !== parseInt(e.target.id);
        });
      });
    }
    console.log("deleteArraylist = " + JSON.stringify(deleteArraylist));
  };
  const deleteCheckedUsersHandler = () => {};
  /*
  const deleteCheckedUsersHandler = () => {
    // remove the data lines of deleted users
    setState((state) => {
      let newState = { ...state };
      // save the first line formFieldsContet in case all lines will be
      // in the following filter function
      const firstFormFieldsContet = newState.formFieldsContet[0];
      //const rememberedHeaderColomns = newState.formFields;
      newState.formFieldsContet = newState.formFieldsContet.filter(
        (userElement, index) => {
          // pass through all checkboxes and uncheck them(no matter if checked or not)
          //!!!document.getElementById((index + 1).toString()).checked = false;
          return !deleteArraylist.includes(index + 1);
        }
      );

      let checkBoxItems = document.querySelectorAll(
        "tr.first-line-display-block>td>input"
      );
      let ids = Array.from(checkBoxItems).map((item, index) => {
        // uncheck each checkbox
        document.getElementById((index + 1).toString()).checked = false;
        // remove also from the deletelist
        setDeleteArrayList((deleteArraylist) => {
          return [...deleteArraylist].filter((element) => {
            return element !== parseInt(index);
          });
        });
      });
      //newState.formFields = rememberedHeaderColomns;
      //return [...newState, newState.rememberedHeaderColomns];
      ///!!!!setFormFieldsPermanentet(newState.formFieldsContet);
      return newState;
    });
  };
*/
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
          <Col xs={3}>
            <h3 className="text-primary"></h3>
            <div className="flex">
              <p className="fst-italic">{state.crmName}</p>
              <button
                onClick={deleteCheckedUsersHandler}
                className="headdanger"
                variant="danger"
              >
                מחק שורות מסומנות
              </button>
            </div>
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
                          id={userIndex + 1}
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
