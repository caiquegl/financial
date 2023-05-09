import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { supabase } from "../../../superbase";
import { colors } from "../../../style";
import { Feather } from "@expo/vector-icons";
import ExpandableCard from "./card.category";

export default function CategoryList({ navigation: { navigate } }) {
  const [categories, setCategories] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  
  const fetchCategories = async () => {
    setLoading(true)
    const { data: categories, error } = await supabase
      .from("category")
      .select("*")
      .eq("is_primary", true)
      .order("name");

    if (error) {
      console.error("Error fetching categories:", error);
    } else {
      // Recursively fetch subcategories
      const fetchSubcategories = async (category) => {
        const { data: subcategories, error } = await supabase
          .from("category")
          .select("*")
          .eq("sub_category", category.id)
          .order("name");

        if (error) {
          console.error("Error fetching subcategories:", error);
        } else {
          category.sub_category = subcategories
          // Recursively fetch sub-subcategories
          for (const subcategory of subcategories) {
            await fetchSubcategories(subcategory);
          }
        }
      };

      // Fetch subcategories for each primary category
      for (const category of categories) {
        await fetchSubcategories(category);
      }

      setCategories(categories);
    }
    setLoading(false)
  };
 
  useEffect(() => {


    fetchCategories();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
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
             Categoria
          </Text>
        </View>
      </View>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ExpandableCard data={item} title={item.name} reload={fetchCategories}/>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  categoryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: colors["gray.300"],
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  categoryColumnHeader: {
    fontWeight: "bold",
  },
  categoryColumn: {
    flex: 1,
  },
});
