/**
 * @Name RenderAuthPage
 * @Description Route for auth pages
 * @Props none
 * @Returns routes
 * @Author Frances
 * @UpdatedBy RJ
 */

import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Auth } from './RouteData';

const RenderAuthPage = () => (
    <Switch>
        {Auth.map(items => (
            <Route
                key={items.id}
                path={items.path}
                component={items.main}
                data-testid={`AuthPage_${items.label}`}
            />
        ))}
        <Redirect exact from="/" to="/login" />
    </Switch>
);

export default RenderAuthPage;
