import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { FlatList, RefreshControl, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ItemDisplay } from "../../components/ItemDisplay";
import { styles } from "./styles";
import { FavoriteItem } from "../../components/FavoriteItem";
import { ScreenLayout } from "../../components/ScreenLayout";

export function Favorites({ navigation, route }) {
    const [favorites, setFavorites] = useState([])
    const [refreshing, setRefreshing] = useState(false)

    async function getFavorites() {
        setRefreshing(true)

        const items = await AsyncStorage.getItem("favorites")
        //dados vindos do AsyncStorage são sempre um JSON

        if (items) {
            setFavorites(JSON.parse(items))
        }

        setRefreshing(false)
    }

    useEffect(() => {
        getFavorites()
    }, [])

    return (
        <ScreenLayout>
            <Text style={styles.title}>Minha lista</Text>
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={getFavorites} />
                  }>
                    
                {
                    favorites.length > 0 ? (
                        favorites.map(favorite => (
                            <FavoriteItem item={favorite} />
                        ))
                    ) 
                    :
                    <Text style={styles.listEmptyText}>Nada por aqui... Adicione algum item nos seus favoritos</Text>
                }
            </ScrollView>
        </ScreenLayout>
    )
}