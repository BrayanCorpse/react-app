import React from 'react';
import {Link}from 'react-router-dom';

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

class Registro extends React.Component{
    
      componentDidMount(){
        fetch('http://localhost/api/public/api/showMarks')
          .then(response =>  response.json())
          .then(Marks => this.setState({ marcas: Marks }));

        fetch('http://localhost/api/public/api/showModels')
          .then(response =>  response.json())
          .then(Models => this.setState({ modelos: Models }));
      }

    
    state={

        marcas:[],
        modelos:[],

        foto:'img/error.png',
        nombre:null,
        ap:null,
        am:null,
        telefono:null,
        email:null,
        password:null,
        repeatpass:null,
        marca:null,
        modelo:null,
        sexo:null,
        comentario:null,
        genero:'otro',
        placa:null,
        status:'',

        errores:{
            nombre:"",
            ap:"",
            am:"",
            telefono:"",
            email:"",
            password:"",
            repeatpass:"",
            marca:"",
            modelo:"",
            sexo:"",
            comentario:"",
            genero:"",
            placa:""



        }
            

    }

    handleChange =e => {
    
        const{name,value} = e.target   
        let errores = {...this.state.errores}
      
        switch(name){
            case "nombre":
                errores.nombre = textoRegex.test(value)
                ?""
                :"Favor de ingresar solo letras!";
            break; 

            case "ap":
                errores.ap = textoRegex.test(value)
                ?""
                :"Ingresar solo letras!";
            break; 

            case "am":
                errores.am = textoRegex.test(value)
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

            case "repeatpass":
                errores.repeatpass = passwordsRegex.test(value) 
                ?""
                :"Password must be for example: 'Brayan_Corp53'";
            break;

            case "marca":
                errores.marca = value === ""
                ?"Selecciona una marca!"
                :"";
            break;

            case "modelo":
                errores.modelo = value === ""
                ?"Selecciona un modelo!"
                :"";
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


            case "sexo":
                errores.sexo = value === "otro" 
                ?   <div className="uk-form-controls uk-inline">
                        <span className="uk-form-icon">
                            <i className="fa fa-venus-mars" aria-hidden="true"></i>
                        </span>   
                        <input className="uk-input uk-form-width-large"
                               name="genero" type="text" placeholder="Define tu sexo" onKeyUp={this.handleChange}/>
                    </div>
                :"";
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
       
        
    }


    handelSubmit=e=>{

      
        e.preventDefault();
        
        if(formValid(this.state))
        {
            let data={
                
                foto:this.state.foto,
                name:this.state.nombre,
                apellidop:this.state.ap,
                apellidom:this.state.am,
                genero:this.state.genero,
                sexo:this.state.sexo,
                telefono:this.state.telefono,
                email:this.state.email,
                password:this.state.password,
                placa:this.state.placa,
                comentario:this.state.comentario,
                marca_id:this.state.marca,
                modelo_id:this.state.modelo,
          

            };

            fetch("http://localhost/api/public/api/store", {
                method: 'POST', // or 'PUT'
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                mode: "cors",
                body: JSON.stringify(data)
              })

              .then(res => res.json())
              .catch(error => console.error('Error:', error))
              .then(this.setState({status: "Alta Exitosa"}));
              this.myFormRef.reset();
        }
        else
        {
            this.setState({status:"Favor de corregir la información del formulario"})
        }
    }


    notSubmit=e=>{

        e.preventDefault();
    }

   
  
    render(){

        const {errores,marcas,modelos,foto}= this.state

        return(

            <div className="uk-flex uk-flex-center">

                <Link className=" uk-align-left" to="/ReportUsers">       

                    <i className="fa fa-chevron-circle-left fa-3x" aria-hidden="true"></i>

                </Link>


                <div>
               

                <form onSubmit={this.notSubmit} ref={(el) => this.myFormRef = el}>

                    <div className="uk-card uk-card-default uk-width-large"> 
                        <div className="uk-card-header">
                            
                            <div className="uk-grid-small uk-flex-middle">

                        

                            <div className="uk-grid-small uk-grid uk-align-right">
                                {/* Avatares */}
                                    <label className="uk-form-label uk-text-bold">Choose your Avatar...</label>
                                    <br/>

                                    <li className="uk-button uk-button-link">
                                        <input  type="image" name="foto" src="img/vene.jpg" width="40" height="40" alt="senior"
                                        value="img/vene.jpg" onClick={this.handleChange}/>
                                    </li>
                                    
                                    <button className="uk-button uk-button-link">
                                        <input className="input-image"  type="image" name="foto" src="img/github-1.svg" width="40" height="40" alt="Semi" 
                                        value="img/github-1.svg" onClick={this.handleChange}/>
                                    </button>
                                    
                                    <button className="uk-button uk-button-link">
                                        <input  type="image" name="foto" src="img/gitlab.svg" width="40" height="40" alt="junior"
                                        value="img/gitlab.svg" onClick={this.handleChange}/>
                                    </button>

                                    <br/>

                                    <button className="uk-button uk-button-link">
                                        <input  type="image" name="foto" src="img/python-5.svg" width="40" height="40" alt="avatar"
                                        value="img/python-5.svg" onClick={this.handleChange}/>
                                    </button>

                                    <button className="uk-button uk-button-link">
                                        <input  type="image" name="foto" src="img/rex.png" width="40" height="40" alt="vene"
                                        value="img/rex.png" onClick={this.handleChange}/>
                                    </button>

                                    <button className="uk-button uk-button-link">
                                        <input  type="image" name="foto" src="img/go.png" width="40" height="40" alt="go"
                                        value="img/go.png" onClick={this.handleChange}/>
                                    </button>
                                {/* End avatares */}
                                </div>
                                {/* Profile */}
                                <div className="uk-width-auto">
                                    <img className="uk-border-circle" width="100" height="100" 
                                    src={
                                        foto === null 
                                        ? "img/error.png" 
                                        : foto} alt="new user"/>
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
                                        className={errores.nombre.length>0  ? "uk-input uk-form-width-large uk-form-danger"
                                                                            :"uk-input uk-form-width-large"}
                                        name="nombre" type="text" 
                                        onKeyUp={this.handleChange}/>
                                    </div>
                                </div>

                              
                                <div className="uk-alert-danger uk-margin">
                                    <p>{errores.nombre}</p>
                                </div>
                              
                                

                                <div className="uk-column-1-2">

                                    <div className="">
                                        <label className="uk-form-label uk-text-bold">Apellido paterno</label>
                                        <input  
                                        className={errores.ap.length>0  ? "uk-input uk-form-width-large uk-form-danger"
                                                                        :"uk-input uk-form-width-large"}
                                         type="text" name="ap" onKeyUp={this.handleChange}/>
                                    </div>

                                    <div className="uk-alert-danger uk-margin">
                                        <p>{errores.ap}</p>
                                    </div>

                                    <div className="">
                                        <label className="uk-form-label uk-text-bold">Apellido materno</label>
                                        <input className={errores.am.length>0  ? "uk-input uk-form-width-large uk-form-danger"
                                                                            :"uk-input uk-form-width-large"}
                                        type="text" name="am" onKeyUp={this.handleChange}/>
                                    </div>

                                    <div className="uk-alert-danger uk-margin">
                                        <p>{errores.am}</p>
                                    </div>

                                </div>

                                
                                <div className="uk-margin uk-grid-small uk-child-width-auto uk-grid">
                                    <label className="uk-text-bold">
                                        <input className="uk-radio" type="radio" name="sexo" value={"Femenino"} defaultChecked onChange={this.handleChange}/> Femenino</label>
                                    <label className="uk-text-bold">
                                        <input className="uk-radio" type="radio" name="sexo" value={"Masculino"} onChange={this.handleChange}/> Masculino</label>
                                    <label className="uk-text-bold">
                                        <input className="uk-radio" type="radio" name="sexo" value={"otro"} onChange={this.handleChange}/> Otro</label>
                                </div>

                                <div>
                                    {errores.sexo}
                                </div>

                                <div className="uk-alert-danger uk-margin">
                                        <p>{errores.genero}</p>
                                </div>

                                <label className="uk-form-label uk-text-bold">Telefono</label>
                                <div className="">
                                    <div className="uk-form-controls uk-inline">
                                        <span className="uk-form-icon" uk-icon="icon:  receiver"></span>
                                        <input className={errores.telefono.length>0  ? "uk-input uk-form-width-large uk-form-danger"
                                                                                     :"uk-input uk-form-width-large"}
                                        name="telefono" type="text" onKeyUp={this.handleChange}/>
                                    </div>
                                </div>

                                <div className="uk-alert-danger uk-margin">
                                        <p>{errores.telefono}</p>
                                </div>

                                <label className="uk-form-label uk-text-bold">E-mail</label>
                                <div className="">
                                    <div className="uk-form-controls uk-inline">
                                        <span className="uk-form-icon" uk-icon="icon: mail"></span>
                                        <input className={errores.email.length>0  ? "uk-input uk-form-width-large uk-form-danger"
                                                                                     :"uk-input uk-form-width-large"}
                                         name="email" type="text" placeholder="example@mail.com" onKeyUp={this.handleChange}/>
                                    </div>
                                </div>

                                <div className="uk-alert-danger uk-margin">
                                        <p>{errores.email}</p>
                                </div>

                                <div className="uk-column-1-1">

                                    <label className="uk-form-label uk-text-bold">Contraseña</label>
                                    <div className=" uk-inline">
                                        
                                        <span className="uk-form-icon" uk-icon="icon: lock"></span>
                                        <input className={errores.password.length>0  ? "uk-input uk-form-width-large uk-form-danger"
                                                                                   :"uk-input uk-form-width-large"}
                                         type="password" name="password" onKeyUp={this.handleChange}/>
                                    </div>

                                    <div className="uk-alert-danger uk-margin">
                                            <p>{errores.password}</p>
                                    </div>

                                    <label className="uk-form-label uk-text-bold">Repetir Contraseña</label>
                                    <div className="uk-inline">
                                        <span className="uk-form-icon" uk-icon="icon: lock"></span>
                                        <input className={errores.repeatpass.length>0  ? "uk-input uk-form-width-large uk-form-danger"
                                                                                       :"uk-input uk-form-width-large"}
                                         type="password" name="repeatpass" onKeyUp={this.handleChange}/>
                                    </div>

                                    <div className="uk-alert-danger uk-margin">
                                            <p>{errores.repeatpass}</p>
                                            {/* <p>{this.state.mensaje}</p> */}
                                    </div>

                                </div>

                                  <div className="uk-margin">
                                    <label className="uk-form-label uk-text-bold">Elige la marca de auto</label>
                                    <div className="uk-form-controls">

                                        <select className= {   errores.marca.length>0
                                                                ? "uk-select uk-form-danger"
                                                                :"uk-select "
                                                            }
                                                name="marca" onChange={this.handleChange}>

                                            <option value="" defaultValue>Seleciona una Marca</option>

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
                                        <select  className={errores.modelo.length>0  
                                                            ? "uk-select uk-form-danger"
                                                            :"uk-select "}
                                            name="modelo" onChange={this.handleChange}>

                                            <option value="">Modelo del auto</option>
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
                                        onKeyUp={this.handleChange}/>
                                    </div>
                                </div>

                                <div className="uk-alert-danger uk-margin">
                                        <p>{errores.placa}</p>
                                </div>

                                <div className="uk-margin">
                                    <textarea className={errores.comentario.length>0  ? "uk-textarea uk-form-danger"
                                                                                :"uk-textarea"}
                                    rows="5" name="comentario" placeholder="Cuentanos en que plan de seguro estas interesado"
                                    onKeyUp={this.handleChange}>
                                    </textarea>
                                </div>

                                <div className="uk-alert-danger uk-margin">
                                        <p>{errores.comentario}</p>
                                </div>

                                <button className="uk-button uk-button-primary uk-width-1-1 uk-margin-small-bottom" onClick={this.handelSubmit}>Registrarme</button>

                                <div className=
                                        {
                                            this.state.status === "Alta Exitosa"   
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

export default Registro;