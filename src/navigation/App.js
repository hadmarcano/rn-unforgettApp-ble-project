import React, { useEffect } from "react";
import { Platform, StatusBar } from "react-native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "../screens/Register";
import Menu from "./Menu";
import { useData, ThemeProvider } from "../hooks";

const AppNavigation = () => {
  const { theme, setTheme } = useData();

  const Stack = createNativeStackNavigator();

  useEffect(() => {
    Platform.OS === "android" && StatusBar.setTranslucent(true);
    // StatusBar.setBarStyle(isDark ? "light-content" : "dark-content");

    return () => {
      StatusBar.setBarStyle("default");
    };
    // },[isDark])
  }, []);

  // load custom fonts
  const [fontsLoaded] = useFonts({
    "OpenSans-Light": theme.assets.OpenSansLight,
    "OpenSans-Regular": theme.assets.OpenSansRegular,
    "OpenSans-SemiBold": theme.assets.OpenSansSemiBold,
    "OpenSans-extraBold": theme.assets.OpenSansExtraBold,
    "OpenSans-Bold": theme.assets.OpenSansBold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const navigationTheme = {
    ...DefaultTheme,
    dark: false,
    colors: {
      ...DefaultTheme.colors,
      primary: String(theme.colors.primary),
      background: String(theme.colors.background),
      card: String(theme.colors.card),
      text: String(theme.colors.text),
      border: "rgba(0,0,0,0)",
      notification: String(theme.colors.primary),
    },
  };

  return (
    <ThemeProvider theme={theme} setTheme={setTheme}>
      <NavigationContainer theme={navigationTheme}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Login" component={Register} />
          <Stack.Screen name="Inside" component={Menu} />
          {/* <Register /> */}
        </Stack.Navigator>
        {/* <Menu /> */}
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default AppNavigation;
