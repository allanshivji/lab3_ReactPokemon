import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import PokemonList from './PokemonList';
import Pokemon from './Pokemon';
import Error from './Error';
import Berries from './Berries';
import BerriesList from './BerriesList';
import MachinesList from './MachinesList';
import Machines from './Machines';


class Container extends Component {

   render() {
      // console.log(this.props);
      // let currentPage = this.props.match.params.page;

      console.log("hi guyssssss");

      return (
         <div>
            <Switch>
               <Route path="/pokemon/page/:page" component={PokemonList} />
               <Route path="/berries/page/:page" component={BerriesList} />
               <Route path="/machines/page/:page" component={MachinesList} />
               <Route path="/pokemon/:id" component={Pokemon} />
               <Route path="/berries/:id" component={Berries} />
               <Route path="/machines/:id" component={Machines} />
               <Route path="*" component={Error} status={404}/>
               {/* <Route path="/error" component={Error} /> */}
            </Switch>
         </div>
      );
   }
}

export default Container;