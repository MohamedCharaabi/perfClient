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
// react component that copies the given text inside your clipboard
import { CopyToClipboard } from "react-copy-to-clipboard";
// react-top-loading-bar

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
import Header from "components/Headers/Header.js";

import { getThemes } from '../api/api.js';
import axios from 'axios';
import { Link, useHistory } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";


const Icons = () => {
  let history = useHistory();
  const [isLoading, setisLoading] = useState(true);
  const [themes, setThemes] = useState([]);


  useEffect(() => {
    setisLoading(true);
    loadThemes();


  }, [])

  async function loadThemes() {
    var result = await axios.get(`https://cims-server.herokuapp.com/theme`);
    setThemes(result.data['data']);
    setisLoading(false);
  }



  async function deleteTheme(id) {
    try {
      await axios.delete(`https://cims-server.herokuapp.com/theme/${id}`);
      loadThemes();
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
                <h3 className="mb-0">Themes</h3>
                <Link to='AddTheme' ><Button color='primary' >Add Theme</Button> </Link>
              </CardHeader>
              <CardBody>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">name</th>
                      <th scope="col">Days</th>
                      <th scope="col">Formers</th>

                      <th scope="col" />
                    </tr>
                  </thead>



                  <tbody>

                    {
                      themes.map((theme) => {
                        let id = theme['_id'];
                        return <tr key={theme['id']}>
                          <th scope="row">
                            <Media className="align-items-center">

                              <Media>
                                <span className="mb-0 text-sm">
                                  {theme.name}
                                </span>
                              </Media>
                            </Media>
                          </th>


                          <td>{theme["days"]} days </td>


                          <td>
                            <div className="avatar-group">

                              {
                                React.Children.toArray(
                                  theme['formers'].map(former => {
                                    return <>
                                      <a
                                        className="avatar avatar-sm"
                                        href="#pablo"
                                        id="tooltip875258217"
                                        onClick={(e) => e.preventDefault()}
                                      >
                                        <img
                                          alt="..."
                                          className="rounded-circle"
                                          src={
                                            require("../../assets/img/theme/team-1-800x800.jpg")
                                              .default
                                          }
                                        />
                                      </a>
                                      <UncontrolledTooltip
                                        delay={0}
                                        target="tooltip875258217"
                                      >
                                        {former['name']}
                                      </UncontrolledTooltip>

                                    </>

                                  })
                                )
                              }


                            </div>
                          </td>

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
                                  onClick={e => e.preventDefault(deleteTheme(id))}
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
};

export default Icons;
