import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../../util/colors";
import { Card } from "./card";

const Cartao = () => {
  const [active, setActive] = useState<"FECHADA" | "ABERTA">("FECHADA");

  const data = [
    {
      id: 1,
      name: "Nubank",
      dueDate: "Vence amanhã",
      amount: "R$ 30,00",
    },
    {
      id: 2,
      name: "Nubank",
      dueDate: "Vence amanhã",
      amount: "R$ 30,00",
    },
    {
      id: 3,
      name: "Nubank",
      dueDate: "Vence amanhã",
      amount: "R$ 30,00",
    },
    {
      id: 4,
      name: "Nubank",
      dueDate: "Vence amanhã",
      amount: "R$ 30,00",
    },
    {
      id: 5,
      name: "Nubank",
      dueDate: "Vence amanhã",
      amount: "R$ 30,00",
    },
  ];

  const renderItem = ({ item }) => (
    <Card name={item.name} dueDate={item.dueDate} amount={item.amount} />
  );

  const renderSeparator = () => <View style={localStyles.separator} />;

  const getItemLayout = (_, index) => ({
    length: 80, // Altura do item (ajuste conforme necessário)
    offset: 80 * index,
    index,
  });

  const handleSetActive = (status) => {
    setActive(status);
  };

  return (
    <View style={localStyles.container}>
      <Text style={localStyles.title}>Cartão de crédito</Text>
      <View style={localStyles.buttonsContainer}>
        <TouchableOpacity
          style={[localStyles.button, active === "ABERTA" && { backgroundColor: colors.activeBtn }]}
          onPress={() => handleSetActive("ABERTA")}>
          <Text style={[localStyles.buttonText, active === "ABERTA" && { color: colors.btnText }]}>
            Faturas abertas
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            localStyles.button,
            active === "FECHADA" && { backgroundColor: colors.activeBtn },
          ]}
          onPress={() => handleSetActive("FECHADA")}>
          <Text style={[localStyles.buttonText, active === "FECHADA" && { color: colors.btnText }]}>
            Faturas fechadas
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={renderSeparator}
        getItemLayout={getItemLayout}
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
  buttonsContainer: {
    flexDirection: "row",
    marginVertical: 10,
  },
  button: {
    marginRight: 10,
    backgroundColor: colors.inactiveBtn,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  buttonText: {
    color: colors.textPrimary,
  },
  separator: {
    height: 1,
    backgroundColor: colors.inactiveBtn, // Cor do divisor
  },
});

export default Cartao;
