import { Image, Text, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { styles } from "./styles"

export function ItemDisplay({ movie: item }) {
    const navigation = useNavigation()

    return (
        <TouchableOpacity 
            style={styles.container}
            onPress={() => navigation.navigate("Details", { item })}>
            <Image  
                style={styles.image} 
                source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} />
        </TouchableOpacity>
    )
}