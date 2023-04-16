import { IProduct } from "../hook/productsHook";
import { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../style";
import uuid from "react-native-uuid";
import { supabase } from "../../superbase";

interface IPropsList {
  date: string;
  market: string;
  products?: IProduct[];
  total: string;
}

export default ({ route, navigation }) => {
  const [list, setList] = useState<IPropsList>({} as IPropsList);
  const [loading, setLoading] = useState(false);
  const getProducts = async () => {
    setLoading(true);
    const { data }: any = await supabase
      .from("products")
      .select("*")
      .match({ market_id: route.params.id });

    setList({ ...route.params, products: data });
    setLoading(false);
  };

  useEffect(() => {
    if (route.params && route.params.market) getProducts();
  }, [route.params]);
  return (
    <ScrollView
      style={{
        padding: 10,
      }}>
      <View
        style={{
          flexDirection: "row",
          paddingTop: 20,
          alignItems: "center",
          justifyContent: "center",
          height: 100,
        }}>
        <TouchableOpacity
          style={{
            padding: 10,
          }}
          onPress={() => {
            navigation.navigate("Market");
          }}>
          <Feather name="arrow-left" size={20} color="red" />
        </TouchableOpacity>

        <Text
          style={{
            fontWeight: "bold",
            textTransform: "uppercase",
            fontSize: 18,
            color: colors.black,
            marginLeft: 20,
          }}>
          Visualizar lista
        </Text>
      </View>
      <View
        style={{
          marginBottom: 50,
        }}>
        <View>
          <View
            style={{
              marginBottom: 20,
            }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
              <Text
                style={{
                  fontSize: 18,
                  color: colors["gray.800"],
                  fontWeight: "bold",
                }}>
                Mercado: {list.market}
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  color: colors["gray.800"],
                  fontWeight: "bold",
                }}>
                Data: {list.date}
              </Text>
            </View>
          </View>
          {loading ? (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}>
              <ActivityIndicator />
            </View>
          ) : (
            <>
              {list.products &&
                list.products.length > 0 &&
                list.products.map((el) => (
                  <View
                    style={{
                      marginBottom: 20,
                    }}
                    key={uuid.v4().toString()}>
                    <View
                      style={{
                        borderColor: colors["gray.300"],
                        borderWidth: 1,
                        borderRadius: 5,
                        padding: 10,
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
                          Produto: {el.name}
                        </Text>
                        <Text
                          style={{
                            fontSize: 16,
                            color: colors["gray.800"],
                          }}>
                          Quantidade: {el.qtd}
                        </Text>
                      </View>
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
                          Vl unitário: R${" "}
                          {el.value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </Text>
                        <Text
                          style={{
                            fontSize: 16,
                            color: colors["gray.800"],
                          }}>
                          Total: R$
                          {(el.value * el.qtd).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
            </>
          )}
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
          }}>
          <Text
            style={{
              fontSize: 18,
              color: colors["gray.800"],
              fontWeight: "bold",
            }}>
            Valor Total:
          </Text>
          <Text
            style={{
              fontSize: 18,
              color: colors["red.600"],
              fontWeight: "bold",
              marginLeft: 10,
            }}>
            {list.total}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};
