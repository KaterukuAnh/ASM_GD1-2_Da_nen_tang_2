import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';


const SearchHistoryComponent = React.memo((props: any) => {
  const {title, onDelete, reSearch} = props;

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
  );
});

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
  title: {
    marginLeft: 10,
    fontSize: 18,
    color: "#000",
  },
  icon: {
    width: 20,
    height: 20,
  },
});

export default SearchHistoryComponent;
