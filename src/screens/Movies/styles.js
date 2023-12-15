import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: "#1e1139",
        padding: 30,
        gap: 30
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 10
    },
    listEmptyText: {
        fontSize: 20,
        color: '#e3e3e3',
        textAlign: 'center'
    },
    searchInput: {
        backgroundColor: '#866287',
        color: '#dedede',
        fontSize: 16,
        padding: 7,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    moviesContainer: {
        marginBottom: 30
    },
    movieContainerTitle: {
        fontSize: 20,
        color: '#ebe6ee',
        marginBottom: 10
    }
})