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
import { CircularProgress, InputLabel } from "@material-ui/core";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";



import Select from 'react-select'


// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Container,
    InputGroup,

    Col,
    Label,
    CardTitle,
} from "reactstrap";


import makeAnimated from 'react-select/animated';
import { Alert } from "bootstrap";



const EditTheme = ({ props }) => {

    const [isLoading, setisLoading] = useState(true)
    let { id } = useParams();
    const [theme, setTheme] = useState({});
    const [formData, setFormData] = useState({ name: '', days: '', formers: [] });
    // const [checked, setChecked] = React.useState([1]);
    // const [allFormers, setAllFormers] = useState([]);
    // const [newFormers, setnewFormers] = useState([])
    const [formers, setFormers] = useState([])
    const [options, setoptions] = useState([]);
    const [values, setValues] = useState([])



    useEffect(() => {
        setisLoading(true);
        getTheme();
        getFormers();
        // getValues();
    }, [])

    async function getTheme() {
        await axios.get(`https://cims-server.herokuapp.com/theme/${id}`)
            .then(res => setTheme(res.data))
            .catch(error => Alert(`error:: ${error.message}`));


    }

    async function getFormers() {
        await axios.get(`https://cims-server.herokuapp.com/former`)
            .then(res => setFormers(res.data))
            .catch(error => alert(error));


        setisLoading(false);
        // console.log(formers);
    }


    async function updateTheme(e) {
        e.preventDefault();

        await axios.patch(`https://cims-server.herokuapp.com/theme/${id}`, formData)
            .then(res => alert('Sucess to update'))
            .catch(error => alert(`Error while updating former\n: ${error.message}`));

        console.log(formData)

    }

    function getValues() {
        let values = [];
        theme.formers.map(former => {
            var form = formers.find(f => f._id === former);
            return values.push({ value: form._id, label: `${form.name} ${form.lastName}` })
        })

        setValues(values);
    }


    function getOptions() {
        getValues();
        let selections = [];

        formers.map(former => { return selections.push({ value: former._id, label: `${former.name} ${former.lastName}` }) })
        setoptions(selections);

        // return selections;
        console.log(options);

    }
    const handleChange = (value) => {
        console.log(` option  : ${value}`)
        setFormData({ ...formData, formers: value.map(val => val.value) });
        // value.map(val => console.log(` option selected : ${val.value}`))

    };








    if (isLoading) return <div style={{ height: '100%', display: 'grid', placeItems: 'center' }}><CircularProgress /></div>

    return (
        <>
            <Container style={{ marginTop: '33px', justifyItems: 'center' }}>
                <Card className="card-register" >
                    <CardHeader className='ajoutCard'>
                        <CardTitle tag="h2" className='cardTitle'>Edit Theme</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Form className='centerForm' onSubmit={updateTheme}>
                            <FormGroup className="mb-3" style={{ width: '50%' }}>
                                <Label for='theme_name'>Name</Label>

                                <InputGroup className="input-group-alternative">

                                    <Input
                                        placeholder={theme['name']}
                                        type="name"
                                        id='theme_name'
                                        style={{ color: 'red' }}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    // onBlur={getOptions}
                                    />
                                </InputGroup>
                            </FormGroup>

                            {/* DAYS */}

                            <FormGroup className="mb-3" style={{ width: '50%' }}>
                                <Label for='theme_length'>Days</Label>
                                <InputGroup className="input-group-alternative">

                                    <Input
                                        placeholder={theme['days']}
                                        type="number"
                                        id='theme_length'
                                        style={{ color: 'red' }}
                                        onChange={(e) => setFormData({ ...formData, days: e.target.value })}
                                    />
                                </InputGroup>
                            </FormGroup>




                            {/* Former */}
                            <FormGroup style={{ width: '50%' }}>

                                <InputLabel id="participants">Formers </InputLabel>
                                {/* {console.log(formers)} */}
                                <Select
                                    onFocus={getOptions}
                                    id='participants'
                                    closeMenuOnSelect={false}
                                    components={makeAnimated()}
                                    isMulti={true}
                                    defaultValue={values}

                                    options={options}
                                    onChange={handleChange}
                                />
                            </FormGroup>








                            <div className="text-center">
                                <Button className="my-4" color="primary" type="submit">
                                    Update
                </Button>
                            </div>
                        </Form>
                    </CardBody>
                </Card>
            </Container>
        </>
    );
};

export default EditTheme;
