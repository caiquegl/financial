import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import colors from "../../util/colors";

interface IProps {
  icon: any;
  title: string;
  msg: string;
  confirm?: (close: boolean) => void;
  visible: boolean;
  closeAlert: (close: boolean) => void;
}

export const Alert = ({ icon, title, msg, confirm, closeAlert, visible }: IProps) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => closeAlert(false)}>
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={() => closeAlert(false)}>
        <View style={styles.modal}>
          <View>
            <View style={styles.containerIcon}>{icon}</View>
            <View style={styles.containerTitle}>
              <Text style={styles.title}>{title}</Text>
            </View>
            <Text style={styles.description}>{msg}</Text>
          </View>
          {confirm ? (
            <>
              <TouchableOpacity
                onPress={() => confirm(false)}
                style={[styles.buttonStle, { margin: 0, padding: 0 }]}
                activeOpacity={0.7}>
                <View style={styles.containerButton}>
                  <Text style={styles.textButton}>Confirmar</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.buttonStle]} onPress={() => closeAlert(false)}>
                <View style={styles.containerButtonCancel}>
                  <Text style={[styles.textButton, { color: colors.btnBackground }]}>Cancelar</Text>
                </View>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity style={[styles.buttonStle]} onPress={() => closeAlert(false)}>
              <View style={styles.gradient}>
                <Text style={styles.textButton}>OK</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  openButton: {
    fontSize: 18,
    color: "blue",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
    elevation: 5,
    width: 300,
    justifyContent: "space-between",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  closeButton: {
    fontSize: 16,
    color: "blue",
    alignSelf: "flex-end",
  },
  containerIcon: {
    alignSelf: "center",
    width: 70,
    height: 70,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.secondary,
    marginTop: 30,
  },
  containerTitle: {
    backgroundColor: colors.accent,
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginVertical: 15,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
  },
  description: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 20,
    alignSelf: "center",
    letterSpacing: 1,
    color: colors.textPrimary,
  },
  buttonStle: {
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    height: 60,
    marginBottom: 10,
    marginLeft: "auto",
    marginRight: "auto",
  },
  containerButton: {
    width: "100%",
    backgroundColor: colors.btnBackground,
    alignSelf: "center",
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  textButton: {
    alignItems: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    letterSpacing: 2,
  },
  containerButtonCancel: {
    width: "100%",
    alignSelf: "center",
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: colors.btnBackground,
  },
  gradient: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    alignSelf: "center",
    marginVertical: 20,
    backgroundColor: colors.btnBackground,
    height: 40,
    borderRadius: 20,
  },
});
