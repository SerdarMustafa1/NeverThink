import React, { Component } from "react";
import { Image, StatusBar, StyleSheet, View, Dimensions } from "react-native";

import Categories from "../components/CategoriesContainer/Categories";

import LogoGif from "../assets/LogoGif.gif";

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#333333"
  }
});

export default class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Image
            source={LogoGif}
            style={{ height: 120, width: deviceWidth - 36 }}
          />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: 20
          }}
        >
          <Categories />
        </View>
      </View>
    );
  }
}
