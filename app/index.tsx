import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import _layout from "./_layout";
import Login from "./login";

export default function Index() {
  return (
    <NavigationContainer>
      <Login/>
    </NavigationContainer>
  );
}
