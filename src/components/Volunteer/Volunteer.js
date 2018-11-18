import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { connect } from 'react-redux';
import { setWeather } from '../../redux/primateReducer';
import axios from 'axios';
import './volunteer.css';

class Volunteer extends Component{
    constructor(props) {
        super(props)
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
          };
          this.handleSubmit = this.handleSubmit.bind(this)
    }
     
      onMarkerClick = (props, marker, e) =>
        this.setState({
          selectedPlace: props,
          activeMarker: marker,
          showingInfoWindow: !this.state.showingInfoWindow
        });
     
      onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
          this.setState({
            showingInfoWindow: false,
            activeMarker: null
          })
        }
      };
    //NODEMAILER
    //reset
    resetForm(){
        document.getElementById('contact-form').reset();
    }
    handleSubmit(e){
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        axios.post('/send', {name, email, message}).then((response)=>{
            if (response.data.msg === 'success'){
                alert("Message Sent."); 
                this.resetForm()
            }else if(response.data.msg === 'fail'){
                alert("Message failed to send.")
            }
        })
    }
    render(){
        const style = {
            height: '50vh',
            width: '100%'
        }
        let markers = [
            {lat: 27.980834, lng: -80.384877},
            {lat: 25.980834, lng: -75.384877},
            {lat: 22.980834, lng: -83.384877},
            {lat: 30.980834, lng: -89.384877}
        ]
        let mappedMarkers = markers.map((marker, i) => {
            return <Marker
                        key={i}
                        title={'The marker`s title will appear as a tooltip.'}
                        name={'SOMA'}
                        position={{lat: marker.lat, lng: marker.lng}} />
        })
    return ( 
        <section className="volunteer">
            <div id="map">
                <Map google={this.props.google}
                     onClick={this.onMapClicked} 
                     zoom={14}
                     style={style}
                     initialCenter={{
                         lat: 26.708430,
                         lng: -81.227452
                     }}
                     >
                    <Marker onClick={this.onMarkerClick}
                            name={`1655 Panama Ave, Clewiston, Florida 33440`} />
                        {mappedMarkers}
                    <InfoWindow 
                    onClose={this.onInfoWindowClose}
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}>
                    <div>
                        <h4>The Talkin' Monkeys Project, Inc.</h4>
                        <p>{this.state.selectedPlace.name}</p>
                    </div>
                    </InfoWindow>
                </Map>
            </div>
            <br />
            <div>
                <h2>Contact Us</h2>
                <form id="contact-form">
                    <input id="name" type="text" placeholder='Name...' />
                    <input id="email" type="email" placeholder='Email...' />
                    <textarea id="message" placeholder="Message..."></textarea>
                    <button onClick={(e) => this.handleSubmit(e)}>Contact</button>
                </form>
            </div>
            </section>

     );
    }
}

const mapStateToProps = state => {
    let { weather } = state.primates
    return {
        weather
    }
}
 
export default connect(mapStateToProps, {setWeather})(GoogleApiWrapper({
    apiKey: ('AIzaSyCGJkKZhokrLzwsS_r24djaic8v69ObUlk')
  })(Volunteer));