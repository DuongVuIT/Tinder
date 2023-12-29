import useAuth from "@hooks/useAuth";
import Login from "@screens/auth/Login";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import ChatScreen from "@screens/main/ChatScreen";
import HomeScreen from "@screens/main/HomeScreen";
import MatchScreen from "@screens/main/MatchScreen";
import MessageScreen from "@screens/main/MessageScreen";
import ModalScreen from "@screens/main/ModalScreen";
import { APP_SCREEN } from "@type/navigation";
import React from "react";

const Stack = createStackNavigator();
const StackNavigation = () => {
  const { user }: any = useAuth();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Stack.Group>
            <Stack.Screen name={APP_SCREEN.HOME} component={HomeScreen} />
            <Stack.Screen name={APP_SCREEN.CHAT} component={ChatScreen} />
            <Stack.Screen name={APP_SCREEN.MESSAGE} component={MessageScreen} />
          </Stack.Group>
          <Stack.Group
            screenOptions={{
              presentation: "modal",
              ...TransitionPresets.ModalPresentationIOS,
            }}
          >
            <Stack.Screen name={APP_SCREEN.MODAL} component={ModalScreen} />
          </Stack.Group>
          <Stack.Group
            screenOptions={{
              presentation: "transparentModal",
              ...TransitionPresets.ModalPresentationIOS,
            }}
          >
            <Stack.Screen name={APP_SCREEN.MATCH} component={MatchScreen} />
          </Stack.Group>
        </>
      ) : (
        <Stack.Screen
          options={{ headerShown: false }}
          name={APP_SCREEN.LOGIN}
          component={Login}
        />
      )}
    </Stack.Navigator>
  );
};

export default StackNavigation;
