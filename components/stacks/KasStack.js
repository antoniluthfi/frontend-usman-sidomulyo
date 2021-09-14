import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListKas from "../screen/kas/ListKas";
import DetailKas from "../screen/kas/DetailKas";
import HistoryKasPerAnggota from "../screen/kas/HistoryKasPerAnggota";
import DetailHistory from "../screen/kas/DetailHistory";
import FormPenyetoran from "../screen/kas/FormPenyetoran";
import HistoryKasKeseluruhan from "../screen/kas/HistoryKasKeseluruhan";

const Stack = createNativeStackNavigator();

const KasStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ListKas" component={ListKas} />
      <Stack.Screen name="DetailKas" component={DetailKas} />
      <Stack.Screen name="FormPenyetoran" component={FormPenyetoran} />
      <Stack.Screen
        name="HistoryKasPerAnggota"
        component={HistoryKasPerAnggota}
      />
      <Stack.Screen name="DetailHistory" component={DetailHistory} />
      <Stack.Screen
        name="HistoryKasKeseluruhan"
        component={HistoryKasKeseluruhan}
      />
    </Stack.Navigator>
  );
};

export default KasStack;