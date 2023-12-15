import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Movies } from "../screens/Movies"
import { Details } from "../screens/Details";
import { ArrowLeft, FilmStrip, MonitorPlay, Star } from "phosphor-react-native";
import { TvSeries } from "../screens/Tv";
import { TouchableOpacity } from "react-native";
import { Favorites } from "../screens/Favorites";
import { useNavigation } from "@react-navigation/native";

const { Navigator, Screen } = createBottomTabNavigator()

export function RouterTabs() {
    const navigation = useNavigation()

    return (
        <Navigator 
            screenOptions={{
                tabBarActiveTintColor: "#5e3f9d",
                tabBarInactiveTintColor: "#212121",
                headerTitleAlign: 'center',
                headerTintColor: 'white',
                headerStyle: {
                    backgroundColor: "#1e1139",
                }
            }}>
            <Screen 
               name="Filmes" 
               component={Movies}
                options={{
                    headerShown: false, 
                    /* para que não duplique o header do stackNavigator com o header do TabNavigator */
                    tabBarIcon: ({ color, size }) => <FilmStrip color={color} size={size} />,
                    tabBarLabel: "Filmes"
                }}  />
                <Screen 
                    name="Séries" 
                    component={TvSeries} 
                    options={{
                        headerShown: false, 
                        tabBarLabel: "Series",
                        tabBarIcon: ({ color, size }) => <MonitorPlay color={color} size={size} />
                    }}
                    />
                <Screen 
                    name="Favoritos"
                    component={Favorites}
                    options={{
                        tabBarLabel: "Favoritos",
                        tabBarIcon: ({ color, size }) => <Star color={color} size={size} /> 
                    }}
                    />
                <Screen 
                    name="Details" 
                    component={Details} 
                    options={{
                        headerLeft: () => (
                            <TouchableOpacity 
                                style={{ paddingLeft: 10 }}
                                onPress={() => navigation.goBack()}>
                                <ArrowLeft color="#fff" />
                            </TouchableOpacity>
                        ),
                        tabBarItemStyle: {
                            display: 'none'
                        },
                    }}
                    />
        </Navigator>
    )
}