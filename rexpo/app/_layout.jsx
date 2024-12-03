// These are UI component imports from React Native - the core building blocks for mobile apps
import {StyleSheet, Text, View } from 'react-native'
// useEffect is a React Hook that lets us perform side effects (like data fetching or subscriptions)
import { useEffect } from 'react';
// The core React library - needed for all React applications
import React from 'react';
// GlobalProvider is a context wrapper that allows state sharing across the entire app
import  GlobalProvider  from '../context/GlobalProvider';

// SplashScreen controls the loading screen, Stack provides navigation functionality
import { SplashScreen, Stack } from 'expo-router';
// Importing global styles that apply to the entire application
import "../global.css";
// useFonts is a hook from Expo that manages custom font loading
import {useFonts } from 'expo-font';

// Keep the splash screen visible while we load fonts and initialize the app
SplashScreen.preventAutoHideAsync();

// RootLayout is the highest-level component in our app, controlling the overall structure
const RootLayout = () => {
    // Load all our custom Poppins fonts and track their loading status
    // fontsLoaded will be true when fonts are ready, error will contain any loading errors
    const [fontsLoaded, error] = useFonts({
        // Each line loads a different weight of the Poppins font family
        // These fonts must exist in the specified assets directory
        "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
        "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
        "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
        "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
        "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
        "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
        "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
        "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
        "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
    })

    // This effect runs whenever font loading status changes
    useEffect(() => {
        // If there was an error loading fonts, throw it to error boundary
        if(error) throw error;
        // Once fonts are loaded, hide the splash screen and show the app
        if(fontsLoaded) SplashScreen.hideAsync();
    }, [fontsLoaded, error]);

    // Don't render anything until fonts are loaded (unless there's an error)
    // This prevents flashing of unstyled content
    if(!fontsLoaded && !error) return null;

  // The main app structure
  return (
    // GlobalProvider wraps everything to provide global state management
    <GlobalProvider>
    {/* Stack is the main navigation container, handling transitions between screens */}
    <Stack>
      {/* Main entry point of the app - typically the home screen */}
      <Stack.Screen name="index" options={{ headerShown: false}} />
      {/* Group of authentication-related screens (login, signup, etc.) */}
      <Stack.Screen name="(auth)" options={{ headerShown: false}} />
      {/* Group of screens that appear in the tab navigation */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false}} />
      
      {/* Commented out search route - possibly for future implementation */}
     {/* <Stack.Screen name="/search/[query]" options={{ headerShown: false}} /> */}
    </Stack>
    </GlobalProvider>
  ) 
}

// Make this component available for import in other parts of the app
export default RootLayout