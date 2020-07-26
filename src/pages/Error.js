import React from 'react';
// import imagen from  '../img/error.png';

class Error extends React.Component{
    render(){
        return(


        <div className="error">

            <img  src={process.env.PUBLIC_URL + '/img/error.png'}   alt="Error 404"/>
            <h1>Oops, looks like the page is lost.</h1>
            <p>You don't know what you do...</p>
            <h3>Contact your brain and organize your ideas!</h3>

        </div>


        )
    }
}

export default Error;