import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Button, Text, View, StyleSheet, Image } from 'react-native'
import { MOVIE_DETAILS } from './queries'
import {Loading, Error} from './HomeScreen'



const DetailsScreen = ({ navigation }) => {
    const movieId = navigation.getParam('id', 'id')
    const {data, loading, error} = useQuery(MOVIE_DETAILS, {
        variables: {movieId}
    })
    if (loading) return <Loading />
    if (error) <Error />
    console.log(data)
    const {medium_cover_image, title, rating, description_intro} = data.movie
    return (
        <View style={styles.container}>
            <Text>Details Screen</Text>
            <Image source={{uri: medium_cover_image}}/>
            <Text>{`${movieId} ${title} ${rating}`}</Text>
            <Button
                title="Go to Home"
                onPress={() => navigation.navigate('Home')}
            />
            <Button
                title="Go back"
                onPress={() => navigation.goBack()}
            />
        </View >
    )
}

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

DetailsScreen.navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('title', 'title')
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    }
})
export default DetailsScreen