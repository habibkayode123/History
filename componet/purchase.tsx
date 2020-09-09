import React, { useEffect, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
} from "react-native";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../App";
import purchases from "../mockdata";

type PurchaseScreenRouteProp = RouteProp<RootStackParamList, "Purchase">;
type props = {
  route: PurchaseScreenRouteProp;
};

interface Ipurchase {
  products: IProducts[];
  id: string;
  time: string;
  paymentRef: string;
}

interface IProducts {
  imageUrl: string;
  name: string;
  quanity: number;
  unitPrice: number;
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

const Purchase: React.FC<props> = ({ route }) => {
  const [product, setProduct] = useState<Ipurchase>();
  const [totalCost, setTotalCost] = useState<number>(0);
  useEffect(() => {
    let index = purchases.findIndex(
      (ref) => ref.id === route.params.purchaseId
    );

    setProduct((prevState) => purchases[index]);
    setTotalCost((prevState) => {
      let newState = product?.products.reduce(
        (preValue, curValue) =>
          preValue + curValue.unitPrice * curValue.quanity,
        0
      );

      return newState;
    });
  }, [product]);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.details}>
        <View style={styles.detailsInner}>
          <Text style={styles.detailsText}>ORDER ID</Text>
          <Text style={styles.detailValue}>{product?.id}</Text>
        </View>
        <View style={styles.detailsInner}>
          <Text style={styles.detailsText}>Payment Reference</Text>
          <Text style={styles.detailValue}>{product?.paymentRef}</Text>
        </View>
      </View>

      <View style={styles.details}>
        <View style={styles.detailsInner}>
          <Text style={styles.detailsText}>Date</Text>
          <Text style={styles.detailValue}>
            {new Date(product?.time).getDate()},
            {month[new Date(product?.time).getUTCMonth()]},{" "}
            {new Date(product?.time).getUTCFullYear()}
          </Text>
        </View>
        <View style={styles.detailsInner}></View>
      </View>
      <Text style={{ fontSize: 20, marginTop: 16 }}>Total Cost</Text>
      <View
        style={{
          height: 2,
          flex: 1,
          borderBottomColor: "black",
          borderBottomWidth: 0.5,
          marginBottom: 16,
        }}
      ></View>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.textPrice}>Total Price</Text>
        <Text style={styles.textPrice}>${totalCost}</Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.textPrice}> Tax</Text>
        <Text style={styles.textPrice}>
          ${((totalCost * 9.2) / 100).toPrecision(5)}
        </Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ fontSize: 17, fontWeight: "bold" }}> Total Cost</Text>
        <Text
          style={{
            fontSize: 17,
            fontWeight: "bold",
            color: "#9630EB",
            marginBottom: 20,
          }}
        >
          ${((totalCost * 9.2) / 100 + totalCost).toPrecision(5)}
        </Text>
      </View>
      {product?.products.map((item: IProducts, index: number) => {
        return (
          <View key={item.unitPrice + index} style={styles.topWrapper}>
            <Image
              style={styles.image}
              source={require("../assets/mark.jpg")}
            />
            <View style={styles.productWrapper}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>Unit Price: ${item.unitPrice}</Text>
              <Text style={styles.price}>Qty: {item.quanity}</Text>
            </View>
            <View style={styles.costWrapper}>
              <Text style={styles.cost}>Cost</Text>
              <Text style={styles.totalCost}>
                ${item.quanity * item.unitPrice}
              </Text>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 8,
    paddingHorizontal: 8,
    backgroundColor: "white",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  productWrapper: {
    marginLeft: 10,
    position: "relative",
    top: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  priceWrapper: {},
  price: { fontSize: 15, color: "#9630EB", opacity: 0.7 },
  topWrapper: {
    marginBottom: 12,
    backgroundColor: "white",
    flexDirection: "row",
    padding: 8,
  },
  cost: {
    fontSize: 20,
    opacity: 0.8,
    fontWeight: "bold",
  },
  totalCost: {
    color: "#9630EB",
    fontWeight: "bold",
    position: "relative",
    top: 5,
  },
  costWrapper: {
    position: "relative",
    top: 10,
    marginLeft: "auto",
  },
  details: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  detailsInner: {},
  detailsText: {
    opacity: 0.5,
    fontSize: 18,
  },
  detailValue: {
    fontWeight: "600",
    fontSize: 18,
  },

  textPrice: {
    fontSize: 17,
    marginBottom: 16,
  },
});
export default Purchase;
