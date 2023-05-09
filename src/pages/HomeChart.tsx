import { MaterialIcons } from "@expo/vector-icons";
import { Text, View, TouchableOpacity } from "react-native";
import { colors } from "../../style";
import DonutChart from "../components/DonultChart";
import { supabase } from "../../superbase";
import { useEffect, useState } from "react";

export default ({ navigation: { navigate } }) => {

  const data2 = [
    { value: 40, color: '#FF6347', label: '1' },
    { value: 30, color: '#00CED1', label: '2' },
    { value: 20, color: '#9ACD32', label: '3' },
    { value: 10, color: '#FFC0CB', label: '4' },
  ];

  

  const [data, setData] = useState<any>([])

  function randomHexColor() {
    const hexChars = '0123456789abcdef';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += hexChars[Math.floor(Math.random() * hexChars.length)];
    }
    return color;
  }
  

  async function getCategoryTotalValue() {
    try {
      const { data: categories, error: categoriesError } = await supabase
        .from('category')
        .select('*');
  
      if (categoriesError) {
        console.error(categoriesError);
        return [];
      }
      const { data: filterProducts, error: productsError } = await supabase
      .from('products')
      .select('*')
      
      const products = filterProducts.filter((item: any) => item.category_id)
    
      if (productsError) {
        console.error(productsError);
        return [];
      }
  
      const categoriesTotalValue: any = [];
  
      categories.forEach((category) => {
        const categoryProducts = products.filter(
          (product) => product.category_id === category.id
        );
  
        const totalValue = categoryProducts.reduce(
          (acc, product) => acc + product.value,
          0
        );
  
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
        categoryTotalValue.value =
          (categoryTotalValue.total_value / totalValue) * 100;
      });
  
      setData(categoriesTotalValue) 
    } catch (error) {
      console.error(error);
      return [];
    }
  }
  


  useEffect(() => {
    getCategoryTotalValue()
  }, [])

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
