import { useCallback, useState } from "react";
import { styles } from "./styles";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { CaretLeft, Check, Clock, Plus, Star } from "phosphor-react-native";
import { useFocusEffect } from "@react-navigation/native";

import { api } from "../../services/api";
import { useFavorite } from "../../hooks/useFavorite";
import { ScreenLayout } from "../../components/ScreenLayout";
import { ItemDisplay } from "../../components/ItemDisplay";
import { MovieOrSerie } from "../../@types/movieOrSerie";

export function Details({ navigation, route }) {
    const { item } = route.params
    const { favorites, addToFavorites, removeFromFavorites } = useFavorite()

    const [isFavorited, setIsFavorited] = useState(() => {
        const isFavorite = favorites.find(favorite => favorite.id === item.id)

        return !!isFavorite
    })
    const [itemData, setItemData] = useState<MovieOrSerie | null>()
    const [isLoading, setIsLoading] = useState(false)
    const [recommedations, setRecommentations] = useState([])
    
    const formattedReleasedData = new Date(
            itemData.release_date || itemData.first_air_date
        )
        .toLocaleDateString("pt-BR", {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        })

    async function getDetailsData() {
        const url = item.title ? `/movie/${item.id}` : `/tv/${item.id}`
        const itemData = await api.get(url)
        const alike = await api.get(`${url}/recommendations`)

        setRecommentations(alike.data.results)
        setItemData(itemData.data)
        setIsLoading(false)
    }
    
    async function handleAddToFavorites() {
        await addToFavorites(itemData)

        setIsFavorited(true)
    }

    async function handleRemoveFromFavorites() {
        await removeFromFavorites(itemData)

        setIsFavorited(false)
    }
    
    useFocusEffect(
        useCallback(() => {
            setIsLoading(true)
            getDetailsData()
          }, [item])
    )

    return (
        <ScreenLayout isLoading={isLoading}>
            <TouchableOpacity 
                style={styles.backBtn}
                onPress={() => navigation.goBack()}>
                <CaretLeft color="#fff" />
            </TouchableOpacity>

            <ScrollView showsVerticalScrollIndicator={false}>
                <Image 
                    style={styles.poster}
                    source={{ uri: `https://image.tmdb.org/t/p/w500${item.backdrop_path}` }} 
                    />
                <Text style={styles.title}>{itemData.title || itemData.name}</Text>
                <View style={styles.timeAndVoteContainer}>
                    {
                        itemData.runtime && 
                        <View style={styles.dataContainer}>
                            <Clock color="#ccc"  size={17} />
                            <Text style={styles.text}>
                                {itemData.runtime} minutos
                            </Text>
                        </View>
                    }

                    {
                        itemData.seasons && 
                        <View>
                            <Text style={styles.text}>
                                {itemData.seasons.length} Temporadas
                            </Text>
                        </View>
                    }

                    <View style={styles.dataContainer}>
                        <Star color="#ffb42a" size={17} />
                        <Text style={styles.text}>
                            {item.vote_average.toFixed(1)} 
                        </Text>
                    </View>

                    <TouchableOpacity 
                        onPress={isFavorited ? handleRemoveFromFavorites : handleAddToFavorites} 
                        style={{ marginEnd: 20 }}
                        >
                        {!isFavorited ? <Plus color="#fff" /> : <Check color="#fff" /> }
                    </TouchableOpacity>
                </View>
                <View style={styles.releaseAndGenreContainer}>
                    <View style={{ width: '45%' }}>
                        <Text style={styles.releaseAndGenreTitle}>Lançamento</Text>
                        <Text style={styles.text}>
                            {formattedReleasedData}
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.releaseAndGenreTitle}>Gêneros</Text>
                        <View style={styles.dataContainer}>
                            {itemData.genres && itemData.genres
                                .filter((_, i) => i <= 2)
                                .map((genre) => (
                                    <Text style={styles.genreName} key={genre.id}>{genre.name}</Text>
                                ))}
                        </View>
                    </View>
                </View>
                <Text style={styles.overview}>{itemData.overview}</Text>

                <Text style={styles.recommendationsTitle}>Conteúdos semelhantes</Text>
                <View style={styles.recommendations}>
                    {
                        recommedations.map(recommedation => (
                            <ItemDisplay key={recommedation.id} item={recommedation} recommendation />
                        ))
                    }
                </View>
            </ScrollView>
        </ScreenLayout>
    )
}