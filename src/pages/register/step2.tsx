import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ActivityIndicator, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import colors from "../../util/colors";
import { InputTextUnderline } from "../../components/form/inputUnderline";
import { Alert } from "../../components/Alert";
import { MaterialIcons } from '@expo/vector-icons'; 
import { supabase } from "../../../superbase";

interface IProps {
  setBody: any
  body: any
  next: any
}

export interface IAlert {
  visible: boolean,
  msg: string
  title: string
}

export const Step2 = ({ body, next, setBody } : IProps) => {
  const { control, handleSubmit, setValue } = useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<IAlert>({
    visible: false,
    msg: '',
    title: ''
  } as IAlert);

  const nextStep = async ({ email }) => {
    try {
      if(email.indexOf('@') === -1) return setAlert({
        visible: true,
        msg: 'Digite um e-mail válido',
        title: 'Erro'
      })
      setLoading(true)
      const { data: users } = await supabase.from("users").select("id, name").eq("email", email);

      if (users.length > 0) return setAlert({
        visible: true,
        msg: 'E-mail já cadastrado',
        title: 'Erro'
      })

      setBody(email)
      next()
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(body.email) setValue('email', body.email)
  }, [body])
  return (
    <View style={{ width: "100%", marginTop: 30, flex: 1, flexDirection: 'column', justifyContent: 'space-between', paddingBottom: 20 }}>
      <View>
        <Text style={{ color: colors.textPrimary, fontSize: 35, marginBottom: 20 }}>
          E o seu email ?
        </Text>
        <InputTextUnderline label="E-mail" control={control} name="email" is_required keyboardType="email-address"/>
      </View>
      <TouchableOpacity onPress={handleSubmit(nextStep)} style={styles.btnRegister}>
        {loading ? <ActivityIndicator /> : <Text style={styles.btnRegisterText}>Avançar</Text>}
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
