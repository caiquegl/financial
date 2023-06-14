import "react-native-gesture-handler";
import "moment/locale/pt-br";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { ProductProvider } from "./src/hook/productsHook";
import { UserProvider } from "./src/context/userContext";
import { Route } from "./src/routes";
import { RewardedInterstitialAd, RewardedAd, TestIds } from "react-native-google-mobile-ads";
import moment from "moment";

moment.locale("pt-br");

const adUnitId = __DEV__ ? TestIds.APP_OPEN : "ca-app-pub-9469948013599504/9890390081";

const rewarded = RewardedInterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: false,
  keywords: ["fashion", "clothing"],
});

const rewarded2 = RewardedAd.createForAdRequest("ca-app-pub-9469948013599504/6278502039", {
  requestNonPersonalizedAdsOnly: false,
  keywords: ["fashion", "clothing"],
});

export default function App() {
  // useEffect(() => {
  //   // Start loading the rewarded ad straight away
  //   rewarded.load();
  //   rewarded2.load();
  //   if (rewarded.loaded) rewarded.show();
  //   if (rewarded2.loaded) rewarded2.show();

  //   // Unsubscribe from events on unmount
  // }, []);

  // No advert ready to show yet

  return (
    <NavigationContainer>
      <StatusBar networkActivityIndicatorVisible />
      <ProductProvider>
        <UserProvider>
          <Route />
        </UserProvider>
      </ProductProvider>
    </NavigationContainer>
  );
}
