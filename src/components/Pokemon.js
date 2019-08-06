import React, { Component } from 'react';
import pokedex from '../API/Pokedex';
import '../style/Pokemon.css';
import Error from './Error';
import axios from '../../node_modules/axios/dist/axios';
class Pokemon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            abilities: [],
            height: undefined,
            moves: [],
            name: "",
            image: "",
            types: [],
            statistics: [],
            error: true

        }
    }


    getpokemonDetail = async () => {

        const id = this.props.match.params.id;
        // console.log("id" + id);

        if (parseInt(id) >= 0) {



            var jsonData = {};

            try {
                // console.log("jsonDataaa");

                jsonData = await pokedex.get(`/pokemon/${id}`);

                this.setState({ height: jsonData.data.height });

                this.setState({ name: jsonData.data.name });

                this.setAbilities(jsonData.data.abilities);

                this.setState({ image: jsonData.data.sprites.front_shiny });

                this.setType(jsonData.data.types);

                this.setMoves(jsonData.data.moves);

                this.setState({ error: false });


            }
            catch (e) {

                // console.log("e" + e);


                this.setState({ error: false });
            }

        }
        else {
            this.setState({ error: false });
        }


        // console.log(this.state.pokemonList);
        // console.log(jsonData.data.result);
        // console.log(jsonData);
    }

    setMoves(moves) {
        let movesArr = [];

        for (let move in moves) {
            movesArr.push(moves[move].move.name);
        }

        this.setState({ moves: movesArr });
    }

    setType(types) {

        let typeArr = [];

        for (let type in types) {
            typeArr.push(types[type].type.name);
        }

        this.setState({ types: typeArr });
    }

    setAbilities(abilities) {

        let abilityArr = [];

        for (let ability in abilities) {
            // console.log(ability);
            abilityArr.push(abilities[ability].ability.name);
        }

        this.setState({ abilities: abilityArr });
    }

    componentDidMount() {
        // console.log("hi");
        this.getpokemonDetail();
    }

    render() {

        console.log(this.state.abilities.length);


        if (!this.state.error){

        if( this.state.abilities.length > 0) {

            var abilityList = this.state.abilities.map((ability) => {
                return (
                    <li key={ability}><h3>{ability}</h3></li>
                );
            });

            var typeList = this.state.types.map((type) => {
                return (
                    <li key={type}>
                        <h3>
                            {type}
                        </h3>
                    </li>
                );
            });

            var movesList = this.state.moves.map((move) => {
                return (
                    <li key={move}>
                        <h3>
                            {move}
                        </h3>
                    </li>
                );
            });

            var pokemonName = this.state.name;

            var pokemonData =

                <div>
                    <div className="pokemonNameHeader">
                        <h1>Here are the details of {pokemonName.toUpperCase()}.</h1>
                    </div>
                
                <div className="contentPokemon">
                    

                    <div className="pokemonName">
                        <h1> {pokemonName.toUpperCase()} </h1>
                        <img src={this.state.image} alt={pokemonName} />
                    </div>

                    <h2>Height is {this.state.height} cm.</h2>
                    <br />
                    <h2>Abilities of {pokemonName} are:</h2>
                    <ul>
                        {abilityList}
                    </ul>
                    <br />
                    <h2>What type of Pokemon {pokemonName} is:</h2>
                    <ul>
                        {typeList}
                    </ul>
                    <br />
                    <h2> Moves of {pokemonName} are:</h2>
                    <ul>
                        {movesList}
                    </ul>
                </div>

                </div>

        }
        else {

            console.log("error");
            var pokemonData = <Error></Error>

        }

    }



        // console.log(this.state.image);

        return (
            <div>
                {pokemonData}
            </div>



        )
    };

}

export default Pokemon;