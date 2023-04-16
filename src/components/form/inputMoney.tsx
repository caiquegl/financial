import React from "react";
import { Controller } from "react-hook-form";
import { Text, TextInput, TextInputProps, View } from "react-native";
import CurrencyInput from "react-native-currency-input";
import { colors } from "../../../style";

export interface ITextInput extends TextInputProps {
  control: any;
  name: string;
  label?: string;
  is_required?: boolean;
}

export const InputMoney = ({ label, control, is_required, name, ...rest }: ITextInput) => {
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
          <CurrencyInput
            value={value}
            onChangeValue={onChange}
            id={name}
            ref={ref}
            {...rest}
            prefix="R$"
            renderTextInput={(textInputProps) => (
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
                {...textInputProps}
              />
            )}
          />

          {error && error.message && (
            <Text
              style={{
                color: colors["red.500"],
                marginTop: 5,
                marginBottom: 5,
              }}>
              {" "}
              {error.message}
            </Text>
          )}
        </View>
      )}
    />
  );
};
