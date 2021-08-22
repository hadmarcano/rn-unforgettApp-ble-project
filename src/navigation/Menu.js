import React, { useEffect, useState, useRef } from "react";
import { View, Alert, Animated, Linking, StyleSheet } from "react-native";

import {
  useIsDrawerOpen,
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentOptions,
  DrawerContentScrollView,
} from "@react-navigation/drawer";

// import Screens from "./Screens";
import {
  Block,
  Text,
  // Switch,
  // Button,
  // Image
} from "../components";

const Menu = () => {
  return (
    <View>
      <Text>DRAWER MENU</Text>
    </View>
  );
};

export default Menu;
