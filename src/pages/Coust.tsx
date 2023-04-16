import { MaterialIcons } from "@expo/vector-icons";
import { FormProvider, useForm } from "react-hook-form";
import { InputText } from "../components/form/input";
import { Ionicons } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerListProduct from "../components/drawerListProduct";
import { productHook } from "../hook/productsHook";
import uuid from "react-native-uuid";
import { useState } from "react";
import moment from "moment";
import { calcTotal } from "../util";
import { supabase } from "../../superbase";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
  TouchableOpacity,
} from "react-native";
import { colors } from "../../style";
const Drawer = createDrawerNavigator();

const AddList = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [remove, setRemove] = useState(false);
  const methods = useForm();
  const { listProduct, removeProduct, reset } = productHook();
  const { handleSubmit, control } = methods;

  const onSubmit = async (dataBody: any) => {
    try {
      // if (listProduct.length == 0) return;
      setLoading(true);
      let body = {
        ...dataBody,
        // products: listProduct,
        date: moment().format("DD/MM/YYYY"),
        total: calcTotal(listProduct),
      };
      const { data }: any = await supabase.from("market").insert(body).select();

      for await (let prod of listProduct) {
        await supabase.from("products").insert({
          name: prod.name,
          market_id: data[0].id,
          qtd: prod.qtd,
          value: prod.value,
          category_id: prod.category_id,
        });
      }
      reset();
      navigation.navigate("Home");
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView>
      <View
        style={{
          padding: 20,
        }}>
        <View
          style={{
            width: "100%",
            height: 100,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text
            style={{
              marginLeft: 20,
              fontWeight: "bold",
              textTransform: "uppercase",
              fontSize: 18,
              color: colors.black,
            }}>
            Criar lista
          </Text>
        </View>
        <FormProvider {...methods}>
          <InputText
            control={control}
            name="market"
            is_required={true}
            placeholder="nome"
            label="Nome do mercado"
          />
          <View
            style={{
              marginTop: 15,
              marginBottom: 20,
            }}>
            {listProduct.length > 0 &&
              listProduct.map((product, index: number) => (
                <View
                  style={{
                    marginBottom: 20,
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                  key={uuid.v4().toString()}>
                  <View
                    style={{
                      borderColor: colors["gray.300"],
                      borderWidth: 1,
                      borderRadius: 5,
                      padding: 10,
                      width: remove ? "auto" : "100%",
                    }}>
                    <View
                      style={{
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexDirection: "row",
                      }}>
                      <View
                        style={{
                          width: "45%",
                          paddingRight: 8,
                        }}>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                          }}>
                          <Text
                            style={{
                              color: colors["gray.500"],
                              fontSize: 16,
                            }}>
                            Nome:
                          </Text>
                          <Text
                            style={{
                              fontSize: 16,
                              color: colors["gray.500"],
                              fontWeight: "bold",
                              marginLeft: 5,
                            }}
                            numberOfLines={1}
                            ellipsizeMode="tail">
                            {product.name.length < 15
                              ? product.name
                              : product.name.substring(0, 15)}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginTop: 7,
                          }}>
                          <Text
                            style={{
                              color: colors["gray.500"],
                              fontSize: 16,
                            }}>
                            Quantidade:
                          </Text>
                          <Text
                            style={{
                              fontSize: 16,
                              color: colors["gray.500"],
                              fontWeight: "bold",
                              marginLeft: 5,
                            }}>
                            {product.qtd}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          width: "45%",
                        }}>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                          }}>
                          <Text
                            style={{
                              color: colors["gray.500"],
                              fontSize: 16,
                            }}>
                            Vl unitário:
                          </Text>
                          <Text
                            style={{
                              fontSize: 16,
                              color: colors["gray.500"],
                              fontWeight: "bold",
                              marginLeft: 5,
                            }}>
                            R$ {product.value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginTop: 7,
                            justifyContent: "flex-end",
                          }}>
                          <Text
                            style={{
                              color: colors["gray.500"],
                              fontSize: 16,
                            }}>
                            Total:
                          </Text>
                          <Text
                            style={{
                              fontSize: 16,
                              color: colors["gray.500"],
                              fontWeight: "bold",
                              marginLeft: 5,
                            }}>
                            R$
                            {(product.value * product.qtd)
                              .toFixed(2)
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  {remove && (
                    <TouchableHighlight
                      onPress={() => {
                        let newList: any = [];
                        listProduct.forEach((l, index2) => {
                          if (index2 != index) newList.push(l);
                        });
                        removeProduct(newList);
                      }}>
                      <View
                        style={{
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}>
                        <Ionicons name="md-trash-bin-outline" size={20} color="red" />
                      </View>
                    </TouchableHighlight>
                  )}
                </View>
              ))}
          </View>
          {listProduct.length > 0 && (
            <View>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 17,
                  color: colors["gray.800"],
                }}>
                Total: {calcTotal(listProduct)}
              </Text>
            </View>
          )}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: 15,
              paddingBottom: 15,
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: colors["green.500"],
                width: "45%",
                height: 45,
                borderRadius: 6,
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingLeft: 7,
                paddingRight: 7,
              }}
              onPress={() => navigation.openDrawer()}>
              <Ionicons name="add-circle-outline" size={24} color="white" />
              <Text style={{ color: colors.white, fontSize: 17 }}>Adicionar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: remove ? "transparent" : colors["red.600"],
                width: "45%",
                borderWidth: 2,
                borderColor: colors["red.600"],
                height: 45,
                borderRadius: 6,
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingLeft: 7,
                paddingRight: 7,
              }}
              onPress={() => setRemove(!remove)}>
              <Ionicons
                name="ios-remove-circle-outline"
                size={24}
                color={remove ? "black" : "white"}
              />
              <Text
                style={{
                  fontSize: 17,
                  color: remove ? colors.black : colors.white,
                }}>
                Remover
              </Text>
            </TouchableOpacity>
          </View>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              style={{
                width: "100%",
                height: 50,
                borderRadius: 7,
                backgroundColor: colors["green.600"],
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}>
              <MaterialIcons name="monetization-on" size={24} color="white" />
              <Text
                style={{ color: colors.white, marginLeft: 10, fontSize: 16, fontWeight: "bold" }}>
                Finalizar compra
              </Text>
            </TouchableOpacity>
          )}
          <View
            style={{
              marginTop: 10,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: "transparent",
                borderWidth: 0,
              }}
              onPress={() => reset()}>
              <Text
                style={{
                  borderBottomWidth: 1,
                  paddingBottom: 4,
                  borderColor: colors["red.600"],
                  fontSize: 14,
                  color: colors["red.600"],
                  paddingLeft: 5,
                  paddingRight: 5,
                }}>
                Limpar lista
              </Text>
            </TouchableOpacity>
          </View>
        </FormProvider>
      </View>
    </ScrollView>
  );
};

export default () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          width: "80%",
        },
        headerShown: false,
      }}
      initialRouteName="List"
      drawerContent={(props) => <DrawerListProduct {...props} />}>
      <Drawer.Screen name="List" component={AddList} />
    </Drawer.Navigator>
  );
};
