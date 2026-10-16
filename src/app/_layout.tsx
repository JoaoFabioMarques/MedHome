import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";

SplashScreen.preventAutoHideAsync();

const { width } = Dimensions.get("window");

const scale: number = width / 390;
const normalize = (size: number): number => Math.round(size * scale);

export const unstable_settings = {
  initialRouteName: "frontend/login",
};

export default function Layout() {
  const [fontsLoaded] = useFonts({
    "Rajdhani-SemiBold": require("../assets/fonts/Rajdhani-SemiBold.ttf"),
  });

  const [isSplashVisible, setIsSplashVisible] = useState<boolean>(true);

  useEffect(() => {
    if (!fontsLoaded) return;

    SplashScreen.hideAsync();

    const timer = setTimeout(() => setIsSplashVisible(false), 1500);
    return () => clearTimeout(timer);
  }, [fontsLoaded]);

  // Enquanto a fonte não carrega, a splash nativa continua visível
  if (!fontsLoaded) {
    return null;
  }

  if (isSplashVisible) {
    return (
      <View style={styles.splash}>
        <View style={styles.logoGroup}>
          <Image
            source={require("../assets/icons/mh-icon.png")}
            style={styles.logo}
          />
          <Text style={styles.name}>MedHome</Text>
        </View>
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    />
  );
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    backgroundColor: "#FDFDFD",
    justifyContent: "center",
    alignItems: "center",
  },
  logoGroup: {
    alignItems: "center",
    gap: normalize(16),
  },
  logo: {
    width: normalize(120),
    height: normalize(120),
    resizeMode: "contain",
  },
  name: {
    fontFamily: "Rajdhani-SemiBold",
    color: "#83c7f4",
    fontSize: normalize(48),
    lineHeight: normalize(56),
    includeFontPadding: false,
    textAlignVertical: "center",
  },
});
