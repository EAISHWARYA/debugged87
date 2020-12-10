import React from 'react';
import LottieView from 'lottie-react-native';

export default class SantaAnim extends React.Component {
  render() {
    return <LottieView source={require('./assets/11861-santa-claus-on-the-chimney.json')} autoPlay loop />;
  }
}