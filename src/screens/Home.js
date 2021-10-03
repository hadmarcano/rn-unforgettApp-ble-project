import React, { useCallback, useState, useEffect } from "react";
import { FlatList, Alert } from "react-native";
import Storage from "../libs/storage";
import { getAllTasks, deleteTask } from "../config/apiTask";
import { useTheme, useData } from "../hooks/";
import { Block, Button, Image, Text, Switch } from "../components/";

const Home = (props) => {
  const { navigation } = props;
  const isAndroid = Platform.OS === "android";
  const { assets, colors, fonts, gradients, sizes, icons } = useTheme();
  const { countPendings, setCountPendings } = useData();
  const labelColor = colors.text;
  const [isCompleted, setIsCompleted] = useState(false);
  const [tab, setTab] = useState(0);
  const [reload, setReload] = useState(false);
  const [notes, setNotes] = useState([]);
  const [pendingNotes, setPendingNotes] = useState([]);

  useEffect(() => {
    gettingTasks();
    setReload(false);
    navigation.addListener("focus", () => {
      gettingTasks();
      setReload(false);
    });
    return function cleanup() {
      navigation.removeListener("focus", () => {
        gettingTasks();
        setReload(false);
      });
    };
  }, [reload, tab]);

  const gettingTasks = () => {
    Storage.getData("t-token").then((token) => {
      console.log("token", token);

      getAllTasks(token).then((tasks) => {
        console.log("tasks", tasks);
        if (tab == 0) {
          setNotes(tasks);
          // const pendingTasks = tasks.filter((item) => item.completed == false);
          // setCountPendings(pendingTasks.length);
        } else {
          const pendingTasks = tasks.filter((item) => item.completed == false);
          setNotes(pendingTasks);
          // setCountPendings(pendingTasks.length);
        }
      });
    });
  };
  // const gettingTasks = async () => {
  //   const token = await Storage.getData("t-token");
  //   console.log("token", token);
  //   const tasks = await getAllTasks(token);
  //   console.log("tasks", tasks);
  //   if (tab == 0) {
  //     setNotes(tasks);
  //     // const pendingTasks = tasks.filter((item) => item.completed == false);
  //     // setCountPendings(pendingTasks.length);
  //   } else {
  //     const pendingTasks = tasks.filter((item) => item.completed == false);
  //     setNotes(pendingTasks);
  //     // setCountPendings(pendingTasks.length);
  //   }
  // };

  const truncateString = (str, num) => {
    if (str.length > num) {
      let subStr = str.substring(0, num);
      return subStr + "...";
    } else {
      return str;
    }
  };

  const handlePress = (note) => {
    console.log("note", note);
    // setReload(true);
    navigation.navigate("Update", { note });
  };

  const clickDeleting = async (taskId) => {
    const token = await Storage.getData("t-token");
    console.log(token);
    console.log("TASK DELETED", taskId);
    deleteTask(token, taskId).then((response) => {
      if (response.error) {
        console.log(response.error);
        console.log("¡Oh! !Ha ocurrido un error!");
      } else {
        console.log(response);
        Alert.alert(
          "¡Operación Exitosa!",
          `Esta nota ha sido ELIMINADA correctamente
          `
        );
        setReload(true);
        // StorageToken(response.token);
      }
    });
    // navigation.navigate("Update", { note });
  };

  const handleTaskTypes = useCallback(
    (tab) => {
      setTab(tab);
      setNotes(tab === 0 ? 1 : 0);
    },
    [setTab]
  );

  return (
    <Block>
      {/* search input */}
      {/* <Block color={colors.card} flex={0} padding={sizes.padding}>
        <Input search placeholder={"Buscar"} />
      </Block> */}

      {/* toggle products list */}
      <Block
        row
        flex={0}
        align="center"
        justify="center"
        color={colors.card}
        paddingBottom={sizes.sm}
      >
        <Button
          onPress={() => {
            handleTaskTypes(0);
          }}
        >
          <Block row align="center">
            <Block
              flex={0}
              radius={6}
              align="center"
              justify="center"
              marginRight={sizes.s}
              width={sizes.socialIconSize}
              height={sizes.socialIconSize}
              gradient={gradients?.[tab === 0 ? "primary" : "secondary"]}
            >
              <Image source={assets.articles} color={colors.white} radius={0} />
            </Block>
            <Text p font={fonts?.[tab === 0 ? "medium" : "normal"]}>
              {"Mis Notas"}
            </Text>
          </Block>
        </Button>
        <Block
          gray
          flex={0}
          width={1}
          marginHorizontal={sizes.sm}
          height={sizes.socialIconSize}
        />
        <Button
          onPress={() => {
            handleTaskTypes(1);
          }}
        >
          <Block row align="center">
            <Block
              flex={0}
              radius={6}
              align="center"
              justify="center"
              marginRight={sizes.s}
              width={sizes.socialIconSize}
              height={sizes.socialIconSize}
              gradient={gradients?.[tab === 1 ? "primary" : "secondary"]}
            >
              <Image
                radius={0}
                color={colors.white}
                source={assets.documentation}
              />
            </Block>
            <Text p font={fonts?.[tab === 1 ? "medium" : "normal"]}>
              {"Notas Pendientes"}
            </Text>
          </Block>
        </Button>
      </Block>

      {/* Mis notas list */}
      <Block
        scroll
        paddingHorizontal={sizes.padding}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: sizes.l }}
      >
        <Block row wrap="wrap" justify="space-between" marginTop={sizes.sm}>
          {/*  */}
          {notes.length == 0 ? (
            <Text p font={fonts?.[tab === 1 ? "medium" : "normal"]}>
              {"... Sin notas."}
            </Text>
          ) : (
            <FlatList
              data={notes}
              renderItem={({ item }) => (
                <Block
                  flex={0}
                  style={{ zIndex: 0 }}
                  item={item}
                  marginBottom={sizes.md}
                >
                  <Image
                    background
                    resizeMode="cover"
                    padding={sizes.sm}
                    radius={sizes.cardRadius}
                    source={assets.cardNew}
                    height={sizes.height * 0.2}
                  >
                    <Text
                      h5
                      center
                      bold
                      white
                      marginBottom={sizes.xs}
                      // gradient={gradients.primary}
                    >
                      {truncateString(item.description, 50)}
                    </Text>

                    <Block
                      flex={0}
                      radius={6}
                      align="center"
                      justify="center"
                      marginRight={sizes.s}
                      width={sizes.socialIconSize}
                      height={sizes.socialIconSize}
                      gradient={gradients?.["black"]}
                    >
                      {item.completed == true ? (
                        <Image
                          radius={0}
                          color={colors.success}
                          source={assets.check}
                        />
                      ) : (
                        <Image
                          radius={0}
                          color={colors.warning}
                          source={assets.warning}
                        />
                      )}
                    </Block>

                    <Block row align="center">
                      <Button
                        marginVertical={sizes.xs}
                        marginHorizontal={sizes.md}
                        width={100}
                        gradient={gradients.primary}
                        onPress={() => handlePress(item)}
                      >
                        <Text bold white transform="uppercase">
                          {"Ver detalle"}
                        </Text>
                      </Button>
                      <Button
                        marginVertical={sizes.xs}
                        marginHorizontal={sizes.md}
                        width={100}
                        gradient={gradients.secondary}
                        onPress={() => clickDeleting(item._id)}
                      >
                        <Text bold white transform="uppercase">
                          {"Borrar"}
                        </Text>
                      </Button>
                    </Block>
                  </Image>
                </Block>
              )}
              keyExtractor={(item) => item._id}
            />
          )}
          {/* {products?.map((product) => (
            <Product {...product} key={`card-${product?.id}`} />
          ))} */}
        </Block>
      </Block>
    </Block>
  );
};

export default Home;
