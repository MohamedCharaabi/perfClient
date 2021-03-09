/*!

=========================================================
* Argon Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState, useEffect } from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  Badge,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Button,
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import axios from 'axios';
import { Link, useHistory } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import Header from "components/Headers/Header.js";


const Profile = () => {
  const [isLoading, setisLoading] = useState(true);
  const [formers, setFormers] = useState([]);




  useEffect(() => {
    setisLoading(true);
    loadFormers();


  }, [])

  async function loadFormers() {
    var result = await axios.get(`https://cims-server.herokuapp.com/former`);
    setFormers(result.data);
    setisLoading(false);
  }

  async function deleteFormer(id) {
    try {
      await axios.delete(`https://cims-server.herokuapp.com/former/${id}`);
      loadFormers();
      alert('Former deleted Successfully');
    } catch (error) {
      alert(`Error while deleting:\n ${error.message}`);
    }



  }



  if (isLoading) return <CircularProgress style={{ justifyContent: 'center' }} />
  return (


    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid >
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent row" style={{ justifyContent: 'space-between' }}>
                <h3 className="mb-0">Formers</h3>
                <Link to='AddFormer' ><Button color='primary' >Add Former</Button> </Link>
              </CardHeader>
              <CardBody>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>

                      <th scope="col"></th>

                      <th scope="col">name</th>
                      <th scope="col">lastName</th>
                      <th scope="col">email</th>

                      <th scope="col" />
                    </tr>
                  </thead>



                  <tbody>

                    {
                      formers.map((former) => {
                        let id = former['_id'];
                        return <tr key={former['id']}>
                          <Media className="align-items-center">
                            <a
                              className="avatar rounded-circle mr-3"
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              <img
                                alt="..."
                                src={
                                  former.image
                                }
                              />
                            </a>

                          </Media>

                          <td>
                            {former.name}
                          </td>
                          <td>{former["lastName"]}  </td>
                          <td>{former["email"]}  </td>

                          <td className="text-right">
                            <UncontrolledDropdown>
                              <DropdownToggle
                                className="btn-icon-only text-light"
                                href="#pablo"
                                role="button"
                                size="sm"
                                color=""
                                onClick={(e) => e.preventDefault()}
                              >
                                <i className="fas fa-ellipsis-v" />
                              </DropdownToggle>
                              <DropdownMenu className="dropdown-menu-arrow" right>


                                <Link to={"EditFormer/" + id}>
                                  <DropdownItem
                                  // href="#pablo"
                                  // onClick={edittheme}
                                  >
                                    Edit
                          </DropdownItem>

                                </Link>
                                <DropdownItem
                                  href="#pablo"
                                  onClick={(e) => e.preventDefault(
                                    deleteFormer(id)
                                  )}
                                >
                                  Remove
                        </DropdownItem>

                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </td>
                        </tr>



                      })


                    }


                  </tbody>
                </Table>

              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );


}

export default Profile;
