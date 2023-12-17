import { Image, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { styles } from "./styles"

export function ItemDisplay({ item, recommendation = false }) {
    const navigation = useNavigation()

    return (
        <TouchableOpacity 
            onPress={() => navigation.navigate("Details", { item })}>
            <Image  
                style={[styles.image, !recommendation && { 
                    marginRight: 10,
                    width: 130,
                    height: 200 
                }]} 
                source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} />
        </TouchableOpacity>
    )
}