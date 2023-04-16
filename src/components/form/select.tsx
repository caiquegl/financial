import React from "react";
import { Controller } from "react-hook-form";
import { Text, View } from "react-native";
import { colors } from "../../../style";
import { Picker, PickerProps } from "@react-native-picker/picker";
import { IOptionsSelect } from "../../util";
import uuid from "react-native-uuid";

export interface ITextInput extends PickerProps {
  control: any;
  name: string;
  label?: string;
  is_required?: boolean;
  options: IOptionsSelect[];
}

export const InputSelect = ({
  label,
  control,
  is_required,
  name,
  options,
  ...rest
}: ITextInput) => {
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
          <View
            style={{
              borderColor: colors["gray.400"],
              borderRadius: 5,
              height: 50,
              borderWidth: 1,
            }}>
            <Picker
              ref={ref}
              selectedValue={value}
              onValueChange={(itemValue, itemIndex) => onChange(itemValue)}
              {...rest}>
              <Picker.Item
                key=""
                label="Selecione um item"
                value={null}
                enabled={false}
                color={colors["gray.600"]}
              />
              {options.length > 0 &&
                options.map((opt) => (
                  <Picker.Item key={uuid.v4().toString()} label={opt.label} value={opt.value} />
                ))}
            </Picker>
          </View>

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
