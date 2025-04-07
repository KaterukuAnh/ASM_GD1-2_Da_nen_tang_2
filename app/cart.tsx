import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView } from "react-native"
import Wrapper from "@/component/Wrapper"
import Header from "@/component/Header"

const Cart = ({ navigation }: any) => {
    return (
        <Wrapper>
            <Header
                title="Giỏ hàng"
                back={require('../assets/images/chevron-left.png')}
                backFunc={() => navigation.goBack()}
                icon={require('../assets/images/trash-2 (1) 1.png')}
                navigation={navigation}
            />
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.containerCart}>
                        <Image
                            style={styles.img}
                            source={require("../assets/images/cat1.jpg")}
                        />
                        <View style={styles.productInfo}>
                            <Text style={styles.productName}>Tên sản phẩm</Text>
                            <Text style={styles.productPrice}>100.000đ</Text>
                            <View style={styles.rowContainer}>
                                <TouchableOpacity style={styles.block1} onPress={() => { }}>
                                    <Image
                                        style={styles.icon}
                                        source={require('../assets/images/minus-square.png')}
                                    />
                                </TouchableOpacity>
                                <Text style={{ marginHorizontal: 10 }}>0</Text>
                                <TouchableOpacity style={styles.block1} onPress={() => { }}>
                                    <Image
                                        style={styles.icon}
                                        source={require('../assets/images/plus-square.png')}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Text style={{ marginLeft: 15, color: "#000", fontWeight: "600" }}>Xóa</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.containerBot}>
                    <View style={styles.botText}>
                        <Text>Tạm tính</Text>
                        <Text>500.000đ</Text>
                    </View>
                    <TouchableOpacity style={styles.btnBuy}>
                        <Text style={{ color: "#fff" }}>Tiến hành thanh toán</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Wrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    containerCart: {
        flexDirection: 'row',
        padding: 15,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        gap: 10,
    },
    img: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginRight: 15,
    },
    productInfo: {
        flex: 1,
        justifyContent: 'space-between',
    },
    productName: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 5,
    },
    productPrice: {
        fontSize: 14,
        color: '#007537',
        marginBottom: 10,
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    block1: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#000",
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        width: 15,
        height: 15,
    },
    containerBot: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#fff",
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    botText: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    btnBuy: {
        backgroundColor: "#007537",
        height: 50,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
    }


})

export default Cart;