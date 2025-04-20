import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react';
import { FlashList } from '@shopify/flash-list';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '@/component/Header';
import ProductItem from '@/component/ProductItem';
import AxiosInstance from '@/api/sever';
import SearchHistory from '@/component/SearchHistory';

const Search = ({ navigation }: any) => {
    const [searchValue, setSearchValue] = useState('');
    const [searchHistory, setSearchHistory] = useState<string[]>([]);
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        const loadSearchHistory = async () => {
            const history = await AsyncStorage.getItem('searchHistory');
            if (history) {
                setSearchHistory(JSON.parse(history));
            }
        };
        loadSearchHistory();
    }, []);

    const handleSearch = async () => {
        try {
            setIsSearching(true);
            const res: any = await AxiosInstance(null).get(
                `/products/search/${searchValue}`,
            );
            setSearchResults(res);

            const updatedHistory = [
                searchValue,
                ...searchHistory.filter(item => item !== searchValue),
            ].slice(0, 5);
            setSearchHistory(updatedHistory);
            await AsyncStorage.setItem(
                'searchHistory',
                JSON.stringify(updatedHistory),
            );
        } catch (error) {
            console.error('Lỗi khi tìm kiếm sản phẩm:', error);
        } finally {
            setIsSearching(false);
        }
    };
    const reSearch = (query: string) => {
        setSearchValue(query);
        handleSearch();
    };

    const deleteHistory = async (item: string) => {
        const updatedHistory = searchHistory.filter(history => history !== item);
        setSearchHistory(updatedHistory);
        await AsyncStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
    };
    return (
        <View style={styles.container}>
            <Header title="Tìm kiếm" />
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    value={searchValue}
                    onChangeText={setSearchValue}
                    placeholder="Tìm kiếm"
                    placeholderTextColor={"#949090"}
                />
                <TouchableOpacity onPress={handleSearch}>
                    <Image
                        style={styles.icon}
                        source={require('../assets/images/search.png')}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.historyContainer}>
        {isSearching ? (
          <Text style={styles.text}>Đang tìm kiếm...</Text>
        ) : searchResults.length > 0 ? (
          <FlashList
            data={searchResults}
            renderItem={({item}) => (
              <ProductItem
                id={item._id}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                image={item.imageUrl}
                navigation={navigation}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <>
            <Text style={styles.text}>Tìm kiếm gần đây</Text>
            <FlashList
              data={searchHistory}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <SearchHistory
                  title={item}
                  onDelete={() => deleteHistory(item)}
                  reSearch={() => reSearch(item)}
                />
              )}
            />
          </>
        )}
      </View>
        </View>
    )
}

export default Search

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    icon: {
        width: 20,
        height: 20,
      },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 30,
        marginTop: 20,
    },
    searchInput: {
        width: '90%',
        borderBottomColor: "#000",
        borderBottomWidth: 1,
        fontSize: 18,
    },
    historyContainer: {
        flex: 1,
        marginTop: 40,
        marginHorizontal: 30,
    },
    text: {
        fontSize: 18,
        fontWeight: '500',
    },
})