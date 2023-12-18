import { useCallback, useState } from "react";
import { styles } from "./styles";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { CaretLeft, Check, Clock, PlayCircle, Plus, Star } from "phosphor-react-native";
import { useFocusEffect } from "@react-navigation/native";

import { api } from "../../services/api";
import { useFavorite } from "../../hooks/useFavorite";
import { ScreenLayout } from "../../components/ScreenLayout";
import { ItemDisplay } from "../../components/ItemDisplay";
import { MovieOrSerie } from "../../@types/movieOrSerie";
import { TrailerVideo } from "../../components/TrailerVideo";

export function Details({ navigation, route }) {
    const { item } = route.params
    const { favorites, addToFavorites, removeFromFavorites } = useFavorite()

    const [isFavorited, setIsFavorited] = useState(() => {
        const isFavorite = favorites.find(favorite => favorite.id === item.id)

        return !!isFavorite
    })
    const [itemData, setItemData] = useState<MovieOrSerie>({})
    const [isLoading, setIsLoading] = useState(false)
    const [recommedations, setRecommentations] = useState([])
    const [trailerKey, setTrailerKey] = useState('')
    const [formattedDate, setFormattedDate] = useState('')
    const [modalTrailerVisible, setModalTrailerVisible] = useState(false)

    async function getDetailsData() {
        const url = `/${item.title ? "movie" : "tv"}/${item.id}`
        const itemData = await api.get(url)
        const alike = await api.get(`${url}/recommendations`)
        const trailers = await api.get(`${url}/videos`)

        if(trailers.data.results.length > 0) {
            setTrailerKey(trailers.data.results[0].key)
        }

        setRecommentations(alike.data.results)
        setItemData(itemData.data)
        
        setFormattedDate(new Date(
            itemData.data.release_date || itemData.data.first_air_date
            )
            .toLocaleDateString("pt-BR", {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            }))

        setIsLoading(false)
    }
    
    function handleAddToFavorites() {
        addToFavorites(itemData)

        setIsFavorited(true)
    }

    function handleRemoveFromFavorites() {
        removeFromFavorites(itemData)

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
            <TrailerVideo trailerKey={trailerKey} visible={modalTrailerVisible} onChangeVisible={setModalTrailerVisible} />

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
                {
                    trailerKey && (
                        <TouchableOpacity 
                            style={styles.trailerBtnContainer} 
                            onPress={() => setModalTrailerVisible(true)}
                            >
                            <PlayCircle color="#ffffff" size={28} />
                            <Text style={{ fontSize: 20, color: 'white' }}>Trailer</Text>
                        </TouchableOpacity>
                    )
                }
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
                            {formattedDate}
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