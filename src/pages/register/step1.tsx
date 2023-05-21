import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ActivityIndicator, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import colors from "../../util/colors";
import { InputTextUnderline } from "../../components/form/inputUnderline";

interface IProps {
  setBody: any
  body: any
  next: any
}
export const Step1 = ({ body, next, setBody } : IProps) => {
  const { control, handleSubmit, setValue } = useForm();
  const [loading, setLoading] = useState<boolean>(false);

  const nextStep = async ({ name }) => {
    try {
      setLoading(true);
      setBody(name)
      next()
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(body.name) setValue('name', body.name)
  }, [body])
  return (
    <View style={{ width: "100%", marginTop: 30, flex: 1, flexDirection: 'column', justifyContent: 'space-between', paddingBottom: 20 }}>
      <View>
        <Text style={{ color: colors.textPrimary, fontSize: 35, marginBottom: 20 }}>
          Qual é o seu nome ?
        </Text>
        <Text style={{ fontSize: 14, color: colors.textSecondary, marginBottom: 20 }}>
          Crie sua conta e comece a transformar suas finanças.
        </Text>
        <InputTextUnderline label="Nome" control={control} name="name" is_required />
      </View>
      <TouchableOpacity onPress={handleSubmit(nextStep)} style={styles.btnRegister}>
        {loading ? <ActivityIndicator /> : <Text style={styles.btnRegisterText}>Avançar</Text>}
      </TouchableOpacity>
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
