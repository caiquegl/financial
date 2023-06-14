import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../../util/colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.btnText,
    padding: 20,
    borderRadius: 10,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginTop: 20,
  },
});

export const Saldo = () => {
  return (
    <View style={styles.container}>
      <Text style={localStyles.title}>Saldo em contas</Text>
      <Text style={localStyles.amount}>R$ 3.284,00</Text>
      <View style={localStyles.iconContainer}>
        <AntDesign name="eyeo" size={24} color="black" />
      </View>
      <View style={localStyles.valuesContainer}>
        <Values type="up" />
        <Values type="down" />
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 16,
  },
  amount: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 5,
    letterSpacing: 2,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  valuesContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
});

interface IProps {
  type: "up" | "down";
}

export const Values = ({ type }: IProps) => {
  const config = {
    up: {
      color: colors.darkGreen,
      icon: "arrowup",
      title: "Entrada",
    },
    down: {
      color: colors.red,
      icon: "arrowdown",
      title: "Saída",
    },
  };

  return (
    <View style={localStyles.valuesContainer}>
      <View
        style={{
          backgroundColor: config[type]?.color,
          width: 50,
          height: 50,
          borderRadius: 25,
          alignItems: "center",
          justifyContent: "center",
          marginRight: 10,
        }}>
        <AntDesign name={config[type]?.icon} size={24} color="white" />
      </View>
      <View>
        <Text>{config[type]?.title}</Text>
        <Text
          style={{
            color: config[type]?.color,
            fontSize: 16,
            fontWeight: "bold",
          }}>
          R$ 3.000,00
        </Text>
      </View>
    </View>
  );
};
