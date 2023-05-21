import React, { useState, useCallback } from "react";
import { StyleSheet, Text, TouchableOpacity, View, FlatList, Animated, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Drawer from "../../components/Drawer";
import { UpdateCategory } from "./updateCategory";
import { supabase } from "../../../superbase";
import { userContext } from "../../context/userContext";

const ExpandableCard = ({ title, data, reload }) => {
  const { user } = userContext();
  const [expanded, setExpanded] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const hasSubcategory = data.sub_category && data.sub_category.length > 0;

  const toggleCard = useCallback(() => {
    setExpanded(!expanded);
    Animated.timing(animation, {
      toValue: expanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [animation, expanded]);

  const deleteCategory = async (categoryId, categoryName) => {
    try {
      // Verifica se a category é uma subcategory
      const { data: subCategories, error: subCategoriesError } = await supabase
        .from("category")
        .select("*")
        .filter("user_id", "eq", user.id)
        .eq("sub_category", categoryId);
      if (subCategoriesError) {
        throw subCategoriesError;
      }

      // Caso a category seja uma subcategory, pede confirmação para continuar
      if (subCategories.length > 0) {
        const shouldDeleteSubcategories = await new Promise((resolve) => {
          Alert.alert(
            "Confirmação",
            `A categoria ${categoryName} contém ${subCategories.length} subcategorias. Deseja apagá-las também?`,
            [
              { text: "Cancelar", style: "cancel", onPress: () => resolve(false) },
              { text: "Apagar", style: "destructive", onPress: () => resolve(true) },
            ],
            { cancelable: false }
          );
        });

        if (!shouldDeleteSubcategories) {
          return;
        }
      }

      // Verifica se a category ou alguma subcategory está vinculada a produtos
      const { data: products, error: productsError } = await supabase
        .from("products")
        .select("*")
        .filter("user_id", "eq", user.id)
        .in("category_id", [categoryId, ...subCategories.map((subCategory) => subCategory.id)]);
      if (productsError) {
        throw productsError;
      }

      // Caso a category ou alguma subcategory esteja vinculada a produtos, pede confirmação para continuar
      if (products.length > 0) {
        const shouldDeleteProducts = await new Promise((resolve) => {
          Alert.alert(
            "Confirmação",
            `A categoria ${categoryName} ou alguma subcategoria está vinculada a ${products.length} produtos. Deseja apagá-los também?`,
            [
              { text: "Cancelar", style: "cancel", onPress: () => resolve(false) },
              { text: "Apagar", style: "destructive", onPress: () => resolve(true) },
            ],
            { cancelable: false }
          );
        });

        if (!shouldDeleteProducts) {
          return;
        }
      }

      const { error: productsErrorDelete } = await supabase
        .from("products")
        .delete()
        .filter("user_id", "eq", user.id)
        .in("category_id", [categoryId, ...subCategories.map((subCategory) => subCategory.id)]);
      if (productsErrorDelete) {
        throw productsErrorDelete;
      }

      // Deleta a category e subcategories (se houver) do supabase
      const { data, error } = await supabase
        .from("category")
        .delete()
        .filter("user_id", "eq", user.id)
        .in("id", [categoryId, ...subCategories.map((subCategory) => subCategory.id)]);
      if (error) {
        throw error;
      }
      // Exibe notificação de sucesso
      Alert.alert(
        "Sucesso",
        `A categoria ${categoryName} e todas as suas subcategorias e produtos vinculados foram apagados com sucesso!`
      );

      reload();
    } catch (error) {
      // Exibe notificação de erro
      Alert.alert("Erro", `Não foi possível apagar a categoria: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleCard} activeOpacity={0.8} style={styles.header}>
        <View style={[styles.header, { flex: 1 }]}>
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity
            onPress={() => deleteCategory(data.id, data.name)}
            style={{ marginLeft: 10 }}>
            <Ionicons name="trash" size={18} color="red" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => setDrawerOpen(!drawerOpen)}>
          <Ionicons name="ellipsis-vertical" size={24} color="gray" />
        </TouchableOpacity>
        {hasSubcategory && (
          <Ionicons
            name={expanded ? "chevron-up-outline" : "chevron-down-outline"}
            size={24}
            color="#666"
          />
        )}
      </TouchableOpacity>
      {hasSubcategory && expanded && (
        <View style={styles.content}>
          <FlatList
            data={data.sub_category}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ExpandableCard data={item} title={item.name} reload={reload} />
            )}
          />
        </View>
      )}
      <Drawer isOpen={drawerOpen} onClose={() => setDrawerOpen(!drawerOpen)} right={true}>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <UpdateCategory
            id={data.id}
            is_primary={data.is_primary}
            name={data.name}
            sub_category={data.sub_category}
            reload={reload}
          />
        </View>
      </Drawer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  content: {
    padding: 16,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default ExpandableCard;
