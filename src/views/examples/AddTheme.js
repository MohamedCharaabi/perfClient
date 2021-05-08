import { CircularProgress } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap'
// import CheckboxListFormers from 'components/others/FormersList';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
// import ListItemText from '@material-ui/core/ListItemText';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import Checkbox from '@material-ui/core/Checkbox';
// import Avatar from '@material-ui/core/Avatar';
import { InputLabel } from '@material-ui/core';
// import AddBoxIcon from '@material-ui/icons/AddBox';

// import { DropdownButton, Dropdown, } from 'react-bootstrap';
import makeAnimated from 'react-select/animated';
// import { options } from 'pdfkit';

import Select from 'react-select'




// const useStyles = makeStyles((theme) => ({
//     container: {
//         display: 'flex',
//         flexWrap: 'wrap',
//     },
//     textField: {
//         marginLeft: theme.spacing(1),
//         marginRight: theme.spacing(1),
//         width: 200,
//     },
//     formControl: {
//         margin: theme.spacing(1),
//         minWidth: 120,
//         maxWidth: 300,
//     },
//     chips: {
//         display: 'flex',
//         flexWrap: 'wrap',
//     },
//     chip: {
//         margin: 2,
//     },
//     noLabel: {
//         marginTop: theme.spacing(3),
//     },
// }));





function AddTheme() {

    // const classes = useStyles();

    const [isLoading, setisLoading] = useState(true);
    const [formData, setFormData] = useState({ name: '', days: '', formers: [] });
    const [formers, setFormers] = useState([])
    // const [checked, setChecked] = React.useState([]);
    const [options, setoptions] = useState([]);




    useEffect(() => {
        setisLoading(true);
        getFormers();

    }, [])



    async function getFormers() {
        await axios.get(`https://cims-server.herokuapp.com/former`)
            .then(res => setFormers(res.data))
            .catch(error => alert(error));


        setisLoading(false);
        // console.log(formers);
    }

    async function handleSubmit(event) {
        event.preventDefault();


        await axios.post("https://cims-server.herokuapp.com/theme", formData)
            .then(res => alert('Your form submitted Successfully'))
            .catch(error => alert('An Error Found ====>' + error.message));


        console.log(formData);

    }




    function getOptions() {
        let selections = [];
        formers.map(former => { return selections.push({ value: former._id, label: `${former.name} ${former.lastName}` }) })


        // participants.map(participant => participant['theme'] === formData['theme'] ?
        //     // options.push(participant['name'])
        //     // setoptions(...options, { label: participant['name'], value: participant['name'] })
        //     selections.push({ label: `${participant['name']} ${participant['lastName']}`, value: participant['_id'] })
        //     : null)


        setoptions(selections);
        // return selections;
        console.log(options);

    }
    const handleChange = (value) => {

        console.log(` option  : ${value}`)
        setFormData({ ...formData, formers: value.map(val => val.value) });
        // value.map(val => console.log(` option selected : ${val.value}`))

    };



    if (isLoading) return <CircularProgress />

    return (

        < div >
            <Container style={{ marginTop: '33px', justifyItems: 'center' }}>

                <Form style={{ alignContent: 'center' }} onSubmit={handleSubmit} >

                    <FormGroup style={{ width: '50%' }}>
                        <Label for="name">Name</Label>
                        <Input type="name" name="name" id="name" placeholder="Enter Name"
                            onBlur={getOptions}
                            color='red    ' onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                    </FormGroup>

                    <FormGroup style={{ width: '50%' }}>
                        <Label for="days">Days</Label>
                        <Input type="number" name="days" id="days" placeholder="Enter days" onChange={e => setFormData({ ...formData, days: e.target.value })} />
                    </FormGroup>

                    {/* <List dense >

                        {formers.map((former) => {
                            const Id = former['_id'];
                            const index = formers.indexOf(former);
                            return (
                                <ListItem key={Id} button>

                                    <ListItemText id={Id} primary={` ${former['name']} ${former['lastName']}`} />
                                    <ListItemSecondaryAction>
                                        <Checkbox
                                            edge="end"
                                            onChange={handleToggle(former)}
                                            checked={formData['formers'].indexOf(former) !== -1}
                                            inputProps={{ 'aria-labelledby': Id }}
                                        />
                                    </ListItemSecondaryAction>
                                </ListItem>
                            );
                        })}


                    </List> */}


                    <InputLabel id="participants">Formers</InputLabel>
                    {/* {console.log(formers)} */}
                    <Select
                        id='participants'
                        closeMenuOnSelect={false}
                        components={makeAnimated()}
                        isMulti={true}
                        // value={formers.map(former => former.name)}
                        options={options}
                        onChange={handleChange}
                    />





                    <Button >Submit</Button>
                </Form>



            </Container>
        </div >
    )
}

export default AddTheme
