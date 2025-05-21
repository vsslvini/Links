import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native";
import { styles } from "./style";
import symbolicateStackTrace from "react-native/Libraries/Core/Devtools/symbolicateStackTrace";

type Props = TouchableOpacityProps & {
    title: string
}

export function Button({ title, ...rest }: Props) {
    return (
        <TouchableOpacity style={styles.container} {...rest} activeOpacity={0.7}>
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    )
}