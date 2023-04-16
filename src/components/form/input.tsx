import React from "react";
import { Controller } from "react-hook-form";
import { Text, TextInput, View, TextInputProps } from "react-native";
import { colors } from "../../../style";

export interface ITextInput extends TextInputProps {
  control: any;
  name: string;
  label?: string;
  is_required?: boolean;
}

export const InputText = ({ label, control, is_required, name, ...rest }: ITextInput) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: is_required ? "Campo obrigatório" : false }}
      render={({ field: { onChange, onBlur, value, name, ref }, fieldState: { error } }) => (
        <View>
          {label && (
            <Text
              style={{
                fontSize: 16,
                color: colors["gray.600"],
                margin: 5,
              }}>
              {label}
            </Text>
          )}
          <TextInput
            placeholder="Input"
            style={{
              width: "100%",
              paddingTop: 5,
              paddingBottom: 5,
              paddingLeft: 10,
              borderWidth: 1,
              borderColor: colors["gray.400"],
              borderRadius: 5,
              height: 50,
            }}
            {...rest}
            value={value}
            onChangeText={(valueText) => onChange(valueText)}
            ref={ref}
            id={name}
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
