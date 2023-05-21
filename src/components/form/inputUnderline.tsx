import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { Text, TextInput, View, TextInputProps, StyleSheet } from "react-native";
import colors from "../../util/colors";

export interface ITextInput extends TextInputProps {
  control: any;
  name: string;
  label?: string;
  is_required?: boolean;
  placeholder?: string;
}

export const InputTextUnderline = ({ label, control, is_required, name, placeholder, ...rest }: ITextInput) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: is_required ? "Campo obrigatório" : false }}
      render={({ field: { onChange, onBlur, value, name, ref }, fieldState: { error } }) => (
        <View style={styles.inputContainer}>
          {(isFocused || hasValue) && (
            <Text
              style={[
                styles.inputLabel,
                { color: isFocused || hasValue ? colors.accent : styles.inputLabel.color },
                { fontSize: isFocused || hasValue ? 12 : 16 },
              ]}
            >
              {label}
            </Text>
          )}
          <TextInput
            {...rest}
            value={value}
            onChangeText={(value) => {
              onChange(value)
              setHasValue(value.length > 0)
            }}
            onFocus={handleFocus}
            onBlur={handleBlur}
            ref={ref}
            style={[
              styles.input,
              { borderBottomColor: isFocused || hasValue ? colors.accent : 'gray' },
            ]}
            placeholder={label}
          />
          {error && error.message && (
            <Text style={{ color: 'red', marginTop: 5, marginBottom: 5 }}>{error.message}</Text>
          )}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    marginBottom: 15,
  },
  inputLabel: {
    marginBottom: 5,
    color: "#2D6A4F",
  },
  input: {
    width: "100%",
    height: 40,
    borderBottomWidth: 1,
    paddingHorizontal: 10,
  },
});
