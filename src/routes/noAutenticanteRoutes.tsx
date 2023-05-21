import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { InitialScreen } from "../pages/initial";
import { LoginScreen } from "../pages/login";
import { RegisterScreen } from "../pages/register";

const Stack = createNativeStackNavigator();

const stackScreenOptions = {
  headerShown: false,
};
export default () => {
  return (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen name="Initial" component={InitialScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};
