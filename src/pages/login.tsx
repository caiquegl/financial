import { useForm } from "react-hook-form";
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { supabase } from "../../superbase";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userContext } from "../context/userContext";
import { AntDesign } from "@expo/vector-icons";
import colors from "../util/colors";
import { InputTextUnderline } from "../components/form/inputUnderline";
import { Feather } from "@expo/vector-icons";
import { IAlert } from "./register/step2";
import { MaterialIcons } from '@expo/vector-icons'; 
import { Alert } from "../components/Alert";

type UserForm = {
  name: string;
  email: string;
  password: string;
};

export const LoginScreen = ({ navigation }) => {
  const { control, handleSubmit } = useForm<UserForm>();
  const { handleUser } = userContext();

  const [loading, setLoading] = useState<boolean>(false);
  const [seePassword, setSeePassword] = useState<boolean>(false);
  const [alert, setAlert] = useState<IAlert>({
    visible: false,
    msg: '',
    title: ''
  } as IAlert);

  const login = async (credentials: UserForm) => {
    try {
      setLoading(true);
      const { email, password } = credentials;

      const {
        data: { user },
        error,
      } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if(error) {
        return  setAlert({
          msg: 'Usuário não encontrado',
          title: 'Erro',
          visible: true
        })
      }

      if (user && user.id) {
        const { data: users } = await supabase
          .from("users")
          .select("*")
          .eq("uuid", user.id)
          .limit(1);
        if (users && users.length > 0) {
          await AsyncStorage.setItem("userSession", JSON.stringify(users[0]));
          handleUser({
            email: users[0].email,
            id: users[0].id,
            name: users[0].name,
            uuid: users[0].uuid,
          });
        }
      }

      // console.log(user, "login");
    } catch (error) {
      console.log(error);
      setAlert({
        msg: 'Erro ao realizar login',
        title: 'Erro',
        visible: true
      })
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.flexAll}>
      <View>
        <View style={styles.flex}>
          <TouchableOpacity onPress={() => navigation.navigate('Initial')}>
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text
              style={{
                color: colors.btnBackground,
                fontSize: 17,
                fontWeight: "bold",
              }}>
              Esqueceu sua senha?
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={{ color: colors.textPrimary, fontSize: 30, marginBottom: 20, marginTop: 40 }}>
          Bem-vindo de volta!
        </Text>
        <View style={{ width: "90%" }}>
          <InputTextUnderline
            label="E-mail"
            control={control}
            name="email"
            is_required
            keyboardType="email-address"
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
          <View style={{ width: "90%" }}>
            <InputTextUnderline
              label="Senha"
              control={control}
              name="password"
              is_required
              secureTextEntry={!seePassword}
            />
          </View>
          {!seePassword && (
            <AntDesign
              name="eyeo"
              size={24}
              color="black"
              onPress={() => setSeePassword(!seePassword)}
            />
          )}
          {seePassword && (
            <Feather
              name="eye-off"
              size={24}
              color="black"
              onPress={() => setSeePassword(!seePassword)}
            />
          )}
        </View>
      </View>
      <TouchableOpacity onPress={handleSubmit(login)} style={styles.btnRegister}>
        {loading ? <ActivityIndicator /> : <Text style={styles.btnRegisterText}>Entrar</Text>}
      </TouchableOpacity>

      <Alert
        closeAlert={() => setAlert({
          msg: '',
          title: '',
          visible: false
        })}
        visible={alert.visible}
        msg={alert.msg}
        title={alert.title}
        icon={
          <MaterialIcons name="error-outline" size={30} color={colors.accent} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flexAll: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: colors.secondary,
    padding: 10,
    justifyContent: "space-between",
  },
  flex: {
    alignSelf: "stretch",
    display: "flex",
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
});
