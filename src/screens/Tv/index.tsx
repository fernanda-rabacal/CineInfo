import { useEffect, useState } from "react";
import { FlatList, ScrollView, Text, TextInput, View } from "react-native";
import { api } from "../../services/api";
import { SafeAreaView } from "react-native-safe-area-context";
import { ItemDisplay } from "../../components/ItemDisplay";
import { styles } from "../Movies/styles";
import { ScreenLayout } from "../../components/ScreenLayout";

export function TvSeries() {
    const [tvSeries, setTvSeries] = useState([])
    const [search, setSearch] = useState('')
    const [filteredTvSeries, setFilteredTvSeries] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    
    async function getTvSeries() {
        const popularData = await api.get(`/tv/popular`)
        const topRatedData = await api.get(`/tv/top_rated`)
        const airingTodayData = await api.get(`/tv/airing_today`)
        const onTheAirData = await api.get(`/tv/on_the_air`)

        setTvSeries([
            {
                name: "Populares",
                data: popularData.data.results
            },
            {
                name: "Lançamentos",
                data: airingTodayData.data.results
            },
            {
                name: "No Ar Agora",
                data: onTheAirData.data.results
            },
            {
                name: "Bem Avaliados",
                data: topRatedData.data.results,
            }
        ])

        setIsLoading(false)
    }

    function filterTvSeries() {
        let tvSeriesData = []
        
        for(let category of tvSeries) {
            tvSeriesData.push(...category.data)
        }

        if (!search) {
            setFilteredTvSeries([])
            return;
        }

        const updatedTvSeries = tvSeriesData.filter(tvSerie => { 
            const lowerTitle = tvSerie.name.toLowerCase()

            return lowerTitle.includes(search.toLowerCase())
        })

        setFilteredTvSeries(updatedTvSeries)
    }

    useEffect(() => {
        getTvSeries()
        /* array vazio para ser chamado apenas no carregamento do app */
    }, [])

    useEffect(() => {
        filterTvSeries()
    }, [search])

    return (
        <ScreenLayout isLoading={isLoading}>
            <TextInput 
                placeholder="Pesquise..."
                style={styles.searchInput} 
                onChangeText={(text) => setSearch(text)}
             />
             {search.length > 0 ? 
                 filteredTvSeries.length > 0 ? (
                     <FlatList 
                         data={filteredTvSeries} 
                         keyExtractor={(item, index) => item.id + index} 
                         numColumns={2}
                         showsHorizontalScrollIndicator={false}
                         renderItem={({ item }) => (
                             <ItemDisplay item={item} />
                         )}
                     />
                 ) : <Text style={styles.listEmptyText}>Nenhuma série encontrada</Text>
             : 
             <ScrollView showsVerticalScrollIndicator={false}>
                 {tvSeries.map(category => (
                     <View key={category.name} style={styles.moviesContainer}>
                         <Text style={styles.movieContainerTitle}>{category.name}</Text>
                         <FlatList 
                             data={category.data}
                             keyExtractor={(item) => item.id}
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