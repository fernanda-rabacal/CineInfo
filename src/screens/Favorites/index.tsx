import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useEffect, useState } from "react";
import { RefreshControl, Text, ScrollView } from "react-native";
import { styles } from "./styles";
import { FavoriteItem } from "../../components/FavoriteItem";
import { ScreenLayout } from "../../components/ScreenLayout";
import { FavoritesContext } from "../../contexts/FavoritesContext";

export function Favorites({ navigation, route }) {
    const { favorites, getFavorites } = useContext(FavoritesContext)
    const [refreshing, setRefreshing] = useState(false)

    async function fetchFavoritesFromStorage() {
        setRefreshing(true)
        await getFavorites()
        setRefreshing(false)
    }
    
    return (
        <ScreenLayout>
            <Text style={styles.title}>Minha lista</Text>
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={fetchFavoritesFromStorage} />
                  }>
                    
                {
                    favorites.length > 0 ? (
                        favorites.map(favorite => (
                            <FavoriteItem key={favorite.id} item={favorite} />
                        ))
                    ) 
                    :
                    <Text style={styles.listEmptyText}>Nada por aqui... Adicione algum item nos seus favoritos!</Text>
                }
            </ScrollView>
        </ScreenLayout>
    )
}