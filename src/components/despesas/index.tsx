import React from "react";
import { StyleSheet, Text, View } from "react-native";
import DonutChart from "../DonultChart";
import colors from "../../util/colors";

export const Despasas = () => {
  const data = [
    { value: 650, title: "Educação", label: "Educação", color: "#9934CB" },
    { value: 276, title: "Casa", label: "Casa", color: "#0199cb" },
    { value: 220, title: "Alimentação", label: "Alimentação", color: "#cc0102" },
    { value: 290, title: "Outros", label: "Outros", color: "#a5b6c4" },
  ];

  return (
    <View style={localStyles.container}>
      <Text style={localStyles.title}>Despesas por categoria</Text>
      <DonutChart
        data={data}
        strokeWidth={25}
        radius={80}
        centerText={true}
        colors={data.map((item) => item.color)}
        holeRadius={50}
        labelPosition="right"
      />
    </View>
  );
};

const localStyles = StyleSheet.create({
  title: {
    fontSize: 18,
    letterSpacing: 2,
  },
  container: {
    marginVertical: 20,
    backgroundColor: colors.btnText,
    padding: 20,
    borderRadius: 10,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});
