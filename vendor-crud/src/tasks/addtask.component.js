import React, { Component } from 'react';
import AppBar from '../_components/appbar';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Nav from '../_components/nav';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';

import { MuiPickersUtilsProvider,
    KeyboardDatePicker } from '@material-ui/pickers';

import { connect } from 'react-redux';
import { taskAction } from '../_actions';
import { withRouter } from 'react-router-dom';
const drawerWidth = 240;
const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    contentRoot: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
    appFrame: {
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%',
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
    },
    'appBar-left': {
        marginLeft: drawerWidth,
    },
    'appBar-right': {
        marginRight: drawerWidth,
    },
    drawerPaper: {
        position: 'relative',
        width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
    },
});

class AddTask extends Component {
    handleChange = prop => event => {
        console.log(this.props);
        console.log(this.event);

        console.log('Prop param', prop)
        console.log('event param', event)
        
        const { dispatch } = this.props;
        dispatch(taskAction.onChangeProps(prop, event));
    }
    handleDateChange = (prop) => {
        const event = {
            target: {
                value: moment(prop).format('DD/MM/YYYY')
            }
        }

        const { dispatch } = this.props;
        dispatch(taskAction.onChangeProps('dueDate', event));
    };

    componentDidMount() {
        const { match : { params } } = this.props;
        if(params.id) {
            const { dispatch } = this.props;
            dispatch(taskAction.getTaskById(params.id));
        }
    }
    handleClick(event){
        const { match : { params } } = this.props;
        const { dispatch } = this.props;
        console.log('Erro antes do payload');

        let payload={
            name: this.props.task.name,
            description: this.props.task.description,
            assignedTo: this.props.task.assignedTo,
            dueDate: moment(this.props.task.dueDate, "DD/MM/YYYY").toDate()
        }
        console.log("dueDate", payload);

        if(params.id){
            dispatch(taskAction.editTaskInfo(params.id, payload));
        }else{
            dispatch(taskAction.createTask(payload));
        }
    }
    render() {
        const { classes } = this.props;
        const { match : { params } } = this.props;
        function InsertText(props) {
            return <Typography>{'Add New Task'}</Typography>;
        }

        function EditText(props) {
            return <Typography>{'Edit Task'}</Typography>;
        }
        function SegHeader() {
            if(params.id){
                return <EditText />;
            }
            return <InsertText />;
        }
        return (
            <div className={classes.root}>
               <div className={classes.appFrame}>
                  <AppBar/>
                  <Nav />
                  <main className={classes.content}>
                      <div className={classes.toolbar} />
                      <Grid container spacing={24}>
                         <Grid item xs={3}>
                            <SegHeader />
                         </Grid>
                         <Grid item xs={6}>
                         </Grid>
                         <Grid item xs={3} container justify="flex-end">
                         </Grid>
                     </Grid>
                     <br /><br />
                     <Grid container spacing={24}>
                        <Grid item xs={12}>
                        <div>
                          <Paper className={classes.contentRoot} elevation={1}>
                             <form className={classes.container}>
                                <Grid container spacing={24}>
                                   <Grid item xs={3}>
                                      <TextField
                                       id="name"
                                       label="Name"
                                       className={classes.textField}
                                       value={this.props.task.name}
                                       onChange={this.handleChange('name')}
                                       margin="normal"
                                      />
                                   </Grid>
                                   <Grid item xs={3}>
                                      <TextField
                                       id="description"
                                       label="Description"
                                       className={classes.textField}
                                       value={this.props.task.description}
                                       onChange={this.handleChange('description')}
                                       margin="normal"
                                      />
                                   </Grid>
                                   <Grid item xs={3}>
                                      <TextField
                                       id="assignedTo"
                                       label="assignedTo"
                                       className={classes.textField}
                                       value={this.props.task.assignedTo}
                                       onChange={this.handleChange('assignedTo')}
                                       margin="normal"
                                      />
                                   </Grid>
                                   <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                   <Grid item xs={3}>
                                      <KeyboardDatePicker
                                        id="dueDate"
                                        label="dueDate"
                                        multiline
                                        rowsMax="4"
                                        format="dd/MM/yyyy"
                                        disablePast="true"
                                        className={classes.textField}
                                        inputValue={this.props.task.dueDate}
                                        value={this.props.task.dueDate}
                                        onChange={this.handleDateChange}
                                        margin="normal"
                                        KeyboardButtonProps={{'aria-label': 'change date'}}
                                      />
                                   </Grid>
                                   </MuiPickersUtilsProvider>
                                </Grid>
                                <br />
                                <Grid container spacing={24}>
                                   <Grid item xs={3}>
                                   </Grid>
                                   <Grid item xs={6}>
                                   </Grid>
                                   <Grid item xs={3} container justify="center">
                                      <Grid container spacing={24}>
                                         <Grid item xs={6} container justify="center">
                                            <Button variant="contained" color="secondary" className={classes.button} component='a' href="/task">Cancel</Button>
                                         </Grid>
                                         <Grid item xs={6} container justify="flex-start">
                                            <Button variant="contained" color="primary" className={classes.button} onClick={(event) => this.handleClick(event)}>Save</Button>
                                         </Grid>
                                      </Grid>
                                   </Grid>
                                </Grid>
                             </form>
                           </Paper>
                         </div>
                       </Grid>
                     </Grid>
                  </main>
                </div>
              </div>
        );
    }
}
AddTask.propTypes = {
    classes: PropTypes.object.isRequired,
};
const mapStateToProps = (state) =>{
    return state;
}

const connectedAddTaskPage = withRouter(connect(mapStateToProps, null, null, {
    pure: false
})(withStyles(styles)(AddTask)));
export { connectedAddTaskPage as AddTask };