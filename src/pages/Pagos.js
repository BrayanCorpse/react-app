import React from 'react';
import Formulario from './Formulario';
import Resumen from '../componentes/Resumen';


class Pagos extends React.Component{

    state={
        form:{
            icono:'fa fa-star fa-5x',
            color:'#3385FF',
            gigas:'0',
            rango:'0',
            host:'',
            vps:'',
            dominio:'',
            combo1: '',
            combo2:'',
            fin:''

        }
    }

    valores=e=>{
        // console.log(`${e.target.name}:${e.target.value}`)
        // let partialState={}
        // partialState[e.target.name]=e.target.value
        // this.setState(partialState)
        this.setState({
            form:{
                ...this.state.form,
                [e.target.name]:e.target.value
                
            }
        })
        // console.log(this.state)
    }


     render(){
         return(
            <div className="uk-flex uk-flex-center">

                <div>
                    <Formulario 
                    agregar={this.valores}
                    disco={this.state.form}/>
                </div>

                <div>
                    <Resumen {...this.state.form}/>
                </div>

            </div>
         )
     }
}

export default Pagos;