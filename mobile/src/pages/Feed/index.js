import React, { Component } from "react";

import { View, Text, TouchableOpacity, Image } from "react-native";
import camera from "../../assets/camera.png";
// import { Container } from './styles';

export default class Feed extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate("New")}>
        <Image source={camera} />
      </TouchableOpacity>
    )
  });
  render() {
    return (
      <View>
        <Text>Feed</Text>
      </View>
    );
  }
}
