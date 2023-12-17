import { FlatList, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { SafeAreaView } from "react-native-safe-area-context";
import { ItemDisplay } from "../../components/ItemDisplay";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScreenLayout } from "../../components/ScreenLayout";

export function Movies({ navigation, route }) {
    const [movies, setMovies] = useState([])
    const [search, setSearch] = useState('')
    const [filteredMovies, setFilteredMovies] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    
    async function getMovies() {
        const popularData = await api.get(`/movie/popular`)
        const upcomingData = await api.get(`/movie/upcoming`)
        const nowPlayingData = await api.get(`/movie/now_playing`)
        const topRatedData = await api.get(`/movie/top_rated`)

        setMovies([
            {
                name: "Populares",
                data: popularData.data.results
            },
            {
                name: "Lançamentos",
                data: upcomingData.data.results
            },
            {
                name: "Mais Recentes",
                data: nowPlayingData.data.results
            },
            {
                name: "Bem Avaliados",
                data: topRatedData.data.results,
            }
        ])

        setIsLoading(false)
    }

    function filterMovies() {
        let moviesData = []
        
        for(let category of movies) {
            moviesData.push(...category.data)
        }

        if (!search) {
            setFilteredMovies([])
            return;
        }

        const updatedMovies = moviesData.filter(movie => { 
            const lowerTitle = movie.title.toLowerCase()

            return lowerTitle.includes(search.toLowerCase())
        })

        setFilteredMovies(updatedMovies)
    }

   // AsyncStorage.multiRemove(['favorites'])
    useEffect(() => {
        getMovies()
    }, [])

    useEffect(() => {
        filterMovies()
    }, [search])

    return (
        <ScreenLayout isLoading={isLoading}>
            <TextInput placeholder="Pesquise..." style={styles.searchInput} onChangeText={(text) => setSearch(text)} />
             { search.length > 0 ? 
                     filteredMovies.length > 0 ? (
                         <FlatList 
                             data={filteredMovies} 
                             keyExtractor={(item, index) => item.id + index} 
                             numColumns={2}
                             showsHorizontalScrollIndicator={false}
                             renderItem={({ item }) => (
                                 <ItemDisplay item={item} />
                             )}
                         />
                         )
                         : 
                         <Text style={styles.listEmptyText}>Nenhum filme encontrado</Text> 
                 :
                 <ScrollView showsVerticalScrollIndicator={false}>
                     {movies.map(category => (
                         <View key={category.name} style={styles.moviesContainer}>
                             <Text style={styles.movieContainerTitle}>
                                 {category.name}
                             </Text>
                             <FlatList 
                                 data={category.data} /* a lista a ser renderizada */
                                 keyExtractor={(item) => item.id} /* extração da key de cada elemento */
                                 horizontal
                                 showsHorizontalScrollIndicator={false}
                                 renderItem={({ item }) => (
                                     <ItemDisplay item={item} />
                                 )}
                             />
                         </View>
                     ))}
                 </ScrollView>
             }
        </ScreenLayout>
    )
}