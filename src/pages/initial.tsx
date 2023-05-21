import React from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import ImageDraw from "../assets/home.svg";
import colors from "../util/colors";

export const InitialScreen = ({ navigation }) => {
  const screenWidth = Dimensions.get("window").width;
  const imageWidth = screenWidth * 0.8;

  return (
    <View style={styles.flexAll}>
      <View style={styles.flex}>
        <Text style={styles.subText}>Financial </Text>
        <Text style={styles.bold}>Duo</Text>
      </View>
      <View style={styles.container}>
        <ImageDraw width={imageWidth} height={imageWidth} />
        <Text style={styles.textPrincipal}>É hora de iniciar sua jornada!</Text>
        <Text style={styles.textSub}>Crie sua conta e comece a transformar suas finanças.</Text>
        <TouchableOpacity style={styles.btnRegister} onPress={() => navigation.navigate('Register')}>
          <Text style={styles.btnRegisterText}>Cadastrar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnLogin} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.btnLoginText}>Já sou cadastrado</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  btnLogin: {
    backgroundColor: colors.secondary,
    padding: 10
  },
  btnLoginText: {
    color: colors.textPrimary,
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 10,
  },
  btnRegister: {
    marginTop: 20,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.btnBackground,
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
  },
  btnRegisterText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: colors.btnText,
  },
  flexAll: {
    flex: 1,
    alignItems: "center",
    paddingTop: 60,
    backgroundColor: colors.secondary,
  },
  flex: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignContent: "flex-start",
    height: 100,
  },
  container: {
    flex: 1,
    paddingHorizontal: 5,
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 50,
  },
  subText: {
    fontSize: 30,
    textAlign: "center",
  },
  bold: {
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 30,
  },
  textPrincipal: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  textSub: {
    marginTop: 20,
    fontSize: 15,
  },
});
