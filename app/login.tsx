import { Alert, StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import AxiosInstance from '@/api/sever';
import Wrapper from '@/component/Wrapper';
import TextInputCompoment from '@/component/TextInput';
import LoadingComponent from '@/component/LoadingComponent';
import Button from '@/component/Button';
import { LinearGradient } from "expo-linear-gradient";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
const Login = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const [userInfo, setUserInfo] = useState(null);


  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "171582457100-0atgvoor84vod4dmit8elesj45cr8hh0.apps.googleusercontent.com",
    webClientId:
      "171582457100-e8e2f66fvaeqvr1o88cjrb6dnamscg84.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      fetchUserInfo(response.authentication.accessToken);
    }
  }, [response]);

  // Lấy thông tin người dùng từ Google API
  async function fetchUserInfo(token: any) {
    try {
      const res = await fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      const user = await res.json();
      console.log("User info:", user);
  
      // Lưu userInfo và tokens vào AsyncStorage
      await AsyncStorage.setItem('userInfo', JSON.stringify(user));
      await AsyncStorage.setItem('accessToken', token);
      await AsyncStorage.setItem('refreshToken', 'google_oauth_refresh_token'); 
      await AsyncStorage.setItem('isGoogleAccount', 'true'); // Đánh dấu đăng nhập bằng Google
  
      setUserInfo(user);
      navigation.replace('Bottom');
    } catch (err) {
      Alert.alert("Lỗi", "Không thể lấy thông tin người dùng Google.");
    }
  }
  

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      if (refreshToken) {
        setLoading(false);
        navigation.replace('Bottom');
      } else {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async () => {
    setLoading(true);
    const credentials = {
      email: email,
      password: password,
    };
    try {
      const res: any = await AxiosInstance(null).post(
        'users/login',
        credentials,
      );

      if (res.accessToken && res.refreshToken) {
        await AsyncStorage.setItem('accessToken', res.accessToken);
        await AsyncStorage.setItem('refreshToken', res.refreshToken);

        const userRes: any = await AxiosInstance(res.accessToken).get(
          'users/me',
        );
        if (userRes) {
          await AsyncStorage.setItem('userInfo', JSON.stringify(userRes));
        }

        navigation.replace('Bottom');
      } else {
        Alert.alert('Lỗi', res.message);
      }
    } catch (err) {
      Alert.alert('Lỗi', err + '');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <ScrollView>
        <View style={styles.container}>
          <Image
            source={require('../assets/images/Ellipse 1.png')}
          />
          <Text style={styles.title}>Chào mừng bạn</Text>
          <Text style={styles.title1}>Đăng nhập tài khoản</Text>
          <TextInputCompoment
            placeholder="Nhập email hoặc số điện thoại"
            value={email}
            onChangeText={setEmail}
            secureTextEntry={false}
          />
          <TextInputCompoment
            placeholder="Mật khẩu"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            iconHidden={require('../assets/images/ant-design_eye-filled.png')}
          />
          <View style={[styles.rowContainer1, { marginTop: 10 }]}>
            <View style={styles.rowContainer}>
              <TouchableOpacity style={styles.checkBox} onPress={() => { setRemember(!remember) }}>
                <Image
                  style={{ width: 30, height: 30, tintColor: remember ? "#4CAF50" : 'transparent' }}
                  source={require('../assets/images/ri_checkbox-circle-line (1).png')}
                />
              </TouchableOpacity>
              <Text>Nhớ tài khoản</Text>
            </View>
            <Text style={styles.textForgot}>Quên mật khẩu</Text>
          </View>
          <Button
            title="Đăng nhập"
            bgColor="#007537"
            func={login}
          />

          <View style={styles.dividerContainer}>
            <LinearGradient
              style={styles.divider}
              colors={["#007537", "#4CAF50"]}
            />
            <Text style={styles.orText}>Hoặc</Text>
            <LinearGradient
              style={styles.divider}
              colors={["#007537", "#4CAF50"]}
            />
          </View>

          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.socialBlock} onPress={() => promptAsync()}>
              <Image
                style={styles.socialIcon}
                source={require('../assets/images/flat-color-icons_google.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialBlock}>
              <Image
                style={styles.socialIcon}
                source={require('../assets/images/logos_facebook.png')}
              />
            </TouchableOpacity>
          </View>
          <Text>
            Bạn không có tài khoản?{' '}
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Register');
              }}>
              <Text style={styles.textForgot}>Tạo tài khoản</Text>
            </TouchableOpacity>
          </Text>

        </View>

      </ScrollView>
    </Wrapper>

  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnBack: {
    width: 35,
    height: 35,
    position: 'absolute',
    padding: 10,
    borderRadius: '50%',
    backgroundColor: "#F8EEC0",
    top: 15,
    left: 15,
    zIndex: 1,
  },
  iconBack: {
    width: 15,
    height: 15,
    tintColor: "#fff",
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
  },
  title1: {
    fontSize: 20,
    fontWeight: '500',
    marginTop: 5,
  },
  rowContainer1: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  checkBox: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    borderRadius: '50%',
    borderWidth: 1,
    borderColor: "#949090",
  },
  textForgot: {
    color: "#4CAF50",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    marginVertical: 10,
  },
  divider: {
    flex: 1,
    height: 1,
    marginHorizontal: 10,
  },
  orText: {
    fontSize: 16,
    color: "black",
    fontWeight: "500",
    marginVertical: 10,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  socialIcon: {
    width: 30,
    height: 30,
  },
  socialBlock: {
    marginHorizontal: 10,
  },
})