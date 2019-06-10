import React,{Component} from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import LogIn from './components/LogIn/logIn'
import Register from './components/Register/Register'


const app = new Clarifai.App({
  apiKey: '8f6a85b40e5c4d6ca80aee8a93decda5'
 });

const particlesOptions =  {
  particles: {
    number: { 
      value: 100,
      density : {
        enable: true,
        value_area: 1000,
      }
    }
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      route: 'LogIn'
    }
  }

  onInputChange = (event) => {
    this.setState({input:event.target.vlaue});
  }

  onButtonSubmit = () => {
   this.setState ({imageUrl: this.state.input})
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL, 
      this.state.input)
    .then(
    function(response) {
      console.log(response.outputs[0].data.regions[0].region_info.bounding_box)
    },
    function(err) {
      // there was an error
    }
  );
  }
  onRouteChange = (route) => {
    this.setState({route: route})

  }

  render() {
    return (

      <div className="App">
        <Particles
         className='particles'
          params= {particlesOptions}
        />
        <Navigation onRouteChange={this.onRouteChange}/>
        { this.state.route === 'home' 
          ? <div>
              <Logo/>
              <Rank/>
              <ImageLinkForm
              onInputChange={this.onInputChange} 
              onButtonSubmit={this.onButtonSubmit}
              /> 
              <FaceRecognition imageUrl={this.state.imageUrl} /> 
          </div>
          : (
            this.state.route === 'LogIn'
            ?  <LogIn onRouteChange = {this.onRouteChange} / >
            :  <Register onRouteChange = {this.onRouteChange}/>
          )
        }
      </div>
    );
  }
}

export default App;
