import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import { colors } from "../../style";
import { supabase } from "../../superbase";
import { InputText } from "../components/form/input";
import { InputSelect } from "../components/form/select";
import { defaultOptionsYesOrNo } from "../util";

export default ({ navigation: { navigate } }) => {
  const [loading, setLoading] = useState(false);
  const methods = useForm();
  const { handleSubmit, control, reset } = methods;

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const { error } = await supabase.from("category").insert(data);
      reset();
      navigate("HomeCategory");
      ToastAndroid.show("Sucesso ao cadastrar categoria", ToastAndroid.SHORT);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      reset();
    }, [])
  );

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
        <View
          style={{
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
          }}>
          <TouchableOpacity
            style={{
              marginTop: 20,
            }}
            onPress={() => {
              navigate("HomeCategory");
            }}>
            <Feather name="arrow-left" size={20} color="red" />
          </TouchableOpacity>

          <Text
            style={{
              fontWeight: "bold",
              textTransform: "uppercase",
              fontSize: 18,
              color: colors.black,
              marginLeft: 10,
            }}>
            Adicionar Categoria
          </Text>
        </View>
      </View>
      <View
        style={{
          marginTop: 50,
        }}>
        <FormProvider {...methods}>
          <View
            style={{
              justifyContent: "space-between",
            }}>
            <View>
              <View
                style={{
                  marginBottom: 20,
                }}>
                <InputText
                  control={control}
                  name="name"
                  is_required={true}
                  placeholder="nome"
                  label="Nome da categoria"
                />
              </View>
              <View
                style={{
                  marginBottom: 20,
                }}>
                <InputSelect
                  control={control}
                  name="is_primary"
                  is_required={true}
                  placeholder="principal"
                  label="Categoria principal"
                  options={defaultOptionsYesOrNo}
                />
              </View>
            </View>
            {loading ? (
              <ActivityIndicator />
            ) : (
              <TouchableOpacity
                onPress={handleSubmit(onSubmit)}
                style={{
                  marginTop: 100,
                  backgroundColor: colors["green.500"],
                  borderWidth: 0,
                  borderRadius: 5,
                  alignItems: "center",
                  justifyContent: "center",
                  height: 45,
                }}>
                <Text style={{ fontSize: 16, color: colors.white }}>Adicionar Categoria</Text>
              </TouchableOpacity>
            )}
          </View>
        </FormProvider>
      </View>
    </ScrollView>
  );
};
