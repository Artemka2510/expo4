import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen name="Products" />
            <Stack.Screen name="Cart" />
        </Stack>
    );
}