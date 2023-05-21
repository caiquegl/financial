import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import colors from "../../util/colors";
import { Step1 } from "./step1";
import { Step2 } from "./step2";
import { Step3 } from "./step3";

type UserForm = {
  name: string;
  email: string;
  password: string;
};

export const RegisterScreen = ({ navigation }) => {
  const [body, setBody] = useState<UserForm>({} as UserForm)
  const [active, setActive] = useState<number>(1)
  return (
    <View style={styles.flexAll}>
      <View style={styles.flex}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.stepsContainer}>
          <View style={[styles.step, active === 1 ? styles.activeStep : active > 1 ? styles.inactiveStep : undefined]} />
          <View style={styles.divider} />
          <View style={[styles.step, active === 2 ? styles.activeStep : active > 2 ? styles.inactiveStep : undefined]} />
          <View style={styles.divider} />
          <View style={[styles.step, active === 3 ? styles.activeStep : active > 3 ? styles.inactiveStep : undefined]} />
        </View>
      </View>
      {active == 1 && <Step1 body={body} setBody={(name) => setBody({...body, name})} next={() => setActive(2)}/>}
      {active == 2 && <Step2 body={body} setBody={(email) => setBody({...body, email})} next={() => setActive(3)}/>}
      {active == 3 && <Step3 body={body} navigation={navigation}/>}
    </View>
  );
};

const styles = StyleSheet.create({
  flexAll: {
    flex: 1,
    alignItems: "center",
    paddingTop: 60,
    backgroundColor: colors.secondary,
    padding: 10,
  },
  flex: {
    alignSelf: "stretch",
    display: 'flex',
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
  },
  stepsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  step: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderColor: colors.lightPrimary,
    borderWidth: 1,
    marginHorizontal: 5,
  },
  activeStep: {
    borderColor: colors.accent,
    backgroundColor: colors.accent,
  },
  inactiveStep: {
    borderColor: colors.lightPrimary,
    backgroundColor: colors.lightPrimary,
  },
  divider: {
    width: 30,
    height: 2,
    backgroundColor: colors.lightPrimary,
  },
});
