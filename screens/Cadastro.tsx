import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styles";

interface Usuario {
    nome: string
    email: string
    senha: string
}
interface CadastroProps {
    voltarParaLogin: () => void;
}
export default function Cadastro({
    voltarParaLogin,
}: CadastroProps) {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    async function cadastrarUsuario() {
        if (nome.trim() === ' ' || email.trim() === ' ' || senha.trim() === ' ' || confirmarSenha.trim() === ' ') {
            Alert.alert('Atencao', 'Preencha todos os campos');
        }
        if (senha !== confirmarSenha) {
            Alert.alert('Erro', 'As senhas nao sao iguais')
        }
        if (senha.length < 4) {
            Alert.alert('Erro', 'A senha deve possuir pelo menos 4 catacteres')
        }
        try {
            const usuario: Usuario = {
                nome: nome.trim(),
                email: email.trim().toLowerCase(),
                senha: senha,
            };
            const dadosUsuario = JSON.stringify(usuario);
            await AsyncStorage.setItem('@sistema_login:usuario', dadosUsuario);
            Alert.alert('Sucesso', 'Usuario cadastrado com Sucesso', [
                {
                    text: 'OK',
                    onPress: voltarParaLogin
                }
            ]);
            setNome('');
            setEmail('');
            setSenha('');
            setConfirmarSenha('');
        } catch (error) {
            console.log(error);
            Alert.alert('Erro ', 'Nao foi possivel cadastrar usuario');
        }
    }
   
    return (
        <View style={styles.containerLogin}>
            <Text style={styles.titulo}>Criar Conta</Text>
            <Text style={styles.subtitulo}>Cadastrar um Novo Usuario</Text>
            <TextInput style={styles.input}
                placeholder="Digite seu nome"
                value={nome}
                onChangeText={setNome}
            />
            <TextInput style={styles.input}
                placeholder="Digite o E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput style={styles.input}
                placeholder="Digite a Senha"
                secureTextEntry={true}
                autoCapitalize="none"
                value={senha}
                onChangeText={setSenha}
            />
            <TextInput style={styles.input}
                placeholder="Comfirmar a Senha"
                secureTextEntry={true}
                value={confirmarSenha}
                onChangeText={setConfirmarSenha}
            />
            <TouchableOpacity style={styles.botao}
                onPress={cadastrarUsuario}>
                <Text style={styles.textoBotao}>CADASTRAR</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botaoSecundario}
                onPress={voltarParaLogin}>
                <Text style={styles.textoBotaoSecundario}>
                    VOLTAR PARA LOGIN
                </Text>
            </TouchableOpacity>
        </View>
    )
}