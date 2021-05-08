import { CircularProgress, InputLabel, makeStyles, TextField } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap'

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





    useEffect(() => {
        setisLoading(true);
        getParticipants();
        getThemes();
    }, [])



    async function getParticipants() {
        var result = await axios.get(`https://cims-server.herokuapp.com/participant`);
        setParticipants(result.data);
        setisLoading(false);
    }
    async function getThemes() {
        var result = await axios.get(`https://cims-server.herokuapp.com/theme`);
        setThemes(result.data['data']);
        setisLoading(false);
    }

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






    if (isLoading) return <CircularProgress />

    return (
        <div>
            <Container style={{ marginTop: '33px', justifyItems: 'center' }}>

                <Form style={{ alignContent: 'center', width: '50%' }} onSubmit={handleSubmit} >


                    {/* select Theme */}

                    <FormGroup >
                        <Label for="exampleSelect">Theme</Label>
                        <Input type="select" name="select" id="exampleSelect" onChange={(e) => {
                            setFormData({ ...formData, theme: e.target.value });
                            setoptions([]);
                        }}

                            onBlur={getOptions}
                        >
                            {React.Children.toArray(
                                themes.map(theme => <option value={theme._id}>{theme['name']}</option>)
                            )}
                        </Input>
                    </FormGroup>




                    {/* Select participants */}

                    <InputLabel id="participants">Participants</InputLabel>
                    <Select
                        id='participants'
                        closeMenuOnSelect={false}
                        components={makeAnimated()}
                        isMulti
                        options={options}
                        onChange={handleChange} />


                    {/* Date */}

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


                    <Button color='primary' style={{ marginTop: '33px' }}>Submit</Button>
                </Form>



            </Container>
        </div>
    )
}

export default AddSession
