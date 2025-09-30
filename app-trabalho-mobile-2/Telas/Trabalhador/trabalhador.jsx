import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput, Alert, Button, Image } from "react-native";
import { useState, useEffect, useRef } from "react";
import Estilos from "../../Componentes/Estilos"
import TextoInput from '../../Componentes/TextoInput';
import { getTrabalhador, addTrabalhador, updateTrabalhador, deletaTrabalhador } from "../../Servico/servicoTrabalhador"
import { CameraView, useCameraPermissions } from "expo-camera";

export default function Trabalhador(props) {
    const [trabalhadores, setTrabalhadores] = useState([]);
    const [nome, setNome] = useState('');
    const [profissao, setProfissao] = useState('');
    const [foto, setFoto] = useState(null);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [facing, setFacing] = useState('back');
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef(null);
    const [showCamera, setShowCamera] = useState(false);

    useEffect(() => {
        (async () => {
            const trabalhadores = await getTrabalhador();
            setTrabalhadores(trabalhadores);
        })();
    }, []);

    if (!permission) {
        return <View />
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.texto}>Nós precisamos da permissão para utilizar a câmera</Text>
                <Button onPress={requestPermission} title="Solicitar permissão câmera" />
            </View>
        );
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    const handleClick = async () => {
        if (cameraRef.current) {
            const newFoto = await cameraRef.current.takePictureAsync();
            setFoto(newFoto.uri);
        }
    }

    const salvarTrabalhador = async () => {

        if (!nome || !profissao || !foto || !email || !senha) {
            Alert.alert('Preencha todos os campos');
            return;
        }

        const trabalhadorObj = {
            nome,
            profissao,
            foto,
            email,
            senha
        };

        try {

            if (editingId) {
                const atualizado = await updateTrabalhador(editingId, trabalhadorObj);
                if (atualizado) {
                    setTrabalhadores(trabalhadores.map(t => (t.id === editingId ? atualizado : t)));
                }
            } else {
                const novo = await addTrabalhador(trabalhadorObj);
                if (novo) {
                    setTrabalhadores([...trabalhadores, novo]);
                }
            }

            setNome('');
            setProfissao('');
            setFoto(null);
            setEmail('');
            setSenha('');
            setEditingId(null);


        } catch (error) {
            console.error('Não foi possível salvar o trabalhador');
        }
    };

    function editar(item) {
        setNome(item.nome);
        setProfissao(item.profissao);
        setFoto(item.foto);
        setEmail(item.email);
        setSenha('');
        setEditingId(item.id);
    }

    async function deletar(id) {
        const ok = await deletaTrabalhador(id);
        if (ok) {
            setTrabalhadores(trabalhadores.filter(t => t.id !== id));
        }
    }

    const renderTrabalhadore = ({ item }) => (
        <View style={styles.containercard}>
            <TouchableOpacity style={styles.card}>
                <View style={styles.cardContent}>
                    <View style={styles.cardcoluna}>
                        <View style={styles.cardlinha}>
                            <Image style={{ width: 100, height: 100, borderRadius: 10 }} source={{ uri: item.foto }} />
                            <Text style={styles.name}>Nome: {item.nome}</Text>
                            <Text style={styles.name}>Profissão: {item.profissao}</Text>
                            <Text style={styles.name}>Email: {item.email}</Text>
                            <Text style={styles.name}>Senha: {item.senha}</Text>
                            <View style={styles.botoesacoes}>
                                <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={() => editar(item)}>
                                    <Text style={styles.buttontexto}>Editar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={() => { deletar(item.id) }}>
                                    <Text style={styles.buttontexto}>Deletar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={Estilos.card_dados}>
                <Text style={styles.header}>{editingId !== null ? 'Editar Trabalhador' : "Cadastro de trabalhadores"}</Text>

                <TextoInput estilo={Estilos.input}
                    placeholder='Digite seu nome'
                    value={nome}
                    setValue={setNome}
                    label='Nome'
                />

                <TextoInput estilo={Estilos.input}
                    placeholder='Digite sua profisão'
                    value={profissao}
                    setValue={setProfissao}
                    label='Profissao'
                />

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

                <TouchableOpacity style={styles.buttonsalvar} activeOpacity={0.7} onPress={salvarTrabalhador}>
                    <Text style={styles.buttontexto}>Salvar</Text>
                </TouchableOpacity>

                <View style={{ marginBottom: 10 }}>
                    <Text style={styles.textoCamera}>Foto</Text>


                    <View style={{ width: 300, height: 100, backgroundColor: "grey", borderRadius: 10, overflow: "hidden" }}>


                        <CameraView style={{ flex: 1 }}
                            ref={cameraRef}
                            facing={facing}>

                            <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "flex-end", padding: 10 }}>
                                <TouchableOpacity style={{ padding: 8, borderRadius: 8, alignContent: 'flex-end' }} onPress={toggleCameraFacing}>
                                    <Text style={{ color: "white" }}>Virar Câmera</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ padding: 12, borderRadius: 30, alignContent: 'flex-end' }} onPress={handleClick}>
                                    <Text style={{ color: 'white' }}>Tirar Foto</Text>
                                </TouchableOpacity>
                            </View>
                        </CameraView>
                    </View>
                </View>

                <FlatList
                    data={trabalhadores}
                    keyExtractor={item => item.id.toString()}
                    renderItem={renderTrabalhadore}
                    ListEmptyComponent={() => (
                        <View style={styles.emptyListContainer}>
                            <Text style={styles.emptyListText}>Nenhum trabalhador cadastrado</Text>
                        </View>
                    )}
                />

            </View>
        </View>
    );
}

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