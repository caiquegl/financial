import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import AutenticanteRoutes from "./autenticanteRoutes";
import NoAutenticanteRoutes from "./noAutenticanteRoutes";
import { userContext } from "../context/userContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Route = () => {
  const { user, handleUser } = userContext();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getSession = async () => {
      try {
        const userSession = await AsyncStorage.getItem('userSession');
        const users = JSON.parse(userSession);

        if (users && users.id) {
          handleUser({ email: users.email, id: users.id, name: users.name, uuid: users.uuid });
        }
     
      } catch (error) {
        console.log(error, 'ERRO');
      } finally {
        setLoading(false);
      }
    };
    getSession();
  }, []);

  return (
    <>
      {loading ? (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
          }}>
          <ActivityIndicator />
        </View>
      ) : (
        <>{user?.id ? <AutenticanteRoutes /> : <NoAutenticanteRoutes />}</>
      )}
    </>
  );
};
