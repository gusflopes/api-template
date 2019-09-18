import { connect } from 'react-redux';
import { processAction } from '../_actions';
import React, { Component } from 'react';
import AppBar from '../_components/appbar';
import Nav from '../_components/nav';
import PropTypes from 'prop-types';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import IconButton from '@material-ui/core/IconButton';
const drawerWidth = 240;
const styles = theme => ({
    root: {
        flexGrow: 1,
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
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
});
class Process extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(processAction.getProcess());
    }
    componentDidUpdate() {
        // Delete this later
        console.log(this.props.process);
    }

    handleChange = event => {
        this.setState({
            anchor: event.target.value,
        });
    };
    handleDoneClick = (event, id) => {
        const { dispatch } = this.props;
        dispatch(processAction.deleteProcessById(id))
    };

    handleDeleteClick = (event, id) => {
        const { dispatch } = this.props;
        dispatch(processAction.deleteProcessById(id))
    };
    render() {
        const { classes } = this.props;
        const { process } = this.props.process;
        return (
            <div className={classes.root}>
              <div className={classes.appFrame}>
                <AppBar/>
                <Nav />
                <main className={classes.content}>
                   <div className={classes.toolbar} />
                   <Grid container spacing={24}>
                      <Grid item xs={3}>
                         <Typography >{'PROCESSOS'}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                      </Grid>
                      <Grid item xs={3} container justify="flex-end">
                          <Button variant="contained" color="primary" 
                          className={classes.button} component='a' href="/add-process"
                          >Adicionar</Button>
                      </Grid>
                   </Grid>
                   <br />
                   <Grid container spacing={24}>
                     <Paper className={classes.root}>
                       <Table className={classes.table}>
                          <TableHead>
                             <TableRow >
                                <TableCell >Pasta</TableCell>
                                <TableCell >Cliente</TableCell>
                                <TableCell >Telefone</TableCell>
                                <TableCell >Processo</TableCell>
                                <TableCell >Tipo de Ação</TableCell>
                                <TableCell >Status</TableCell>

                                <TableCell>Editar</TableCell>
                             </TableRow>
                          </TableHead>
                          <TableBody>
                           {process.map(n => {
                              return (
                                  <TableRow key={n._id}>
                                    <TableCell component="th" scope="row">
                                      {n.name}
                                    </TableCell>
                                    <TableCell >{n.description}</TableCell>
                                    <TableCell >{n.assignedTo}</TableCell>
                                    <TableCell >123456-78.2019.8.12.0001</TableCell>
                                    <TableCell >Previdenciária</TableCell>
                                    <TableCell >Ativa</TableCell>
                                    <TableCell >
                                        <IconButton className={classes.button} aria-label="Cliente" onClick={(event) => this.handleDoneClick(event, n._id)}>
                                           <CheckCircleIcon /> 
                                        </IconButton>
                                        <IconButton className={classes.button} aria-label="Processo" component='a' href={`/edit-process/${n._id}`}>
                                           <EditIcon />
                                        </IconButton>
                                        {/* <IconButton className={classes.button} aria-label="Delete" onClick={(event) => this.handleDeleteClick(event, n._id)}>
                                           <DeleteIcon /> 
                                        </IconButton> */}
                                    </TableCell>
                                 </TableRow>
                             );
                           })}
                        </TableBody>
                     </Table>
                  </Paper>
              </Grid>
           </main>
       </div>
     </div>
   );
  }
}
Process.propTypes = {
     classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) =>{
    return {
       process : state.process
    };
}
const connectedProcessPage = withRouter(connect(mapStateToProps, null, null, {
    pure: false
})(withStyles(styles)(Process)));
export { connectedProcessPage as Process };