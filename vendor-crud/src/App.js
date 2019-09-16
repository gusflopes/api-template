import React, { Component } from 'react';
import './App.css';
import { Router, Switch, Route} from 'react-router-dom';
import { Login } from './login';
import { Home } from './home';
import { Vendor } from './vendors/vendor.component';
import { AddVendor } from './vendors/addvendor.component';
import { Task } from './tasks/task.componenet';
import {AddTask} from './tasks/addtask.component';
import { history } from './_helpers';
import { PrivateRoute } from './_components';

class App extends Component {
    render() {
       return (
           <div className="App">
               <Router history={history}>
                 <div>
                     <Switch>
                        <PrivateRoute exact path='/home' component={Home} />
                        <PrivateRoute exact path='/vendor' component={Vendor} />
                        <PrivateRoute exact path='/add-vendor' component={AddVendor} />
                        <PrivateRoute exact path='/edit-vendor/:id' component={AddVendor} />
                        <PrivateRoute exact path='/task' component={Task} />
                        <PrivateRoute exact path='/add-task' component={AddTask} />
                        <PrivateRoute exact path='/edit-task/:id' component={AddTask} />
                        
                        <Route exact path='/' component={Login} />
                        {/* Caso digite um path não mapeado, retorna ao Login ou Home*/}
                        <Route component={Login} />
                     </Switch>
                 </div>
               </Router>
           </div>
        );
     }
}
export default App;