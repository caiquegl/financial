import { Feather } from "@expo/vector-icons";
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
  StyleSheet,
} from "react-native";
import { colors } from "../../style";
import { supabase } from "../../superbase";
import { InputText } from "../components/form/input";
import { InputSelect } from "../components/form/select";
import { IOptionsSelect, defaultOptionsYesOrNo } from "../util";
import { userContext } from "../context/userContext";

export default ({ navigation: { navigate } }) => {
  const { user } = userContext();
  const [loading, setLoading] = useState(false);
  const [allCategory, setAllCategory] = useState<IOptionsSelect[]>([]);
  const methods = useForm();
  const { handleSubmit, control, reset, watch } = methods;

  const onSubmit = useCallback(
    async (data) => {
      try {
        setLoading(true);
        if (data.is_primary === "sim") delete data.sub_category;
        const { data: exist } = await supabase
          .from("category")
          .select("*")
          .filter("user_id", "eq", user.id)
          .filter("name", "ilike", data.name);
        if (exist.length > 0)
          return ToastAndroid.show("Erro, já existe categoria com esse nome", ToastAndroid.SHORT);
        const { error } = await supabase
          .from("category")
          .insert({
            ...data,
            is_primary: data.is_primary === "sim" ? true : false,
            user_id: user.id,
          });
        reset();
        navigate("HomeCategory");
        ToastAndroid.show("Sucesso ao cadastrar categoria", ToastAndroid.SHORT);
      } catch (error) {
        ToastAndroid.show("Erro ao cadastrar categoria", ToastAndroid.SHORT);
      } finally {
        setLoading(false);
      }
    },
    [navigate, reset]
  );

  const fetchCategories = useCallback(async () => {
    try {
      const { data: categories, error } = await supabase
        .from("category")
        .select("id, name")
        .filter("user_id", "eq", user.id);
      if (error) {
        throw error;
      }
      setAllCategory(categories.map((item) => ({ value: item.id, label: item.name })));
    } catch (error) {
      console.error(error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      reset();
      fetchCategories();
    }, [reset, fetchCategories])
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
              {watch("is_primary") === "nao" && (
                <View
                  style={{
                    marginBottom: 20,
                  }}>
                  <InputSelect
                    control={control}
                    name="sub_category"
                    is_required={true}
                    placeholder="principal"
                    label="Categoria principal"
                    options={allCategory}
                  />
                </View>
              )}
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

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    padding: 20,
  },
  title: {
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 18,
    color: colors.black,
    marginLeft: 10,
  },
  formContainer: {
    justifyContent: "space-between",
  },
  buttonContainer: {
    marginTop: 100,
    backgroundColor: colors["green.500"],
    borderWidth: 0,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    height: 45,
  },
  buttonText: {
    fontSize: 16,
    color: colors.white,
  },
});
