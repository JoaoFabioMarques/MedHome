import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        // Define o efeito de transição para todas as telas
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="index" redirect />
    </Stack>
  );
}
