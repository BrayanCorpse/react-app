import React from 'react';
import { BrowserRouter as Router,
         Route, Switch,Link
        }from 'react-router-dom';
import Biografia from '../componentes/Biografia';
import Reportes from '../pages/Reportes';
import Error from '../pages/Error';
import Pagos from '../pages/Pagos';
// import Formulario from '../pages/Formulario';
import Validaciones from '../pages/Validaciones'
import ReportUsers from '../pages/ReportUsers';
import UserInfo from '../pages/UserInfo';
import DeleteUser from '../pages/DeleteUser';

function Hosting(){

    return(

            <Router>

            <div>

                <nav className="uk-navbar-container uk-margin">
                        <div className="uk-navbar-left">

                            <Link to="/" className="uk-navbar-item uk-logo">
                                <span className="uk-icon uk-margin-small-right" uk-icon="icon: home"></span>
                                Home
                            </Link>

                            <ul className="uk-navbar-nav">
                                <li>
                                    <Link to="/Reportes">
                                        <span className="uk-icon uk-margin-small-right" uk-icon="icon: cart"></span>
                                        Planes Hosting
                                    </Link>
                                </li>
                            </ul>

                            {/* <ul className="uk-navbar-nav">
                                <li>
                                    <Link to="/Formulario">
                                        <span className="uk-icon uk-margin-small-right" uk-icon="icon: credit-card"></span>
                                        Formulario
                                    </Link>
                                </li>
                            </ul> */}

                            <ul className="uk-navbar-nav">
                                <li>
                                    <Link to="/Resumen">
                                        <span className="uk-icon uk-margin-small-right" uk-icon="icon:list"></span>
                                        Resumen
                                    </Link>
                                </li>
                            </ul>

                            <ul className="uk-navbar-nav">
                                <li>
                                    <Link to="/Validaciones">
                                        <span className="uk-icon uk-margin-small-right" uk-icon="icon:user"></span>
                                        Registro
                                    </Link>
                                </li>
                            </ul>

                            <ul className="uk-navbar-nav">
                                <li>
                                    <Link to="/ReportUsers">
                                        <span className="uk-icon uk-margin-small-right" uk-icon="file-text"></span>
                                        Reporte de Usuarios
                                    </Link>
                                </li>
                            </ul>


                           

                            

                        </div>
                </nav>

                    <Switch>

                        <Route exact path="/" component={Biografia} />

                        
                        <Route exact path="/Reportes" component={Reportes} />
                     
                        {/* <Route exact path="/Formulario">
                            <Formulario/>
                        </Route> */}

                        <Route exact path="/Resumen" component={Pagos} />
  
                        <Route exact path="/Validaciones" component={Validaciones} />

                        <Route exact path="/ReportUsers" component={ReportUsers} />

                        <Route exact path="/UserInfo" component={UserInfo}>
                        </Route>

                        <Route exact path="/DeleteUser" component={DeleteUser}>
                        </Route>

                        <Route  path="*" component={Error} />

                    </Switch>

            </div>

            </Router>


    )
}

export default Hosting;