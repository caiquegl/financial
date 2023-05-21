import React, { useCallback, useEffect, useState } from "react";
import { IOptionsSelect, defaultOptionsYesOrNo } from "../../util";
import { useFocusEffect } from "@react-navigation/native";
import { supabase } from "../../../superbase";
import { ActivityIndicator, Text, View, TouchableOpacity } from "react-native";
import { FormProvider, useForm } from "react-hook-form";
import { InputText } from "../../components/form/input";
import { InputSelect } from "../../components/form/select";
import { colors } from "../../../style";
import { userContext } from "../../context/userContext";

export const UpdateCategory = ({ id, name, sub_category, is_primary, reload }) => {
  const [loading, setLoading] = useState(false);
  const { user } = userContext();
  const [allCategory, setAllCategory] = useState<IOptionsSelect[]>([]);
  const methods = useForm();
  const { handleSubmit, control, reset, watch, setValue } = methods;

  const onSubmit = async (category: any) => {
    try {
      if (category.sub_category === category.id) return;
      setLoading(true);
      if (category.is_primary === "sim") delete category.sub_category;

      category = { ...category, is_primary: category.is_primary === "sim" ? true : false };
      if (category.is_primary) {
        await supabase.from("category").update({ sub_category: null }).in("sub_category", [id]);
      }

      const { error } = await supabase
        .from("category")
        .update({ ...category })
        .eq("id", id);
      console.log(error);
      reload();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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

  async function getSubcategoryInfo() {
    // A categoria é uma subcategoria
    const { data: subcategory, error } = await supabase
      .from("category")
      .select("sub_category")
      .filter("user_id", "eq", user.id)
      .eq("id", id);

    if (error) {
      console.error("Erro ao buscar subcategoria:", error);
      return null;
    }
    if (subcategory.length > 0) {
      const { data: category } = await supabase
        .from("category")
        .select("id, name")
        .eq("id", subcategory[0].sub_category)
        .filter("user_id", "eq", user.id);
      setValue("sub_category", category[0].id);
    }
  }

  useEffect(() => {
    setValue("is_primary", is_primary ? "sim" : "nao");
    setValue("name", name);
    setValue("sub_category", sub_category);
    getSubcategoryInfo();
  }, [id, name, sub_category, is_primary]);

  return (
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
              <Text style={{ fontSize: 16, color: colors.white }}>Atualizar Categoria</Text>
            </TouchableOpacity>
          )}
        </View>
      </FormProvider>
    </View>
  );
};
