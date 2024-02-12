import React, { useEffect, useState } from "react";

const CrmFetch = () => {
  const [crmState, setCrmState] = useState({
    crmId: "",
    crmName: "",
    usersData: [],
  });
  useEffect(() => {
    const api_url = window.location.href;
    fetch("StudentsData.json", {
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
          let first_line_exsist = data[0].first_line_existance;
          // Remove them from data(after we saved thame):
          delete data[0].form_name_id;
          delete data[0].form_name;
          delete data[0].first_line_existance;
          // if we have an ectra element
          if (first_line_exsist === "first-line-display-none") {
            if (data.length > 1) {
              // remove first user
              data.shift();
              //setState((oldState) => {
              //    return {...oldState, first_line_exist:'first-line-display-block'}
              // })
              first_line_exsist = "first-line-display-block";
            } else {
              //   setState((oldState) => {
              //     return {...oldState, first_line_exist:'first-line-display-none'}
              // })
              first_line_exsist = "first-line-display-none";
            }
          }
          console.log("data = " + data);
          setState({
            crmId: crm_id,
            crmName: crm_name,
            first_line_exist: first_line_exsist,
            jsonData: data,
            formFields: Object.keys(data[0]),
            phonePositionIndex: Object.keys(data[0]).indexOf("phone"),
            formFieldsContet: data.map((obj) => {
              return Object.values(obj);
            }),
          });
          console.log("data[0] = " + data[0]);
          let dataa = data;
          let fields = Object.keys(data[0]);
          console.log(
            "phonePositionIndex = " + Object.keys(data[0]).indexOf("phone")
          );
          console.log("data = " + dataa);
          console.log("fields =" + fields);
          console.log("keys = " + state.keys);
          //console.log("values = " + values);
          return data;
        })
        .catch((error) => {
          console.log(error);
        });
  }, []);
};

export default CrmFetch;
