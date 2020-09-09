import React, { useState, useEffect } from "react";
import { Button, StyleSheet, Text, View, ScrollView } from "react-native";
import { Picker } from "@react-native-community/picker";
import { RootStackParamList } from "../App";
import { StackNavigationProp } from "@react-navigation/stack";
import purchases from "../mockdata";

type HistoryScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "History"
>;
type Props = {
  navigation: HistoryScreenNavigationProp;
};
interface IProducts {
  imageUrl: string;
  name: string;
  quanity: number;
  unitPrice: number;
}

interface IPurchase {
  products: IProducts[];
  id: string;
  time: string;
  paymentRef: string;
}

let month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Juy",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const History: React.FC<Props> = ({ navigation }) => {
  const [duration, setDuration] = useState<string>("");
  const [data, setData] = useState<Array<IPurchase>>(purchases);
  const [seletedDate, setSeletedDate] = useState<number>(0);
  const [name, setName] = useState<string>("Habib");

  useEffect(() => {});

  return (
    <ScrollView style={styles.container}>
      <Text style={{ fontSize: 15 }}>Thanks For Your Patronage</Text>
      <Text style={{ fontSize: 45, color: "#9630EB", fontWeight: "bold" }}>
        {name}
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <View style={styles.pickerWrapper}>
          {Number(seletedDate) !== 1 && (
            <Text
              style={{
                fontSize: 18,

                fontWeight: "bold",
              }}
            >
              Filter BY
            </Text>
          )}
          <Picker
            prompt="hello"
            mode="dropdown"
            selectedValue={duration}
            style={styles.picker}
            onValueChange={(itemValue: any, intemIndex) => {
              setDuration(itemValue);
              if (itemValue === 1) {
                return setData(purchases);
              } else {
                let selectDate = new Date(
                  Date.parse(Date()) - Number(new Date(itemValue))
                );
                setSeletedDate(selectDate);

                let newPurchase = purchases.filter((item) => {
                  return new Date(selectDate) <= new Date(item.time);
                });
                setData(newPurchase);
              }
            }}
          >
            <Picker.Item label="FILTER" value={1} />
            <Picker.Item label="One week ago" value={60 * 60 * 24 * 7 * 1000} />
            <Picker.Item
              label="Two week ago"
              value={60 * 60 * 24 * 14 * 1000}
            />
            <Picker.Item
              label="One month ago"
              value={60 * 60 * 24 * 7 * 4 * 1000}
            />
            <Picker.Item
              label="Two month ago"
              value={60 * 60 * 24 * 7 * 8 * 1000}
            />
            <Picker.Item
              label="Four month"
              value={60 * 60 * 24 * 7 * 16 * 1000}
            />
            <Picker.Item
              label="One Year"
              value={60 * 60 * 24 * 7 * 52 * 1000}
            />
          </Picker>
        </View>
        <Text
          style={{
            fontSize: 18,
            textDecorationLine: "underline",
            textDecorationColor: "#9630EB",
            color: "#9630EB",
            fontWeight: "bold",
          }}
          onPress={() => {
            setData(purchases);
          }}
        >
          Show All
        </Text>
      </View>
      <View style={styles.purchase}>
        {data.map((ref) => {
          let d = new Date(ref.time);
          return (
            <View style={styles.wrapper} key={ref.id + Math.random()}>
              <Text
                style={styles.id}
                onPress={() => {
                  navigation.navigate("Purchase", { purchaseId: ref.id });
                }}
              >
                {ref.id}
              </Text>

              <Text>
                {d.getDate()} {month[d.getUTCMonth()]}, {d.getUTCFullYear()}
              </Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 30,
  },
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    borderBottomColor: "#1f2830",
    paddingTop: 16,
    paddingBottom: 8,
    marginBottom: 8,
  },
  purchase: {},
  id: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#9630EB",
    textDecorationLine: "underline",
  },
  picker: {
    width: 80,
    backgroundColor: "#9630EB",
    color: "white",
  },
  pickerWrapper: {},
});

export default History;
