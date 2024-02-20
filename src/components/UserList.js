import React, { useRef, useEffect, useLayoutEffect } from "react";
import { useState } from "react";
import { UserService } from "../services/UserService";
import { Container, Row, Col, Table } from "react-bootstrap";

const UserList = () => {
  const [state, setState] = useState({
    crmId: {},
    crmName: "",
    users: [],
    formFields: [],
    phonePositionIndex: 0,
    formFieldsContet: [],
  });
  // holds the deleted lines as array. For instance if we check
  // checkboxes 2 and 4  deleteArraylist = [2, 4]
  const [deleteArraylist, setDeleteArrayList] = useState([]);
  const useEffectSaveRef = useRef(true);
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

  // POST (Save) StudentsData.json in php
  useEffect(() => {
    if (useEffectSaveRef.current === true)
      return;
    else{
      useEffectSaveRef.current = true;
    }
    // override useEffect 2 or 3 times according to the enviroment
    let api_url = window.location.href;

    if (api_url.indexOf("localhost") >= 0) {
      // means localhost
      ///api_url = "http://localhost/lp/lp-develop/api/api.php";
      api_url = "http://localhost/lp/lp-develop/crm/api/api.php";
    } else {
      // production(the slice works like ../../../api.php)
      //////api_url = api_url.slice(0, -17) + "/api/api.php";
      //api_url = api_url.slice(0, -11) + "/api/api.php";
      api_url = api_url.slice(0, -11) + "/crm/api/api.php";
    }
    
    // allow excution only from the 2 or 5 round
    //if (dataFetchedRef2.current < 2) {
    //  dataFetchedRef2.current++;
    //  return;
    //}
    
    // Create all data including the keys by adding the key
    // in front of the data for every field
    let totalUsers = [];
    //let userObject = {};
    [...state.formFieldsContet].forEach((user, indexTotal) => {
      let userObject = {};
      [...state.formFields].forEach((key, indexUser) => {
        userObject[key] = user[indexUser];
      });
      //totalUsers = [...totalUsers, userObject];
      totalUsers.push(userObject);
    });
    // include the ID and name and first_line_exist of StudentsData.json
    totalUsers[0] = { form_name: state.crmName, ...totalUsers[0] };
    totalUsers[0] = { form_name_id: state.crmId, ...totalUsers[0] };
    //totalUsers[0] = {
    //  first_line_existance: state.first_line_exist,
    //  ...totalUsers[0],
    //};
   
    fetch(api_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(totalUsers),
    })
      .then((response) => response.text())
      .then((message) => {
        // this open alert box on top
        //alert(message);
        //setData(message);
      })
      .catch((error) => console.error(error));
  }, [state.formFieldsContet]);

  function headerCheckBoxHandler(e) {
    var checkBoxItems = document.querySelectorAll(
      "tbody>tr>td>input"
    );
    if (e.target.checked) {
      // check state => move all checkboxes to check state
      let ids = Array.from(checkBoxItems).map((item, index) => {
        // check each checkbox
        document.getElementById((index + 1).toString()).checked = true;
        // add also the the deletlist
        setDeleteArrayList((deleteArraylist) => {
          //return [...deleteArraylist, index];
          // this solved the problem that the first line remained
          return [...deleteArraylist, index + 1];
        });
      });
      //setClasname("buttonshow");
    } else {
      //uncheck state => => amove all checkboxes to uncheck state
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
      //setClasname("buttonhidden");
    }
  }



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
          // retuen only unchecked lines
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
    // activate useEffect 
    useEffectSaveRef.current = false;
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
          <Col xs={3}>
            <h3 className="text-primary"></h3>
            <div className="flex">
              <p className="fst-italic">{state.crmName}</p>
              <button onClick={deleteCheckedUsersHandler}>
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
                    <input type="checkbox" onChange={headerCheckBoxHandler} />
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
