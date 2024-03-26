import React, { useRef, useEffect, useLayoutEffect } from "react";
import { useState } from "react";
import { UserService } from "../services/UserService";
import { Container, Row, Col, Table } from "react-bootstrap";
import * as XLSX from "xlsx";

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
  const [showDeleteRowButton, setShowDeleteRowButton] = useState(false);
  const [phoneIndex, setPhoneIndex] = useState(-1);
  const [nameIndex, setNameIndex] = useState(-1);
  
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

    // Add my own custom type in the body start to distinguish between 
    // totalUsers, Registration Form, Login Form etc.
    totalUsers = [{react_post_type: "USERS"}, ...totalUsers]
    

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
    } else { // uncheck header checkbox
      //uncheck state => => amove all checkboxes to uncheck state
      let ids = Array.from(checkBoxItems).map((item, index) => {
        // uncheck each checkbox
        document.getElementById((index + 1).toString()).checked = false;
        // remove also from the deletelist
        /*
        setDeleteArrayList((deleteArraylist) => {
           return [...deleteArraylist].filter((element) => {
            return element !== parseInt(index);
          });
        });
        */
        setDeleteArrayList([]);
      });
      //setClasname("buttonhidden");
    }
  }

  useEffect(()=>{
    let mobileDelField = document.getElementsByClassName('mobileDelField');
    if (window.innerWidth < 800){
      //
      for (let i = 0; i < mobileDelField.length; i++) {
        mobileDelField[i].style.display = "none";
      }
    }

  })

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

  useEffect(()=>{
    if (deleteArraylist.length > 0){
      setShowDeleteRowButton(true);
    }
    else{
      setShowDeleteRowButton(false);
    }
  },[deleteArraylist])

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
/*
  const export2ExcelHandler= () => {
    console.log(state.users);
  }
  */

  const export2ExcelHandler = () => {
    
      console.log(state.users);
      var wb = XLSX.utils.book_new(),
        ws = XLSX.utils.json_to_sheet(state.users);
      XLSX.utils.book_append_sheet(wb, ws, "mySheet1");
      XLSX.writeFile(wb, "MyExcel.xlsx");
    
  };

  
  return (
    <>
      
      {/*} <pre>{JSON.stringify(state.users)}</pre>
      <pre>{JSON.stringify(state.users,null,2)}</pre>*/}
      <Container style={{direction: "rtl"}} fluid className="mt-3">
        <Row>
          <Col>
            {/*<h3 className="text-primary">User List</h3>
            <p className="fst-italic">oioioi</p>*/}
          </Col>
        </Row>
        <Row>
          <Col className="col-xs-12">
            <h3 className="text-primary"></h3>
            <div className="flex headline">
              <p>{state.crmName}</p>
              
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="col-xs-12 col-md-6" >
            <h3 className="text-primary"></h3>
            <div  style={{flexDirection:"row",display:"flex"}}>                                                     
              <p style={{cursor:"pointer",textDecoration: "underline"}}onClick={export2ExcelHandler}>  יצא לקובץ אקסל </p>
              {/*{showDeleteRowButton ? <button onClick={deleteCheckedUsersHandler}>
                מחק שורות מסומנות
    </button>  : null} */}
              {showDeleteRowButton ?<p style={{paddingRight:10,paddingLeft:10, color:'white',backgroundColor:"red",cursor:"pointer",textDecoration: "underline",marginRight:20}}onClick={deleteCheckedUsersHandler}>  מחק שורות מסומנות </p> : null} 
            </div>           
          </Col>
        </Row>       
        <Row>
          <Col>
            <Table  border hover className="shadow-lg text-center">
              <thead bgcolor="#6B6B6B">
                <tr>
                  <td>
                    <input type="checkbox" onChange={headerCheckBoxHandler} />
                  </td>
                  <th>#</th>
                  {state.formFields.map((field,fieldIndex) => {
                    if (field === "phone"){
                      // eanough to find it once
                      if (phoneIndex=== -1){
                      setPhoneIndex(fieldIndex);
                      }
                    }
                    if (field === "name"){
                      // eanough to find it once
                      if (nameIndex=== -1){
                      setNameIndex(fieldIndex);
                      }
                    }
                   {/*return <th className="mobileDelField">{field}</th>; */}
                   return field === "phone" || field === "name"?
                   <th >{field}</th> :
                   <th className="mobileDelField">{field}</th>;
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
                      {userLine.map((formField,fieldIndex) => {
                        let hrefvalue = "tel:" + formField;                     
                        return (fieldIndex === phoneIndex || fieldIndex === nameIndex )?
                        (fieldIndex === phoneIndex )? 
                        <td>
                          <a href={hrefvalue}>{formField}</a>
                        </td> : <td>{formField}</td> : <td className="mobileDelField">{formField}</td>
                         
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
