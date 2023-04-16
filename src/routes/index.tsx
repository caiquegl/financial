import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import Coust from "../pages/Coust";
import DetailMarketing from "../pages/DetailMarketing";

import Home from "../pages/Home";
import Market from "../pages/Market";
import HomeCategory from "../pages/HomeCategory";
import AddCategory from "../pages/AddCategory";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const StackMarket = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Coust" component={Coust} />
      <Stack.Screen name="Market" component={Market} />
      <Stack.Screen name="DetailMarketing" component={DetailMarketing} />
    </Stack.Navigator>
  );
};

const StackCategory = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomeCategory" component={HomeCategory} />
      <Stack.Screen name="AddCategory" component={AddCategory} />
      <Stack.Screen name="Market" component={Market} />
      <Stack.Screen name="DetailMarketing" component={DetailMarketing} />
    </Stack.Navigator>
  );
};

export default () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "cart" : "cart-outline";
          } else if (route.name === "Categoria") {
            iconName = focused ? "albums" : "albums-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
        tabBarHideOnKeyboard: true,
      })}>
      <Tab.Screen name="Home" component={StackMarket} />
      <Tab.Screen name="Categoria" component={StackCategory} />
    </Tab.Navigator>
  );
};
