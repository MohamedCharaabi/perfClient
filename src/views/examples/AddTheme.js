import { CircularProgress } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input, FormText, Container, Row, CustomInput } from 'reactstrap'
import CheckboxListFormers from 'components/others/FormersList';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Icon, IconButton, Paper } from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Draggable from 'react-draggable';



function AddTheme() {
    const [isLoading, setisLoading] = useState(true);
    const [formData, setFormData] = useState({ name: '', days: '', formers: [] });
    const [formers, setFormers] = useState([{ id: '', name: '', lastName: '', email: '' }])
    const [checked, setChecked] = React.useState([]);



    useEffect(() => {
        setisLoading(true);
        getFormers();

    }, [])



    async function getFormers() {
        var result = await axios.get(`https://cims-server.herokuapp.com/former`);
        setFormers(result.data);
        setisLoading(false);
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            await axios.post("https://cims-server.herokuapp.com/theme", formData);
            alert('Your form submitted Successfully');
        } catch (error) {
            alert('An Error Found ====>' + error.message);
        }

        // console.log(formData);

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


    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function PaperComponent(props) {
        return (
            <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
                <Paper {...props} />
            </Draggable>
        );
    }






    if (isLoading) return <CircularProgress />

    return (
        <div>
            <Container style={{ marginTop: '33px', justifyItems: 'center' }}>

                <Form style={{ alignContent: 'center' }} onSubmit={handleSubmit} >

                    <FormGroup style={{ width: '50%' }}>
                        <Label for="name">Name</Label>
                        <Input type="name" name="name" id="name" placeholder="Enter Name" color='red    ' onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                    </FormGroup>

                    <FormGroup style={{ width: '50%' }}>
                        <Label for="days">Days</Label>
                        <Input type="number" name="days" id="days" placeholder="Enter days" onChange={e => setFormData({ ...formData, days: e.target.value })} />
                    </FormGroup>

                    <List dense >

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


                    </List>


                    <Button >Submit</Button>
                </Form>



            </Container>
        </div>
    )
}

export default AddTheme
