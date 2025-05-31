import React, { useState, forwardRef, useImperativeHandle, useRef } from 'react';
import {
  Modal,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
  SafeAreaView,
  Image,
} from 'react-native';
import colors from '../../styles/colors';

const OverlayISBNCheck = forwardRef(({ isbn, onConfirm, onCancel }, ref) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  useImperativeHandle(ref, () => ({
    show: () => {
      setVisible(true);
      fetchBook();
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
      ]).start();
    },
    hide: () => {
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
      ]).start(() => {
        setVisible(false);
        setBook(null);
        setError(null);
      });
    },
  }));

  const fetchBook = async () => {
    if (!isbn) {
      setError('El codi ISBN no pot estar buit.');
      setBook(null);
      return;
    }
    setLoading(true);
    setError(null);
    setBook(null);

    try {
      const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
      const data = await res.json();

      if (data.totalItems > 0) {
        const volume = data.items[0].volumeInfo;
        setBook({
          title: volume.title,
          authors: volume.authors ? volume.authors.join(', ') : 'Desconegut',
          publishedDate: volume.publishedDate || '',
          description: volume.description || '',
          image: volume.imageLinks?.thumbnail || null,
        });
      } else {
        setError('No s\'ha trobat cap llibre amb aquest ISBN.');
      }
    } catch (e) {
      setError('Error en la consulta. Torna-ho a provar.');
    } finally {
      setLoading(false);
    }
  };

  if (!visible) return null;

  return (
    <SafeAreaView style={styles.fill}>
      <Modal
        transparent
        visible={visible}
        animationType="none"
        statusBarTranslucent
        onRequestClose={() => ref.current.hide()}
      >
        <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
          <TouchableOpacity
            style={styles.background}
            activeOpacity={1}
            onPress={() => ref.current.hide()}
          />
        </Animated.View>

        <Animated.View
          style={[
            styles.modal,
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
        >
          <View style={styles.handle} />
          <Text style={styles.title}>És aquest el llibre?</Text>

          {loading && <ActivityIndicator size="large" color={colors.NormalTurquoise} />}

          {!loading && book && (
            <>
              {book.image && (
                <Image
                  source={{ uri: book.image }}
                  style={styles.bookImage}
                  resizeMode="contain"
                />
              )}
              <Text style={styles.bookTitle}>{book.title}</Text>
              <Text style={styles.bookAuthor}>Autor(s): {book.authors}</Text>
              {book.publishedDate ? <Text>Publicat: {book.publishedDate}</Text> : null}

              {book.description ? (
                <Text style={styles.description}>{book.description}</Text>
              ) : null}

              <View style={styles.buttons}>
                <TouchableOpacity
                  style={[styles.button, styles.cancelButton]}
                  onPress={() => ref.current.hide()}
                >
                  <Text style={styles.cancelText}>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.confirmButton]}
                  onPress={() => {
                    ref.current.hide();
                    onConfirm && onConfirm(book);
                  }}
                >
                  <Text style={styles.confirmText}>Acceptar</Text>
                </TouchableOpacity>
              </View>
            </>
          )}

          {!loading && error && (
            <>
              <Text style={styles.errorText}>{error}</Text>
              <TouchableOpacity
                style={[styles.button, styles.confirmButton]}
                onPress={() => {
                  ref.current.hide();
                  onCancel && onCancel();
                }}
              >
                <Text style={styles.confirmText}>Continuar manualment</Text>
              </TouchableOpacity>
            </>
          )}
        </Animated.View>
      </Modal>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  fill: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  background: {
    flex: 1,
    width: '100%',
  },
  modal: {
    backgroundColor: 'white',
    padding: 24,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 3,
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 15,
  },
  bookImage: {
    width: 100,
    height: 140,
    marginBottom: 15,
  },
  bookTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 3,
  },
  bookAuthor: {
    fontStyle: 'italic',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    marginBottom: 15,
  },
  buttons: {
    flexDirection: 'row',
    marginTop: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 5,
    borderRadius: 6,
  },
  cancelButton: {
    backgroundColor: colors.LightGrey,
  },
  confirmButton: {
    backgroundColor: colors.NormalTurquoise,
  },
  cancelText: {
    textAlign: 'center',
    color: 'black',
  },
  confirmText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontWeight: 'bold',
    marginBottom: 15,
  },
});

export default OverlayISBNCheck;
