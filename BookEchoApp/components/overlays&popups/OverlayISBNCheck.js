import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from 'react';
import {
  Modal,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
  SafeAreaView,
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
      <Modal transparent visible={visible} animationType="none" statusBarTranslucent>
        <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
          <TouchableOpacity style={styles.background} onPress={() => ref.current.hide()} />
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
          <Text style={styles.title}>Consulta ISBN</Text>

          {loading && <ActivityIndicator size="large" color={colors.NormalTurquoise} />}

          {!loading && book && (
            <>
              <Text style={styles.bookTitle}>{book.title}</Text>
              <Text style={styles.bookAuthor}>Autor(s): {book.authors}</Text>
              {book.publishedDate ? <Text>Publicat: {book.publishedDate}</Text> : null}

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
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 3,
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  bookAuthor: {
    fontSize: 16,
    marginVertical: 8,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttons: {
    flexDirection: 'row',
    marginTop: 24,
    gap: 16,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  cancelButton: {
    backgroundColor: '#ccc',
  },
  confirmButton: {
    backgroundColor: colors.NormalTurquoise,
  },
  cancelText: {
    color: '#333',
    fontWeight: '600',
  },
  confirmText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default OverlayISBNCheck;
