import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Movies } from "../screens/Movies"
import { Details } from "../screens/Details";
import { ArrowLeft, FilmStrip, MonitorPlay, Star } from "phosphor-react-native";
import { TvSeries } from "../screens/Tv";
import { TouchableOpacity } from "react-native";
import { Favorites } from "../screens/Favorites";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const { Navigator, Screen } = createBottomTabNavigator()

export function RouterTabs() {
    return (
        <Navigator 
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "#ffffff",
                tabBarInactiveTintColor: "#787878",
                tabBarStyle: {
                    backgroundColor: '#1f1632'
                },
            }}>
            <Screen 
               name="Filmes" 
               component={Movies}
                options={{
                    tabBarIcon: ({ color, size }) => <FilmStrip color={color} size={size} />,
                    tabBarLabel: "Filmes"
                }}  />
                <Screen 
                    name="Séries" 
                    component={TvSeries} 
                    options={{
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
                        tabBarItemStyle: {
                            display: 'none'
                        },
                    }}
                    />
        </Navigator>
    )
}

const Stack = createNativeStackNavigator() 

export function DetailsStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name="Details" component={Details} />
        </Stack.Navigator>
    )
}