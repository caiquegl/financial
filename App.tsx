import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";

import Routes from "./src/routes";
import { ProductProvider } from "./src/hook/productsHook";

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar networkActivityIndicatorVisible />
      <ProductProvider>
        <Routes />
      </ProductProvider>
    </NavigationContainer>
  );
}
