import React from 'react';
import pokedex from '../API/Pokedex';
import { Link } from 'react-router-dom';
import Error from './Error';


class BerriesList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            berriesList: [],
            total: undefined,
            next: "",
            previous: null,
            pageNumber: null,
            offSet: null,
            error: null
        }
    }


    getJson = async () => {

        let currentPage = this.props.match.params.page;

        if (parseInt(currentPage) >= 0 && Number(currentPage) >= 0) {

            this.setState({ pageNumber: currentPage });

            var offsetNum = currentPage * 20;

            this.setState({ offSet: offsetNum });

            const jsonData = await pokedex.get("/berry", {    //https://stackoverflow.com/questions/40947650/axios-get-in-url-works-but-with-second-parameter-as-object-it-doesnt
                params: { offset: offsetNum, limit: 20 }
            });



            if (jsonData.data.results.length != 0) {
                this.setState({ berriesList: jsonData.data.results });
                this.setState({ total: jsonData.data.count });
                this.setState({ next: jsonData.data.next });
                this.setState({ previous: jsonData.data.previous });
                this.setState({ error: false });
            }
            // }
            else {
                this.setState({ error: true });
            }

        }
        else {
            this.setState({ error: true });
        }


    }

    componentDidMount() {
        this.getJson();
    }

    componentWillReceiveProps(props) {      //https://stackoverflow.com/questions/48226268/calling-setstate-in-react-from-render-method

        this.props.match.params = props.match.params;
        this.getJson();
    }



    render() {

        if (!this.state.error) {


            if (this.state.berriesList.length > 0) {
                var lists = this.state.berriesList.map((list, i) => {

                    let id = list.url.split("/");
                    id = id[id.length - 2];

                    return (
                        <div key={i + 1} className="item">
                            <div className="content">
                                <div className="header">
                                    <Link key="list.name" to={`/berries/${id}`}>{list.name}</Link>
                                </div>
                            </div>
                        </div>

                    )
                });

               



                var nextPageNumber = parseInt(this.state.pageNumber) + 1;
                var previousPageNumber = parseInt(this.state.pageNumber) - 1;


                var error = (parseInt(this.state.offSet) + parseInt(this.state.berriesList.length)) == this.state.total ? true : false;

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
                        <Link key="next" to={`/berries/page/${nextPageNumber}`}>
                            <button className="ui primary basic button">
                                <h2>Next</h2>
                            </button>
                        </Link>

                }



                if (this.state.pageNumber > 0) {
                    var previous =
                        <Link key="previous" to={`/berries/page/${previousPageNumber}`}>
                            <button className="ui primary basic button">
                                <h2>Previous</h2>
                            </button>
                        </Link>

                }

                var ul =
                <div>
                    <div className="listNav">

                        {previous}

                        {next}
                    </div>
                    <ul>
                        <div className="ui inverted segment">
                            <div className="ui inverted relaxed divided list">
                                {lists}
                            </div>
                        </div>
                    </ul>
                </div>

                var body = <div>
                    <div className="berryListHeader">
                        <h2>Berries List</h2>
                        <h2>Berries are the food which Pokemon eat. Please have a look at all the berries and to know
                            more about each berry please click on the berry. </h2>
                    </div>
                    {ul}
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

export default BerriesList;