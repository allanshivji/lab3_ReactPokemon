import React, { Component } from 'react';
import pokedex from '../API/Pokedex';
import '../style/Pokemon.css';
import Error from './Error';
import axios from '../../node_modules/axios/dist/axios';
import "../style/Machines.css";


class Machine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            item: "",
            move: "",
            versionGroup: "",
            error: true,
            adjust: false
        }
    }


    getpokemonDetail = async () => {

        const id = this.props.match.params.id;
        // console.log("id" + id);

        if (parseInt(id) >= 0) {



            var jsonData = {};

            try {


                jsonData = await pokedex.get(`/machine/${id}`);

                console.log(jsonData);

                this.setState({ id: jsonData.data.id });

                this.setState({ item: jsonData.data.item.name });

                this.setState({ move: jsonData.data.move.name });

                this.setState({ versionGroup: jsonData.data.version_group.name });


                this.setState({ error: false });

            }
            catch (e) {

                // console.log("e" + e);

                console.log(" catch error");
                this.setState({ error: false });
            }

        }
        else {
            console.log("error");
            this.setState({ error: false });
        }

    }



    componentDidMount() {
        // console.log("hi");
        this.getpokemonDetail();
    }

    render() {

        // console.log(this.state.abilities.length);


        if (!this.state.error) {//&& this.state.abilities.length >= 0) {

            // console.log("hello from machine");

            if (this.state.id != null) {

                var pokemonData = <div className="singleMachine">

                    <div>
                        <h3>Machine #{this.state.id}.
                    </h3>
                    </div>

                    <table className="ui very basic collapsing celled table">
                        <thead>
                            <tr><th>Properties</th>
                                <th>Value</th>
                            </tr></thead>
                        <tbody>
                            <tr>
                                <td>
                                    <h4 className="ui image header">
                                        <div className="content">
                                            ID
                                    </div>
                                    </h4></td>
                                <td>
                                    {this.state.id}
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <h4 className="ui image header">
                                        <div className="content">
                                            Item
                                    </div>
                                    </h4></td>
                                <td>
                                    {this.state.item}
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <h4 className="ui image header">
                                        <div className="content">
                                            Move
                                    </div>
                                    </h4></td>
                                <td>
                                    {this.state.move}
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <h4 className="ui image header">
                                        <div className="content">
                                            Version Group
                                    </div>
                                    </h4></td>
                                <td>
                                    {this.state.versionGroup}
                                </td>
                            </tr>



                        </tbody>
                    </table>


                </div>

            }
            else {

                // console.log("error");
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

export default Machine;