import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react';
import Header from '@/component/Header';
import ProductItem from '@/component/ProductItem';
import LoadingComponent from '@/component/LoadingComponent';
import AxiosInstance from '@/api/sever';
import { FlashList } from '@shopify/flash-list';



const Menu = ({ navigation }: any) => {
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Tất cả');
    const [loading, setLoading] = useState(false);

    const categories = ['Tất cả', 'Thú nuôi', 'Đề xuất', 'Combo', 'Ahihi'];

    const filteredProducts = selectedCategory === 'Tất cả'
        ? products
        : products.filter((item: any) => item.category === selectedCategory);



    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const res: any = await AxiosInstance(null).get('/products/all');
                setProducts(res);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách sản phẩm:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <View style={styles.container}>
            <Header
                title={selectedCategory}
                back={require('../assets/images/chevron-left.png')}
                backFunc={() => navigation.goBack()}
                icon={require('../assets/images/shopping-cart.png')}
                navigation={navigation}
            />
            {/* <View style={styles.titleBlock}>
                <Text style={styles.text}>Tất cả</Text>
            </View> */}
            <View style={styles.categoryContainer}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryRow}>
                    {categories.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => setSelectedCategory(item)}
                            style={[
                                styles.categoryItem,
                                selectedCategory === item && styles.categoryItemActive,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.categoryText,
                                    selectedCategory === item && styles.categoryTextActive,
                                ]}
                            >
                                {item}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
            <View style={styles.listPro}>
                <FlashList
                    data={products}
                    numColumns={2}
                    renderItem={({ item }: any) => (
                        <ProductItem
                            id={item._id}
                            image={item.imageUrl}
                            name={item.name}
                            price={item.price}
                            attribute={item.attribute}
                            navigation={navigation}
                        />
                    )}
                />
            </View>
            {loading && <LoadingComponent />}
        </View>
    )
}

export default Menu

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    listPro: {
        flex: 1,
        marginHorizontal: 10,
    },
    titleBlock: {
        width: 70,
        borderRadius: 10,
        padding: 10,
        backgroundColor: "#009245",
        marginHorizontal: 20,
        marginBottom: 10,
    },
    text: {
        fontSize: 14,
        color: "#fff",
        textAlign: 'center',
    },
    categoryContainer: {
        paddingVertical: 10,
    },
    categoryRow: {
        flexDirection: 'row',
        gap: 10,
        paddingHorizontal: 20,
    },
    categoryItem: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 10,
        backgroundColor: '#f0f0f0',
        marginRight: 10,
    },
    categoryItemActive: {
        backgroundColor: '#009245',
    },
    categoryText: {
        fontSize: 14,
        color: '#000',
    },
    categoryTextActive: {
        color: '#fff',
        fontWeight: 'bold',
    },

})