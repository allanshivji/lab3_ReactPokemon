import React from 'react';
import pokedex from '../API/Pokedex'
import { Link } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import Container from './Container';
import Error from './Error';
import "../style/Machines.css";

class MachineList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pokemonList: [],
            total: undefined,
            next: "",
            previous: null,
            pageNumber: null,
            offSet: null,
            error: null
        }
    }


    getpokemon = async () => {



        let currentPage = this.props.match.params.page


        if (parseInt(currentPage) >= 0 && Number(currentPage) >= 0) {

            this.setState({ pageNumber: currentPage });

            var jsonData = {};

            var offsetNum = currentPage * 20;

            this.setState({ offSet: offsetNum });



            jsonData = await pokedex.get("/machine", {    //https://stackoverflow.com/questions/40947650/axios-get-in-url-works-but-with-second-parameter-as-object-it-doesnt
                params: { offset: offsetNum, limit: 20 }
            });

            // console.log(jsonData);

            if (jsonData.data.results.length != 0) {
                this.setState({ pokemonList: jsonData.data.results });
                this.setState({ total: jsonData.data.count });
                this.setState({ next: jsonData.data.next });
                this.setState({ previous: jsonData.data.previous });
                this.setState({ error: false });
            }

            else {
                // console.log(jsonData.data.results.length != 0);
                this.setState({ error: true });
            }

        }
        else {
            this.setState({ error: true });
        }


    }



    componentDidMount() {
        this.getpokemon();
    }

    componentWillReceiveProps(props) {      //https://stackoverflow.com/questions/48226268/calling-setstate-in-react-from-render-method

        this.props.match.params = props.match.params;
        this.getpokemon();
    }


    render() {



        if (!this.state.error) {


            if (this.state.pokemonList.length > 0) {
                var lists = this.state.pokemonList.map((list, i) => {

                    let id = list.url.split("/");
                    id = id[id.length - 2];

                    return (

                        <div key={i + 1} className="item">
                            <div className="content">
                                <div className="header">
                                    <Link key={list.url} to={`/machines/${id}`}>Machine {id}</Link>
                                </div>
                            </div>
                        </div>


                    )
                });

                var ul = <ul>
                    <div className="ui inverted segment">
                        <div className="ui inverted relaxed divided list">


                            {lists}

                        </div>
                    </div>
                </ul>

                var nextPageNumber = parseInt(this.state.pageNumber) + 1;
                var previousPageNumber = parseInt(this.state.pageNumber) - 1;

               



                var error = (parseInt(this.state.offSet) + parseInt(this.state.pokemonList.length)) == this.state.total ? true : false;

                if (error) {
                    var next =
                        <Link key="next" to="/error">
                            <button className="ui primary basic button">
                                <h2>Next</h2>
                            </button>
                        </Link>


                }
                else {
                    var next =
                        <Link key="next" to={`/machines/page/${nextPageNumber}`}>
                            <button className="ui primary basic button">
                                <h2>Next</h2>
                            </button>
                        </Link>

                }


                if (this.state.pageNumber > 0) {
                    var previous =
                        <Link key="previous" to={`/machines/page/${previousPageNumber}`}>
                            <button className="ui primary basic button">
                                <h2>Previous</h2>
                            </button>
                        </Link>

                }

                var body = <div>
                <div className="machineHeader">
                    <h2>Machines List</h2>
                    <h2> Machines are used for caring of pokemon, to know which pokemon it is and in medical for pokemon care.
                        Please have a look at what are the machines used in poke world and to know more about a machine please click on 
                        that machine.
                    </h2>
                </div>

                <div className="listNav">

                    {previous}

                    {next}
                </div>

                <div>
                    {ul}
                </div>

            </div>

            }
        }
        else {
            var error = <Error></Error>;
        }


        return (
            <div className="contentPokemonList">
                {/* <div className="listNav">

                    {previous}

                    {next}
                </div> */}

                {/* {ul} */}

                {body}

                {error}

            </div>
        )
    }



}

export default MachineList; 