import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { TransitionPresets } from "@react-navigation/stack";
import { View, Image, StyleSheet, Text } from "react-native";
import Login from "./login";
import Register from "./register";
import Home from "./home";
import Search from "./search";
import Notification from "./notification";
import Profile from "./profile";
import Detail from "./detail";
import GG from "./gg";
import Cart from "./cart";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "black",
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 0,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "bold",
          marginTop: 2,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require("../assets/images/home.png")}
              style={[
                styles.icon,
                { tintColor: color, width: size, height: size },
              ]}
            />
          ),
          tabBarLabel: ({ focused }) =>
            (focused ? <View style={styles.dot} /> : <Text style={styles.emptyLabel}> </Text>),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require("../assets/images/search.png")}
              style={[
                styles.icon,
                { tintColor: color, width: size, height: size },
              ]}
            />
          ),
          tabBarLabel: ({ focused }) =>
            (focused ? <View style={styles.dot} /> : <Text style={styles.emptyLabel}> </Text>),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require("../assets/images/bell.png")}
              style={[
                styles.icon,
                { tintColor: color, width: size, height: size },
              ]}
            />
          ),
          tabBarLabel: ({ focused }) =>
            (focused ? <View style={styles.dot} /> : <Text style={styles.emptyLabel}> </Text>),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={({ route }) => ({
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require("../assets/images/user.png")}
              style={[
                styles.icon,
                { tintColor: color, width: size, height: size },
              ]}
            />
          ),
          tabBarLabel: ({ focused }) =>
            (focused ? <View style={styles.dot} /> : <Text style={styles.emptyLabel}> </Text>),
        })}
      />
    </Tab.Navigator>
  );
}

function Index() {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen
        name="GG"
        component={GG}
        options={{ headerShown: false }}
      /> */}
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HomeTabs"
        component={TabNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>

  )
};

const styles = StyleSheet.create({
  icon: {
    resizeMode: "contain",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "black",
    alignSelf: "center",
    marginTop: 2,
  },
  emptyLabel: {
    fontSize: 1, // Ẩn chữ
  },
});

export default Index;
