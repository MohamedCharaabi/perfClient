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
import { Link } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import jsPDF from "jspdf";
import EditSession from "./EditSession";
import { Download } from "react-feather";
import certif from 'assets/certificate.png';
import('jspdf-autotable');







const Session = () => {
    const [isLoading, setisLoading] = useState(true);
    const [sessions, setSessions] = useState([]);
    const [participants, setParticipants] = useState([]);

    const [themes, setThemes] = useState([])


    useEffect(() => {
        setisLoading(true);
        loadSessions();
        getParticipants();
        getThemes();


    }, [])

    async function loadSessions() {
        var result = await axios.get(`https://cims-server.herokuapp.com/session`);
        setSessions(result.data);
        // setisLoading(false);
    }

    async function getParticipants() {
        var result = await axios.get(`https://cims-server.herokuapp.com/participant`);
        setParticipants(result.data);
        // setisLoading(false);
    }

    async function getThemes() {
        var result = await axios.get(`https://cims-server.herokuapp.com/theme`);
        setThemes(result.data.data);
        setisLoading(false);
        console.log(themes)

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
    function exportPdf(session) {
        console.log(session);




        let names = [];
        let establishment = [];
        let proffesions = [];
        let phones = [];
        let emails = [];
        var daysNumber;



        themes.map(theme => {
            if (theme['name'] === session['theme']) {
                daysNumber = theme['days'];
            }
            return null;
        })


        session['participants'].map(par => {
            console.log(par);

            participants.map(participant => {

                if (participant['_id'] === par) {
                    console.log(par)
                    names.push(`${participant['name']} ${participant['lastName']}`);
                    establishment.push(participant['establishment']);
                    proffesions.push(participant['proffesion']);
                    phones.push(participant['phone']);
                    emails.push(participant['email']);

                }

            })

        })

        // console.log(names);

        var headers = [['Names', 'Establishment', 'proffesion', 'phone', 'email']]
        let x = new Date(session['date']);
        console.log(x)
        let date = x

        for (let i = 0; i < daysNumber; i++) {
            headers[0].push((date.getDate() + i) + '/' + date.getMonth() + '/' + date.getFullYear());
        }

        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "landscape"; // portrait or landscape

        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(15);

        let data2 = [];

        for (let x = 0; x < names.length; x++) {
            data2.push([names[x], establishment[x], proffesions[x], phones[x], emails[x]]);
        }

        let content = {
            startY: 50,
            head: headers,
            body: data2
        };

        doc.text(session['theme'], marginLeft, 40);
        doc.autoTable(content);
        doc.save(`Session-${session['theme']}.pdf`)
    }

    function listParticipants(users) {
        return users.map(user => {
            return participants.map(part => part['_id'] === user ? `${part['name']} ${part['lastName']} ***` : null);
        });
        // console.log(names);
    }


    function generateCertif(name, date, theme) {



        const pdf = new jsPDF("l", "pt", "a4", true);

        var width = pdf.internal.pageSize.getWidth();
        var height = pdf.internal.pageSize.getHeight();


        pdf.addImage(certif, 'PNG', 0, 0, width, height, '', "fast");

        pdf.setFontSize(20)
        pdf.text(250, 335, `${name} **** ${theme}`)
        pdf.save(`${name}-${theme}.pdf`);


    }

    function downloadCertifs(session) {
        session.participants.map(participant => {
            var th = themes.find(t => t._id === session.theme)
            return participants.map(par => {
                if (participant === par._id) {
                    return generateCertif(`${par.name} ${par.lastName}`, session.date, th.name)
                }
                return null;
            });
        });
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
                                            <th scope="col">Date</th>
                                            <th scope="col">participants</th>

                                            <th scope="col" />
                                        </tr>
                                    </thead>



                                    <tbody>

                                        {
                                            sessions.map((session) => {
                                                let id = session['_id'];

                                                console.log(themes);
                                                var th = themes.find(t => t._id === session.theme);
                                                console.log(th);

                                                return <tr key={session['_id']}>
                                                    <th scope="row">
                                                        <Media className="align-items-center">

                                                            <Media>
                                                                <span className="mb-0 text-sm">
                                                                    {th.name}
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


                                                                <Link to={`EditSession/${id}/${th.name}`} >
                                                                    <DropdownItem

                                                                    >
                                                                        Edit
                          </DropdownItem>

                                                                </Link>
                                                                <DropdownItem

                                                                    onClick={e => e.preventDefault(deleteSession(id))}
                                                                >
                                                                    Remove
                        </DropdownItem>

                                                                <DropdownItem
                                                                    onClick={(e) => {
                                                                        e.preventDefault()
                                                                        exportPdf(session)
                                                                    }}
                                                                >
                                                                    Generate File
                                                                </DropdownItem>
                                                                <DropdownItem
                                                                    onClick={(e) => {
                                                                        e.preventDefault()
                                                                        // exportPdf(session)
                                                                        downloadCertifs(session)
                                                                    }}
                                                                >
                                                                    Generate Certificates
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
