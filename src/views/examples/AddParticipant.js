import { makeStyles } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap'



const useStyles = makeStyles((theme) => ({
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

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}



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


function NewParticipant() {
    const classes = useStyles();
    const [themes, setThemes] = useState([]);
    const [isLoading, setisLoading] = useState(true);

    const [formData, setFormData] = useState({ name: '', lastName: '', email: '', proffesion: '', phone: '', establishment: '', theme: {} });


    useEffect(() => {
        setisLoading(true);
        loadThemes();
    }, [])


    async function loadThemes() {
        var result = await axios.get(`https://cims-server.herokuapp.com/theme`);
        setThemes(result.data['data']);
        setisLoading(false);
    }


    async function handleSubmit(event) {
        event.preventDefault();

        // let data = {
        //     name: name,
        //     lastName: lastName,
        //     email: email,
        //     establishment: etablissment
        // }
        try {
            await axios.post("https://cims-server.herokuapp.com/participant", formData);
            alert('Your form submitted Successfully');
        } catch (error) {
            alert('An Error Found ====>' + error.message);
        }

    }


    function handleChange() {

    }


    return (
        <Container style={{ marginTop: '33px', justifyItems: 'center' }}>

            <Form className style={{ alignContent: 'center' }} onSubmit={handleSubmit} >

                <FormGroup style={{ width: '50%' }}>
                    <Label for="name">Name</Label>
                    <Input type="name" name="name" id="name" placeholder="Enter Name" color='red    ' onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                </FormGroup>

                <FormGroup style={{ width: '50%' }}>
                    <Label for="lastName">LastName</Label>
                    <Input type="name" name="lastName" id="lastName" placeholder="Enter lastName" onChange={e => setFormData({ ...formData, lastName: e.target.value })} />
                </FormGroup>

                <FormGroup style={{ width: '50%' }}>
                    <Label for="exampleEmail">Email</Label>
                    <Input type="email" name="email" id="exampleEmail" placeholder="Enter your Email" onChange={e => setFormData({ ...formData, email: e.target.value })} />
                </FormGroup>

                <FormGroup style={{ width: '50%' }}>
                    <Label for="proffesion">Proffesion</Label>
                    <Input type="text" name="proffesion" id="proffesion" placeholder="Enter your Proffesion" onChange={e => setFormData({ ...formData, proffesion: e.target.value })} />
                </FormGroup>

                <FormGroup style={{ width: '50%' }}>
                    <Label for="phone">Phone</Label>
                    <Input type="number" name="phone" id="phone" placeholder="Enter your Phone " onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                </FormGroup>

                <FormGroup style={{ width: '50%' }}>
                    <Label for="Etablisment">Etablisment</Label>
                    <Input type="name" name="Etablisment" id="Etablisment" placeholder="Enter establishment" onChange={e => setFormData({ ...formData, establishment: e.target.value })} />
                </FormGroup>

                {/* Select Theme */}

                <FormGroup style={{ width: '50%' }}>
                    <Label for="exampleSelect">Theme</Label>
                    <Input type="select" name="select" id="exampleSelect" onChange={e => setFormData({ ...formData, theme: e.target.value })}>
                        {React.Children.toArray(
                            themes.map(theme => <option>{theme['name']}</option>)
                        )}
                    </Input>
                </FormGroup>


                <Button >Submit</Button>
            </Form>



        </Container>
    )
}

export default NewParticipant
