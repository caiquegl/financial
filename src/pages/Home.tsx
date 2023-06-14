import { MaterialIcons } from "@expo/vector-icons";
import { Text, View, TouchableOpacity, FlatList } from "react-native";
import { colors } from "../../style";
import Header from "../components/Header";
import { Saldo } from "../components/saldo";
import { Despasas } from "../components/despesas";
import Cartao from "../components/cartao";

export default ({ navigation: { navigate } }) => {
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <FlatList
        style={{ paddingHorizontal: 20 }}
        data={[{ key: "saldo" }, { key: "despesas" }, { key: "cartao" }]}
        renderItem={({ item }) => {
          if (item.key === "saldo") {
            return <Saldo />;
          } else if (item.key === "despesas") {
            return <Despasas />;
          } else if (item.key === "cartao") {
            return <Cartao />;
          }
        }}
        // ListFooterComponent={() => (
        //   <>
        //     <TouchableOpacity
        //       style={{
        //         width: 200,
        //         borderWidth: 0,
        //         backgroundColor: colors["green.500"],
        //         padding: 10,
        //         borderRadius: 5,
        //       }}
        //       onPress={() => navigate("Coust")}>
        //       <View
        //         style={{
        //           alignItems: "center",
        //           justifyContent: "space-between",
        //           flexDirection: "row",
        //         }}>
        //         <MaterialIcons name="monetization-on" size={24} color="white" />
        //         <Text style={{ color: colors.white }}>Adicionar compra</Text>
        //       </View>
        //     </TouchableOpacity>
        //     <TouchableOpacity
        //       style={{
        //         width: 200,
        //         marginTop: 10,
        //         backgroundColor: "transparent",
        //         borderColor: colors["green.600"],
        //         borderWidth: 1,
        //         padding: 10,
        //         borderRadius: 5,
        //       }}
        //       onPress={() => navigate("Market")}>
        //       <Text
        //         style={{
        //           color: colors["gray.600"],
        //         }}>
        //         Visualizar compras
        //       </Text>
        //     </TouchableOpacity>
        //   </>
        // )}
      />
    </View>
  );
};
