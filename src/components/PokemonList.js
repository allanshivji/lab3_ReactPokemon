import React from 'react';
import pokedex from '../API/Pokedex'
import { Link } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import Container from './Container';
import Error from './Error';
import '../style/PokemonList.css';


class PokemonList extends React.Component {
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



        // console.log(this.props);

        // this.setProps(this.props);

        // console.log("page number:" + this.props.match.params.page);

        let currentPage = this.props.match.params.page

        // console.log("page:"+ this.props.match.params.page.matches("^[A-z0-9]+$"));
        console.log("page1:" + Number(currentPage));

        if (parseInt(currentPage) >= 0 && Number(currentPage) >= 0) {



            this.setState({ pageNumber: currentPage });

            var jsonData = {};

            var offsetNum = currentPage * 20;

            this.setState({ offSet: offsetNum });

            // console.log("offset" + offsetNum);

            // console.log("offsetNum" + this.getSnapshotBeforeUpdate.pageNumber);

            jsonData = await pokedex.get("/pokemon", {    //https://stackoverflow.com/questions/40947650/axios-get-in-url-works-but-with-second-parameter-as-object-it-doesnt
                params: { offset: offsetNum, limit: 20 }
            });

            // if (jsonData.data.next != null) {

            // console.log("arrLength" + jsonData.data.results.length);

            if (jsonData.data.results.length != 0) {
                this.setState({ pokemonList: jsonData.data.results });
                this.setState({ total: jsonData.data.count });
                this.setState({ next: jsonData.data.next });
                this.setState({ previous: jsonData.data.previous });
                this.setState({ error: false });
            }
            // }
            else {
                console.log(jsonData.data.results.length != 0);
                this.setState({ error: true });
            }

        }
        else {
            this.setState({ error: true });
        }

        // const jsonData = await pokedex.get("/pokemon");




        // console.log(this.state.next);
        // console.log(this.state.previous);
        // console.log(this.state.pokemonList);
        // console.log(jsonData.data.result);
        // console.log(jsonData);
    }



    componentDidMount() {
        // console.log("hgvjh");
        this.getpokemon();
    }

    componentWillReceiveProps(props) {      //https://stackoverflow.com/questions/48226268/calling-setstate-in-react-from-render-method

        this.props.match.params = props.match.params;
        this.getpokemon();
    }


    render() {



        // console.log("error"+this.state.error);

        if (!this.state.error) {


            if (this.state.pokemonList.length > 0) {

                // console.log("gdvcjh");
                var lists = this.state.pokemonList.map((list, i) => {

                    let id = list.url.split("/");
                    id = id[id.length - 2];

                    return (
                        // <li key={i + 1}>
                        <div key={i + 1} className="item">
                            <div className="content">
                                <div className="header">
                                    <Link key="list.name" to={`/pokemon/${id}`}>{list.name}</Link>
                                </div>
                            </div>
                        </div>

                        /* <Link key="list.name" to={`/pokemon/${id}`}>{list.name}</Link> */

                        // </li>

                    )
                });

                

                var nextPageNumber = parseInt(this.state.pageNumber) + 1;
                var previousPageNumber = parseInt(this.state.pageNumber) - 1;



                // console.log(this.state.pokemonList);

                // if (this.state.next) {
                var error = (parseInt(this.state.offSet) + parseInt(this.state.pokemonList.length)) == this.state.total ? true : false;

                if (error) {
                    var next =
                        <Link key="next" to="/error">
                            <button className="ui primary basic button">
                                <h2>Next</h2>
                            </button>
                        </Link>

                    // <Link key="next" to="/error">
                    //     <h2>Next</h2>
                    // </Link>
                }
                else {
                    var next =
                        <Link key="next" to={`/pokemon/page/${nextPageNumber}`}>
                            <button className="ui primary basic button">
                                <h2>Next</h2>
                            </button>
                        </Link>

                }

                // }

                if (this.state.pageNumber > 0) {
                    var previous =
                        <Link key="previous" to={`/pokemon/page/${previousPageNumber}`}>
                            <button className="ui primary basic button">
                                <h2>Previous</h2>
                            </button>
                        </Link>

                }

                var ul =
                    <div>
                        <div className="pokemonHeader">
                            <h2>Pokemon List</h2>
                            <h3>Pokemon are the animal in poke world. Please have a look at the list and to know more about
                                them click on the name.
                            </h3>
                            </div>


                        <div className="listNav ">

                            {previous}

                            {next}

                        </div>

                        <ul>
                            <div className="ui inverted segment">
                                <div className="ui inverted relaxed divided list">
                                    {/* <div class="item">
                        <div class="content">
                            <div class="header">Paulo</div>
                        </div>
                    </div> */}

                                    {lists}

                                </div>
                            </div>
                        </ul>

                    </div>

            }
        }
        else {
            // console.log("error"+this.state.error);
            var error = <Error></Error>;
            // console.log("error"+this.state.error);
        }


        return (
            <div className="contentPokemonList">
                {/* <div className="listNav">

                    {previous}

                    {next}
                
                </div> */}



                {/* <ul>
                    <div className="ui inverted segment">
                        <div className="ui inverted relaxed divided list">

                            {lists}

                        </div>
                    </div>
                </ul> */}

                {ul}



                {/* <ul>
                    {lists}
                </ul> */}

                {error}
            </div>
        )
    }



}

export default PokemonList; 