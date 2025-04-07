import React, { useState, useEffect } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import Wrapper from '@/component/Wrapper';
import Header from '@/component/Header';
import taoAxiosInstance from '@/api/sever';

const Detail = ({ route, navigation }: any) => {

    return (
        <Wrapper>
            <Header
                title="Tên sản phẩm"
                back={require('../assets/images/chevron-left.png')}
                backFunc={() => navigation.goBack()}
                icon={require('../assets/images/shopping-cart.png')}
                navigation={navigation}
                onPress={() => navigation.navigate('Cart')}
            />
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.imgContainer}>
                        <View style={styles.imgShow}>
                            <Image
                                style={styles.img}
                                source={{ uri: "https://i.imgur.com/1bNzszR.jpeg" }}
                            />
                        </View>
                        <View style={styles.btnImg}>
                            <TouchableOpacity>
                                <Image
                                    style={styles.icon}
                                    source={require('../assets/images/chevron-left.png')}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image
                                    style={styles.icon}
                                    source={require('../assets/images/chevron-left.png')}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.detailContainer}>
                        <View style={styles.rowContainer}>
                            <View style={styles.block}>
                                <Text style={styles.blockText}>kkk</Text>
                            </View>
                            <View style={styles.block}>
                                <Text style={styles.blockText}>kkk</Text>
                            </View>
                        </View>
                        <Text style={styles.textPrice}></Text>
                        <View style={[styles.detailBlock, { borderBottomColor: "#000" }]}>
                            <Text style={styles.text1}>Chi tiết sản phẩm</Text>
                        </View>
                        <View style={[styles.detailBlock, { borderBottomColor: "#ABABAB" }]}>
                            <Text>Kích cỡ</Text>
                            <Text>M</Text>
                        </View>
                        <View style={[styles.detailBlock, { borderBottomColor: "#ABABAB" }]}>
                            <Text>Xuất xứ</Text>
                            <Text>A</Text>
                        </View>
                        <View style={[styles.detailBlock, { borderBottomColor: "#ABABAB" }]}>
                            <Text>Tình trạng</Text>
                            <Text>Còn 0 sp</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
            <View style={styles.priceContainer}>
                <View style={[styles.rowContainer, { justifyContent: "space-between", width: "90%" }]}>
                    <Text style={styles.text2}>Đã chọn sản phẩm</Text>
                    <Text style={styles.text2}>Tạm tính</Text>
                </View>
                <View style={[styles.container, { justifyContent: "space-between", width: "90%" }]}>
                    <View style={[styles.rowContainer, { justifyContent: "space-between", width: "40%", marginVertical: 10 }]}>
                        <TouchableOpacity style={styles.block1} onPress={() => { }}>
                            <Image
                                style={styles.icon}
                                source={require('../assets/images/minus-square.png')}
                            />
                        </TouchableOpacity>
                        <Text>0</Text>
                        <TouchableOpacity style={styles.block1} onPress={() => { }}>
                            <Image
                                style={styles.icon}
                                source={require('../assets/images/plus-square.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    <Text style={{position: "absolute", right:25, bottom: 15, fontSize: 16}}>0</Text>                    
                </View>
            </View>
        </Wrapper>


    )

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    imgContainer: {
        position: 'relative',
        height: 200,
    },
    imgShow: {
        width: '100%',
        height: '100%',
        backgroundColor: "#f6f6f6",
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    btnImg: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    btn: {
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#fff",
        borderRadius: '50%',
    },
    icon: {
        width: 15,
        height: 15,
    },
    detailContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    block: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: "#009245",
        marginRight: 5,
    },
    blockText: {
        color: "#fff",
    },
    textPrice: {
        color: "#009245",
        fontSize: 25,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    text1: {
        fontSize: 20,
        color: "#000",
    },
    detailBlock: {
        marginVertical: 5,
        paddingVertical: 5,
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    priceContainer: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        alignItems: 'center',
    },
    text2: {
        fontSize: 16,
        color: "#ABABAB",
    },
    block1: {
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "#000",
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Detail;