import { Chip, CircularProgress, FormControl, InputLabel, makeStyles, MenuItem, TextField, useTheme } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input, FormText, Container, Row, CustomInput, Col } from 'reactstrap'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import { Paper } from '@material-ui/core';
import Draggable from 'react-draggable';
import MultipleSelect from './Ship';
import CustomSelect from './CustomSelect';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}



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
    const [personName, setPersonName] = React.useState([]);
    const theme = useTheme();


    const [isLoading, setisLoading] = useState(true);
    const [formData, setFormData] = useState({ theme: '', date: '', participants: [] });

    const [checked, setChecked] = React.useState([]);
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



    const handleToggle = (value) => () => {
        let form = formData['formers'];
        const currentIndex = form.indexOf(value);
        // const newChecked = [...checked];

        const newChecked = [...form];


        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setFormData({ ...formData, formers: newChecked });
    };



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
                                themes.map(theme => <option >{theme['name']}</option>)
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
