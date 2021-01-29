import React from 'react';

import {
    Navbar,
    Nav,
} from 'react-bootstrap'

export const AppNavbar = ({handleLogout, isLogin}) => {
    return (

        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
            <Navbar.Brand href="#/">Gaming</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    {isLogin ? <>
                        <Nav.Link href="#/game">Play</Nav.Link>
                        <Nav.Link href="#/standings">Standings</Nav.Link>
                        <Nav.Link href="#/movie">Movie</Nav.Link>
                        {/*<Nav.Link href="#/mymovie">My Movie </Nav.Link>*/}
                    </> : <></>}
                </Nav>
                <Nav>
                    {!isLogin ? <>
                        <Nav.Link href="#/login">Log In</Nav.Link>
                        <Nav.Link href="#/register">Sign Up</Nav.Link>
                    </> : <>
                        <Nav.Link href="#/logout" onClick={handleLogout}>Log Out</Nav.Link>
                    </>}
                </Nav>
            </Navbar.Collapse>
        </Navbar>

    );
};

