import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { NativeBaseProvider } from "native-base";
import { TouchableOpacity } from "react-native-gesture-handler";
import Header from "../../reusable/Header";

const width = Dimensions.get("window").width;

const MasterData = ({ navigation }) => {
  return (
    <NativeBaseProvider>
      <Header title="Master Data" navigation={navigation} />
      <View style={styles.container}>
        <View style={styles.taskWrapper}>
          <TouchableOpacity
            onPress={() => navigation.navigate("DataUsman")}
            style={[styles.card, styles.items]}
          >
            <Text style={styles.sectionTitle}>Data Usman</Text>
            <Text>Total 27 Anggota</Text>
          </TouchableOpacity>
          <View style={[styles.card, styles.items]}>
            <Text style={styles.sectionTitle}>Event Pengajian</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("EventKas")}
            style={[styles.card, styles.items]}
          >
            <Text style={styles.sectionTitle}>Event Kas</Text>
            <Text>Total 2 Event Aktif</Text>
          </TouchableOpacity>
          <View style={[styles.card, styles.items]}>
            <Text style={styles.sectionTitle}>File Arsip</Text>
            <Text>Total 82 File</Text>
          </View>
        </View>
      </View>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8eaed",
  },
  taskWrapper: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 8,
    width: "95%",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  card: {
    backgroundColor: "white",
    width: width / 2 - 30,
    marginHorizontal: 5,
    marginVertical: 7,
    paddingVertical: 25,
    paddingHorizontal: 10,
    borderRadius: 8,
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

export default MasterData;