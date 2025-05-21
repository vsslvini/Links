import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";


import { styles } from "./styles";
import { colors } from "@/styles/colors";
import { Categories } from "@/components/categories";
import { Input } from "@/components/input";
import { Button } from "@/components/button";

export default function Add() {


    const router = useRouter();

    const navigateToBack = () => {
        router.back();
    }

    const [category, setCategory] = useState("");
    const [name, setName] = useState("");
    const [url, setUrl] = useState("");

    function handleAdd() {
        console.log({ name, url })
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={navigateToBack}>
                    <MaterialIcons name="arrow-back" size={32} color={colors.gray[200]} />
                </TouchableOpacity>
                <Text style={styles.title}>Novo</Text>
            </View>
            <Text style={styles.label}>Selecione uma categoria</Text>

            <Categories onChange={setCategory} selected={category} />

            <View style={styles.form}>
                <Input placeholder="Nome" onChangeText={setName} autoCorrect={false} />
                <Input placeholder="Url" onChangeText={setUrl} autoCorrect={false} />
                <Button title="Adicionar" onPress={handleAdd} />
            </View>
        </View>
    )
}