import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Image } from "react-native";
import Feed from "./pages/Feed";
import New from "./pages/New";

import logo from "./assets/logo.png";

const Routes = createAppContainer(
  createStackNavigator(
    {
      Feed,
      New
    },
    {
      defaultNavigationOptions: {
        headerTintColor: "#000",
        headerTitle: <Image style={{ marginHorizontal: 20 }} source={logo} />,
        HeaderBackTitle: null
      },
      mode: "modal"
    }
  )
);

export default Routes;
