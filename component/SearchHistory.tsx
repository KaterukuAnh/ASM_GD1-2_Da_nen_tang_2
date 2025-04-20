import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'

const SearchHistory = React.memo((props: any) => {
    const { title, onDelete, reSearch } = props;
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.searchContent} onPress={reSearch}>
                <Image
                    style={styles.icon}
                    source={require('../assets/images/clock.png')}
                />
                <Text style={styles.title}>{title}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onDelete}>
                <Image
                    style={styles.icon}
                    source={require('../assets/images/quit.png')}
                />
            </TouchableOpacity>
        </View>

    )
})

export default SearchHistory

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 15,
    },
    searchContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: 20,
        height: 20,
      },
    title: {
        marginLeft: 10,
        fontSize: 18,
        color: "#000",
    },
})