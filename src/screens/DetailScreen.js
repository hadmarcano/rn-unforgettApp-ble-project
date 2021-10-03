import React, { useCallback, useEffect, useState } from "react";
import { Linking, Platform } from "react-native";
import { TextInput, Alert } from "react-native";
import { useNavigation } from "@react-navigation/core";
import Storage from "../libs/storage";
import { createTask } from "../config/apiTask";
import { useData, useTheme } from "../hooks";
import * as regex from "../constants/regex";
import {
  Block,
  Button,
  Image,
  Text,
  Switch,
  // Input, Checkbox
} from "../components/";

const DetailScreen = () => {
  const navigation = useNavigation();
  const { assets, colors, gradients, sizes } = useTheme();
  const isAndroid = Platform.OS === "android";
  const labelColor = colors.text;
  const [isCompleted, setIsCompleted] = useState(false);
  const [values, setValues] = useState({
    description: "",
  });

  const { description } = values;

  useEffect(() => {
    setValues({
      description: "",
    });
  }, []);

  const handleChange = useCallback(
    (value) => {
      setValues((state) => ({ ...state, ...value }));
    },
    [setValues]
  );

  const clickCreateTask = async () => {
    const token = await Storage.getData("t-token");
    console.log(token);
    console.log({
      description: description,
      completed: isCompleted,
    });
    createTask(token, {
      description: description,
      completed: isCompleted,
    }).then((response) => {
      if (response.error) {
        console.log(response.error);
        console.log("¡Oh! !Ha ocurrido un error!");
      } else {
        console.log(response);
        Alert.alert(
          "¡Operación Exitosa!",
          `Esta nota ha sido creada correctamente
          `
        );
        navigation.navigate("Home");
        // StorageToken(response.token);
      }
    });
  };

  return (
    <Block safe blockColor={colors.grayblue}>
      <Block paddingHorizontal={sizes.s} color={colors.facebook}>
        {/* create form */}
        <Block
          keyboard
          behavior={!isAndroid ? "padding" : "height"}
          marginTop={sizes.md}
        >
          <Block
            flex={0}
            radius={sizes.sm}
            marginHorizontal="8%"
            shadow={!isAndroid} // disabled shadow on Android due to blur overlay + elevation issue
          >
            <Block
              blur
              flex={0}
              intensity={90}
              radius={sizes.sm}
              overflow="hidden"
              justify="space-evenly"
              tint={colors.blurTint}
              paddingVertical={sizes.sm}
            >
              <Text h5 bold center>
                {"Crear nota"}
              </Text>

              {/* form inputs */}
              <Block paddingHorizontal={sizes.sm}>
                <Block marginVertical={sizes.sm}>
                  <TextInput
                    multiline
                    numberOfLines={10}
                    style={{
                      borderColor: "gray",
                      borderRadius: 8,
                      borderWidth: 1,
                      paddingHorizontal: 10,
                    }}
                    placeholder="Descripción"
                    onChangeText={(value) =>
                      handleChange({ description: value })
                    }
                    value={description}
                  />
                </Block>
                <Block marginVertical={sizes.sm}>
                  <Block row justify="space-between" marginTop={sizes.sm}>
                    <Text bold color={labelColor}>{`${
                      isCompleted === true ? "COMPLETADA" : "PENDIENTE"
                    }`}</Text>
                    <Switch
                      checked={isCompleted}
                      onPress={(checked) => {
                        setIsCompleted(checked);
                        Alert.alert(
                          "¡Atención!",
                          `Esta nota se guardará en estado ${
                            checked === true ? "COMPLETADA" : "PENDIENTE"
                          }`
                        );
                      }}
                    />
                  </Block>
                </Block>
              </Block>

              <Block
                row
                flex={0}
                align="center"
                paddingHorizontal={sizes.sm}
              ></Block>

              <>
                <Button
                  marginVertical={sizes.s}
                  marginHorizontal={sizes.sm}
                  gradient={gradients.primary}
                  onPress={clickCreateTask}
                  disabled={false}
                >
                  <Text bold white transform="uppercase">
                    {"Guardar Nota"}
                  </Text>
                </Button>
              </>
            </Block>
            <Block flex={0} height={1} width="50%" />
            <Block flex={0} height={1} width="50%" />
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default DetailScreen;
