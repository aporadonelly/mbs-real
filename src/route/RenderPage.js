/**
 * @Name RenderPage
 * @Description Gets the final Layout Design and Renders it to App
 * @Props none
 * @Returns The Default Layout of the Routed Page
 * @Author RJ
 * @UpdatedBy RJ
 */

import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Layout from '../layout/Layout';
import Users from '../pages/Users';
import { PageManager, Main, SubPages } from './RouteData';

const RenderPage = () => (
    <Layout data-testid="Page_Layout">
        <Switch>
            {SubPages.map(items => (
                <Route
                    key={items.id}
                    exact={items.exact}
                    path={items.path}
                    component={items.main}
                />
            ))}
            {Main.map(items => (
                <Route
                    key={items.id}
                    exact={items.exact}
                    path={items.path}
                    component={items.main}
                    data-testid={`MainPage-${items.sidebar}`}
                />
            ))}
            {PageManager.map(items => (
                <Route
                    key={items.id}
                    exact={items.exact}
                    path={items.path}
                    component={items.main}
                    data-testid={`PageManager_Page_${items.sidebar}`}
                />
            ))}
            <Route data-testid="ManagePage-Users" path="/users" component={() => <Users />} />
            <Redirect from="/login" to="/" />
        </Switch>
    </Layout>
);

export default RenderPage;
