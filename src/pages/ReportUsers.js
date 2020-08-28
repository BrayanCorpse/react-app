import React from 'react';
import Pagination from "react-pagination-list";
import {Link} from 'react-router-dom';


class ReportUsers extends React.Component {
    state = {
      users: []
    };
  
    componentDidMount(){
      fetch('https://brayanmanzano.site/vital/public/api/showRelations')
        .then(response =>  response.json())
        .then(resultado => this.setState({ users: resultado }))
    }

    render() {
      const { users } = this.state;
      return (
  
      
  
        <div className="uk-flex uk-flex-center">

            {users.length > 0 ?
 
                <div className="uk-overflow-auto" >

                <Link to="/Validaciones">       

                    <i className="fa fa-plus-circle fa-4x" aria-hidden="true"></i>

                </Link>
            
                <Pagination 
                        data={users} 
                        pageSize={2} 
                        renderItem={(user, i) => 
                
                    <table className="uk-table uk-table-middle uk-table-hover uk-table-divider" key={i}>

              
                        <thead>
                            <tr>
                                <th className="uk-table-shrink">
                                    <i className="fa fa-slack" aria-hidden="true"></i>
                                </th>
                                <th className="uk-table-shrink uk-text-center">
                                    <i className="fa fa-picture-o" aria-hidden="true"></i>
                                </th>
                                <th className="uk-table-shrink">
                                    <i className="fa fa-code" aria-hidden="true"></i>
                                </th>
                                <th className="uk-table-shrink uk-text-center">
                                    <i className="fa fa-id-badge" aria-hidden="true"></i>
                                </th>
                                <th className="uk-table-shrink uk-text-center">
                                    <i className="fa fa-id-card-o" aria-hidden="true"></i>
                                </th>
                                <th className="uk-table-shrink uk-text-center">
                                    <i className="fa fa-venus-mars" aria-hidden="true"></i>
                                </th>
                                <th className="uk-table-shrink uk-text-center">
                                    <i className="fa fa-envelope-o" aria-hidden="true"></i>
                                </th>
                                <th className="uk-table-shrink">
                                    <i className="fa fa-car" aria-hidden="true"></i>
                                </th>
                                <th className="uk-table-shrink uk-text-center">
                                    <i className="fa fa-cog fa-spin fa-lg fa-fw"></i>
                                </th>
                                <th className="uk-table-shrink uk-text-center">
                                    Info
                                </th>
                                <th className="uk-table-shrink uk-text-center">
                                    Delete
                                </th>
                                <th className="uk-table-shrink uk-text-center">
                                    Update
                                </th>
                            </tr>
                        </thead>

              
                        <tbody>

                            <tr>
                                <td className="uk-text-nowrap uk-text-bold">{i + 1}</td>
                                <td>
                                    <img className="uk-preserve-width uk-border-circle" src={user.foto} width="50" alt="Avatar"/>
                                </td>
                                <td className="uk-text-nowrap">{user.id}</td>
                                <td className="uk-text-nowrap">{user.name}</td>
                                <td className="uk-text-nowrap">{user.apellidop}</td>
                                <td className="uk-text-nowrap">
                                    {
                                        user.genero === "Masculino"
                                        ? <i className="fa fa-male fa-3x" aria-hidden="true"></i>
                                        : user.genero === "Femenino" 
                                        ? <i className="fa fa-female fa-3x" aria-hidden="true"></i>
                                        : <i className="fa fa-venus-mars fa-3x" aria-hidden="true"></i>
                                    }
                                    
                                </td>
                                <td className="uk-text-nowrap">{user.email}</td>
                                <td className="uk-text-nowrap">{user.marca}</td>
                                <td className="uk-text-nowrap">{user.año}</td>
                                <td className="uk-text-nowrap">
                                    <Link to={{pathname: "/UserInfo", state: { id: user.id }}}>   
                                        <span className="uk-icon-button icon-search" >
                                            <i className="fa fa-search" aria-hidden="true"></i>
                                        </span>
                                    </Link>    
                                </td>
                                <td className="uk-text-nowrap">
                                    <Link to={{pathname:"/DeleteUser", state: { id: user.id}}}>  
                                        <span className="uk-icon-button icon-trash">
                                            <i className="fa fa-trash fa-lg" aria-hidden="true"></i>
                                        </span>
                                    </Link>
                                </td>
                                <td className="uk-text-nowrap">
                                    <Link to={{pathname:"/UpdateUser", state: { id: user.id}}}>  
                                        <span className="uk-icon-button icon-pencil">
                                            <i className="fa fa-pencil fa-lg" aria-hidden="true"></i>
                                        </span>
                                    </Link>
                                </td>
        
                            </tr>
                          
                        </tbody>
                  
                    </table>
                      }/>
               
                </div>

                :
                <span className="uk-margin-small-right" uk-spinner="ratio: 3"></span> 
            }
       
        </div>
       
  
      )
    }
  }

  export default ReportUsers;