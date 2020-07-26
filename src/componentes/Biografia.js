import React from 'react';

class Biografia extends React.Component{
    render(){
        
        const titulo = "Acerca de mi";

        const datos= {
            nombre:"Brayan Manzano Cortes",
            edad: 23,
            nacimiento: "03-01-1997"
        }

        function informacion(datos){
            return <p>
                   <strong> Nombre: </strong> {datos.nombre}
                    <br/>
                    <strong> Edad: </strong> {datos.edad}
                    <br/>
                    <strong> Fecha de Nacimiento:  </strong> {datos.nacimiento}
                   </p>
        }

        return(

            <div className="uk-flex uk-flex-center">

                <div className="uk-card uk-card-default uk-width-1-3 mycard">
                    <div className="uk-card-header">
                        <div className="uk-grid-small uk-flex-middle">
                            <div className="uk-width-auto">
                                <img className="uk-border-circle" src={process.env.PUBLIC_URL + '/img/senior.jpg'} width="100" height="100" alt="Brayan"/>
                            </div>
                            <div className="uk-width-expand">
                                <h3 className="uk-card-title uk-margin-remove-bottom">

                                        {titulo}

                                </h3>
                                <p className="uk-text-meta uk-margin-remove-top"><time>May, 2020</time></p>
                            </div>
                        </div>
                    </div>

                    <div className="uk-card-body datos">
                        {informacion(datos)}
                    </div>

                    <hr className="uk-divider-icon" />

                    <div className="uk-card-body gustos">
                        <strong>Gustos:</strong>
                        <p>Programar, mantenerme al día con las tendencias tecnologicas.</p>
                    </div>

                    <hr className="uk-divider-icon" />

                    <div className="uk-card-body utvt">
                        <strong>Que me gusta de la UTVT:</strong>
                        <p>Nothing...</p>
                    </div>

                </div>
     
        </div>

        )
    }
}

export default Biografia;