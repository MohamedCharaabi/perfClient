import { CircularProgress, InputLabel, makeStyles, TextField } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input, Container, Col, Card, CardTitle, CardHeader, CardBody } from 'reactstrap'

import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import { useParams } from 'react-router';
import { SentimentDissatisfiedOutlined } from '@material-ui/icons';
import { keys } from '@material-ui/core/styles/createBreakpoints';
import { handleError } from 'components/SweetAlerts';
import { handleSuccess } from 'components/SweetAlerts';
// import { width } from 'pdfkit/js/page';






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





function EditSession({ props }) {

    const classes = useStyles();

    const { id, theme } = useParams();

    const [isLoading, setisLoading] = useState(true);
    const [formData, setFormData] = useState({ theme: '', date: '', participants: [] });

    const [session, setSession] = useState({});
    const [participants, setParticipants] = useState([]);
    const [themes, setThemes] = useState([]);
    const [options, setoptions] = useState([]);
    const [themeOptions, setThemeOptions] = useState([])
    // const [theme, settheme] = useState({});



    async function getSession() {
        await axios.get(`https://cims-server.herokuapp.com/session/${id}`)
            .then(res => setSession(res.data))
            .catch(error => alert(`Error loading session : ${error.message}`));

    }

    async function getParticipants() {
        var result = await axios.get(`https://cims-server.herokuapp.com/participant`);
        setParticipants(result.data);

    }
    async function getThemes() {
        var result = await axios.get(`https://cims-server.herokuapp.com/theme`);
        setThemes(result.data['data']);
        setisLoading(false);
    }
    useEffect(() => {
        setisLoading(true);
        getSession();
        getParticipants();
        getThemes();
    }, [])






    async function handleSubmit(event) {
        event.preventDefault();

        await axios.post("https://cims-server.herokuapp.com/session", formData)
            .then(res => handleSuccess({ props: { title: 'Success' } }))
            .catch(err => handleError({ props: { title: 'Error', text: err.message } }));


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

    function getThemeOptions() {
        // var th = themes.find(theme => theme._id === session.theme)

        // settheme({
        //     label: th.name,
        //     value: session.theme
        // });

        var options = []
        for (const key in themes) {
            options.push({ value: key._id, label: key.name })
        }


        setThemeOptions(options);
    }






    const handleChange = (value) => {
        setFormData({ ...formData, participants: value.map(val => val['value']) });
        console.log(value);
    };






    if (isLoading) return <div style={{ height: '100%', display: 'grid', placeItems: 'center' }}><CircularProgress /></div>

    return (
        <div>
            <Container >
                <Card className="card-register" >
                    <CardHeader>
                        <CardTitle tag="h4">Edit Session</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Form style={{ alignContent: 'center', width: '50%' }} onSubmit={handleSubmit} >


                            {/* select Theme */}
                            <Col>
                                <FormGroup>
                                    <Label for="exampleSelect">Theme</Label>
                                    <Input type="select" name="select" id="exampleSelect"
                                        defaultValue={'degf'}
                                        onBlur={getOptions}
                                        onChange={val => setFormData({ ...formData, theme: val.target.value })}
                                    >
                                        <option value={theme._id}>
                                            {theme.name}</option>
                                        {themes.map(theme => {

                                            return <option value={theme._id}>
                                                {theme.name}</option>
                                        })}


                                    </Input>
                                </FormGroup>

                            </Col>




                            {/* Select participants */}
                            <Col>
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

                            <Col>

                                <Label for="exampleDate">Date</Label>
                                <Input
                                    type="datetime-local"
                                    name="date"
                                    id="exampleDate"
                                    placeholder="date placeholder"
                                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                                />


                            </Col>


                            <Col>

                                <Button color='primary' style={{ marginTop: '33px' }}>Submit</Button>
                            </Col>
                        </Form>
                    </CardBody>

                </Card>


            </Container>
        </div>


        //  <div>
        //         <Container style={{ marginTop: '33px', justifyItems: 'center' }}>

        //             <Form style={{ alignContent: 'center', width: '50%' }} onSubmit={handleSubmit} >


        //                 {/* select Theme */}

        //                 {/* <FormGroup >
        //                     <Label for="exampleSelect">Theme</Label>
        //                     <Input type="select" name="select" id="exampleSelect"
        //                         defaultValue={themes.find(t => t._id === session.theme).name}
        //                         onChange={(e) => {
        //                             setFormData({ ...formData, theme: e.target.value });
        //                             setoptions([]);

        //                         }}

        //                         onBlur={getOptions}
        //                     >
        //                         {React.Children.toArray(
        //                             themes.map(theme => <option value={theme._id}>{theme['name']}</option>)
        //                         )}
        //                     </Input>
        //                 </FormGroup> */}
        //                 <InputLabel id="Themes">Themes</InputLabel>
        //                 <Select
        //                     // onFocus={getThemeOptions}
        //                     id='Themes'
        //                     closeMenuOnSelect={false}
        //                     components={makeAnimated()}
        //                     defaultValue={theme}
        //                     options={themeOptions}
        //                 // onChange={handleChange}
        //                 />




        //                 {/* Select participants */}

        //                 <InputLabel id="participants">Participants</InputLabel>
        //                 <Select
        //                     id='participants'
        //                     closeMenuOnSelect={false}
        //                     components={makeAnimated()}
        //                     isMulti
        //                     options={options}
        //                     onChange={handleChange} />


        //                 {/* Date */}

        //                 <TextField
        //                     id="datetime-local"
        //                     label="Pick Date"
        //                     type="datetime-local"
        //                     defaultValue={new Date()}
        //                     className={classes.textField}
        //                     InputLabelProps={{
        //                         shrink: true,
        //                     }}
        //                     style={{ marginTop: '33px' }}
        //                     onChange={e => setFormData({ ...formData, date: e.target.value })}
        //                 />


        //                 <Button color='primary' style={{ marginTop: '33px' }}>Submit</Button>
        //             </Form>



        //         </Container>
        //     </div>

    )
}

export default EditSession
