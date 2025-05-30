import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../../../screens/Supabase/lib/supabaseClient';
import { AntDesign } from '@expo/vector-icons';

export default function ReviewOptions({ reviewId, onClose, onDelete, bookId, bookTitle, }) {
    const navigation = useNavigation();

    const handleEdit = () => {
        navigation.navigate('EditReviewScreen', {
            reviewId,
            bookId,       // assegura’t de tenir-lo disponible
            bookTitle,    // passa el títol si el tens
        });
    };

    const handleDelete = async () => {
        const { error } = await supabase.from('ressenyes').delete().eq('id', reviewId);
        onDelete?.();

        if (error) {
            Alert.alert('Error', 'No s\'ha pogut eliminar la ressenya');
        } else {
            Alert.alert('Ressenya eliminada');
            onClose();
        }
    };

    return (
        <View>
            <Text style={styles.title}>Opcions de Ressenya</Text>

            <TouchableOpacity style={styles.option} onPress={handleEdit}>
                <View style={styles.row}>
                    <AntDesign name="edit" size={24} color="black" />
                    <Text style={styles.buttonText}>Editar ressenya</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.option} onPress={handleDelete}>
                <View style={styles.row}>
                    <AntDesign name="delete" size={24} color="black" />
                    <Text style={styles.buttonText}>Eliminar ressenya</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonText: {
        marginLeft: 10,
        fontSize: 16,
    },
    option: {
        width: '95%',
        borderTopWidth: 1,
        borderTopColor: 'green',
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
});
