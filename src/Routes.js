import React, {Fragment} from 'react';
import {Route, Redirect} from 'react-router-dom';
import ProtectedRoute from "./components/ProtectedRoute";

import {HomeView} from './view/HomeView';
import {ResultView} from './view/ResultView';

export default function Routes() {  
    return (
        <Fragment>
            <Redirect from='/' to='/home' /> 
            <Route exac path="/home" component={HomeView} />
            <ProtectedRoute exact path="/result" component={ResultView} /> 
        </Fragment>
    )
}
