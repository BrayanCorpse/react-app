import React from 'react';
import {Link}from 'react-router-dom';

class DeleteUser extends React.Component{

    
    state = {
        users: []
      }
    
      componentDidMount(){
        fetch('https://brayanmanzano.site/vital/public/api/showById/'+this.props.location.state.id)
          .then(response =>  response.json())
          .then(resulById => this.setState({ users: resulById }))

        fetch('https://brayanmanzano.site/vital/public/api/forceDelete/'+this.props.location.state.id, {method:'delete'}); 

      }

    render(){

        const {users} = this.state;

        return(

            <section className="uk-flex uk-flex-center">


                <div className="uk-alert-danger uk-card-body">
 
                    <p>   
                      <strong>El usuario:</strong> {users.id}, {users.name} {users.apellidop} ha sido "Eliminado exitosamente"  <Link to="/ReportUsers">  
                                                    <span className="uk-icon-button icon-x">
                                                        <i className="fa fa-times fa-lg" aria-hidden="true"></i>
                                                    </span>
                                                </Link>

                    </p>

                </div>

            </section>

        )
    }
}

export default DeleteUser;