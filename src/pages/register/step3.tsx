import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ActivityIndicator, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import colors from "../../util/colors";
import { InputTextUnderline } from "../../components/form/inputUnderline";
import { Alert } from "../../components/Alert";
import { supabase } from "../../../superbase";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

interface IProps {
  navigation: any;
  body: any;
}

interface IAlert {
  visible: boolean;
  msg: string;
  title: string;
}

export const Step3 = ({ body, navigation }: IProps) => {
  const { control, handleSubmit, setValue } = useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [seePassword, setSeePassword] = useState<boolean>(false);
  const [alert, setAlert] = useState<IAlert>({
    visible: false,
    msg: '',
    title: ''
  } as IAlert);

  const nextStep = async ({ password }) => {
    try {
      setLoading(true);
      const {name, email } = body
      const {
        data: { user },
        error,
      } = await supabase.auth.signUp({
        email: email,
        password: password,
      });


      await supabase.from("users").insert({ name, email, uuid: user.id });
      setAlert({
        visible: true,
        msg: 'Sucesso ao se registrar, deseja realizar o login ?',
        title: 'Sucesso'
      })
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (body.password) setValue("password", body.password);
  }, [body]);
  return (
    <View
      style={{
        width: "100%",
        marginTop: 30,
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        paddingBottom: 20,
      }}>
      <View>
        <Text style={{ color: colors.textPrimary, fontSize: 35, marginBottom: 20 }}>
          Crie uma senha
        </Text>
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
      <TouchableOpacity onPress={handleSubmit(nextStep)} style={styles.btnRegister}>
        {loading ? <ActivityIndicator /> : <Text style={styles.btnRegisterText}>Cadastrar</Text>}
      </TouchableOpacity>
      <Alert
        closeAlert={() =>
          setAlert({
            msg: "",
            title: "",
            visible: false,
          })
        }
        visible={alert.visible}
        msg={alert.msg}
        title={alert.title}
        icon={<AntDesign name="checkcircleo" size={30} color={colors.accent} />}
        confirm={() => {
          setAlert({
            msg: '',
            title: '',
            visible: false
          })
          navigation.navigate('Login')
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
