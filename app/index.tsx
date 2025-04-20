import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { enableScreens } from 'react-native-screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CartProvider } from "./CartProvider";

enableScreens();
// import _layout from "./_layout";
import Navigation from "./navigation";

export default function Index() {
  return (
    <SafeAreaProvider>
      <CartProvider>
        <Navigation />
      </CartProvider>
    </SafeAreaProvider>


  )

}
