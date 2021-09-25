import React from "react";
import "moment/locale/id";
import moment from "moment";
import { View, StyleSheet, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/core";
import {
  NativeBaseProvider,
  Box,
  Text,
  Pressable,
  HStack,
  Avatar,
  Center,
  Spinner,
  VStack,
  Input,
} from "native-base";
import NumberFormat from "react-number-format";
import { Portal, Provider } from "react-native-paper";
import { SwipeListView } from "react-native-swipe-list-view";
import RNHTMLtoPDF from "react-native-html-to-pdf";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Header from "../../reusable/Header";
import FloatingButton from "../../reusable/FloatingButton";
import KasHelper from "./KasHelper";

const DetailKas = ({ navigation, route }) => {
  const { title, id } = route.params;
  const {
    detailKas,
    setDetailKas,
    loadDetailKas,
    setLoadDetailKas,
    dataArusKas,
    setDataArusKas,
    pemasukan,
    setPemasukan,
    pengeluaran,
    setPengeluaran,
    keyword,
    setKeyword,
    getDetailKas,
    getArusKasBulanIni,
    filterUser,
  } = KasHelper();

  const buatPdf = async () => {
    const options = {
      html: `
        <div style="text-align: center;"><h3>Arus ${title} Usman Sidomulyo</h3></div>
        <h5 style="padding: 0; margin: 0;">Total Pemasukan : Rp. ${pemasukan}</h5>
        <h5 style="padding: 0; margin: 0;">Total Pemasukan : Rp. ${pengeluaran}</h5>
        <table style="border-collapse: collapse; width: 100%;">
          <thead>
            <tr style="background-color: #04aa6d; color: white;">
              <th style="border: 1px solid #ddd; padding: 8px;">#</th>
              <th style="border: 1px solid #ddd; padding: 8px;">Nama</th>
              <th style="border: 1px solid #ddd; padding: 8px;">Kas</th>
              <th style="border: 1px solid #ddd; padding: 8px;">Nominal</th>
              <th style="border: 1px solid #ddd; padding: 8px;">Keterangan</th>
              <th style="border: 1px solid #ddd; padding: 8px;">Waktu</th>
            </tr>
          </thead>
          <tbody>
            ${dataArusKas.map(
              (kas, i) => `
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">${i + 1}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${
                  kas.users.name
                }</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${
                  parseInt(kas.jenis) ? "Masuk" : "Keluar"
                }</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">Rp. ${
                  kas.nominal
                }</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${
                  kas.keterangan ? kas.keterangan : "Tanpa keterangan"
                }</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${moment(
                  kas.created_at
                ).format("dddd, Do MMM YYYY h:mm:ss a")}</td>  
              </tr>
            `
            )}
          </tbody>
        </table>
      `,
      fileName: `Arus ${title} Usman Sidomulyo_${Date.now()}`,
      directory: "Download",
    };

    const file = await RNHTMLtoPDF.convert(options);

    Alert.alert(
      "Berhasil",
      `Berhasil download file, file tersimpan di ${file.filePath}`,
      [{ text: "Oke deh", style: "cancel" }],
      { cancelable: true }
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        await getDetailKas(id);
        await getArusKasBulanIni(id);
      };

      fetchData();

      return () => {
        setDetailKas({});
        setLoadDetailKas(true);
        setDataArusKas([]);
        setPemasukan(0);
        setPengeluaran(0);
      };
    }, [])
  );

  return (
    <NativeBaseProvider>
      <Header title={`Detail ${title}`} navigation={navigation} />

      {loadDetailKas ? (
        <Center flex={1}>
          <Spinner size="lg" color="warning.500" />
          <Text>Tunggu yaa ...</Text>
        </Center>
      ) : (
        <View style={styles.container}>
          <Provider>
            <Portal>
              <View style={styles.wrapper}>
                <View style={[styles.card, styles.items]}>
                  <View style={{ marginLeft: 10 }}>
                    <FontAwesome5 name="money-check" size={60} />
                  </View>
                  <View style={{ marginLeft: 15 }}>
                    <Text>
                      Total Pemasukan :{" "}
                      {detailKas &&
                        detailKas.total &&
                        detailKas.total.map((val, i) =>
                          val.jenis ? (
                            <NumberFormat
                              key={i}
                              value={val.total}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"Rp. "}
                              renderText={(value, props) => (
                                <Text>{value}</Text>
                              )}
                            />
                          ) : (
                            `Rp. 0`
                          )
                        )}
                    </Text>
                    <Text>
                      Total Pengeluaran :{" "}
                      {detailKas &&
                        detailKas.total &&
                        detailKas.total.map((val, i) =>
                          !val.jenis ? (
                            <NumberFormat
                              key={i}
                              value={val.total}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"Rp. "}
                              renderText={(value, props) => (
                                <Text>{value}</Text>
                              )}
                            />
                          ) : (
                            `Rp. 0`
                          )
                        )}
                    </Text>
                    <Text>{moment().format("dddd, Do MMMM YYYY")}</Text>
                  </View>
                </View>
              </View>

              <View
                style={{
                  flexWrap: "wrap",
                  flexDirection: "row",
                  backgroundColor: "#fff",
                  marginTop: 20,
                  borderTopRightRadius: 20,
                  borderTopLeftRadius: 20,
                  // elevation: 5,
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
                    value={keyword}
                    onChangeText={(text) => {
                      setKeyword(text);
                      filterUser(text);
                    }}
                  />
                </View>
              </View>

              <Basic
                navigation={navigation}
                loadDetailKas={loadDetailKas}
                detailKas={detailKas}
              />

              <FloatingButton
                navigation={navigation}
                id={id}
                actions={[
                  {
                    icon: "cash-plus",
                    label: "Setor Kas",
                    onPress: () =>
                      navigation.navigate("FormPenyetoran", {
                        method: "post",
                        event_kas_id: id,
                      }),
                    small: false,
                  },
                  {
                    icon: "cash-minus",
                    label: "Buat Pengeluaran",
                    onPress: () =>
                      navigation.navigate("FormPenyetoran", {
                        method: "post",
                        event_kas_id: id,
                      }),
                    small: false,
                  },
                  {
                    icon: "file",
                    label: "History Penyetoran",
                    onPress: () =>
                      navigation.navigate("HistoryKasKeseluruhan", {
                        id: id,
                      }),
                    small: false,
                  },
                  {
                    icon: "download",
                    label: "Unduh PDF",
                    onPress: buatPdf,
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

const Basic = ({ navigation, loadDetailKas, detailKas }) => {
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
              <Text>{item.users.name}</Text>
              <Text>
                <NumberFormat
                  value={item.total}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"Rp. "}
                  renderText={(value, props) => (
                    <Text style={{ fontSize: 13, color: "gray" }}>{value}</Text>
                  )}
                />
              </Text>
            </VStack>
          </HStack>
        </HStack>
      </Pressable>
    </Box>
  );

  const renderHiddenItem = (data, rowMap) => (
    <HStack flex={1} pl={1}>
      <Pressable
        px={4}
        ml="auto"
        bg="dark.500"
        justifyContent="center"
        onPress={() => {
          navigation.navigate("HistoryKasPerAnggota", {
            event_id: data.item.event_kas_id,
            user: { id: data.item.users.id, name: data.item.users.name },
            total: data.item.total,
            bulan_ini: data.item.total,
          });
        }}
        _pressed={{
          opacity: 0.5,
        }}
      >
        <Ionicons name="eye" size={30} color="#fff" />
      </Pressable>
    </HStack>
  );

  return (
    <Box bg="white" safeArea flex={1}>
      <SwipeListView
        data={loadDetailKas ? [] : detailKas.per_user}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-65}
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

export default DetailKas;
