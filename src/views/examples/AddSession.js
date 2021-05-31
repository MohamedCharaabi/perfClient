import { CircularProgress, InputLabel, makeStyles, TextField } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import {
    Button, Form, FormGroup, Label, Input, Container,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardImg,
    Row,
    Col,
    CardTitle
} from 'reactstrap'
import ReactDatetime from "react-datetime";

import Select from 'react-select'
import makeAnimated from 'react-select/animated';






const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
}));





function AddSession() {

    const classes = useStyles();



    const [isLoading, setisLoading] = useState(true);
    const [formData, setFormData] = useState({ theme: '', date: '', participants: [] });

    const [participants, setParticipants] = useState([]);
    const [themes, setThemes] = useState([]);
    const [options, setoptions] = useState([]);


    async function getParticipants() {
        await axios.get(`https://cims-server.herokuapp.com/participant`)
            .then(res => {
                setParticipants(res.data);
                setisLoading(false);
            }).catch(err => console.log(err));

    }
    async function getThemes() {
        await axios.get(`https://cims-server.herokuapp.com/theme`)
            .then(res => setThemes(res.data['data']))
            .catch(err => console.log(err));

    }


    useEffect(() => {
        setisLoading(true);
        getThemes();
        getParticipants();
    }, [])





    async function handleSubmit(event) {
        event.preventDefault();

        try {
            await axios.post("https://cims-server.herokuapp.com/session", formData);
            alert('Your form submitted Successfully');
        } catch (error) {
            alert('An Error Found ====>' + error.message);
        }

        // setoptions([...options, { label: 'Angular', value: 'Angular' },]);
        // getOptions();

        console.log(formData);
        // console.log(options);
    }

    function getOptions() {
        let selections = [];
        participants.map(participant => participant['theme'] === formData['theme'] ?
            // options.push(participant['name'])
            // setoptions(...options, { label: participant['name'], value: participant['name'] })
            selections.push({ label: `${participant['name']} ${participant['lastName']}`, value: participant['_id'] })
            : null)


        setoptions(selections);
        console.log(options);

    }




    const handleChange = (value) => {
        setFormData({ ...formData, participants: value.map(val => val['value']) });
        console.log(value);
    };






    if (isLoading) return <div style={{ height: '100%', display: 'grid', placeItems: 'center' }}><CircularProgress /></div>

    return (
        <div>
            <Container style={{ marginTop: '33px', justifyItems: 'center' }} width={'50%'}>
                <Card className="card-register" >
                    <CardHeader className='ajoutCard'>
                        <CardTitle tag="h2" className='cardTitle'>Ajout Session</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Form className='centerForm' onSubmit={handleSubmit} >


                            {/* select Theme */}
                            <Col lg={6}>
                                <FormGroup >
                                    <Label for="exampleSelect">Theme</Label>
                                    <Input type="select" name="select" id="exampleSelect"
                                        // defaultValue={themes[0].name}
                                        onBlur={getOptions}
                                        onChange={val => setFormData({ ...formData, theme: val.target.value })}
                                    >
                                        {themes.map(theme => {
                                            // console.log(theme)
                                            return <option value={theme._id}>
                                                {theme.name}</option>
                                        })}


                                    </Input>
                                </FormGroup>

                            </Col>

                            {/* Select participants */}
                            <Col lg={6}>

                                <InputLabel id="participants">Participants</InputLabel>
                                <Select
                                    id='participants'
                                    closeMenuOnSelect={false}
                                    components={makeAnimated()}
                                    isMulti
                                    options={options}
                                    onChange={handleChange} />
                            </Col>



                            {/* Date */}
                            {/* <h4 className="mb-5 mt-3">Datepicker</h4>

                            <Col md="4">
                                <div className="datepicker-container">
                                    <FormGroup>
                                        <ReactDatetime
                                            inputProps={{
                                                className: "form-control",
                                                placeholder: "Date Picker Here",
                                            }}
                                        />
                                    </FormGroup>
                                </div>
                            </Col> */}
                            <Col lg={6}>
                                <TextField
                                    id="datetime-local"
                                    label="Pick Date"
                                    type="datetime-local"
                                    defaultValue={new Date()}
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    style={{ marginTop: '33px' }}
                                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                                />

                            </Col>


                            <Col lg={6}>

                                <Button color='primary' style={{ marginTop: '33px' }}>Submit</Button>
                            </Col>
                        </Form>
                    </CardBody>
                    <CardFooter>

                    </CardFooter>
                </Card>


            </Container>
        </div>
    )
}

export default AddSession
