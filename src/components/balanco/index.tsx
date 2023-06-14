import { EvilIcons, Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import colors from "../../util/colors";

const Balanco = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 20,
      }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}>
        <View>
          <EvilIcons name="lock" size={30} color="black" />
        </View>
        <View style={{ marginLeft: 10 }}>
          <Text>Saldo atual</Text>
          <Text
            style={{
              fontSize: 16,
              color: colors.darkGreen,
              fontWeight: "bold",
            }}>
            R$ 3.284,00
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}>
        <View>
          <Ionicons name="wallet-outline" size={24} color="black" />
        </View>
        <View style={{ marginLeft: 10 }}>
          <Text>Balanço mensal</Text>
          <Text
            style={{
              fontSize: 16,
              color: colors.darkGreen,
              fontWeight: "bold",
            }}>
            R$ 3.284,00
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Balanco;
