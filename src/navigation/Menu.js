import React, { useEffect, useState, useRef, useCallback } from "react";
import { View, Alert, Animated, Linking, StyleSheet } from "react-native";

import {
  useIsDrawerOpen,
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { useDrawerStatus } from "@react-navigation/drawer";
import Storage from "../libs/storage";
import Screens from "./Screens";
import { Block, Text, Switch, Button, Image } from "../components";
import { useData, useTheme } from "../hooks";

const Drawer = createDrawerNavigator();

/* drawer menu screens navigation */
const ScreensStack = () => {
  const { colors } = useTheme();
  const isDrawerOpen = useDrawerStatus() === "open" ? 1 : 0;

  // const isDrawerOpen = false;
  const animation = useRef(new Animated.Value(0)).current;

  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.88],
  });

  const borderRadius = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 16],
  });

  const animatedStyle = {
    borderRadius: borderRadius,
    transform: [{ scale: scale }],
  };

  useEffect(() => {
    // console.log("(isDrawerOpen)", isDrawerOpen);
    Animated.timing(animation, {
      duration: 200,
      useNativeDriver: true,
      toValue: isDrawerOpen ? 1 : 0,
    }).start();
  }, [isDrawerOpen, animation]);

  return (
    <Animated.View
      style={StyleSheet.flatten([
        animatedStyle,
        {
          flex: 1,
          overflow: "hidden",
          borderColor: colors.card,
          borderWidth: isDrawerOpen ? 1 : 0,
        },
      ])}
    >
      {/*  */}
      <Screens />
    </Animated.View>
  );
};

/* custom drawer menu */
const DrawerContent = (props) => {
  const { navigation } = props;
  const { isDark, handleIsDark } = useData();
  const [active, setActive] = useState("Home");
  const { assets, colors, gradients, sizes } = useTheme();
  const labelColor = colors.text;

  const handleNavigation = useCallback(
    (to) => {
      setActive(to);
      navigation.navigate(to);
    },
    [navigation, setActive]
  );

  const handleWebLink = useCallback((url) => Linking.openURL(url), []);

  const logoutSession = async () => {
    const removed = await Storage.removeValue("t-token");
    console.log("removed", removed);
    navigation.navigate("Login");
  };

  // screen list for Drawer menu
  const screens = [
    { name: "Home", to: "Home", icon: assets.home },
    { name: "Create", to: "Create", icon: assets.search },
    // {name: t('screens.articles'), to: 'Articles', icon: assets.document},
    // {name: t('screens.rental'), to: 'Pro', icon: assets.rental},
    // {name: t('screens.profile'), to: 'Profile', icon: assets.profile},
    // {name: t('screens.settings'), to: 'Pro', icon: assets.settings},
    // {name: t('screens.register'), to: 'Register', icon: assets.register},
    // {name: t('screens.extra'), to: 'Pro', icon: assets.extras},
  ];

  return (
    <DrawerContentScrollView
      {...props}
      scrollEnabled
      removeClippedSubviews
      renderToHardwareTextureAndroid
      contentContainerStyle={{
        paddingBottom: sizes.padding,
      }}
    >
      <Block paddingHorizontal={sizes.padding}>
        <Block flex={0} row align="center" marginBottom={sizes.l}>
          <Image
            radius={0}
            width={33}
            height={33}
            color={colors.text}
            source={assets.logo}
            marginRight={sizes.sm}
          />
          <Block>
            <Text size={12} semibold>
              {"UnforgettApp-ble"}
            </Text>
            <Text size={12} semibold>
              {"By Héctor Díaz"}
            </Text>
          </Block>
        </Block>

        {screens?.map((screen, index) => {
          const isActive = active === screen.to;
          return (
            <Button
              row
              justify="flex-start"
              marginBottom={sizes.s}
              key={`menu-screen-${screen.name}-${index}`}
              onPress={() => handleNavigation(screen.to)}
            >
              <Block
                flex={0}
                radius={6}
                align="center"
                justify="center"
                width={sizes.md}
                height={sizes.md}
                marginRight={sizes.s}
                gradient={gradients?.["secondary"]}
                // gradient={gradients[isActive ? "primary" : "white"]}
              >
                <Image
                  radius={0}
                  width={14}
                  height={14}
                  source={screen.icon}
                  color={colors[isActive ? "white" : "black"]}
                />
              </Block>
              <Text p semibold={isActive} color={labelColor}>
                {screen.name}
              </Text>
            </Button>
          );
        })}

        <Block
          flex={0}
          height={1}
          marginRight={sizes.md}
          marginVertical={sizes.sm}
          gradient={gradients.menu}
        />

        <Text semibold transform="uppercase" opacity={0.5}>
          {"Documentación"}
        </Text>

        <Button
          row
          justify="flex-start"
          marginTop={sizes.sm}
          marginBottom={sizes.s}
          onPress={() =>
            handleWebLink(
              "https://github.com/hadmarcano/app-react-native-context-architecture"
            )
          }
        >
          <Block
            flex={0}
            radius={6}
            align="center"
            justify="center"
            width={sizes.md}
            height={sizes.md}
            marginRight={sizes.s}
            gradient={gradients.white}
          >
            <Image
              radius={0}
              width={14}
              height={14}
              color={colors.black}
              source={assets.documentation}
            />
          </Block>
          <Text p color={labelColor}>
            {"Ir a GitHub"}
          </Text>
        </Button>

        {/* <Block row justify="space-between" marginTop={sizes.sm}>
          <Text color={labelColor}>{"modo Oscuro"}</Text>
          <Switch
            checked={isDark}
            onPress={(checked) => {
              handleIsDark(checked);
              Alert.alert("Extras", "Extras");
            }}
          />
        </Block> */}
        <Block
          flex={0}
          height={1}
          marginRight={sizes.md}
          marginVertical={sizes.sm}
          gradient={gradients.menu}
        />
        <Button
          row
          justify="flex-start"
          marginTop={sizes.sm}
          marginBottom={sizes.s}
          onPress={() => logoutSession()}
        >
          <Block
            flex={0}
            radius={6}
            align="center"
            justify="center"
            width={sizes.md}
            height={sizes.md}
            marginRight={sizes.s}
            gradient={gradients.white}
          >
            <Image
              radius={0}
              width={14}
              height={14}
              color={colors.black}
              source={assets.close}
            />
          </Block>
          <Text p color={labelColor}>
            {"Cerrar sesión"}
          </Text>
        </Button>
      </Block>
    </DrawerContentScrollView>
  );
};

/* drawer menu navigation */
export default () => {
  const { gradients } = useTheme();

  return (
    <Block gradient={gradients.light}>
      <Drawer.Navigator
        drawerType="slide"
        overlayColor="transparent"
        sceneContainerStyle={{ backgroundColor: "transparent" }}
        drawerContent={(props) => <DrawerContent {...props} />}
        drawerStyle={{
          flex: 1,
          width: "60%",
          borderRightWidth: 0,
          backgroundColor: "transparent",
        }}
      >
        <Drawer.Screen
          name="Screens"
          component={ScreensStack}
          options={{ headerShown: false }}
        />
      </Drawer.Navigator>
    </Block>
  );
};
