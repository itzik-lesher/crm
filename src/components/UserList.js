import React, { useEffect } from "react";
import { useState } from "react";
import { UserService } from "../services/UserService";
import { Container, Row, Col, Table } from "react-bootstrap";

const UserList = () => {
  const [state, setState] = useState({
    users: [],
  });

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

  return (
    <>
      User List
     {/*} <pre>{JSON.stringify(state.users)}</pre>
      <pre>{JSON.stringify(state.users,null,2)}</pre>*/}
      <Container className="mt-3">
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
                  <th>SNO</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Website</th>
                  <th>Company</th>
                  <th>Location</th>
                </tr>
              </thead>
              <tbody>
                {state.users.length > 0 &&
                  state.users.map((user) => {
                    return (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.website}</td>
                        <td>{user.company.name}</td>
                        <td>{user.address.city}</td>
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
