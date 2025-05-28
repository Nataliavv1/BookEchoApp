import React, { useState, useRef } from 'react';
import {
    Modal,
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Button,
    Animated,
    PanResponder,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import IconButton from '../buttons/iconbutton';
import DelatePopup from './contentForOverlay/DelatePopup';
import EditDelateOptions from './contentForOverlay/edit&delate';
import AddBook from './contentForOverlay/Addbook';
import BookOptions from './contentForOverlay/BookOptions';

export default function Overlay({ title, delateText, editText, contentType, color, icon, bookTitle,  library = 'AntDesign',}) {
    const [visible, setVisible] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(0)).current;

    const show = () => {
        setVisible(true);
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
        Animated.timing(slideAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const hide = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start(() => setVisible(false));
    };

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (_, gestureState) => gestureState.dy > 10,
            onPanResponderMove: (_, gestureState) => {
                if (gestureState.dy > 0) {
                    slideAnim.setValue(1 - gestureState.dy / 300);
                }
            },
            onPanResponderRelease: (_, gestureState) => {
                if (gestureState.dy > 100) {
                    hide();
                } else {
                    Animated.timing(slideAnim, {
                        toValue: 1,
                        duration: 200,
                        useNativeDriver: true,
                    }).start();
                }
            },
        })
    ).current;

    return (

        <SafeAreaView style={styles.fill}>
            <IconButton onPress={show} color={color} icon={icon} library={library}/>

            <Modal visible={visible} transparent animationType="none"  statusBarTranslucent>
                {/* Fondo con fade */}
                <Animated.View
                    style={[styles.overlay, { opacity: fadeAnim }]}
                    pointerEvents="auto"
                >
                    <TouchableOpacity style={styles.fullscreenTouchable} onPress={hide} />
                </Animated.View>

                {/* Modal con slide y swipe */}
                <Animated.View
                    style={[
                        styles.modalContent,
                        {
                            transform: [
                                {
                                    translateY: slideAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [300, 0],
                                    }),
                                },
                            ],
                        },
                    ]}
                    {...panResponder.panHandlers}
                    pointerEvents="box-none"
                >
                    <TouchableOpacity style={styles.topSlide} onPress={hide} />
                    {/* Aquest View conté el contingut del overlay */}
                    {contentType === 'EditDelate' ? (
                        <EditDelateOptions
                            title={title}
                            delateText={delateText}
                            editText={editText}
                        />
                    ) : contentType === 'AddBook' ? (
                        <AddBook />
                    ) : contentType === 'BookOptions' ? (
                        <BookOptions bookTitle = {bookTitle}/>
                    ) : (
                        <Text>No selected type</Text>
                    )}


                </Animated.View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    fullscreenTouchable: {
        flex: 1,
        width: '100%',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        width: '100%',
        position: 'absolute',
        bottom: 0,
    },
    topSlide: {
        backgroundColor: '#CECECE',
        width: 44,
        height: 5,
        borderRadius: 2.5,
        marginBottom: 10,
        alignSelf: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },

});
