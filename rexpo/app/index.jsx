import { StatusBar } from 'expo-status-bar';
import {Text, View } from 'react-native';
import { Link } from 'expo-router';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-3xl">Aora !</Text>
      <StatusBar style="auto" />
      <Link href="/profile" className="mt-4 text-blue-600 underline">Go To Profile</Link>
    </View>
  );
}