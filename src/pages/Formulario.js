import React from 'react';

class Formulario extends React.Component{

  
    // constructor(){
    //     super();
    //     this.state={
    //         combo1: '',
    //         combo2: '',
    //         gigas:'',
    //         preciogigas:0,
    //         precio2:0,
    //         dominio:'',
    //         host:false,
    //         vps:false,
    //         mensaje1:'',
    //         mensaje2:'',
    //         mensaje3:'',
    //         logo:'',
    //         color:'',
    //         total: 0
    //     }

    // //     this.total = this.total.bind(this);
    // //     this.valores = this.valores.bind(this);
    // //     this.calcular = this.calcular.bind(this);
    //  }

    // valores=({name,value,type,checked})=>{
    //     this.setState(()=>{
    //         return{[name]: type=== "checkbox" ? checked:value};
            
    //     });
    // };
   

   

   

    state={
        preciogigas:'',
        precio2:''

       
    }

    // nuevosvalores = e => {
    //     this.setState({[e.target.name]:e.target.value})
    // }

     calcular=e =>
    {
       

        const{disco}= this.props

        if(disco.gigas === '8')
        {
            this.setState({preciogigas: 300 + parseInt(disco.combo1) })
            // this.setState({mensaje1: "Precios añadidos correctamente"})

        }
        else if(disco.gigas === '16')
        {
            this.setState({preciogigas: 600 + parseInt(disco.combo1) })
            // this.setState({mensaje1: "Precios añadidos correctamente"})
        }

        else if(disco.gigas === '32')
        {
            this.setState({preciogigas: 900 + parseInt(disco.combo1) })
            // this.setState({mensaje1: "Precios añadidos correctamente"})
        }

        else if(disco.gigas === '64')
        {
            this.setState({preciogigas: 1200 + parseInt(disco.combo1) })
            // this.setState({mensaje1: "Precios añadidos correctamente"})
        }

       
        switch(disco.combo2)
        {
            case '.online': return this.setState({precio2: 150}) 

            // mensaje2: " Tu dominio es: " + this.state.dominio +"."+this.state.combo2

            case '.com': return this.setState({precio2: 250})

            case '.mx': return this.setState({precio2: 350})
            
            default: return null;
        }

    }






    render(){

        const{agregar, disco}=this.props

        return(

            <div className="uk-flex uk-flex-center">

                <div className="uk-card uk-card-default uk-card-body" hidden></div>

                <div className="uk-card uk-card-default uk-card-body">

                <form> 

                <legend className="uk-legend uk-margin uk-text-bold">Configurar Pedido</legend>

                    <div className="uk-column-1-2 uk-column-divider">
                        

                        <div className="uk-margin uk-grid-small uk-child-width-auto uk-grid">
                        
                            <label><input className="uk-radio" type="radio" name="gigas"  value={"8"} onChange={agregar}/> 8 GB</label>
                            <label><input className="uk-radio" type="radio" name="gigas"  value={"16"} onChange={agregar}/>  16 GB</label>
                            <label><input className="uk-radio" type="radio" name="gigas" value={"32"} onChange={agregar}/> 32 GB</label>
                            <label><input className="uk-radio" type="radio" name="gigas" value={"64"} onChange={agregar}/> 64 GB</label>
                        </div>

                        <div className="uk-margin">
                            <label>Memoria Ram</label>
                            <input className="uk-range" type="range" value={disco.rango} name="rango" min="0" max="16" step="2" onChange={agregar}/>
                        </div>  
      
                        <div className="uk-margin uk-grid-small uk-child-width-auto uk-grid">
                            <label><input className="uk-checkbox" type="checkbox" name="host" value="Web" onChange={agregar}/> Hosting Web</label>
                            <label><input className="uk-checkbox" type="checkbox" name="vps" value="vps" onChange={agregar}/> VPS</label>
                        </div>

                        <div className="uk-margin">
                            <select className="uk-select" name="combo1" onChange={agregar}>
                                <option value="1000">1 año</option>
                                <option value="2000">2 años</option>
                                <option value="3000">3 años</option>
                                <option value="4000">4 años</option>
                            </select>

                        </div>

                
                        <div className="uk-margin">
                            <input className="uk-input" type="text" placeholder="Escribe el nombre de tu Dominio" name="dominio" onKeyUp={agregar}/>
                        </div>

                        <div className="uk-margin">
                            <select className="uk-select" name="combo2" onChange={agregar}>
                                <option value=".com">.com</option>
                                <option value=".mx">.mx</option>
                                <option value=".online">.online</option>
                            </select>

                        </div>

                        <div className="uk-alert-success">
                            <p>
                                {/* {this.state.mensaje2} */}
                            </p>
                        </div>

                        <div className="uk-margin">
                            <input className="uk-input" type="text" placeholder="Inserta un logotipo" name="icono" onKeyUp={agregar}/>
                        </div>

                                
                        <div className="uk-margin">
                            <div>
                                <input className="uk-input uk-width-1-3" type="color" name="color" onChange={agregar} /> <span className="uk-text-middle">Selecciona un color</span>
                            </div>
                        </div>

                        <div className="uk-margin">
                            <button type="button"  className="uk-button uk-button-danger uk-width-1-1" onClick={this.calcular}>Agregar</button>
                        </div>

                        <div className="uk-alert-warning">
                            <p>
                                {/* {this.state.mensaje1} */}
                            </p>
                        </div>

                        <div className="uk-margin">
                            <input className="uk-input" type="text" placeholder="Total" name="total" 
                            value={'$'+(this.state.preciogigas + this.state.precio2)} onChange={agregar} readOnly/>
                        </div>

                    
                        <button type="button" name="fin" className="uk-button uk-button-secondary uk-width-1-1"  value={this.state.preciogigas + this.state.precio2} onClick={agregar}>Terminar Compra</button>

                      

                        
                        {/* <div className="uk-margin">
                            <textarea className="uk-textarea uk-alert-success" rows="3" placeholder="Resumen de Compra" value={"El total de su compra es: $" + this.state.total} readOnly></textarea>
                        </div> */}

                        <div className="uk-alert-danger">
                            <p>
                                {/* {this.state.mensaje3} */}
                            </p>
                        </div>


                    </div>

                    </form>   

                </div>
                

                <div className="uk-card uk-card-default uk-card-body uk-margin-left" hidden></div>

            </div>
        )
    }
}

export default Formulario;