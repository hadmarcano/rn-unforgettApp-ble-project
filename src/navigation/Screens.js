import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Text } from "../components";
import { Home, Create, Update } from "../screens";
import { useScreenOptions, useTheme } from "../hooks";

const Stack = createStackNavigator();

export default () => {
  const screenOptions = useScreenOptions();
  const { assets, colors, gradients, sizes } = useTheme();

  return (
    <Stack.Navigator screenOptions={screenOptions.stack}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: (
            <Text p black marginLeft={sizes.s}>
              {"  Inicio"}
            </Text>
          ),
        }}
      />

      <Stack.Screen
        name="Create"
        component={Create}
        options={screenOptions.create}
      />
      <Stack.Screen
        name="Update"
        component={Update}
        options={screenOptions.create}
      />
      {/* <Stack.Screen
        name="Components"
        component={Components}
        options={screenOptions.components}
      />

      <Stack.Screen
        name="Articles"
        component={Articles}
        options={{ title: t("navigation.articles") }}
      />

      <Stack.Screen name="Pro" component={Pro} options={screenOptions.pro} />

      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />*/}
    </Stack.Navigator>
  );
};
