import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ActivityIndicator, Text, TouchableHighlight, View } from "react-native";
import { colors } from "../../../style";
import { supabase } from "../../../superbase";
import { productHook } from "../../hook/productsHook";
import { InputText } from "../form/input";
import { InputMoney } from "../form/inputMoney";
import { IOptionsSelect } from "../../util";
import { InputSelect } from "../form/select";
import { userContext } from "../../context/userContext";

export default (props) => {
  const { user } = userContext();
  const [loading, setLoading] = useState(false);
  const [opt, setOpt] = useState<IOptionsSelect[]>([]);
  const { insertProduct } = productHook();
  const methods = useForm();
  const { handleSubmit, control, reset } = methods;

  const onSubmit = (data) => {
    try {
      setLoading(true);
      data.qtd = parseInt(data.qtd);
      insertProduct(data);
      reset();
      props.navigation.navigate("List");
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const getCategory = async () => {
    const { data }: any = await supabase.from("category").select().filter("user_id", "eq", user.id);
    setOpt(data.map((option) => ({ value: option.id, label: option.name })));
  };

  useFocusEffect(
    useCallback(() => {
      getCategory();
    }, [])
  );

  return (
    <View
      style={{
        paddingTop: 50,
        paddingLeft: 10,
        paddingRight: 10,
      }}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}>
        <Text
          style={{
            fontSize: 17,
            fontWeight: "bold",
            color: colors["gray.800"],
            textTransform: "uppercase",
          }}>
          Adicionar produto
        </Text>
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
                  label="Nome do produto"
                />
              </View>
              <View
                style={{
                  marginBottom: 20,
                }}>
                <InputText
                  control={control}
                  name="qtd"
                  is_required={true}
                  placeholder="quantidade"
                  label="Insira a quantidade"
                  keyboardType="numeric"
                />
              </View>
              <View
                style={{
                  marginBottom: 20,
                }}>
                <InputMoney
                  control={control}
                  name="value"
                  is_required={true}
                  placeholder="valor"
                  label="Insira o valor"
                />
              </View>
              <View
                style={{
                  marginBottom: 20,
                }}>
                <InputSelect
                  control={control}
                  name="category_id"
                  is_required={true}
                  placeholder="categoria"
                  label="Qual categoria"
                  options={opt}
                />
              </View>
            </View>
            {loading ? (
              <ActivityIndicator />
            ) : (
              <TouchableHighlight
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
                <Text style={{ fontSize: 16, color: colors.white }}>Adicionar produto</Text>
              </TouchableHighlight>
            )}
          </View>
        </FormProvider>
      </View>
    </View>
  );
};
