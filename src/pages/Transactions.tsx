import React, { useEffect, useState } from "react";
import { View, FlatList, Text, TouchableOpacity } from "react-native";
import Header from "../components/Header";
import colors from "../util/colors";
import Balanco from "../components/balanco";
import TransactionList from "../components/transactionList";
import SelectComponent from "../components/beatifulldrawer";
import { AntDesign } from "@expo/vector-icons";
import moment from "moment";

moment.locale("pt-br");

const styles = {
  container: {
    flex: 1,
    backgroundColor: colors.green,
  },
  listContainer: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
  },
  separator: {
    height: 1,
    backgroundColor: colors.inactiveBtn,
  },
};

export default ({ navigation: { navigate } }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [select, setSelect] = useState<any>({
    selected: {
      label: moment().format("MMMM"),
      value: moment().format("MM"),
    },
  });
  const options = [
    { label: "Janeiro", value: "01" },
    { label: "Fevereiro", value: "02" },
    { label: "Março", value: "03" },
    { label: "Abril", value: "04" },
    { label: "Maio", value: "05" },
    { label: "Junho", value: "06" },
    { label: "Julho", value: "07" },
    { label: "Agosto", value: "08" },
    { label: "Setembro", value: "09" },
    { label: "Outubro", value: "10" },
    { label: "Novembro", value: "11" },
    { label: "Dezembro", value: "12" },
  ];
  const renderSeparator = () => <View style={styles.separator} />;

  const renderItem = ({ item }) => {
    if (item.type === "balanco") {
      return <Balanco />;
    } else if (item.type === "transaction") {
      return <TransactionList date={item.date} />;
    } else {
      return null; // Caso nenhum item corresponda, retorne null ou um componente vazio
    }
  };

  useEffect(() => {
    console.log(select);
  }, [select]);
  return (
    <View style={styles.container}>
      <Header />
      <TouchableOpacity
        onPress={() => setOpen(true)}
        style={{
          position: "relative",
          top: -10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <Text
          style={{
            color: "#fff",
            textAlign: "center",
            fontSize: 20,
            letterSpacing: 1,
            fontWeight: "bold",
            textTransform: "capitalize",
          }}>
          {select.selected.label}
        </Text>
        <AntDesign name="caretdown" size={20} color="white" style={{ marginLeft: 10 }} />
      </TouchableOpacity>
      <SelectComponent
        open={open}
        options={options}
        setOpen={() => setOpen(false)}
        setValue={(value: any) => {
          setSelect({ selected: { ...value } });
          setOpen(false);
        }}
      />
      <FlatList
        contentContainerStyle={styles.listContainer}
        data={[
          { key: "balanco", type: "balanco" },
          { type: "transaction", key: "transaction1", date: "Quarta, 05" },
          { type: "transaction", key: "transaction2", date: "Quinta, 06" },
          { type: "transaction", key: "transaction3", date: "Sexta, 07" },
        ]}
        ItemSeparatorComponent={renderSeparator}
        renderItem={renderItem}
      />
    </View>
  );
};
