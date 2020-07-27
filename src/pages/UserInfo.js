import React from 'react';
import {Link}from 'react-router-dom';

class UserInfo extends React.Component{

    state = {
        users: []
      }
    
      componentDidMount(){
        fetch('http://localhost/api/public/api/showById/'+this.props.location.state.id)
          .then(response =>  response.json())
          .then(resulById => this.setState({ users: resulById }));
      }
    
    render(){

        const {users} = this.state;

        return(

            <section className="uk-flex uk-flex-center">
            
                <div className= {    users.genero === "Masculino"                     
                                    ? "uk-card uk-card-blue uk-card-body uk-width-medium uk-animation-toggle"
                                    : users.genero === "Femenino" 
                                    ? "uk-card uk-card-pink uk-card-body uk-width-medium uk-animation-toggle"
                                    : "uk-card uk-card-yellow uk-card-body uk-width-medium uk-animation-toggle"
                                } >

                    <div className="uk-card-badge uk-label">{users.id}</div>

                    <div className="uk-card-media-left uk-cover-container uk-margin-auto uk-animation-scale-up">
                        <img src={users.foto} alt={users.name}/>
                    </div>

                    <p className="uk-h5">     

                        {
                                users.genero === "Masculino"
                                ? <i className="fa fa-male fa-lg" aria-hidden="true"></i>
                                : users.genero === "Femenino" 
                                ? <i className="fa fa-female fa-lg" aria-hidden="true"></i>
                                : <i className="fa fa-venus-mars fa-lg" aria-hidden="true"></i>
                        }   {users.name} {users.apellidop}
                        <br/>
                        <i className="fa fa-envelope-o" aria-hidden="true"></i> {users.email}
                        <br/>
                        <i className="fa fa-car" aria-hidden="true"></i> {users.marca} <i className="fa fa-cog fa-spin"></i> {users.año}

                    </p>

                    <div className="uk-card-footer uk-card-default uk-text-center uk-border-rounded">
                        <Link to="/ReportUsers">  
                            <span className="uk-icon-buttonz">
                                <i className="fa fa-undo fa-lg" aria-hidden="true"></i>
                            </span>
                        </Link>
                        <br/>
                        <strong>Go back</strong>
                    </div>
                    
                    
                </div>

            </section>
        )
    }
}

export default UserInfo;