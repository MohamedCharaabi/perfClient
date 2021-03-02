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



function AddFormer() {
    const [isLoading, setisLoading] = useState(true);
    const [formData, setFormData] = useState({ name: '', lastName: '', email: '' });



    useEffect(() => {
        // setisLoading(true);
        // getFormers();

    }, [])





    async function handleSubmit(event) {
        event.preventDefault();

        try {
            await axios.post("https://cims-server.herokuapp.com/former", formData);
            alert('Your form submitted Successfully');
        } catch (error) {
            alert('An Error Found ====>' + error.message);
        }


    }








    return (
        <div>
            <Container style={{ marginTop: '33px', justifyItems: 'center' }}>

                <Form className style={{ alignContent: 'center' }} onSubmit={handleSubmit} >

                    <FormGroup style={{ width: '50%' }}>
                        <Label for="name">Name</Label>
                        <Input type="name" name="name" id="name" placeholder="Enter Name" color='red' onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                    </FormGroup>

                    <FormGroup style={{ width: '50%' }}>
                        <Label for="days">Last Name</Label>
                        <Input type="name" name="days" id="days" placeholder="Enter days" onChange={e => setFormData({ ...formData, lastName: e.target.value })} />
                    </FormGroup>

                    <FormGroup style={{ width: '50%' }}>
                        <Label for="email">Email</Label>
                        <Input type="email" name="email" id="email" placeholder="Enter email" onChange={e => setFormData({ ...formData, email: e.target.value })} />
                    </FormGroup>




                    <Button >Submit</Button>
                </Form>



            </Container>
        </div>
    )
}

export default AddFormer
