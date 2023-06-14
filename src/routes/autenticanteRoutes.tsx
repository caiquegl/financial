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
import colors from "../util/colors";
import Transactions from "../pages/Transactions";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const marketScreenOptions = {
  headerShown: false,
};

const categoryScreenOptions = {
  headerShown: false,
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
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          elevation: 0,
          height: 50,
          borderRadius: 19,
          border: "none",
          backgroundColor: colors.green,
          marginBottom: 5,
          marginHorizontal: 10,
        },
        activeTintColor: colors.btnText,
        inactiveTintColor: colors.textSecondary,
        headerShown: false,
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;

          if (route.name === "Início") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Transacao") {
            iconName = "list";
          } else if (route.name === "Categoria") {
            iconName = focused ? "albums" : "albums-outline";
          } else if (route.name === "Chart") {
            iconName = focused ? "albums" : "albums-outline";
          }

          return <Ionicons name={iconName} color={color} size={size} />;
        },
      })}>
      <Tab.Screen
        name="Início"
        component={HomeStack}
        options={{
          tabBarLabelStyle: {
            fontSize: 12,
          },
          tabBarActiveTintColor: colors.btnText,
          tabBarInactiveTintColor: colors.textSecondary,
        }}
      />
      <Tab.Screen
        name="Transacao"
        component={Transactions}
        options={{
          tabBarLabel: "Transação",
          tabBarLabelStyle: {
            fontSize: 12,
          },
          tabBarActiveTintColor: colors.btnText,
          tabBarInactiveTintColor: colors.textSecondary,
        }}
      />
      <Tab.Screen
        name="Categoria"
        options={{
          tabBarLabel: "Categorias",
          tabBarLabelStyle: {
            fontSize: 12,
          },
          tabBarActiveTintColor: colors.btnText,
          tabBarInactiveTintColor: colors.textSecondary,
        }}>
        {() => <CategoryStack />}
      </Tab.Screen>
      <Tab.Screen
        name="Chart"
        options={{
          tabBarLabel: "Gráficos",
          tabBarLabelStyle: {
            fontSize: 12,
          },
          tabBarActiveTintColor: colors.btnText,
          tabBarInactiveTintColor: colors.textSecondary,
        }}>
        {() => <ChartStack />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};
