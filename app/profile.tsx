import { Image, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import Header from '@/component/Header';
const Profile = (): any => {

    return (
        <View style={styles.container}>
            <Header title="Profile" />
            <View style={styles.blockAccount}>
                <View style={styles.blockImg}>

                    <Image style={styles.img} />

                </View>
                <View>
                    <Text style={styles.name}>
                        {/* {user?.name || 'Tên không xác định'} */}
                    </Text>
                    <Text style={styles.email}>
                        {/* {user?.email || 'Email không xác định'} */}
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
                <TouchableOpacity>
                    <Text style={styles.exit}>Đăng xuất</Text>
                </TouchableOpacity>
            </View>
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