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
import { CircularProgress } from "@material-ui/core";
import axios from "axios";
// import CheckboxListFormers from "components/others/FormersList";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,

    InputGroup,

    Col,
    Label,
} from "reactstrap";

const EditFormer = ({ props }) => {

    const [isLoading, setisLoading] = useState(true)
    let { id } = useParams();
    const [former, setFormer] = useState();
    const [formerData, setFormerData] = useState({ name: '', lastName: '', email: '' });

    useEffect(() => {
        setisLoading(true);
        getFormer();
    }, [])

    async function getFormer() {
        var result = await axios.get(`https://cims-server.herokuapp.com/former/${id}`);
        setFormer(result.data);
        setFormerData(result.data);
        setisLoading(false);
    }

    async function updateFormer() {

        try {
            var result = await axios.patch(`https://cims-server.herokuapp.com/former/${id}`, formerData);
            alert("Updated Successfully");
        } catch (error) {
            alert(`Error while updating former\n: ${error.message}`)
        }

    }


    if (isLoading) return <div style={{ height: '100%', display: 'grid', placeItems: 'center' }}><CircularProgress /></div>

    return (
        <>
            <Col lg="5" md="7" style={{ display: 'contents' }}>
                <Card className="bg-secondary shadow border-0">
                    <CardHeader className="bg-transparent pb-5">
                        <div className="text-muted text-center mt-2 mb-3">
                            <small>Edit Former</small>
                        </div>
                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-5">

                        <Form role="form">
                            <FormGroup className="mb-3">
                                <Label for='former_name'>Name</Label>

                                <InputGroup className="input-group-alternative">

                                    <Input
                                        placeholder={former['name']}
                                        type="name"
                                        id='former_name'
                                        style={{ color: 'red' }}
                                        onChange={e => setFormerData({ ...formerData, name: e.target.value })}

                                    />
                                </InputGroup>
                            </FormGroup>

                            {/* LastName */}

                            <FormGroup className="mb-3">
                                <Label for='former_lastname'>lastName</Label>
                                <InputGroup className="input-group-alternative">

                                    <Input
                                        placeholder={former['lastName']}
                                        type="name"
                                        id='theme_lastname'
                                        style={{ color: 'red' }}
                                        onChange={e => setFormerData({ ...formerData, lastName: e.target.value })}
                                    />
                                </InputGroup>
                            </FormGroup>

                            {/* Email */}

                            <FormGroup className="mb-3">
                                <Label for='former_email'>Email</Label>
                                <InputGroup className="input-group-alternative">

                                    <Input
                                        placeholder={former['email']}
                                        type="email"
                                        id='email'
                                        style={{ color: 'red' }}
                                        onChange={e => setFormerData({ ...formerData, email: e.target.value })}
                                    />
                                </InputGroup>
                            </FormGroup>






                            <div className="text-center">
                                <Button className="my-4" color="primary" type="button" onClick={updateFormer}>
                                    Update
                                  </Button>
                            </div>
                        </Form>
                    </CardBody>
                </Card>
            </Col>
        </>
    );
};

export default EditFormer;
