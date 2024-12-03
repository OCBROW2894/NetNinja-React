// Import necessary components and utilities from React Native and other dependencies
import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
// Import SafeAreaView to handle safe area insets (notches, etc.)
import { SafeAreaView } from 'react-native-safe-area-context'
// Import app images from constants
import { images } from '../../constants'

// Import custom components for form handling and buttons
import FormField from '../components/FormField'
import CustomButton from '../components/CustomButton'
// Import Link for navigation
import { Link } from 'expo-router'
// Import authentication function
import { signIn } from '../../lib/appwrite'

const SignIn = () => {
  // Access global context for user state management
  const { setUser, setIsLogged } = useGlobalContext();
  // State to handle form submission status
  const [isSubmitting, setSubmitting] = useState(false);
  // State to manage form input values
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // Handle form submission
  const submit = async () => {
    // Validate that all fields are filled
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "All fields are required");
    }

    // Set submission state to show loading indicator
    setSubmitting(true);

    try {
      // Attempt to sign in user with provided credentials
      await signIn(form.email, form.password);
      // Get current user data after successful sign in
      const result = await getCurrentUser();
      // Update global user state
      setUser(result);
      setIsLogged(true);

      // Show success message
      Alert.alert("Success", "User signed in successfully");
      // Navigate to home screen
      router.replace("/home");
    } catch (error) {
      // Show error message if sign in fails
      Alert.alert("Error", error.message);
    } finally {
      // Reset submission state regardless of outcome
      setSubmitting(false);
    }
  };

  return (
    // Wrap everything in SafeAreaView with primary background
    <SafeAreaView className="bg-primary h-full">
      {/* ScrollView to handle content overflow and keyboard */}
      <ScrollView>
        {/* Main container for sign-in form */}
        <View className="w-full flex justify-center items-center min-h-[85vh] px-4 my-6">
          {/* App logo */}
          <Image
            source={images.logo}
            className="w-[115px] h-[34px]"
            resizeMode="contain"
          />

          {/* Sign in heading */}
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">Log in to Aora</Text>

          {/* Email input field */}
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          {/* Password input field */}
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({...form, password: e })}
            otherStyles="mt-7"
          />

          {/* Sign in button */}
          <CustomButton 
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7 w-full"
            isLoading={isSubmitting}
          />

          {/* Sign up link section */}
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">Don't have an account? </Text>
            {/* Link to sign up page */}
            <Link href="/sign-up" className="text-lg font-psemibold text-secondary">Sign Up</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn