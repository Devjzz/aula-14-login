import React from "react";
import { View, Text, TouchableOpacity, } from 'react-native'
import styles from "../styles";
interface HomeProps {
    nome: string
    onLogout: () => void;
}
export default function Home({
    nome,
    onLogout,
}: HomeProps) {
    return (
        <View style={styles.containerHome}>
            <Text style={styles.tituloHome}>Bem-Vindo!</Text>
            <Text style={styles.nomeUsuario}>{nome}</Text>
            <Text style={styles.mensagemHome}>Voce esta Logado!</Text>
            <TouchableOpacity style={styles.botaoSair}
                onPress={onLogout}>
            <Text style={styles.textoBotao}>SAIR</Text>
            </TouchableOpacity>
        </View>
    );
}
