import { NavigationContainer } from "@react-navigation/native";
import StackNavigation from "./src/navigation/StackNavigation";
import { AuthProvider } from "@hooks/useAuth";
export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StackNavigation />
      </AuthProvider>
    </NavigationContainer>
  );
}
