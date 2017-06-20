import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Cookies from 'js-cookie'; 

import { selectLanguage } from './actions';
import { saveDefaultLanguageToDatabase } from '../profile/actions';
import options from './options'; 
import { setUpOptions } from './options';

export class LanguageChoice extends Component{
 
  constructor(props) {
    super(props);

    this.state = {
      optionsOrder: []
    };

    this.accessToken = Cookies.get('accessToken');
  }
  
  componentDidMount() {
    console.log('componentDidMount');
    this.getOrder();
  }

  componentWillReceiveProps() {
    console.log('componentWillReceiveProps');
  }

  updateOptionsOrder(order) {
    this.setState({
      optionsOrder: order
    })
  }

  handleChange(event){
    event.preventDefault();
    if (this.props.forDictaphone) {
      return this.updateDictaphoneLanguage(event.target.value);
    }
    return this.updateDefaultLanguage(event.target.value);
  }

  updateDictaphoneLanguage(language) {
    this.props.dispatch(selectLanguage(language));
  }

  updateDefaultLanguage(language) {
    if (this.accessToken) {
      this.props.dispatch(saveDefaultLanguageToDatabase(language, this.accessToken));
    }
  }

  getOrder() {
    if (!this.props.forDictaphone && this.props.user) {
      const optionsOrder = setUpOptions(this.props.user.defaultLanguage, options);
      this.updateOptionsOrder(optionsOrder);
    }
    else {
      this.updateOptionsOrder(options);
    }
  }

  displayOptions() {
    return this.mapOverOptions(this.state.optionsOrder);
  }

  mapOverOptions(options){
    return options.map((o, index) => {
      return <option key={index} name={o.name} value={o.value}>{o.name}</option>
    });
  }

render(){ 
    return(
        <select name="Language" onChange={(e)=> this.handleChange(e)} >
          { this.displayOptions() }
        </select>
    );
  }
}
const mapStateToProps = state => ({
  userLanguage: state.userLanguage,
  user: state.userData.user
});
export default connect(mapStateToProps)(LanguageChoice);



/*

displayOptions(){
    if (!this.props.forDictaphone && this.props.user) {
      // const optionsAr = setUpOptions(this.props.user.defaultLanguage, options)
      return this.mapOverOptions(options);
    }
  }

mapOverOptions(options){
    return options.map((o, index) => {
       if (this.props.user && options.name === this.props.user.defaultLanguage){
        return (
          <option selected="selected" key={index} name={o.name} value={o.value}>
            {o.name}
          </option> 
        );
       }
       return <option key={index} name={o.name} value={o.value}>{o.name}</option>
    })
  }
*/