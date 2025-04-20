import { Image, Text, TouchableOpacity, View, StyleSheet, Alert } from 'react-native';
import Header from '@/component/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AxiosInstance from '@/api/sever';
import LoadingComponent from '@/component/LoadingComponent';
import React, { useState, useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from "expo-auth-session/providers/google";


const Profile = ({ navigation }: any) => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    


    useEffect(() => {
        const getUserInfo = async () => {
            const userInfo = await AsyncStorage.getItem('userInfo');
            if (userInfo) {
                setUser(JSON.parse(userInfo));
            }
        };

        getUserInfo();
    }, []);

    const handleLogout = async () => {
        setLoading(true);
        try {
            const refreshToken = await AsyncStorage.getItem('refreshToken');
            if (!refreshToken) {
                Alert.alert('Lỗi', 'Không tìm thấy refresh token!');
                return;
            }
    
            // Kiểm tra xem đây có phải là tài khoản Google không
            const isGoogleAccount = await AsyncStorage.getItem('isGoogleAccount') === 'true';
            
            if (!isGoogleAccount) {
                // Đăng xuất API tiêu chuẩn
                const response: any = await AxiosInstance(null).post('users/logout', {
                    refreshToken: refreshToken,
                });
                Alert.alert('Thành công', response.message);
            } else {
                // Xử lý đăng xuất Google trên Web
                // Lưu ý: Trên web không thể hoàn toàn đăng xuất Google từ JavaScript
                // nhưng chúng ta có thể xóa token và thông tin đăng nhập của ứng dụng
    
                // Google Sign-Out URL (có thể chuyển hướng nhưng tốt hơn là không)
                // window.open('https://accounts.google.com/logout', '_blank');
            }
    
            // Xóa tất cả dữ liệu xác thực cục bộ
            await AsyncStorage.removeItem('userInfo');
            await AsyncStorage.removeItem('refreshToken');
            await AsyncStorage.removeItem('accessToken');
            await AsyncStorage.removeItem('isGoogleAccount');
    
            navigation.replace('Login');
        } catch (error) {
            Alert.alert('Lỗi', 'Đã xảy ra lỗi khi đăng xuất!');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <View style={styles.container}>
            <Header title="Profile" />
            <View style={styles.blockAccount}>
                <View style={styles.blockImg}>
                    {user?.image && (
                        <Image style={styles.img} source={{ uri: user.image }} />
                    )}
                </View>
                <View>
                    <Text style={styles.name}>
                        {user?.name || 'Tên không xác định'}
                    </Text>
                    <Text style={styles.email}>
                        {user?.email || 'Email không xác định'}
                    </Text>
                </View>
            </View>
            <View style={styles.bodyContainer}>
                <Text style={styles.title}>Chung</Text>
                <TouchableOpacity>
                    <Text style={styles.text}>Chỉnh sửa thông tin</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.text}>Cẩm nang</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.text}>Lịch sử giao dịch</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.text}>Q & A</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Bảo mật và Điều khoản</Text>
                <TouchableOpacity>
                    <Text style={styles.text}>Điều khoản và điều kiện</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.text}>Chính sách quyền riêng tư</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { handleLogout();}}>
                    <Text style={styles.exit}>Đăng xuất</Text>
                </TouchableOpacity>
            </View>
            {loading && <LoadingComponent />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    blockAccount: {
        margin: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    blockImg: {
        borderRadius: '50%',
        width: 50,
        height: 50,
        overflow: 'hidden',
        marginRight: 10,
    },
    img: {
        width: '100%',
        height: '100%',
    },
    name: {
        fontSize: 18,
        fontWeight: '500',
        color: "#000",
    },
    email: {
        fontSize: 16,
        color: "#949090",
    },
    title: {
        width: '100%',
        fontSize: 16,
        color: "#949090",
        paddingBottom: 10,
        borderBlockColor: "#949090",
        borderBottomWidth: 1,
        marginBottom: 20,
    },
    text: {
        width: '100%',
        color: "#000",
        marginBottom: 10,
    },
    exit: {
        width: '100%',
        color: "#FF0000",
    },
    bodyContainer: {
        margin: 20,
    },

});

export default Profile;