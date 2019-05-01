import React,{Component} from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';


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
    }
  }

  onInputChange = (event) => {
    console.log(event.target.vlaue);
  }

  onButtonSubmit = () => {
    console.log('click')
    app.models.predict(
      "a403429f2ddf4b49b307e318f00e528b", 
      "https://samples.clarifai.com/face-det.jpg")
    .then(
    function(response) {
      console.log(response)
    },
    function(err) {
      // there was an error
    }
  );
  }

  render() {
    return (
      <div className="App">
        <Particles
         className='particles'
          params= {particlesOptions}
        />
        <Navigation/>
        <Logo/>
        <Rank/>
        <ImageLinkForm
         onInputChange={this.onInputChange} 
         onButtonSubmit={this.onButtonSubmit}
        />
        
        {/* {<FaceRecognition /> */} 
      </div>
    );
  }
}

export default App;
