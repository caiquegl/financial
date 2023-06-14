import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Modal,
  ScrollView,
} from "react-native";
import colors from "../util/colors";

interface IProps {
  options: {
    label: string;
    value: any;
  }[];
  setValue: any;
  open: any;
  setOpen: any;
}
const SelectComponent = ({ options, setValue, open, setOpen }: IProps) => {
  const handleSelect = () => {
    setOpen(!open);
  };

  const handleOptionSelect = (option) => {
    setValue(option);
    setOpen(false);
  };

  return (
    <>
      {open && (
        <Modal transparent={true}>
          <View style={styles.drawerContainer}>
            <TouchableOpacity style={styles.overlay} onPress={handleSelect} />
            <View style={styles.optionsContainer}>
              <ScrollView>
                {options &&
                  options.length > 0 &&
                  options.map((item) => (
                    <TouchableOpacity
                      key={item.value}
                      style={styles.option}
                      onPress={() => handleOptionSelect(item)}>
                      <Text style={styles.optionText}>{item.label}</Text>
                    </TouchableOpacity>
                  ))}
              </ScrollView>
            </View>
          </View>
        </Modal>
      )}
    </>
  );
};

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  drawerContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  selectButton: {
    backgroundColor: "#e0e0e0",
    padding: 10,
    borderRadius: 4,
  },
  selectButtonText: {
    fontSize: 16,
  },
  optionsContainer: {
    flex: 1,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 20,
    paddingBottom: 30,
    maxHeight: height * 0.5, // Defina a altura máxima para o container de opções
  },
  option: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  optionText: {
    fontSize: 17,
    color: colors.textSecondary,
    fontWeight: "bold",
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Define a cor de fundo do overlay
  },
});

export default SelectComponent;
