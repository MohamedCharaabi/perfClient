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
import React, { useEffect, useState } from "react";
// core components
import Header from "components/Headers/Header.js";

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

import axios from 'axios';
import { Link } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import GenerateCertif from "components/PrintCertificate/GenerateCertificates";



const Maps = () => {

  const [isLoading, setisLoading] = useState(false);
  const [participants, setParticipants] = useState([])



  useEffect(() => {
    setisLoading(true);
    loadParticipants();
  }, [])



  async function loadParticipants() {
    var result = await axios.get(`https://cims-server.herokuapp.com/participant`);
    setParticipants(result.data);
    setisLoading(false);
  }

  async function deleteParticipant(id) {
    try {
      await axios.delete(`https://cims-server.herokuapp.com/participant/${id}`);
      loadParticipants();
      alert('Theme deleted Successfully');
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
                <h3 className="mb-0">Participants</h3>
                <Link to='AddParticipant' ><Button color='primary' >Add Participant</Button> </Link>
              </CardHeader>
              <CardBody>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">name</th>
                      <th scope="col">LastName</th>
                      <th scope="col">Email</th>
                      <th scope="col">Proffesion</th>
                      <th scope="col">Phone</th>

                      <th scope="col">Establishment</th>
                      <th scope="col">Theme</th>

                      <th scope="col" />
                    </tr>
                  </thead>



                  <tbody>

                    {
                      participants.map((participant) => {
                        let id = participant['_id'];
                        return <tr key={participant['id']}>
                          <th scope="row">
                            <Media className="align-items-center">

                              <Media>
                                <span className="mb-0 text-sm">
                                  {participant.name}
                                </span>
                              </Media>
                            </Media>
                          </th>


                          <td>{participant["lastName"]}  </td>
                          <td>{participant["email"]} </td>
                          <td>{participant["proffesion"]} </td>
                          <td>{participant["phone"]} </td>
                          <td>{participant["establishment"]}  </td>
                          <td>{participant["theme"]}  </td>



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


                                <Link to={"EditTheme/" + id}>
                                  <DropdownItem
                                  // href="#pablo"
                                  // onClick={edittheme}
                                  >
                                    Edit
                          </DropdownItem>

                                </Link>
                                <DropdownItem
                                  href="#pablo"
                                  onClick={e => e.preventDefault(deleteParticipant(id))}
                                >
                                  Remove
                        </DropdownItem>

                                <DropdownItem
                                  href="#pablo"
                                // onClick={getCertificate(`${participant["nameame"]} ${participant["lastName"]}`, participant["theme"])}
                                >
                                  <GenerateCertif />
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

export default Maps;
