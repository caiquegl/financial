import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import colors from "../../util/colors";
import { Card } from "./card";

interface IProps {
  date: string;
}
const TransactionList = ({ date }: IProps) => {
  const data = [
    {
      id: 1,
      name: "Mercado",
      amount: "R$ 30,00",
      category: "Mercado | Limpeza",
    },
    {
      id: 2,
      name: "Mercado",
      amount: "R$ 30,00",
      category: "Mercado | Limpeza",
    },
    {
      id: 3,
      name: "Mercado",
      amount: "R$ 30,00",
      category: "Mercado | Limpeza",
    },
    {
      id: 4,
      name: "Mercado",
      amount: "R$ 30,00",
      category: "Mercado | Limpeza",
    },
    {
      id: 5,
      name: "Mercado",
      amount: "R$ 30,00",
      category: "Mercado | Limpeza",
    },
  ];

  const renderItem = ({ item }) => (
    <Card name={item.name} category={item.category} amount={item.amount} />
  );

  const getItemLayout = (_, index) => ({
    length: 80, // Altura do item (ajuste conforme necessário)
    offset: 80 * index,
    index,
  });

  return (
    <View style={localStyles.container}>
      <Text style={localStyles.title}>{date}</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
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
});

export default TransactionList;
