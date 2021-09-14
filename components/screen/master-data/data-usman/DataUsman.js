import React, { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/core";
import {
  Avatar,
  Box,
  HStack,
  VStack,
  Input,
  NativeBaseProvider,
  Pressable,
  Text,
  View,
  Center,
  Spinner,
} from "native-base";
import { SwipeListView } from "react-native-swipe-list-view";
import { StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import "moment/locale/id";
import moment from "moment";
import Header from "../../../reusable/Header";
import DataUsmanHelper from "./DataUsmanHelper";
import FloatingButton from "../../../reusable/FloatingButton";
import { Portal, Provider } from "react-native-paper";

const DataUsman = ({ navigation }) => {
  const {
    dataUsman,
    setDataUsman,
    loadDataUsman,
    setLoadDataUsman,
    getDataUsman,
  } = DataUsmanHelper(navigation);

  useFocusEffect(
    useCallback(() => {
      getDataUsman();

      return () => {
        setDataUsman([]);
        setLoadDataUsman(true);
      };
    }, [])
  );

  return (
    <NativeBaseProvider>
      <Header title="Data Usman" navigation={navigation} />

      {loadDataUsman ? (
        <Center flex={1}>
          <Spinner size="lg" color="warning.500" />
          <Text>Tunggu yaa ...</Text>
        </Center>
      ) : (
        <View style={styles.container}>
          <Provider>
            <Portal>
              <View
                style={{
                  flexWrap: "wrap",
                  flexDirection: "row",
                  backgroundColor: "#fff",
                }}
              >
                <View
                  style={{ marginVertical: 15, paddingLeft: 15, width: "97%" }}
                >
                  <Input
                    type="text"
                    placeholder="Cari anggota disini ..."
                    InputRightElement={
                      <Ionicons
                        name="search"
                        size={30}
                        style={{ marginRight: 10 }}
                      />
                    }
                    // value={keyword}
                    onChangeText={(text) => {
                      setKeyword(text);
                      filter(text);
                    }}
                  />
                </View>
              </View>

              <Basic navigation={navigation} dataUsman={dataUsman} />

              <FloatingButton
                navigation={navigation}
                actions={[
                  {
                    icon: "plus",
                    label: "Buat baru",
                    onPress: () =>
                      navigation.navigate("FormUsman", {
                        payload: null,
                        method: "post",
                        judul: "Form Usman",
                      }),
                    small: false,
                  },
                  {
                    icon: "file",
                    label: "Lihat PDF",
                    onPress: () => console.log("lihat pdf"),
                    small: false,
                  },
                ]}
              />
            </Portal>
          </Provider>
        </View>
      )}
    </NativeBaseProvider>
  );
};

export default DataUsman;

const Basic = ({ navigation, dataUsman }) => {
  const onRowDidOpen = (rowKey) => {
    console.log("This row opened", rowKey);
  };

  const renderItem = ({ item, index }) => (
    <Box>
      <Pressable
        style={{ elevation: -100 }}
        onPress={() => console.log("You touched me")}
        alignItems="center"
        bg="white"
        borderBottomColor="trueGray.200"
        borderBottomWidth={1}
        justifyContent="center"
        height={50}
        underlayColor={"#AAA"}
        _pressed={{
          bg: "trueGray.200",
        }}
        py={8}
      >
        <HStack width="100%" px={4}>
          <HStack space={2} alignItems="center">
            <Avatar color="white" bg={"warning.500"}>
              <Ionicons name="person" size={30} color="white" />
            </Avatar>
            <VStack>
              <Text>{item.name}</Text>
              <Text style={{ fontSize: 12, color: "grey" }}>
                Terdaftar pada{" "}
                {moment(item.created_at).format("dddd, Do MMMM YYYY")}
              </Text>
            </VStack>
          </HStack>
        </HStack>
      </Pressable>
    </Box>
  );

  const renderHiddenItem = (data, rowMap) => (
    <HStack flex={1} pl={2}>
      <Pressable
        px={4}
        ml="auto"
        bg="dark.500"
        justifyContent="center"
        onPress={() =>
          navigation.navigate("DetailUsman", {
            user: data.item,
          })
        }
        _pressed={{
          opacity: 0.5,
        }}
      >
        <Ionicons name="eye" size={30} color="#fff" />
      </Pressable>
      <Pressable
        px={4}
        bg="red.500"
        justifyContent="center"
        onPress={() =>
          navigation.navigate("FormUsman", {
            payload: data.item,
            method: "put",
            judul: "Update Usman",
          })
        }
        _pressed={{
          opacity: 0.5,
        }}
      >
        <Ionicons name="pencil" size={30} color="#fff" />
      </Pressable>
    </HStack>
  );

  return (
    <Box bg="white" safeArea flex={1}>
      <SwipeListView
        data={dataUsman}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-130}
        previewRowKey={"0"}
        previewOpenValue={-40}
        previewOpenDelay={1000}
        onRowDidOpen={onRowDidOpen}
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 8,
    width: "95%",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  card: {
    width: "100%",
    backgroundColor: "white",
    paddingVertical: 25,
    paddingHorizontal: 10,
    borderRadius: 8,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {
    shadowColor: "#7f5df0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});