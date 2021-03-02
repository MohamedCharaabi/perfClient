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

// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    Container,
    Row,

    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Media,

    Table,
    Button,

} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";

import axios from 'axios';
import { Link, useHistory } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";







const Session = () => {
    let history = useHistory();
    const [isLoading, setisLoading] = useState(true);
    const [sessions, setSessions] = useState([]);
    const [participants, setParticipants] = useState([]);
    const [names, setNames] = useState([]);


    useEffect(() => {
        setisLoading(true);
        loadSessions();
        getParticipants();


    }, [])

    async function loadSessions() {
        var result = await axios.get(`https://cims-server.herokuapp.com/session`);
        setSessions(result.data);
        setisLoading(false);
    }

    async function getParticipants() {
        var result = await axios.get(`https://cims-server.herokuapp.com/participant`);
        setParticipants(result.data);
        setisLoading(false);
    }



    async function deleteSession(id) {
        try {
            await axios.delete(`https://cims-server.herokuapp.com/session/${id}`);
            loadSessions();
            alert('Theme deleted Successfully');
        } catch (error) {
            alert(`Error while deleting:\n ${error.message}`);
        }



    }


    function listParticipants(users) {
        return users.map(user => {
            return participants.map(part => part['_id'] === user ? `${part['name']} ${part['lastName']} ***` : null);
        });
        console.log(names);
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
                                <h3 className="mb-0">Sessions</h3>
                                <Link to='AddSession' ><Button color='primary' >Add Session</Button> </Link>
                            </CardHeader>
                            <CardBody>
                                <Table className="align-items-center table-flush" responsive>
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">Theme</th>
                                            <th scope="col">DAte</th>
                                            <th scope="col">participants</th>

                                            <th scope="col" />
                                        </tr>
                                    </thead>



                                    <tbody>

                                        {
                                            sessions.map((session) => {
                                                let id = session['_id'];
                                                return <tr key={session['id']}>
                                                    <th scope="row">
                                                        <Media className="align-items-center">

                                                            <Media>
                                                                <span className="mb-0 text-sm">
                                                                    {session.theme}
                                                                </span>
                                                            </Media>
                                                        </Media>
                                                    </th>


                                                    <td>{session["date"]}  </td>
                                                    <td>{listParticipants(session['participants'])}</td>






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


                                                                <Link to={"EditSession/" + id}>
                                                                    <DropdownItem

                                                                    >
                                                                        Edit
                          </DropdownItem>

                                                                </Link>
                                                                <DropdownItem
                                                                    href="#pablo"
                                                                    onClick={e => e.preventDefault(deleteSession(id))}
                                                                >
                                                                    Remove
                        </DropdownItem>

                                                                <DropdownItem
                                                                    href="#pablo"
                                                                // onClick={}
                                                                >
                                                                    Generate File
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

export default Session;
