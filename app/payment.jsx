import { ScrollView, StyleSheet, Text, Alert, View } from "react-native";
import React, { useState } from "react";
import Header from "../component/Header";
import Muc from "../component/Muc";
import InforInput from "../component/InforInput";
import SelectItem from "../component/SelectItem";
import Button from "../component/Button";
import { useCart } from "./CartProvider";
import { useNavigation, useRoute } from "@react-navigation/native";

const Payment = () => {
  const { removeFromCart } = useCart();
  const navigation = useNavigation();

  const route = useRoute();
  const { selectedItems, totalPrice, user = {} } = route.params;

  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [address, setAddress] = useState("");
  const [numPhone, setNumPhone] = useState(user.phone || "");
  const [selectVC, setSelectVC] = useState(null);
  const [selectCre, setSelectCre] = useState(null);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const formatCurrency = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
  };
  const [vc, setVC] = useState(0);

  const handleContinue = () => {
    if (
      name == "" ||
      email == "" ||
      address == "" ||
      numPhone == "" ||
      selectCre == null ||
      selectVC == null
    ) {
      setMessage("Vui lòng nhập và điền đủ thông tin !!!");
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 2000);

      Alert.alert("Thông báo", "Vui lòng nhập và điền đủ thông tin !!!", [
        { text: "OK", onPress: () => setSuccess(false) },
      ]);
    } else {
      setMessage("Thanh toán thành công!");

      selectedItems.forEach((item) => {
        if (item && item.id) {
          removeFromCart(item.id);
        }
      });

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigation.goBack();
      }, 2000);

      Alert.alert("Thông báo", "Thanh toán thành công!", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    }
  };

  return (
    <ScrollView>
      <View style={{ flex: 1 }}>
      <Header title="THANH TOÁN" />
      <ScrollView style={styles.inforContainer}>
        <View style={{ marginBottom: 25 }}>
          <Muc title="Thông tin khách hàng" main={true} bold={"600"} />
          <InforInput placehoder={"Nhập tên"} value={name} valueChange={setName} />
          <InforInput placehoder={"Email"} value={email} valueChange={setEmail} />
          <InforInput placehoder={"Địa chỉ"} value={address} valueChange={setAddress} />
          <InforInput placehoder={"Số điện thoại"} value={numPhone} valueChange={setNumPhone} />
        </View>
        <View style={{ marginBottom: 25 }}>
          <Muc title="Phương thức vận chuyển" main={true} bold={"600"} />
          <SelectItem
            titleL="Giao hàng Nhanh - 15.000đ"
            titleM="Dự kiến giao hàng 5-7/9"
            isSelect={selectVC === 0}
            onPress={() => {
              setSelectVC(0);
              setVC(15000);
            }}
          />
          <SelectItem
            titleL="Giao hàng COD - 20.000đ"
            titleM="Dự kiến giao hàng 4-8/9"
            isSelect={selectVC === 1}
            onPress={() => {
              setSelectVC(1);
              setVC(20000);
            }}
          />
        </View>
        <View>
          <Muc title="Hình thức thanh toán" main={true} bold={"600"} />
          <SelectItem
            titleL="Thẻ VISA/MASTERCARD"
            isSelect={selectCre === 0}
            onPress={() => setSelectCre(0)}
          />
          <SelectItem
            titleL="Thẻ ATM"
            isSelect={selectCre === 1}
            onPress={() => setSelectCre(1)}
          />
        </View>
      </ScrollView>
      <View style={styles.pricePay}>
        <Muc title={"Tạm tính"} content={formatCurrency(totalPrice)} borderWidth={0} textColor={"#666666"} marB={0} />
        <Muc title={"Phí vận chuyển"} content={formatCurrency(vc)} borderWidth={0} textColor={"#666666"} marB={0} />
        <Muc title={"Tổng cộng"} content={formatCurrency(totalPrice + vc)} borderWidth={0} size={16} color={"#007537"} textColor={"#666666"} marB={0} />
        <Button title={"TIẾP TỤC"} bgColor={"#007537"} func={handleContinue} />
      </View>
    </View>

    </ScrollView>
  );
};

export default Payment;

const styles = StyleSheet.create({
  pricePay: {
    paddingVertical: 15,
    paddingHorizontal: 24,
    backgroundColor: "#FFFFFF",
  },
  inforContainer: {
    flex: 1,
    paddingHorizontal: 48,
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
  },
});