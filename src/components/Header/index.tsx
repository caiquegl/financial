import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../../util/colors";
import { userContext } from "../../context/userContext";
import Avatar from "../Avatar";
import { saySaudation } from "../../util";
import { Entypo } from "@expo/vector-icons";

const Header = () => {
  const { user } = userContext();

  return (
    <View style={styles.container}>
      <Avatar />
      <View
        style={{
          marginLeft: 20,
        }}>
        <Text
          style={{
            fontSize: 16,
            color: colors.btnText,
          }}>
          {saySaudation()},
        </Text>
        <Text
          style={{
            fontSize: 20,
            color: colors.btnText,
            fontWeight: "bold",
          }}>
          {user.name}
        </Text>
      </View>
      <TouchableOpacity
        style={{
          padding: 20,
          marginLeft: 'auto'
        }}
      >
        <Entypo name="menu" size={24} color={colors.btnText} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: colors.green,
    padding: 20,
    paddingTop: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});

export default Header;
