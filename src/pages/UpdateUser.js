import React from 'react';
import {Link} from 'react-router-dom'

const textoRegex = RegExp(/^[a-zA-Z, ,ÑñÁáÉéÍíÓóÚúÜü]+$/)

const telefonoRegex = RegExp(/^[0-9]{3}[-. ][0-9]{3}[-. ][0-9]{4}$/)

const emailRegex = RegExp(/^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/)

const passwordsRegex = RegExp(/^(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ]/)

const generoRegex = RegExp(/^[A-ZÑñÁÉÍÓÚÜ]{1}[a-záéíóúü]+$/)

const placaRegex = RegExp(/^[A-Z]{3}[- ][0-9]{3}$/)

const formValid = ({errores,...rest}) =>{
    let valid = true;
    Object.values(errores).forEach(val=>{val.length>0 && (valid=false);
    })
    Object.values(rest).forEach(val=>{val===null && (valid=false);
    })
    return valid;
}

class UpdateUser extends React.Component{
    

    state={

        marcas:[],
        modelos:[],

        users:{
            id:null,
            foto:null,
            name:null,
            apellidop:null,
            apellidom:null,
            genero:null,
            telefono:null,
            email:null,
            password:null,
            marca:null,
            marca_id:null,
            modelo:null,
            modelo_id:null,
            placa:null,
            comentario:null,

        },

        isExact:true,
        status:"",

        errores:{
            name:"",
            apellidop:"",
            apellidom:"",
            genero:"",
            telefono:"",
            email:"",
            password:"",
            placa:"",
            comentario:"",



        }

    }

 async componentDidMount(){
        fetch('https://brayanmanzano.site/vital/public/api/showById/'+this.props.location.state.id)
          .then(response =>  response.json())
          .then(resulById => this.setState({ users: resulById, isExact:false }));

        fetch('https://brayanmanzano.site/vital/public/api/showMarks')
          .then(response =>  response.json())
          .then(Marks => this.setState({ marcas: Marks }));

        fetch('https://brayanmanzano.site/vital/public/api/showModels')
          .then(response =>  response.json())
          .then(Models => this.setState({ modelos: Models }));
      }


    handleChange = async e =>{

        const{name,value} = e.target   
        let errores = {...this.state.errores}
      
        switch(name){
            case "name":
                errores.name = textoRegex.test(value)
                ?""
                :"Favor de ingresar solo letras!";
            break; 

            case "apellidop":
                errores.apellidop = textoRegex.test(value)
                ?""
                :"Ingresar solo letras!";
            break; 

            case "apellidom":
                errores.apellidom = textoRegex.test(value)
                ?""
                :"Ingresar solo letras!";
            break;
            
            case "telefono":
                errores.telefono = telefonoRegex.test(value)
                ?""
                :"Ingresar solo numeros!";
            break;

            case "email":
                errores.email = emailRegex.test(value)
                ?""
                :"Ingresar un correo válido!";
            break;

            case "password":
                errores.password = passwordsRegex.test(value) 
                ?""
                :"Password must be for example: 'Uikit$666'";
            break;


            case "placa":
                errores.placa = placaRegex.test(value)
                ?""
                :"Ingresar placa por ejemplo: MGO-103";
            break;


            case "genero":
                errores.genero = generoRegex.test(value)
                ?""
                :"Ingresa solo letras iniciando con una Mayúscula";
            break;

            case "comentario":
                errores.comentario = value.length >123
                ?"Maximo 123 caracteres"
                :"";
            break;
            
            default:    
            break;   

            
        }


        this.setState({errores,[name]:value})
       

        e.persist();
        await this.setState({
            users:{
                ...this.state.users,
                [e.target.name]:e.target.value
            }
            
        });
    } 

    notSubmit=e=>{

        e.preventDefault();
    }

