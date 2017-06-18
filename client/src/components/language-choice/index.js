import React, { Component } from 'react';
import { connect } from 'react-redux';

export class LanguageChoice extends Component{
  handleChange(event){
    event.preventDefault();
    this.props.languageProp(event.target.value);   
  }
render(){ 
    return(
      <p>
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