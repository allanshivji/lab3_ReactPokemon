import React, { Component } from 'react';


class Home extends Component {
    render() {
        return (
            <div className="container" style={{ height: "500px", color: "Blue",  textAlign: "center" }}>
                <h1 style={{paddingTop: "50px"}}>
                Please click on The above buttons for Details on Pokemon, Berries and Machines.
                </h1>

                <h2>Pokemons are the animals in poki world where sportmans fight with their pokemon and win badges to compete in a tournament.</h2>

                <h3>Berries are the food in poki world the pokemon eats and get their strength and 
                    Machines are used for care of pokemon or to catch pokemon. 
                    Machines are also used in health care when a pokemon is ingure in a match or while catching.  </h3>

                <h4>Here in this app you will get all the details of pokemon and their food also machines used in poki world.
                    Please explore the app and have fun.
                </h4>
         </div>
        );
    }
}

export default Home;