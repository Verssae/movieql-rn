import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { ScrollView, Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { HOME_PAGE } from './queries'

const Movie = ({ id, poster, title, rating, navigation }) =>
    <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Details', {
            id,
            title,
            rating
        })}>
        <Image source={{ uri: poster }} style={{ width: 400, height: 600 }} />
        <Text>{`${id} ${title} ${rating}`}</Text>
    </TouchableOpacity>


export const Loading = () =>
    <View style={styles.container}>
        <Text>{"Loading..."}</Text>
    </View>
    
const HomeScreen = ({ navigation }) => {
    const { data, loading, error } = useQuery(HOME_PAGE)
    if (loading) return <Loading />
    if (error) {
        console.log(error)
        return <View style={styles.container}><Text>{"Error"}</Text></View>
    }
    console.log(data)
    return (
        <ScrollView style={{ flex: 1 }}>
            {data.movies.map(movie => (
                <Movie
                    id={movie.id}
                    key={movie.id}
                    poster={movie.medium_cover_image}
                    title={movie.title}
                    rating={movie.rating}
                    navigation={navigation}
                />
            ))}
        </ScrollView>
    );
}


HomeScreen.navigationOptions = {
    title: "Home"
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        flex: 1,
        backgroundColor: "gray",
        alignItems: "flex-start"
    }
});

export default HomeScreen