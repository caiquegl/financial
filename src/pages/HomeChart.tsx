import { View } from "react-native";
import DonutChart from "../components/DonultChart";
import { supabase } from "../../superbase";
import { useEffect, useState } from "react";
import { userContext } from "../context/userContext";

export default ({ navigation: { navigate } }) => {
  const { user } = userContext();

  const [data, setData] = useState<any>([]);

  function randomHexColor() {
    const hexChars = "0123456789abcdef";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += hexChars[Math.floor(Math.random() * hexChars.length)];
    }
    return color;
  }

  async function getCategoryTotalValue() {
    try {
      const { data: categories, error: categoriesError } = await supabase
        .from("category")
        .select("*")
        .filter("user_id", "eq", user.id);

      if (categoriesError) {
        console.error(categoriesError);
        return [];
      }
      const { data: filterProducts, error: productsError } = await supabase
        .from("products")
        .select("*")
        .filter("user_id", "eq", user.id);

      const products = filterProducts.filter((item: any) => item.category_id);

      if (productsError) {
        console.error(productsError);
        return [];
      }

      const categoriesTotalValue: any = [];

      categories.forEach((category) => {
        const categoryProducts = products.filter((product) => product.category_id === category.id);

        const totalValue = categoryProducts.reduce((acc, product) => acc + product.value, 0);

        categoriesTotalValue.push({
          label: category.name,
          title: category.name,
          total_value: totalValue,
          color: randomHexColor(),
          value: 0, // Inicialmente setamos como 0
        });
      });

      // Agora calculamos a porcentagem do valor total em cada categoria
      const totalValue = categoriesTotalValue.reduce(
        (acc, categoryTotalValue) => acc + categoryTotalValue.total_value,
        0
      );

      categoriesTotalValue.forEach((categoryTotalValue) => {
        categoryTotalValue.value = (categoryTotalValue.total_value / totalValue) * 100;
      });

      setData(categoriesTotalValue);
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  useEffect(() => {
    getCategoryTotalValue();
  }, []);

  return (
    <View
      style={{
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <DonutChart
        data={data}
        strokeWidth={15}
        radius={80}
        centerText={true}
        colors={data.map((item) => item.color)}
        holeRadius={40}
      />
    </View>
  );
};
