import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { TransitionPresets } from "@react-navigation/stack";
import Login from "./login";
import Register from "./register";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function Index() {
  return (
    <Stack.Navigator >
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
    </Stack.Navigator>

  )
};

export default Index;
