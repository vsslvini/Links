import { View, Image, TouchableOpacity, FlatList, Modal, Text, Alert, Linking } from "react-native";
import { styles } from "./styles"
import { MaterialIcons } from "@expo/vector-icons"
import { useRouter, useFocusEffect } from "expo-router";
import { useState, useCallback } from "react";


import { colors } from "@/styles/colors";
import { Categories } from "@/components/categories";
import { Link } from "@/components/link";
import { Option } from "@/components/option";
import { categories } from "@/utils/categories";
import { LinkStorage, linkStorage } from "@/storage/link-storage";


export default function Index() {
    const router = useRouter();
    const [showModal, setShowModal] = useState(false)
    const [link, setLink] = useState<LinkStorage>({} as LinkStorage)
    const [links, setLinks] = useState<LinkStorage[]>([])
    const [category, setCategory] = useState(categories[0].name)

    async function getLinks() {
        try {
            const response = await linkStorage.get()

            const filtered = response.filter((link) => link.category === category)

            setLinks(filtered)
        } catch (error) {
            Alert.alert("Erro", "Não foi possivel listar os links")
            console.log(error)
        }
    }

    function handleDetails(selected: LinkStorage) {
        setShowModal(true)
        setLink(selected)
    }

    async function linkRemove() {
        try {
            await linkStorage.remove(link.id)
            getLinks()
            setShowModal(false)

        } catch (error) {
            Alert.alert("Erro", "Não foi possível excluir")
            console.log(error)
        }
    }


    function handleRemove() {
        Alert.alert("Excluir", "Deseja realmente excluir?", [
            { style: "cancel", text: "Não" },
            { text: "Sim", onPress: linkRemove }
        ])
    }

    async function handleOpen() {
        try {
            await Linking.openURL(link.url)
            setShowModal(false)
        } catch (error) {
            Alert.alert("Link", "Não foi possivel abrir o link")
            console.log(error)
        }
    }


    const navigateToAdd = () => {
        router.navigate("/add")
    }

    useFocusEffect(useCallback(() => {
        getLinks()
    }, [category]))

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require("@/assets/logo.png")} style={styles.logo} />
                <TouchableOpacity activeOpacity={0.3} onPress={navigateToAdd}>
                    <MaterialIcons name="add" size={32} color={colors.green[300]} />
                </TouchableOpacity>
            </View>

            <Categories onChange={setCategory} selected={category} />

            <FlatList
                data={links}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Link
                        name={item.name}
                        url={item.url}
                        onDetails={() => handleDetails(item)}
                    />
                )}
                style={styles.links}
                contentContainerStyle={styles.linksContent}
                showsVerticalScrollIndicator={false}
            />

            <Modal transparent visible={showModal} animationType="slide">

                <View style={styles.modal}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalCategory}>{link.category}</Text>
                            <TouchableOpacity onPress={() => setShowModal(false)}>
                                <MaterialIcons name="close" size={20} color={colors.gray[400]} />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.modalLinkName}>
                            {link.name}
                        </Text>
                        <Text style={styles.modalUrl}>
                            {link.url}
                        </Text>


                        <View style={styles.modalFooter}>
                            <Option name="Excluir" icon="delete" variant="secudary" onPress={handleRemove} />
                            <Option name="Abrir" icon="language" variant="primary"  onPress={handleOpen}/>
                        </View>


                    </View>
                </View>

            </Modal>
        </View>
    )
}

