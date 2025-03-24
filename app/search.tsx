import { FontAwesome } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TextInput,
    ImageSourcePropType,
    TouchableOpacity,
    View,
    SafeAreaView,
    ActivityIndicator,
} from "react-native";
import Header from "@/component/Header";
import { FlashList } from "@shopify/flash-list";
import ProductSearch from "@/component/product_search";
import CustomTextInput from "@/component/textInputL_R";

interface productSearch {
    _id: string;
    imageUrl: ImageSourcePropType;
    name: string;
    price: number;
    quantity: number;
}

const Search: React.FC = ({ navigation }: any) => {
    const [searchText, setSearchText] = useState("");
    const [productSearch, setProductSearches] = useState<productSearch[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchProducts = async () => {
        if (!searchText.trim()) return;
        setLoading(true);
        try {
            const response = await fetch(
                `https://my-express-app-13ot.onrender.com/products/search/${encodeURIComponent(searchText)}`
            );
            const data = await response.json();
            setProductSearches(data);
        } catch (error) {
            console.error("Lỗi khi tìm kiếm sản phẩm:", error);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <SafeAreaView style={styles.appDfColor}>
            <Header
                iconLeft={require('../assets/images/chevron-left.png')}
                title="TÌM KIẾM"
            />
            <View style={styles.header}>
                <View style={styles.rowContainer2}>
                    <CustomTextInput
                        placeholder="Tìm kiếm..."
                        isSearch={true}
                        onChangeText={setSearchText}
                        onSubmitEditing={()=>fetchProducts()}
                        hasToggle={false}
                    />
                </View>
            </View>
            <FlashList
                data={[1]}
                renderItem={() => (
                    <View  style={{justifyContent: "center"}}>
                        <FlatList
                            data={productSearch}
                            horizontal={false}
                            numColumns={1}
                            refreshing={false}
                            style={styles.listPopular}
                            renderItem={({ item }) => (
                                <ProductSearch
                                    _id={item._id}
                                    imageUrl={item.imageUrl}
                                    name={item.name}
                                    price={item.price}
                                    quantity={item.quantity}
                                />
                            )}
                            keyExtractor={(item) => item._id}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                )}
            />
            {loading && (
                <View style={styles.overlay}>
                    <ActivityIndicator size="large" color="#007537" />
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    appDfColor: {
        backgroundColor: "#fff",
        flex: 1,
    },
    header: {
        width: "100%",
        flexDirection: "row",
        backgroundColor: "#fff",
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
    },
    iconBack: {
        width: 25,
        marginRight: 15,
    },
    searchInput: {
        width: "65%",
        fontSize: 12,
        color: "#333",
        borderWidth: 0,
        outlineColor: "transparent",
    },
    clearIcon: {
        marginLeft: 10,
    },
    iconSend: {
        width: 25,
        marginLeft: 10,
    },
    container: {
        paddingHorizontal: 15,
        paddingBottom: 10,
        paddingTop: 15,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 14,
        fontWeight: "500",
    },
    iconIncrease: {
        width: 22,
        height: 22,
        padding: 5,
        borderRadius: "50%",
        backgroundColor: "red",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
    },
    icon: {
        width: 16,
        height: 16,
    },
    rowContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    rowContainer2: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
    },
    listPopular: {
        backgroundColor: "#fff",
        paddingBottom: 5,
        paddingHorizontal: 5,
    },
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 2,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
});

export default Search;
