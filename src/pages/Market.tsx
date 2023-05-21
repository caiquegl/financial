import { IProduct } from "../hook/productsHook";
import uuid from "react-native-uuid";
import { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { supabase } from "../../superbase";
import { colors } from "../../style";
import { userContext } from "../context/userContext";

interface IPropsList {
  date: string;
  market: string;
  products: IProduct[];
  total: string;
}

export default ({ navigation }) => {
  const { user } = userContext();
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<IPropsList[]>([]);
  const getList = async () => {
    try {
      setLoading(true);
      const { data, error }: any = await supabase
        .from("market")
        .select("*")
        .filter("user_id", "eq", user.id);
      setList(data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getList();
  }, []);
  return (
    <ScrollView
      style={{
        padding: 10,
      }}>
      <View
        style={{
          flexDirection: "row",
          padding: 20,
        }}>
        <TouchableOpacity
          style={{
            marginTop: 20,
          }}
          onPress={() => {
            navigation.navigate("HomeProducts");
          }}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
            }}>
            <Feather name="arrow-left" size={20} color="red" />
            <Text
              style={{
                fontWeight: "bold",
                textTransform: "uppercase",
                fontSize: 18,
                color: colors.black,
                marginLeft: 10,
              }}>
              Visualizar compras lista
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      {loading ? (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}>
          <ActivityIndicator />
        </View>
      ) : (
        <View
          style={{
            marginTop: 20,
          }}>
          <View>
            {list.length > 0 &&
              list.map((el) => (
                <View key={uuid.v4().toString()} style={{ marginBottom: 20 }}>
                  <TouchableOpacity onPress={() => navigation.navigate("DetailMarketing", el)}>
                    <View
                      style={{
                        borderColor: colors["gray.300"],
                        borderWidth: 1,
                        borderRadius: 5,
                        padding: 10,
                        backgroundColor: colors["gray.200"],
                      }}>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: colors["gray.800"],
                          }}>
                          Mercado: {el.market}
                        </Text>
                        <Text
                          style={{
                            fontSize: 16,
                            color: colors["gray.800"],
                          }}>
                          Data: {el.date}
                        </Text>
                      </View>
                      <Text
                        style={{
                          fontSize: 16,
                          color: colors["gray.800"],
                          marginTop: 10,
                        }}>
                        Valor total: {el.total}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
};
