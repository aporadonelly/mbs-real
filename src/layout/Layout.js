/**
 * @Name Layout
 * @Description Sets the default layout of the web page
 * @Props { children } from RenderPage that gets the matched routed page
 * @Returns Layout Component
 * @Author RJ
 * @UpdatedBy RJ
 */
import React from 'react';
import MainNavbar from './MainNavbar';

const Layout = ({ children }) => (
    <div data-test="layout_component" style={{ margin: '4rem 1rem' }}>
        <MainNavbar content={children} />
    </div>
);

export default Layout;
