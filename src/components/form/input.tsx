import React from "react";
import { Controller } from "react-hook-form";
import { Text, TextInput, View, TextInputProps, StyleSheet } from "react-native";
import { colors } from "../../../style";

export interface ITextInput extends TextInputProps {
  control: any;
  name: string;
  label?: string;
  is_required?: boolean;
  placeholder?: string
}

export const InputText = ({ label, control, is_required, name, placeholder,  ...rest }: ITextInput) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: is_required ? "Campo obrigatório" : false }}
      render={({ field: { onChange, onBlur, value, name, ref }, fieldState: { error } }) => (
        <View style={styles.inputContainer}>
          {label && (
            <Text
              style={styles.inputLabel}>
              {label}
            </Text>
          )}
          <TextInput
            {...rest}
            value={value}
            onChangeText={(valueText) => onChange(valueText)}
            ref={ref}
            style={styles.input}
            placeholder={placeholder}
          />
          {error && error.message && (
            <Text
              style={{
                color: colors["red.500"],
                marginTop: 5,
                marginBottom: 5,
              }}>
              {error.message}
            </Text>
          )}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: '#2D6A4F',
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#FFF',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  
});
