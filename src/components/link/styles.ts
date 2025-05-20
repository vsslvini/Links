import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";

export const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        gap: 12,
    },
    details: {
        flex: 1,

    },
    name: {
        color: colors.gray[100],
        fontWeight: "600",
        fontSize: 16,
    },
    url: {
        color: colors.gray[400],
        fontSize: 14,
    },
})