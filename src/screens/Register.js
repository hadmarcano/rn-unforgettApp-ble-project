import React, { useCallback, useEffect, useState } from "react";
import { Linking, Platform } from "react-native";
import { TextInput } from "react-native";
import { useNavigation } from "@react-navigation/core";
import Storage from "../libs/storage";
import { userSignin } from "../config/apiAuth";
import { useData, useTheme } from "../hooks";
import * as regex from "../constants/regex";
import {
  Block,
  Button,
  Image,
  Text,
  // Input, Checkbox
} from "../components/";

const Register = () => {
  const { isDark } = useData();
  const navigation = useNavigation();
  const { assets, colors, gradients, sizes } = useTheme();
  const isAndroid = Platform.OS === "android";
  const [isNewUser, setIsNewUser] = useState(false);
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = values;

  useEffect(() => {
    setValues({
      name: "",
      email: "",
      password: "",
    });
  }, [isNewUser]);

  const handleChange = useCallback(
    (value) => {
      setValues((state) => ({ ...state, ...value }));
    },
    [setValues]
  );

  const handleSignUp = () => {
    console.log("SignUp", name, email, password);
  };

  const handleSignIn = () => {
    console.log({
      email: email,
      password: password,
    });
    userSignin({
      email: email,
      password: password,
    }).then((response) => {
      if (response.error) {
        console.log(response.error);
        console.log("¡Oh! !Ha ocurrido un error!");
      } else {
        console.log(response);
        StorageToken(response.token);
        navigation.navigate("Inside");
      }
    });
  };

  const StorageToken = async (value) => {
    const ifExist = await Storage.getData("t-token");
    console.log(ifExist);
    if (ifExist === null) {
      await Storage.storeData("t-token", value);
    } else {
      await Storage.removeValue("t-token");
      await Storage.storeData("t-token", value);
    }
  };

  return (
    <Block safe marginTop={sizes.md} blockColor={colors.grayblue}>
      <Block paddingHorizontal={sizes.s}>
        <Block flex={0} style={{ zIndex: 0 }}>
          <Image
            background
            resizeMode="cover"
            padding={sizes.sm}
            radius={sizes.cardRadius}
            source={assets.cardNew}
            height={sizes.height * 0.3}
          >
            <Text
              h4
              center
              bold
              white
              marginBottom={sizes.md}
              // gradient={gradients.primary}
            >
              {"UnforgettApp-ble"}
            </Text>
          </Image>
        </Block>
        {/* register form */}
        <Block
          keyboard
          behavior={!isAndroid ? "padding" : "height"}
          marginTop={-(sizes.height * 0.2 - sizes.l)}
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
              {isNewUser && (
                <Text h5 semibold center>
                  {"Crear mi cuenta"}
                </Text>
              )}
              {!isNewUser && (
                <Text h5 semibold center>
                  {"Inicie sesión"}
                </Text>
              )}

              {/* form inputs */}
              <Block paddingHorizontal={sizes.sm}>
                {isNewUser && (
                  <Block marginVertical={sizes.sm}>
                    <TextInput
                      style={{
                        height: 40,
                        borderColor: "gray",
                        borderRadius: 8,
                        borderWidth: 1,
                        paddingHorizontal: 10,
                      }}
                      placeholder="Nombre completo"
                      onChangeText={(value) => handleChange({ name: value })}
                      value={name}
                    />
                  </Block>
                )}
                <Block marginVertical={sizes.sm}>
                  <TextInput
                    style={{
                      height: 40,
                      borderColor: "gray",
                      borderRadius: 8,
                      borderWidth: 1,
                      paddingHorizontal: 10,
                    }}
                    placeholder="Email"
                    onChangeText={(value) => handleChange({ email: value })}
                    value={email}
                  />
                </Block>
                <Block marginVertical={sizes.sm}>
                  <TextInput
                    style={{
                      height: 40,
                      borderColor: "gray",
                      borderRadius: 8,
                      borderWidth: 1,
                      paddingHorizontal: 10,
                    }}
                    placeholder="Contraseña"
                    onChangeText={(value) => handleChange({ password: value })}
                    value={password}
                  />
                </Block>
              </Block>

              <Block
                row
                flex={0}
                align="center"
                paddingHorizontal={sizes.sm}
              ></Block>
              {!isNewUser && (
                <>
                  <Button
                    marginVertical={sizes.s}
                    marginHorizontal={sizes.sm}
                    gradient={gradients.secondary}
                    onPress={handleSignIn}
                    disabled={false}
                  >
                    <Text bold white transform="uppercase">
                      {"Entrar"}
                    </Text>
                  </Button>
                  <Block
                    row
                    flex={0}
                    align="center"
                    justify="center"
                    marginBottom={sizes.sm}
                    paddingHorizontal={sizes.xxl}
                  >
                    <Block
                      flex={0}
                      height={1}
                      width="50%"
                      end={[1, 0]}
                      start={[0, 1]}
                      gradient={gradients.divider}
                    />
                    <Text center marginHorizontal={sizes.s}>
                      {"o"}
                    </Text>
                    <Block
                      flex={0}
                      height={1}
                      width="50%"
                      end={[0, 1]}
                      start={[1, 0]}
                      gradient={gradients.divider}
                    />
                  </Block>
                  <Button
                    secondary
                    outlined
                    shadow={!isAndroid}
                    marginVertical={sizes.s}
                    marginHorizontal={sizes.sm}
                    onPress={() => {
                      setIsNewUser(true);
                    }}
                  >
                    <Text bold grayblue transform="uppercase">
                      {"Registrarse"}
                    </Text>
                  </Button>
                </>
              )}
              {isNewUser && (
                <>
                  <Button
                    marginVertical={sizes.s}
                    marginHorizontal={sizes.sm}
                    gradient={gradients.secondary}
                    onPress={handleSignUp}
                    disabled={false}
                  >
                    <Text bold white transform="uppercase">
                      {"Crear mi cuenta"}
                    </Text>
                  </Button>
                  <Block
                    row
                    flex={0}
                    align="center"
                    justify="center"
                    marginBottom={sizes.sm}
                    paddingHorizontal={sizes.xxl}
                  >
                    <Block
                      flex={0}
                      height={1}
                      width="50%"
                      end={[1, 0]}
                      start={[0, 1]}
                      gradient={gradients.divider}
                    />
                    {/* <Text center marginHorizontal={sizes.s}>
                      {"o"}
                    </Text> */}
                    <Block
                      flex={0}
                      height={1}
                      width="50%"
                      end={[0, 1]}
                      start={[1, 0]}
                      gradient={gradients.divider}
                    />
                  </Block>
                  <Button
                    secondary
                    outlined
                    shadow={!isAndroid}
                    marginVertical={sizes.s}
                    marginHorizontal={sizes.sm}
                    onPress={() => {
                      setIsNewUser(false);
                    }}
                  >
                    <Text bold grayblue transform="uppercase">
                      {"Inicio de sesión"}
                    </Text>
                  </Button>
                </>
              )}
            </Block>
            <Block flex={0} height={1} width="50%" />
            <Block flex={0} height={1} width="50%" />
            <Text center marginHorizontal={sizes.s}>
              {"Made with 💜  by Héctor Díaz"}
            </Text>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default Register;
