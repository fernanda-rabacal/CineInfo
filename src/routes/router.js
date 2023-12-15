import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Movies } from "../screens/Movies";
import { Details } from "../screens/Details";

const Stack = createNativeStackNavigator(); 
/* função para importar os componentes para criação das rotas */

export function Router() {
    return (
        <Stack.Navigator 
            initialRouteName="Movies" 
            screenOptions={{ 
                headerTitleAlign: 'center',
                headerTintColor: 'white',
                headerStyle: {
                    backgroundColor: '#352456'
                }
             }}
            >
            <Stack.Screen name="Movies" component={Movies} />
            <Stack.Screen name="Details" component={Details} /* options={{ headerShown: false }} */ />
        </Stack.Navigator>
    )
}