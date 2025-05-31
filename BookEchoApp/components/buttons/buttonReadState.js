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
import { useToggleReadState } from '../../Model/useToggleReadState';
import { useLlistes } from '../../context/LlistesContext';

export default function ButtonReadState({ style, book }) {
  //El modal si es vivible o no
  const [modalVisible, setModalVisible] = useState(false);
  //Si la opcio esta seleccionada o no
  //const [selected, setSelected] = useState(null);

  //La posicio
  const [position, setPosition] = useState({ x: 0, y: 0 });
  //Referencia del boto
  const buttonRef = useRef();


  // Obtener listas predeterminadas desde contexto
  const { llistesPredet } = useLlistes();
  const listIds = {
    perLlegir: llistesPredet.perLlegir,
    llegint: llistesPredet.llegint,
    llegit: llistesPredet.llegit,
  };
  console.log('[ButtonReadState] book prop →', book);

      const { selected, toggle } = useToggleReadState(book, listIds);


  //Funcio per obrir i tancar el modal
  //Al obrir, medeix la posició i el tamany del botó per mostrar el modal just sota amb un petit marge.
  //Si el modal esta obert el tanca.
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

  //Si la opcio és sel·leccionada llavors defineix com sel·leccionat i tanca el modal
  const handleSelect = (optionKey) => {
     toggle(optionKey, selected);
    setModalVisible(false);
  };

  //aixó és per obtenir la icona segons el que sigui seleccionat.
  /*const getMainIcon = () => {
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
  };*/
  const getMainIcon = () => {
    switch (selected) {
      case 'eye':
      case 'reading': // adaptamos claves para que coincidan con las opciones
        return <AntDesign name="eyeo" size={20} color={colors.NormalWhite} />;
      case 'check':
      case 'read':
        return <AntDesign name="check" size={20} color={colors.NormalWhite} />;
      case 'bookmark':
      case 'toRead':
        return <Feather name="bookmark" size={20} color={colors.NormalWhite} />;
      default:
        return <Feather name="bookmark" size={20} color="black" />;
    }
  };

  //Les opcions que hi ha (per llegir, llegint i llegit)
 /* const options = [
    { key: 'bookmark', label: 'Per llegir', IconComponent: Feather, iconName: 'bookmark' },
    { key: 'eye', label: 'Llegint', IconComponent: AntDesign, iconName: 'eyeo' },
    { key: 'check', label: 'Llegit', IconComponent: AntDesign, iconName: 'check' },
  ];*/
    const options = [
    { key: 'toRead', label: 'Per llegir', IconComponent: Feather, iconName: 'bookmark' },
    { key: 'reading', label: 'Llegint', IconComponent: AntDesign, iconName: 'eyeo' },
    { key: 'read', label: 'Llegit', IconComponent: AntDesign, iconName: 'check' },
  ];

  //El estil segons si està sel·leccionat o no
  const mainButtonColor = selected ? colors.NormalWhite : colors.NormalOrange;
  const popupWidth = 120;
  const buttonWidth = 32;

  return (
    <>
      {/*AL clicar el botó, cambia l'estil del botó i tanca activa el modal. Tambe defineix quin es la icona*/}
      <TouchableOpacity
        ref={buttonRef}
        style={[styles.button, { backgroundColor: mainButtonColor }, style]}
        onPress={toggleModal}
      >
        {getMainIcon()}
      </TouchableOpacity>
      {/*El modal es fa visible */}
      <Modal transparent visible={modalVisible} animationType="fade">
        <Pressable style={styles.overlay} onPress={toggleModal} />

        {/*El contenidor que conté el popup*/}
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
