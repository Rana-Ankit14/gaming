import React, {useEffect, useState} from 'react'
import './App.css';
import {Login} from "./components/Login";
import {Register} from "./components/Register";
import {Standings} from "./components/Standings";
import {Game} from "./components/Game";
import {Home} from "./components/Home";
import {PrivateRoute} from "./components/PrivateRoute";
import {AppNavbar} from "./components/AppNavbar";
import {NotFound} from "./components/NotFound";
import {Movie} from "./components/Movie";
import {
    HashRouter as Router,
    Route,
    Switch
} from "react-router-dom";
const apis = require('./apis/apis')


function App() {
    const [isLogin, setIsLogin] = useState(false);
    useEffect(()=>{
        // setIsLogin(false);
        const fetchData = async () =>{
            try {
                const data = await apis.postApiCall('/token/validate', {});
                if (data.Validate) {
                    // console.log('validated')
                    setIsLogin(true);
                }
            }catch (err){
                if (err === 'Unauthorized' || err === 'Forbidden'){
                    localStorage.removeItem('user');
                    // console.log(err)
                }
                setIsLogin(false)
                // console.log({err})
            }
        }

        fetchData();
    },[])

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('user');
        setIsLogin(false);
        // console.log('logout')
    };
    return (
        <div className="App container-fluid p-0" >

            <Router>

                    <AppNavbar handleLogout = {handleLogout} isLogin={isLogin}/>

                <Switch>
                    <Route path="/:path(home||/)" exact component={Home}/>
                    <Route path="/login" render={(props) => <Login {...props} setIsLogin={setIsLogin} isLogin={isLogin}/>}/>
                    <Route path="/register" render={(props) => <Register {...props} isLogin={isLogin}/>}/>
                    <PrivateRoute path="/standings" component={Standings} isLogin={isLogin} setIsLogin={setIsLogin}/>
                    <PrivateRoute path="/game" component={Game} isLogin={isLogin} setIsLogin={setIsLogin}/>
                    <PrivateRoute path="/movie" component={Movie} isLogin={isLogin} setIsLogin={setIsLogin}/>
                    <PrivateRoute path="/game" component={Game} isLogin={isLogin} setIsLogin={setIsLogin}/>
                    <Route component={NotFound}/>
                </Switch>
            </Router>
        </div>
    );
}

export default App;

// <PrivateRoute path="/standings" component={Standings}/>
// <PrivateRoute path="/game" component={Game}/>
// <Route path="/register" render={(props) => <Register {...props} setIsLogin={setIsLogin} />}/>
// <Route path="/register" component={() => <Register title={`Props through component`} />}/>
// <Link to="/" className="col-12 col-sm-2 col-md-1">Home</Link>
// {!isLogin ? <>
//     <Link to="/login" className="col-12 col-sm-2 col-md-1">Login</Link>
//     <Link to="/register" className="col-12 col-sm-2 col-md-1">Register</Link>
// </> : <>
//     <Link to="/game" className="col-12 col-sm-2 col-md-1">Game</Link>
//     <Link to="/standings" className="col-12 col-sm-2  col-md-1">Standings</Link>
//     <Link to="/" onClick={handleLogout} className="col-12 col-sm-2 col-md-1">Logout</Link>
// </>}
