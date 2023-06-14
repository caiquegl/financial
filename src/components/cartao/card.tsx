import React from "react";
import { Text, View } from "react-native";
import Master from "./mastercard.svg";
import colors from "../../util/colors";

interface IProps {
  name: string;
  dueDate: string;
  amount: string;
}

export const Card = ({ amount, dueDate, name }: IProps) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: 80,
      }}>
      <View
        style={{
          flexDirection: "row",
        }}>
        <Master />
        <View
          style={{
            marginLeft: 10,
          }}>
          <View
            style={{
              flexDirection: "row",
            }}>
            <Text
              style={{
                fontWeight: "bold",
              }}>
              {name}
            </Text>
            <Text
              style={{
                color: colors.lightPrimary,
              }}>
              {" "}
              - {dueDate}
            </Text>
          </View>
          <Text
            style={{
              color: colors.red,
            }}>
            {amount}
          </Text>
        </View>
      </View>
      <Text
        style={{
          color: colors.activeBtn,
        }}>
        Pagar fatura
      </Text>
    </View>
  );
};
