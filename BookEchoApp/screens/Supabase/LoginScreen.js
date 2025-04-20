import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
//Component del formulari
import FormInput from '../../components/inputs/FormInput';

export default function LoginScreen({ navigation }) {

    //Estat per guardar email i contrassenya
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Inicia Sessió</Text>

            {/* Campo de email */}
            <FormInput
                placeholder="Correu electrònic"
                value={email}
                onChangeText={setEmail}
                icon="mail"
                keyboardType="email-address"
            />

            {/* Campo de contraseña */}
            <FormInput
                placeholder="Contrasenya"
                value={password}
                onChangeText={setPassword}
                icon="lock"
                secureTextEntry={true}
            />

            {/* Botón de iniciar sesión */}
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Iniciar sessió</Text>
            </TouchableOpacity>

            {/* Enlace para ir a Registro */}
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.link}>No tens compte? Registra't</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 30,
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#358177',
      marginBottom: 30,
      textAlign: 'center',
    },
    button: {
      backgroundColor: '#47AC9E',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 10,
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
    },
    link: {
      color: '#47AC9E',
      marginTop: 15,
      textAlign: 'center',
    },
  });