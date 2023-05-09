import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Animated } from 'react-native';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  left?: boolean;
  right?: boolean;
}

const Drawer = ({ isOpen, onClose, children, left, right }: DrawerProps) => {
  const translateX = new Animated.Value(left ? -300 : right ? 300 : 0);

  React.useEffect(() => {
    Animated.timing(translateX, {
      toValue: isOpen ? 0 : left ? -300 : right ? 300 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isOpen, left, right]);

  return (
    <>
      {isOpen && (
        <Modal transparent={true}>
          <View style={styles.drawerContainer}>
            <TouchableOpacity style={styles.overlay} onPress={onClose} />
            <Animated.View
              style={[
                styles.drawer,
                {
                  transform: [{ translateX }],
                  left: left ? 0 : undefined,
                  right: right ? 0 : undefined,
                },
              ]}
            >
              {children}
            </Animated.View>
          </View>
        </Modal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  drawerContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  drawer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 300,
    backgroundColor: '#fff',
  },
  drawerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
});

export default Drawer;