    handelSubmit=e=>{

        e.preventDefault();
        
        if(formValid(this.state))
        {
            let data={
                usuario_id:this.state.users.id,
                foto:this.state.users.foto,
                name:this.state.users.name,
                apellidop:this.state.users.apellidop,
                apellidom:this.state.users.apellidom,
                genero:this.state.users.genero,
                telefono:this.state.users.telefono,
                email:this.state.users.email,
                password:this.state.users.password,
                placa:this.state.users.placa,
                comentario:this.state.users.comentario,
                marca_id:this.state.users.marca_id,
                modelo_id:this.state.users.modelo_id,
          

            };

            fetch("https://brayanmanzano.site/vital/public/api/updateShort", {
                method: 'PUT', // or 'PUT'
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                mode: "cors",
                body: JSON.stringify(data)
              })

              .then(res => res.json())
              .catch(error => console.error('Error:', error))
              .then(this.setState({status: "Modificación Exitosa"}));
            //   this.myFormRef.reset();
        }
        else
        {
            this.setState({status:"Favor de corregir la información del formulario"})
        }
    }


  

    render(){

        const {errores,marcas,modelos,users,isExact}= this.state

        if(isExact){

            return("No hay Conexión")
        }

        return(

            <div className="uk-flex uk-flex-center">

                <Link className=" uk-align-left" to="/ReportUsers">       

                    <i className="fa fa-chevron-circle-left fa-3x" aria-hidden="true"></i>

                </Link>


                <div>
               

                <form onSubmit={this.notSubmit}>

                    <div className="uk-card uk-card-default uk-width-large"> 
                        <div className="uk-card-header">
                            
                            <div className="uk-grid-small uk-flex-middle">

                        

                            <div className="uk-grid-small uk-grid uk-align-right">
                                {/* Avatares */}
                                    <label className="uk-form-label uk-text-bold">Choose your Avatar...</label>
                                    <br/>

                                    <li className="uk-button uk-button-link">
                                        <input  type="image" name="foto" src="img/vene.jpg" 
                                        width="40" height="40" alt="vene"
                                        value="img/vene.jpg"
                                        onClick={this.handleChange}/>
                                    </li>
                                    
                                    <li className="uk-button uk-button-link">
                                        <input className="input-image"  type="image" name="foto" src="img/github-1.svg" width="40" height="40" alt="Github" 
                                        value="img/github-1.svg"
                                        onClick={this.handleChange}/>
                                    </li>
                                    
                                    <li className="uk-button uk-button-link">
                                        <input  type="image" name="foto" src="img/gitlab.svg" width="40" height="40" alt="Gitlab"
                                        value="img/gitlab.svg"
                                        onClick={this.handleChange}/>
                                    </li>

                                    <br/>

                                    <li className="uk-button uk-button-link">
                                        <input  type="image" name="foto" src="img/python-5.svg" width="40" height="40" alt="Python"
                                        value="img/python-5.svg"
                                        onClick={this.handleChange}/>
                                    </li>

                                    <li className="uk-button uk-button-link">
                                        <input  type="image" name="foto" src="img/rex.png" width="40" height="40" alt="rex"
                                        value="img/rex.png"
                                        onClick={this.handleChange}/>
                                    </li>

                                    <li className="uk-button uk-button-link">
                                        <input  type="image" name="foto" src="img/go.png" width="40" height="40" alt="go"
                                        value="img/go.png"
                                        onClick={this.handleChange}/>
                                    </li>
                                {/* End avatares */}
                                </div>
                                {/* Profile */}
                                <div className="uk-width-auto">
                                    <img className="uk-border-circle" width="100" height="100" 
                                    src={users.foto} alt="new user"
                                    onClick={this.handleChange}/>
                                </div>
                               
                                {/* Title */}
                                <div className="uk-width-expand">
                                        <h3 className="uk-card-title uk-margin-remove-bottom">Registro</h3>
                                </div>
                                
                            </div>
                        </div>
                            <div className="uk-card-body">

                                <label className="uk-form-label uk-text-bold">Nombre</label>
                                <div className="">
                                    <div className="uk-form-controls uk-inline">
                                        <span className="uk-form-icon" uk-icon="icon: user"></span>
                                        <input 
                                        className={errores.name.length>0  
                                            ? "uk-input uk-form-width-large uk-form-danger"
                                            :"uk-input uk-form-width-large"}
                                        name="name" type="text"  
                                        value={users.name}
                                        onChange={this.handleChange}/>
                                    </div>
                                </div>

                              
                                <div className="uk-alert-danger uk-margin">
                                    <p>{errores.name}</p>
                                </div>
                              
                                

                                <div className="uk-column-1-2">

                                    <div className="">
                                        <label className="uk-form-label uk-text-bold">Apellido paterno</label>
                                        <input  
                                        className={
                                            errores.apellidop.length>0  
                                            ? "uk-input uk-form-width-large uk-form-danger"
                                            :"uk-input uk-form-width-large"}
                                         type="text" name="apellidop"
                                         value={users.apellidop}
                                         onChange={this.handleChange}/>
                                    </div>

                                    <div className="uk-alert-danger uk-margin">
                                        <p>{errores.apellidop}</p>
                                    </div>

                                    <div className="">
                                        <label className="uk-form-label uk-text-bold">Apellido materno</label>
                                        <input className={errores.apellidom.length>0  
                                        ? "uk-input uk-form-width-large uk-form-danger"
                                        :"uk-input uk-form-width-large"}
                                        type="text" name="apellidom"
                                        value={users.apellidom}
                                        onChange={this.handleChange}/>
                                    </div>

                                    <div className="uk-alert-danger uk-margin">
                                        <p>{errores.apellidom}</p>
                                    </div>

                                </div>

                                
                                <div className="uk-margin uk-grid-small uk-child-width-auto uk-grid">
                                    <label className="uk-text-bold">
                                        <input className="uk-radio" type="radio" name="genero" 
                                        value="Femenino" 
                                        defaultChecked={ 
                                                            users.genero === "Femenino"
                                                            ? true
                                                            : false
                                                        }
                                       onChange={this.handleChange}/> Femenino</label>

                                    <label className="uk-text-bold">
                                        <input className="uk-radio" type="radio" name="genero" 
                                        value="Masculino"
                                        defaultChecked={ 
                                                            users.genero === "Masculino"
                                                            ? true
                                                            : false
                                                        } 
                                        onChange={this.handleChange}/> Masculino</label>
                                    <label className="uk-text-bold">
                                        <input className="uk-radio" type="radio" name="genero" 
                                        value="otro"
                                        defaultChecked={ 
                                                            users.genero === "Femenino"
                                                            ? false
                                                            : users.genero === "Masculino"
                                                            ? false
                                                            : true
                                                        }
                                     
                                        onChange={this.handleChange}/> Otro</label>
                                </div>

                                {users.genero === "Femenino"
                                    ?""
                                    : users.genero === "Masculino"
                                    ? ""
                                    : <div className="uk-form-controls uk-inline">
                                            <span className="uk-form-icon">
                                                <i className="fa fa-venus-mars" aria-hidden="true"></i>
                                            </span>   
                                            <input className="uk-input uk-form-width-large"
                                                name="genero" type="text" placeholder="Define tu sexo"
                                                value={users.genero}
                                                onChange={this.handleChange}/>
                                        </div>
                                }

                                

                                <div className="uk-alert-danger uk-margin">
                                        <p>{errores.genero}</p>
                                </div>

                                <label className="uk-form-label uk-text-bold">Telefono</label>
                                <div className="">
                                    <div className="uk-form-controls uk-inline">
                                        <span className="uk-form-icon" uk-icon="icon:  receiver"></span>
                                        <input className={errores.telefono.length>0  
                                        ? "uk-input uk-form-width-large uk-form-danger"
                                        :"uk-input uk-form-width-large"}
                                        name="telefono" type="text" 
                                        value={users.telefono}
                                        onChange={this.handleChange}/>
                                    </div>
                                </div>

                                <div className="uk-alert-danger uk-margin">
                                        <p>{errores.telefono}</p>
                                </div>

                                <label className="uk-form-label uk-text-bold">E-mail</label>
                                <div className="">
                                    <div className="uk-form-controls uk-inline">
                                        <span className="uk-form-icon" uk-icon="icon: mail"></span>
                                        <input className={errores.email.length>0  
                                        ? "uk-input uk-form-width-large uk-form-danger"
                                        :"uk-input uk-form-width-large"}
                                         name="email" type="text" placeholder="example@mail.com" 
                                         value={users.email}
                                         onChange={this.handleChange}/>
                                    </div>
                                </div>

                                <div className="uk-alert-danger uk-margin">
                                        <p>{errores.email}</p>
                                </div>

                                <div className="uk-column-1-1">

                                    <label className="uk-form-label uk-text-bold">Contraseña</label>
                                    <div className=" uk-inline">
                                        
                                        <span className="uk-form-icon" uk-icon="icon: lock"></span>
                                        <input className={errores.password.length>0  
                                        ? "uk-input uk-form-width-large uk-form-danger"
                                        :"uk-input uk-form-width-large"}
                                         type="password" name="password" value={users.password}
                                         onChange={this.handleChange}/>
                                    </div>

                                    <div className="uk-alert-danger uk-margin">
                                            <p>{errores.password}</p>
                                    </div>

                                </div>

                                  <div className="uk-margin">
                                    <label className="uk-form-label uk-text-bold">Elige la marca de auto</label>
                                    <div className="uk-form-controls">

                                        <select className="uk-select"
                                                name="marca_id"
                                                onChange={this.handleChange}>

                                        <option value={users.marca_id}>{users.marca}</option>

                                        {marcas.map((marca, i) =>  
                                            <option value={marca.marca_id} key={i}>{marca.name}</option> 
                                        )}
                                        </select>
                                    </div>
                                </div>

                                <div className="uk-alert-danger uk-margin">
                                        <p>{errores.marca}</p>
                                </div>

                                <div className="uk-margin">
                                    <label className="uk-form-label uk-text-bold">Modelo del auto</label>
                                    <div className="uk-form-controls">
                                        <select  className="uk-select"
                                            name="modelo_id"
                                            onChange={this.handleChange}>

                                        <option value={users.modelo_id}>{users.año}</option>
                                        {modelos.map((modelo, i) =>
                                            <option value={modelo.modelo_id} key={i}>{modelo.año}</option>
                                        )}
                                        </select>
                                    </div>
                                </div>

                                <div className="uk-alert-danger uk-margin">
                                        <p>{errores.modelo}</p>
                                </div>

                                <label className="uk-form-label uk-text-bold">Placa</label>
                                <div className="">
                                    <div className="uk-form-controls uk-inline">
                                        <span className="uk-form-icon" uk-icon="icon: code"></span>
                                        <input 
                                        className={errores.placa.length>0  ? "uk-input uk-form-width-large uk-form-danger"
                                                                            :"uk-input uk-form-width-large"}
                                        name="placa" type="text" 
                                       
                                        value={users.placa}
                                        onChange={this.handleChange}/>
                                    </div>
                                </div>

                                <div className="uk-alert-danger uk-margin">
                                        <p>{errores.placa}</p>
                                </div>

                                <div className="uk-margin">
                                    <textarea className={errores.comentario.length>0  ? "uk-textarea uk-form-danger"
                                                                                :"uk-textarea"}
                                    rows="5" name="comentario" placeholder="Cuentanos en que plan de seguro estas interesado"
                                   
                                    value={users.comentario}
                                    onChange={this.handleChange}>
                                    </textarea>
                                </div>

                                <div className="uk-alert-danger uk-margin">
                                        <p>{errores.comentario}</p>
                                </div>

                                <button className="uk-button uk-button-primary uk-width-1-1 uk-margin-small-bottom" onClick={this.handelSubmit}>Registrarme</button>

                                <div className=
                                        {
                                            this.state.status === "Modificación Exitosa"   
                                            ? "uk-alert-success uk-margin"
                                            : "uk-alert-danger uk-margin"
                                        }>
                                    <p className="uk-text-center">{this.state.status}</p>
                                </div>

                            </div>
                            
                    </div>

                    </form> 

                </div>

                <Link className=" uk-align-right" to="/ReportUsers">       

                    <i className="fa fa-chevron-circle-right fa-3x" aria-hidden="true"></i>

                </Link>

            </div>

        )
    }
}

export default UpdateUser;