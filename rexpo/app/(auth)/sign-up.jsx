// Import necessary UI components and utilities
import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
// Import SafeAreaView for handling device-specific safe areas
import { SafeAreaView } from 'react-native-safe-area-context'
// Import app assets
import { images } from '../../constants'

// Import custom components and navigation utilities
import FormField from '../components/FormField'
import CustomButton from '../components/CustomButton'
import { Link } from 'expo-router'
// Import authentication utilities
import { createUser } from '../../lib/appwrite'
import { router } from 'expo-router'

const SignUp = () => {
  // Access global context for user state management
  const { setUser, setIsLogged } = useGlobalContext();

  // State for tracking form submission status
  const [isSubmitting, setSubmitting] = useState(false);
  // State for managing form input values
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Handle form submission
  const submit= async () => {
    // Validate all required fields
    if(form.username === "" || form.email === "" || form.password === "") {
      Alert.alert("All fields are required");
      return; // Add return to prevent further execution
    }
    // Set loading state
    setIsSubmitting(true);

    try {
      // Attempt to create new user account
      const result = await createUser(form.email, form.password, form.username);
      // Update global state with new user data
      setUser(result);
      setIsLogged(true);
      // Navigate to home screen on success
      router.replace("/home");
    } catch (error) {
      // Display error message if registration fails
      Alert.alert("Error", error.message);
    } finally {
      // Reset loading state
      setIsSubmitting(false);
    }
  }

  return (
    // Main container with safe area handling
    <SafeAreaView className="bg-primary h-full">
      {/* Scrollable content container */}
      <ScrollView>
        {/* Form container with centered content */}
        <View className="w-full flex justify-center items-center min-h-[85vh] px-4 my-6">
          {/* App logo */}
          <Image
            source={images.logo}
            className="w-[115px] h-[34px]"
            resizeMode="contain"
          />

          {/* Sign up header */}
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">Sign Up to Aora</Text>

          {/* Username input field */}
          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({...form, username: e })}
            otherStyles="mt-7"
          />

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

          {/* Sign up button */}
          <CustomButton 
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7 w-full"
            isLoading={isSubmitting}
          />

          {/* Sign in link section */}
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">Already have an account?</Text>
            {/* Navigation link to sign in page */}
            <Link href="/sign-in" className="text-lg font-psemibold text-secondary">Sign In</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp