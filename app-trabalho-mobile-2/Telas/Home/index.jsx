import { Text, View, TouchableOpacity } from "react-native";
import Estilos from "../../Componentes/Estilos";

export default function Home(props){

    const abrirCadastroCliente = () =>{
        props.navigation.navigate('Cliente');
    }

    const abrirCadastroTrabalhador = () =>{
        props.avigation.navigate('Trabalhador');
    }

    const abrirLogin = () =>{
        props.navigation.navigate('Login');
    }


    return(
        <View style={Estilos.container}>
            <TouchableOpacity style={Estilos.buttonHome} activeOpacity={0.7} onPress={abrirCadastroCliente}>
                <Text style={Estilos.buttonTexto}>Cadastro cliente</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Estilos.buttonHome} activeOpacity={0.7} onPress={abrirCadastroTrabalhador}>
                <Text style={Estilos.buttonTexto}>Cadastro trabalhador</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Estilos.buttonHome} activeOpacity={0.7} onPress={abrirLogin}>
                <Text style={Estilos.buttonTexto}>Login</Text>
            </TouchableOpacity>
        </View>
    )
}

