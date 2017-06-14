import React, { Component } from 'react';
import { selectLanguage } from './actions';
import { connect } from 'react-redux';

export class LanguageChoice extends Component{
  handleChange(event){
    event.preventDefault();
    let lan = event.target.value;
    this.props.dispatch(selectLanguage(lan));    
  }
render(){ 
    return(
      <p>English to
        <select name="Language" onChange={(e)=> this.handleChange(e)} >
          <option value="en">English</option>
          <option value="zh-CN">Chinese-Simplified</option>
          <option value="zh-TW">Chinese-Traditional</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="ja">Japanese</option>
          <option value="es">Spanish</option>
        </select>
      </p>
    );
  }
}
const mapStateToProps = state => ({
  userLanguage: state.userLanguage
});
export default connect(mapStateToProps)(LanguageChoice);