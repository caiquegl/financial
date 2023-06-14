import React from "react";
import { Text, View } from "react-native";
import colors from "../../util/colors";
import { AntDesign, Feather } from "@expo/vector-icons";

interface IProps {
  name: string;
  amount: string;
  category: string;
}

export const Card = ({ amount, name, category }: IProps) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: 80,
      }}>
      <View
        style={{
          flexDirection: "row",
        }}>
        <View
          style={{
            backgroundColor: colors.darkGreen,
            width: 40,
            height: 40,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
            marginRight: 10,
          }}>
          <AntDesign name="home" size={24} color="white" />
        </View>
        <View
          style={{
            marginLeft: 10,
          }}>
          <Text
            style={{
              fontWeight: "bold",
            }}>
            {name}
          </Text>
          <Text>{category}</Text>
        </View>
      </View>
      <View>
        <Text
          style={{
            color: colors.red,
          }}>
          {amount}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
          }}>
          <View
            style={{
              backgroundColor: colors.darkGreen,
              width: 20,
              height: 20,
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
              marginRight: 10,
            }}>
            <AntDesign name="home" size={12} color="white" />
          </View>
          <View
            style={{
              backgroundColor: colors.red,
              width: 20,
              height: 20,
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
              marginRight: 10,
            }}>
            <Feather name="credit-card" size={12} color="white" />
          </View>
        </View>
      </View>
    </View>
  );
};
