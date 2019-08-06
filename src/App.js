import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
// import RequestDataLink from './components/RequestDataLink';
// import Pokedex from './API/Pokedex';
import Container from './components/Container';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Pokemon from './components/Pokemon';
import Berries from './components/Berries';
import Error from './components/Error';
import Machines from './components/Machines';
import Home from './components/Home';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: [],
      links: ['Pokemon', "Berries", "Machines"]
    }
  }


  // onSearch = async (data) => {

  //   const lowerCaseData = data.toLowerCase();


  //   if (data == "berries") {
  //     data = "berry";
  //   }
  //   else if (data == "machines") {

  //   }

  //   const requestList = await Pokedex.get(`/${data}`);

  //   const link = `/${lowerCaseData}`;

  //   this.setState({
  //     images: requestList,
  //     link: link
  //   });



  // }

  render() {

    // var list = {
    //   borderColor : "blue"
    // }

    const linkList = this.state.links.map((list) => {
      return (
        <h2> <Link key={`${list.toLowerCase()}`} to={`/${list.toLowerCase()}/page/0`}>
          {list}
        </Link></h2>
      )


    });

    var headerContainer = {
      height: "250px",
      backgroundColor: "black",
      textAlign: "center",
      borderRadius: "25px",
      marginTop: "20px"
    }

    var headerText = {
      color: "white",
      paddingTop: "10px"
    }

    return (
      <Router>
        <div className="ui container">

          <div style={headerContainer}>
            <div style={headerText}>
              <h1>Come Explore the world of Pokemon</h1>
            </div>
            {linkList}
          </div>


          <Switch>

            <Route path="/" exact component={Home} />
            <Route path="/pokemon/page/:page/" exact component={Container} />
            <Route path="/berries/page/:page/" exact component={Container} />
            <Route path="/machines/page/:page/" exact component={Container} />
            <Route path="/pokemon/:id/" exact component={Pokemon} />
            <Route path="/berries/:id/" exact component={Berries} />
            <Route path="/machines/:id/" exact component={Machines} />
            <Route path="/error" exact component={Error} status={404} />
            <Route path="**" component={Error} status={404} />
          </Switch>


          {/* <Route path="/berries/page/:page" exact component={Container} />
          <Route path="/machines/page/:page" exact component={Container} />   */}

        </div>



      </Router>





    );
  }
}

export default App;
