import React from 'react';

class Resumen extends React.Component{

  

    render(){
        
        

        const{icono, color,gigas,rango,host,vps,dominio,combo2,fin} = this.props

        let mensaje;

        if(fin !==  ''){

            mensaje="Compra Exitosa";
        }


        return(

            
         

          

  
            <div className="uk-card uk-card-default uk-margin-left uk-card-small">
                <div className="uk-card-header">
                    <div className="uk-grid-small uk-flex-middle">
                        <div className="uk-width-expand">
                            <h3 className="uk-card-title uk-margin-remove-bottom">Resumen de compra del hosting</h3>
                        </div>
                    </div>

                     <div className="uk-width-auto uk-margin-small">

        <i className={icono} aria-hidden="true" style={{color: `${color}`}}></i> <small>{icono}</small>
                      

                    </div>
                        
                </div>

                <div className="uk-card-footer">
                    <h4>Caracteristicas</h4>
                    <p>
                       <strong>SSD:</strong> {gigas} GB
                        <br/>
                        <strong>RAM:</strong> {rango} GB
                        <br/>
                        <strong>Tipo de host:</strong> {host} {vps}
                    </p>
                </div>

                <div className="uk-card-footer">
                    <h4>Nombre de Dominio</h4>
                    <p>
                        <strong>{dominio+combo2}</strong>
                    </p>
                </div>

                <div className="uk-card-footer">
                    <h4>Precio Total</h4>
             

                    <div className="uk-margin">
                            <input className="uk-input uk-form-success uk-form-width-small" type="text" value={'$'+fin} readOnly/>
                    </div>

                    <div className="uk-alert-primary">
                            <p className="uk-text-center">{mensaje}</p>
                    </div>

                        
               
                </div>
                

            </div>
            

     
      

        )
    }
}

export default Resumen;