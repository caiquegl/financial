import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import Coust from "../pages/Coust";
import DetailMarketing from "../pages/DetailMarketing";

import Home from "../pages/Home";
import Market from "../pages/Market";
import HomeCategory from "../pages/HomeCategory";
import AddCategory from "../pages/AddCategory";
import CategoryList from "../pages/viewCategory";
import HomeChart from "../pages/HomeChart";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Define as funções para serem passadas como propriedades
const marketScreenOptions = {
  headerShown: false,
};

const categoryScreenOptions = {
  headerShown: false,
};

const tabBarOptions = {
  activeTintColor: "tomato",
  inactiveTintColor: "gray",
  headerShown: false,
  tabBarHideOnKeyboard: true,
};

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={marketScreenOptions}>
      <Stack.Screen name="HomeProducts" component={Home} />
      <Stack.Screen name="Coust" component={Coust} />
      <Stack.Screen name="Market" component={Market} />
      <Stack.Screen name="DetailMarketing" component={DetailMarketing} />
    </Stack.Navigator>
  );
};

const CategoryStack = () => {
  return (
    <Stack.Navigator screenOptions={categoryScreenOptions}>
      <Stack.Screen name="HomeCategory" component={HomeCategory} />
      <Stack.Screen name="AddCategory" component={AddCategory} />
      <Stack.Screen name="CategoryList" component={CategoryList} />
      <Stack.Screen name="Market" component={Market} />
      <Stack.Screen name="DetailMarketing" component={DetailMarketing} />
    </Stack.Navigator>
  );
};

const ChartStack = () => {
  return (
    <Stack.Navigator screenOptions={categoryScreenOptions}>
      <Stack.Screen name="HomeChart" component={HomeChart} />
    </Stack.Navigator>
  );
};
export default () => {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "cart" : "cart-outline";
          } else if (route.name === "Categoria") {
            iconName = focused ? "albums" : "albums-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        ...tabBarOptions
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Categoria" 
        options={{
          tabBarLabel: "Categorias",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "albums" : "albums-outline"}
              color={color}
              size={size}
            />
          ),
        }}>
        {() => <CategoryStack />}
      </Tab.Screen>
      <Tab.Screen name="Chart" 
        options={{
          tabBarLabel: "Gráficos",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "albums" : "albums-outline"}
              color={color}
              size={size}
            />
          ),
        }}>
        {() => <ChartStack />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};
