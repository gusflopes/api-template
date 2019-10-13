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
import { processAction } from '../_actions';
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

class AddProcess extends Component {
    handleChange = prop => event => {
        console.log(this.props);
        console.log(this.event);

        console.log('Prop param', prop)
        console.log('event param', event)
        
        const { dispatch } = this.props;
        dispatch(processAction.onChangeProps(prop, event));
    }
    handleDateChange = (prop) => {
        const event = {
            target: {
                value: moment(prop).format('DD/MM/YYYY')
            }
        }

        const { dispatch } = this.props;
        dispatch(processAction.onChangeProps('dueDate', event));
    };

    componentDidMount() {
        const { match : { params } } = this.props;
        if(params.id) {
            const { dispatch } = this.props;
            dispatch(processAction.getProcessById(params.id));
        }
    }
    handleClick(event){
        const { match : { params } } = this.props;
        const { dispatch } = this.props;
        console.log('Erro antes do payload');

        let payload={
            name: this.props.process.name,
            description: this.props.process.description,
            assignedTo: this.props.process.assignedTo,
            dueDate: moment(this.props.process.dueDate, "DD/MM/YYYY").toDate()
        }
        console.log("dueDate", payload);

        if(params.id){
            dispatch(processAction.editProcessInfo(params.id, payload));
        }else{
            dispatch(processAction.createProcess(payload));
        }
    }
    render() {
        const { classes } = this.props;
        const { match : { params } } = this.props;
        function InsertText(props) {
            return <Typography>{'Add New Process'}</Typography>;
        }

        function EditText(props) {
            return <Typography>{'Edit Process'}</Typography>;
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
                                       id="pasta"
                                       label="Pasta"
                                       className={classes.textField}
                                       value={this.props.process.name}
                                       onChange={this.handleChange('name')}
                                       margin="normal"
                                      />
                                   </Grid>
                                   <Grid item xs={3}>
                                      <TextField
                                       id="numeroProcesso"
                                       label="Número do Processo"
                                       className={classes.textField}
                                       value={this.props.process.description}
                                       onChange={this.handleChange('description')}
                                       margin="normal"
                                      />
                                   </Grid>
                                   <Grid item xs={3}>
                                      <TextField
                                       id="tipo"
                                       label="Tipo"
                                       className={classes.textField}
                                       value={this.props.process.assignedTo}
                                       onChange={this.handleChange('assignedTo')}
                                       margin="normal"
                                      />
                                   </Grid>
                                   <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                   <Grid item xs={3}>
                                      <KeyboardDatePicker
                                        id="propositura"
                                        label="Propositura"
                                        multiline
                                        rowsMax="4"
                                        format="dd/MM/yyyy"
                                        disablePast="true"
                                        className={classes.textField}
                                        inputValue={this.props.process.dueDate}
                                        value={this.props.process.dueDate}
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
                                            <Button variant="contained" color="secondary" className={classes.button} component='a' href="/process">Cancel</Button>
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
AddProcess.propTypes = {
    classes: PropTypes.object.isRequired,
};
const mapStateToProps = (state) =>{
    return state;
}

const connectedAddProcessPage = withRouter(connect(mapStateToProps, null, null, {
    pure: false
})(withStyles(styles)(AddProcess)));
export { connectedAddProcessPage as AddProcess };