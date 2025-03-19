import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    SafeAreaView,
} from "react-native";
import ProductComponent from "@/component/product";
import { FlashList } from "@shopify/flash-list";
import { ScrollView } from "react-native-gesture-handler";
import taoAxiosInstance from "@/api/sever";

interface ProductItem {
    _id: string;
    name: string;
    price: number;
    attribute: string;
    imageUrl: string;
}

const product1 = [
    {
        id: "1",
        name: "Phi vô tri",
        price: 20000000,
        attribute: "Hàng limited",
        imageUrl: "https://i.pinimg.com/originals/8a/f0/cf/8af0cf849d3afb612af209cd794cb3c2.jpg"
    },
    {
        id: "2",
        name: "Hoàng khùng",
        price: 20000000,
        attribute: "Hàng limited",
        imageUrl: "https://i.pinimg.com/originals/8a/f0/cf/8af0cf849d3afb612af209cd794cb3c2.jpg"
    },
    {
        id: "3",
        name: "Lâm khùng",
        price: 20000000,
        attribute: "Hàng limited",
        imageUrl: "https://i.pinimg.com/originals/8a/f0/cf/8af0cf849d3afb612af209cd794cb3c2.jpg"
    },
];

const Home = (): any => {

    const [products, setProducts] = useState<ProductItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [visibleProducts, setVisibleProducts] = useState<ProductItem[]>([]);
    const [showAll, setShowAll] = useState(false);

    const axiosInstance = taoAxiosInstance();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                console.log("Bắt đầu gọi API...");
                const response = await axiosInstance.get("/products/all");

                console.log("Dữ liệu API nhận được:", response);
                if (!response || !Array.isArray(response)) {
                    console.error("Lỗi: API không trả về một mảng hợp lệ!");
                    return;
                }

                setProducts(response);
                setVisibleProducts(response.slice(0, 4));
            } catch (error: any) {
                console.error("Lỗi lấy sản phẩm:", error?.status, error?.message, error?.data);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleSeeMore = () => {
        if (showAll) {
            setVisibleProducts(products.slice(0, 4));
        } else {
            setVisibleProducts(products);
        }
        setShowAll(!showAll);
    };

    return (
        <SafeAreaView style={styles.safeContainer}>
            <ScrollView contentContainerStyle={styles.container}>
                <View>
                    <View style={styles.headerContainer}>
                        <View>
                            <Text style={styles.txtTitle}>
                                Planta - tỏa sáng
                            </Text>
                            <Text style={styles.txtTitle}>
                                không gian nhà bạn
                            </Text>
                        </View>
                        <TouchableOpacity style={styles.bgrCart}>
                            <Image
                                source={require("../assets/images/shopping-cart.png")}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.containerNew}>
                        <Image
                            style={{ width: "100%" }}
                            source={require("../assets/images/image_9-removebg-preview 1.png")}
                        />
                        <TouchableOpacity style={styles.newArrivalsButton}>
                            <Text style={styles.newArrivalsText}>Xem hàng mới về -{">"}</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.sectionTitle}>Cây trồng</Text>
                    <View style={styles.containerPd}>
                        {loading ? (
                            <ActivityIndicator size="large" color="#007537" />

                        ) : (
                            <FlashList
                                data={visibleProducts}
                                renderItem={({ item }) => (
                                    <ProductComponent
                                        id={item._id}
                                        imageUrl={item.imageUrl}
                                        name={item.name}
                                        attribute={item.attribute}
                                        price={item.price}
                                    />
                                )}
                                numColumns={2}
                                keyExtractor={(item) => item._id}
                                contentContainerStyle={{ paddingVertical: 10 }}
                                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                            />
                        )}
                        <TouchableOpacity onPress={handleSeeMore}>
                            <Text style={styles.seeMoreText}>{showAll ? "Thu gọn" : "Xem thêm Cây trồng"}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.containerFooter}>
                        <View style={styles.footerContent}>
                            <Text style={styles.footerTitle}>
                                Lemon Balm Grow Kit
                            </Text>
                            <Text style={styles.footerDescription}>
                                Gồm hạt giống Lemon Balm, gói đất hữu cơ, chậu Planta, marker đánh dấu...
                            </Text>
                        </View>
                        <View style={styles.footerImageContainer}>
                            <Image
                                style={styles.footerImage}
                                source={require("../assets/images/grow-kit-main_540x 1.png")}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: "#fff",
    },
    container: {
        flexGrow: 1,
        paddingBottom: 20,
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 20,
        marginVertical: 10,
    },
    txtTitle: {
        color: "#221F1F",
        fontWeight: "500",
        fontSize: 24
    },
    bgrCart: {
        backgroundColor: "#fff",
        width: 50,
        height: 50,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
    },
    containerNew: {
        position: "relative",
        width: "100%",
        marginVertical: 10,
    },
    newArrivalsButton: {
        position: "absolute",
        bottom: 180,
        marginHorizontal: 20
    },
    newArrivalsText: {
        color: "#007537",
        fontSize: 16,
        fontWeight: "500"
    },
    sectionTitle: {
        fontWeight: "600",
        fontSize: 16,
        paddingStart: 10,
        marginTop: 15,
        marginBottom: 5,
    },
    containerPd: {
        marginHorizontal: 10,
        // height: 1300,
    },
    seeMoreText: {
        textAlign: "right",
        textDecorationLine: "underline",
        color: "black",
        marginRight: 10,
        marginTop: 5,
    },
    containerFooter: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F6F6F6",
        borderRadius: 15,
        height: 200,
        width: "90%",
        overflow: "hidden",
        position: "relative",
        alignSelf: "center",
        marginTop: 20,
    },
    footerContent: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 10,
        gap: 5,
    },
    footerTitle: {
        fontSize: 16,
        fontWeight: "600",
    },
    footerDescription: {
        fontSize: 14,
        width: "50%",
    },
    footerImageContainer: {
        position: "absolute",
        right: 0,
        top: 0,
        bottom: 0,
        width: "40%",
    },
    footerImage: {
        width: "110%",
        height: "100%",
        resizeMode: "cover"
    }
});

export default Home;