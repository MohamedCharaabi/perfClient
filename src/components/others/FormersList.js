import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Icon, IconButton, Paper } from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import axios from "axios";
import Draggable from 'react-draggable';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function CheckboxListFormers({ props }) {

    const useStyles = makeStyles((theme) => ({
        button: {
            margin: theme.spacing(1),
        },
    }));

    const classes = useStyles();
    const [checked, setChecked] = React.useState([1]);
    const [formers, setFormers] = useState([]);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    useEffect(() => {
        fetchFormers();
    }, [])
    async function fetchFormers() {
        var result = await axios.get(`https://cims-server.herokuapp.com/former`);
        setFormers(result.data);

    }

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




    return (
        <List dense className={classes.root}>

            {props.map((former) => {
                const Id = former['id'];
                const index = props.indexOf(former);
                return (
                    <ListItem key={former} button>

                        <ListItemText id={Id} primary={` ${former['name']} `} />
                        <ListItemSecondaryAction>
                            <Checkbox
                                edge="end"
                                onChange={handleToggle(index)}
                                checked={checked.indexOf(index) !== -1}
                                inputProps={{ 'aria-labelledby': Id }}
                            />
                        </ListItemSecondaryAction>
                    </ListItem>
                );
            })}

            <Button
                variant="contained"
                color="primary"
                className={classes.button}
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

                    <List dense className={classes.root}>

                        {formers.map((value) => {
                            const Id = value['id'];
                            const index = formers.indexOf(value);
                            return (
                                <ListItem key={value} button>
                                    {/* <ListItemAvatar>
                <Avatar
                    alt={`Avatar n°${value + 1}`}
                // src={`/static/images/avatar/${value + 1}.jpg`}
                />
            </ListItemAvatar> */}
                                    <ListItemText id={Id} primary={` ${value['name']}`} />
                                    <ListItemSecondaryAction>
                                        <Checkbox
                                            edge="end"
                                            onChange={handleToggle(index)}
                                            checked={checked.indexOf(index) !== -1}
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
    );
}
