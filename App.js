import * as React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";
import Navigation from "./src/navigation/Navigation";
import { AuthProvider } from "./src/context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SP_KEYP } from "@env";
import { StripeProvider } from "@stripe/stripe-react-native";
export default function App() {
  const customColors = {
    primary: "#531949",
    onPrimary: "#e0b7d5",
    primaryContainer: "slateblue",
    onPrimaryContainer: "red",
    secondary: "red",
    onSecondary: "red",
    secondaryContainer: "#e0b7d5",
    onSecondaryContainer: "#781c5b",

    background: "#e0b7d5",
    onBackground: "blue",
    surface: "orange",
    onSurface: "#531949",
    surfaceVariant: "#f2e2ed",
    onSurfaceVariant: "#531949",
  };

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      ...customColors, // Agrega los colores personalizados al tema
    },
  };

  return (
    <>
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <AuthProvider>
            <StripeProvider
              publishableKey={SP_KEYP}
              merchantIdentifier="merchant.identifier" // required for Apple Pay
              urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
            >
              <Navigation />
            </StripeProvider>
          </AuthProvider>
        </PaperProvider>
      </SafeAreaProvider>
    </>
  );
}
