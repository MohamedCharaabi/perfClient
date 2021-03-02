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
import { CircularProgress } from "@material-ui/core";
import axios from "axios";
import CheckboxListFormers from "components/others/FormersList";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Icon, IconButton, Paper } from '@material-ui/core';

import Draggable from 'react-draggable';
import AddBoxIcon from '@material-ui/icons/AddBox';

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Row,
    Col,
    Label,
} from "reactstrap";

const EditTheme = ({ props }) => {

    const [isLoading, setisLoading] = useState(true)
    let { id } = useParams();
    const [theme, setTheme] = useState();
    const [formData, setFormData] = useState({ name: '', days: '', formers: [] });
    const [checked, setChecked] = React.useState([1]);
    const [allFormers, setAllFormers] = useState([]);
    const [newFormers, setnewFormers] = useState([])


    useEffect(() => {
        setisLoading(true);
        getTheme();
    }, [])

    async function getTheme() {
        var result = await axios.get(`https://cims-server.herokuapp.com/theme/${id}`);
        var formers = await axios.get(`https://cims-server.herokuapp.com/former`);
        setTheme(result.data);
        setAllFormers(formers.data);
        setisLoading(false);
    }


    async function updateTheme() {

        try {
            var result = await axios.patch(`https://cims-server.herokuapp.com/theme/${id}`, formData);
            alert("Updated Successfully");
        } catch (error) {
            alert(`Error while updating former\n: ${error.message}`)
        }

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

        // setChecked(newChecked);
        setFormData({ ...formData, formers: newChecked });
    };

    const handleAddFormer = (value) => () => {
        let form = formData['formers'];

        const currentIndex = form.indexOf(value);
        // const newChecked = [...checked];
        const newChecked = [...form];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        // setChecked(newChecked);
        setnewFormers(...newFormers, newChecked);
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
        <>
            <Col lg="5" md="7" style={{ display: 'contents' }}>
                <Card className="bg-secondary shadow border-0">
                    <CardHeader className="bg-transparent pb-5">
                        <div className="text-muted text-center mt-2 mb-3">
                            <small>Edit Theme</small>
                        </div>
                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-5">

                        <Form role="form" onSubmit={updateTheme}>
                            <FormGroup className="mb-3">
                                <Label for='theme_name'>Name</Label>

                                <InputGroup className="input-group-alternative">

                                    <Input
                                        placeholder={theme['name']}
                                        type="name"
                                        id='theme_name'
                                        style={{ color: 'red' }}

                                    />
                                </InputGroup>
                            </FormGroup>

                            {/* DAYS */}

                            <FormGroup className="mb-3">
                                <Label for='theme_length'>Days</Label>
                                <InputGroup className="input-group-alternative">

                                    <Input
                                        placeholder={theme['days']}
                                        type="number"
                                        id='theme_length'
                                        style={{ color: 'red' }}
                                    />
                                </InputGroup>
                            </FormGroup>




                            {/* Former */}
                            {/* <CheckboxListFormers props={theme['formers']} /> */}

                            <List dense >

                                {theme['formers'].map((former) => {
                                    const Id = former['_id'];
                                    const index = theme['formers'].indexOf(former);
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




                                <Button
                                    variant="contained"
                                    color="primary"
                                    endIcon={<AddBoxIcon />}
                                    onClick={handleClickOpen}
                                >
                                    Add Formers
                                </Button>



                                <Dialog open={open}
                                    onClose={handleClose}
                                    PaperComponent={PaperComponent}
                                    aria-labelledby="draggable-dialog-title"
                                >
                                    <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                                        Formers
        </DialogTitle>
                                    <DialogContent>

                                        <List dense >

                                            {allFormers.map((value) => {
                                                const Id = value['id'];
                                                const index = allFormers.indexOf(value);
                                                return (
                                                    <ListItem key={value} button>
                                                        <ListItemText id={Id} primary={` ${value['name']} ${value['lastName']}`} />
                                                        <ListItemSecondaryAction>
                                                            <Checkbox
                                                                edge="end"
                                                                onChange={handleAddFormer(index)}
                                                                checked={newFormers.indexOf(index) !== -1}
                                                                inputProps={{ 'aria-labelledby': Id }}
                                                            />
                                                        </ListItemSecondaryAction>
                                                    </ListItem>
                                                );
                                            })}

                                        </List>


                                    </DialogContent>
                                    <DialogActions>
                                        <Button autoFocus onClick={handleClose} color="primary">
                                            Cancel
          </Button>
                                        <Button onClick={handleClose} color="primary">
                                            Confirm
          </Button>
                                    </DialogActions>
                                </Dialog>




                            </List>








                            <div className="text-center">
                                <Button className="my-4" color="primary" type="button">
                                    Update
                </Button>
                            </div>
                        </Form>
                    </CardBody>
                </Card>
            </Col>
        </>
    );
};

export default EditTheme;
