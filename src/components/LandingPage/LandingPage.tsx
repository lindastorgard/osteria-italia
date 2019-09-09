import React, { Component } from 'react';


import './LandingPage.scss';


interface ILandingPageState{
  offset: number;
}

class LandingPage extends Component <{}, ILandingPageState>{
  constructor(props: any) {
    super(props)
    this.state = {
      offset: 0
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.parallaxShift);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.parallaxShift);
  }
  parallaxShift = () => {
    this.setState({
      offset: window.pageYOffset
    });
  };

  render() {
    return (
      <div
        className='header-background'
        style={{ backgroundPositionY: this.state.offset}}
      >
        <section
          className='info-container'
          style={{ bottom: this.state.offset / 2 }}
        >
          <h1>Kevin Simpson</h1>
          <h3>Front End Developer</h3>
        </section>
     </div>
      
    	)
    }
	}
export default LandingPage;