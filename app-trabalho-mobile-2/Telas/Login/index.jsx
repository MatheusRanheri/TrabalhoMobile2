import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { LoginServico } from "../../Servico/servicoLogin";
import Estilos from "../../Componentes/Estilos";
import TextoInput from '../../Componentes/TextoInput';

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const verificaLogin = async () => {
        if (!email || !senha) {
            Alert.alert('Preencha todos os campos');
            return;
        }

        const resultado = await LoginServico(email, senha);

        if (resultado) {
            Alert.alert('Sucesso Bem-Vindo');
            navigation.navigate('Sucesso');
        } else {
            Alert.alert('Erro, Email ou senha invalidos');
        };
    }

    return (
        <View style={styles.container}>
            <View style={Estilos.card_dados}>
                <Text style={styles.header}>Login</Text>

                <TextoInput estilo={Estilos.input}
                    placeholder='Digite seu email'
                    value={email}
                    setValue={setEmail}
                    label='Email'
                />

                <TextoInput estilo={Estilos.input}
                    placeholder='Digite sua senha'
                    value={senha}
                    setValue={setSenha}
                    label='Senha'
                    password={true}
                />

                <TouchableOpacity style={styles.buttonsalvar} activeOpacity={0.7} onPress={verificaLogin}>
                    <Text style={styles.buttontexto}>Salvar</Text>
                </TouchableOpacity>

            </View>
        </View>
    );

};

const styles = StyleSheet.create({
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#154360',
    },
    cameraEstilo: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    cameraImage: {
        width: 100,
        height: 100,
        borderRadius: 10
    },
    cameraBotao: {
        width: 100,
        height: 100,
        borderRadius: 10,
        backgroundColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10
    },
    container: {
        flex: 1,
        backgroundColor: '#ebf0f7',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
    },
    buttonsalvar: {
        backgroundColor: '#154360',
        width: 100,
        height: 30,
        marginTop: 10,
        marginLeft: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
    },
    button: {
        backgroundColor: '#154360',
        width: 100,
        height: 30,
        marginTop: 5,
        marginLeft: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginLeft: 5
    },
    buttontexto: {
        fontSize: 16,
        color: '#ffffff'
    },
    contentList: {
        flex: 1,
        width: '100%'
    },
    containercard: {
        felx: 1,
        width: '90%'
    },
    cardcoluna: {
        flexDirection: 'row'
    },
    cardlinha: {
        flexDirection: 'column'
    },
    botoesacoes: {
        flexDirection: 'row',
        margin: 10
    },
    card: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        backgroundColor: 'white',
        padding: 10,
        flexDirection: 'row',
        borderRadius: 15,
        width: '100%'
    },
    texto: {
        fontSize: 18,
        alignSelf: 'center',
    },
    textobold: {
        fontSize: 18,
        alignSelf: 'center',
        fontWeight: 'bold',
    },
    cardContent: {
        marginLeft: 20,
        marginTop: 10,
    },
    emptyListContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    emptyListText: {
        fontSize: 18,
        color: 'gray',
    },
    textoCamera: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    camera: {
        flex: 1
    },
    buttonCamera: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    }

});

