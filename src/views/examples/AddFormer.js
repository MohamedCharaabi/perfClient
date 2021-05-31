import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input, Container, Card, CardHeader, CardTitle, CardBody } from 'reactstrap'

import FileBase from 'react-file-base64';


function AddFormer() {
    const [isLoading, setisLoading] = useState(true);
    const [formData, setFormData] = useState({ name: '', lastName: '', email: '', image: '' });



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
                <Card className="card-register" >
                    <CardHeader className='ajoutCard'>
                        <CardTitle tag="h2" className='cardTitle'>Ajout Formmateur</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Form className='centerForm' onSubmit={handleSubmit} >

                            <FormGroup style={{ width: '50%' }}>
                                <Label for="name">Nom</Label>
                                <Input type="name" name="name" id="name" placeholder="Enter Name" color='red' onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                            </FormGroup>

                            <FormGroup style={{ width: '50%' }}>
                                <Label for="days">Prenom</Label>
                                <Input type="name" name="days" id="days" placeholder="Enter days" onChange={e => setFormData({ ...formData, lastName: e.target.value })} />
                            </FormGroup>

                            <FormGroup style={{ width: '50%' }}>
                                <Label for="email">Email</Label>
                                <Input type="email" name="email" id="email" placeholder="Enter email" onChange={e => setFormData({ ...formData, email: e.target.value })} />
                            </FormGroup>
                            <FormGroup style={{ width: '50%' }}>

                                <Label for="image">Image Profile</Label>
                                <div id='image'><FileBase type="file" multiple={false} onDone={({ base64 }) => setFormData({ ...formData, image: base64 })} /></div>

                            </FormGroup>


                            <Button >Submit</Button>
                        </Form>
                    </CardBody>

                </Card>


            </Container>
        </div>
    )
}

export default AddFormer
