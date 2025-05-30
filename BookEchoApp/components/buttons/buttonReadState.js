import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
  findNodeHandle,
  UIManager,
} from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import colors from '../../styles/colors';

export default function ButtonReadState({ style }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const buttonRef = useRef();

  const toggleModal = () => {
    if (!modalVisible) {
      UIManager.measure(findNodeHandle(buttonRef.current), (x, y, width, height, pageX, pageY) => {
        setPosition({ x: pageX, y: pageY + height + 4 });
        setModalVisible(true);
      });
    } else {
      setModalVisible(false);
    }
  };

  const handleSelect = (option) => {
    setSelected(option);
    setModalVisible(false);
  };

  const getMainIcon = () => {
    switch (selected) {
      case 'eye':
        return <AntDesign name="eyeo" size={20} color={colors.NormalWhite} />;
      case 'check':
        return <AntDesign name="check" size={20} color={colors.NormalWhite} />;
      case 'bookmark':
        return <Feather name="bookmark" size={20} color={colors.NormalWhite} />;
      default:
        return <Feather name="bookmark" size={20} color="black" />;
    }
  };

  const options = [
    { key: 'bookmark', label: 'Per llegir', IconComponent: Feather, iconName: 'bookmark' },
    { key: 'eye', label: 'Llegint', IconComponent: AntDesign, iconName: 'eyeo' },
    { key: 'check', label: 'Llegit', IconComponent: AntDesign, iconName: 'check' },
  ];

  const mainButtonColor = selected ? colors.NormalOrange : colors.NormalWhite;

  const popupWidth = 120;
  const buttonWidth = 32;

  return (
    <>
      <TouchableOpacity
        ref={buttonRef}
        style={[styles.button, { backgroundColor: mainButtonColor }, style]}
        onPress={toggleModal}
      >
        {getMainIcon()}
      </TouchableOpacity>

      <Modal transparent visible={modalVisible} animationType="fade">
        <Pressable style={styles.overlay} onPress={toggleModal} />

        <View
          style={[
            styles.popupContainer,
            { top: position.y, left: position.x - (popupWidth - buttonWidth) },
          ]}
        >
          {options.map(({ key, label, IconComponent, iconName }) => {
            const isSelected = selected === key;
            return (
              <TouchableOpacity
                key={key}
                style={[styles.optionRow, isSelected && styles.selected]}
                onPress={() => handleSelect(key)}
              >
                <Text style={[styles.optionLabel, isSelected && styles.selectedLabel]}>
                  {label}
                </Text>
                <View style={[styles.optionButton, isSelected && styles.selectedButton]}>
                  <IconComponent
                    name={iconName}
                    size={20}
                    color={isSelected ? colors.NormalWhite : 'black'}
                  />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 32,
    height: 32,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
  },
  overlay: {
    flex: 1,
    backgroundColor: '#00000088',
  },
  popupContainer: {
    position: 'absolute',
    backgroundColor: 'transparent',
    flexDirection: 'column',
    paddingVertical: 4,
    width: 120,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  optionLabel: {
    fontSize: 14,
    color: colors.NormalWhite,
    fontWeight: 'bold',
    marginRight: 4,
    flex: 1,
  },
  selectedLabel: {
    color: colors.NormalWhite,
    fontWeight: 'bold',
  },
  optionButton: {
    width: 32,
    height: 32,
    borderRadius: 5,
    backgroundColor: colors.NormalWhite,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedButton: {
    backgroundColor: colors.NormalOrange,
  },
});
