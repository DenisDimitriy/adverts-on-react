import React, { Component } from 'react'
import Authorization from './components/Authorization'
import UserPanel from './components/UserPanel'
import AdvertList from './components/AdvertList'

export default class Home extends Component {
  constructor (props) {
    super(props)
    var userCurrent = JSON.parse(localStorage.getItem("userCurrent"));
    this.state = {
      userAuthorized: userCurrent ? userCurrent.name : false
    }
  }
  
  handlerAuthorizationChanged = () => {
    var userCurrent = JSON.parse(localStorage.getItem("userCurrent"));
    this.setState ({
      userAuthorized: userCurrent ? userCurrent.name : false
    })
  }

  deleteAdvert = () => {


    var idDeleted = this.props.match.params.idDeleted

    var adverts
    const advertsJSON = localStorage.getItem("adverts");

    if(advertsJSON == null) {
      return
    } else {
      adverts = JSON.parse(localStorage.getItem("adverts"))
    }
    
    for(var i=0; i<adverts.length; i++){
      if(adverts[i].id === +idDeleted && adverts[i].author === this.state.userAuthorized){
        adverts.splice(i,1)
        break
      }
    }

    var advertsString = JSON.stringify(adverts);
    localStorage.setItem("adverts", advertsString);
    
  }

  render() {
    console.log(this.props.match.params.idDeleted)
    this.deleteAdvert()
    
    var userBlock = this.state.userAuthorized ?
      <UserPanel 
        onAuthorizationChanged = {this.handlerAuthorizationChanged.bind(this)}
      /> : 
      <Authorization 
        onAuthorizationChanged = {this.handlerAuthorizationChanged.bind(this)}
      />

    return (
      <div>
        <h2>Главная страница</h2>
        <hr/>
        {userBlock}
        <hr/>
        <AdvertList userAuthorized={this.state.userAuthorized} />
      </div>
    )
  }
}