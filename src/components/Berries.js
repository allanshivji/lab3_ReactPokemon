import React from 'react';
import pokedex from '../API/Pokedex';
import '../style/Berries.css';
import Error from './Error';

class Berries extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            firmness: "",
            flavors: [],
            growthTime: null,
            name: "",
            size: null,
            smoothness: null,
            soilDryness: null,
            error: true
        }
    }


    getBerryData = async () => {

        // console.log(this.props.match.params.id);

        let id = this.props.match.params.id;

        if (parseInt(id) >= 0) {

            try {
                let berry = await pokedex.get(`/berry/${id}`);
                // console.log(berry);

                this.setState({ firmness: berry.data.firmness });

                this.setFlavors(berry.data.flavors);

                this.setState({ growthTime: berry.data.growth_time });


                this.setState({ name: berry.data.name });

                this.setState({ size: berry.data.size });

                this.setState({ smoothness: berry.data.smoothness });

                this.setState({ soilDryness: berry.data.soil_dryness });

                this.setState({ error: false });
            }
            catch (e) {
                this.setState({ error: false });
            }
        }

        else {
            this.setState({ error: false });
        }


    }

    setFlavors(flavors) {

        let flavorArr = [];

        for (let flavor in flavors) {
            flavorArr.push(flavors[flavor].flavor.name);
        }



        this.setState({ flavors: flavorArr });

    }

    componentDidMount() {

        // console.log("berries");
        this.getBerryData();

    }

    render() {
        // console.log(this.state.flavors.length);
        if (!this.state.error){
            
            if(this.state.flavors.length > 0) {

            var flavorsList = this.state.flavors.map((flavor) => {

                return (
                    <li key={flavor}><h3>{flavor}</h3></li>
                )
            });

            var berreyData =
                <div>

                    <div className="cherryIndDetail">
                        <h2> Here are the details of {this.state.name.toUpperCase()}. </h2>
                    </div>

                    <div className="berryContainer">
                        <h2 className="berryName"> {this.state.name.toUpperCase()}</h2>
                        <br />
                        <h2>Growth time of {this.state.name} is {this.state.growthTime}.</h2>
                        <br />
                        <h2>Size of {this.state.name} is {this.state.size}.</h2>
                        <br />
                        <h2>Smoothness of {this.state.name} is {this.state.smoothness}</h2>
                        <br />
                        <h2>Soil Dryness of {this.state.name} is {this.state.soilDryness}</h2>
                        <br />

                        <h2>{this.state.name.toUpperCase()} is available in following flavors:</h2>
                        <ul>
                            {flavorsList}
                        </ul>
                    </div>

                </div>

        }
        else {
            console.log("error");
            var berreyData = <Error></Error>
        }

    }



        return (
            <div>
                {berreyData}
            </div>




        )
    };

}


export default Berries;