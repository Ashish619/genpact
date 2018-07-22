
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

// Store
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./config/store";

// Routing
import createHistory from "history/createBrowserHistory";
import { Route, Switch } from "react-router";
import { ConnectedRouter } from "react-router-redux";

// Global container components
import Employee from "containers/Employee";

import "assets/styles/index.scss";
import { initializeIcons } from '@uifabric/icons';

// Register icons and pull the fonts from the default SharePoint cdn:
initializeIcons();

const history = createHistory();

const employee = document.getElementById("employee");
employee && ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <ConnectedRouter history={history}>
                <Switch>
                    <Route path='/' component={Employee} />
                </Switch>
            </ConnectedRouter>
        </PersistGate>
    </Provider>, employee
);

