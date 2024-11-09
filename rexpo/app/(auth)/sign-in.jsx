import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'

import FormField from '../components/FormField'
import CustomButton from '../components/CustomButton'
import { Link } from 'expo-router'
import { signIn } from '../../lib/appwrite'

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const submit= async () => {

    if(!form.email || !form.password) {
      Alert.alert("All fields are required");
    }
    setIsSubmitting(true);

    try{
       await signIn(form.email, form.password);

      router.replace('/home');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full flex justify-center items-center min-h-[85vh] px-4 my-6">
          <Image
            source={images.logo}
            className="w-[115px] h-[34px]"
            resizeMode="contain"
          />

          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">Log in to Aora</Text>

          <FormField
          title="Email"
          value={form.email}
          handleChangeText={(e) => setForm({...form, email: e })}
          otherStyles="mt-7"
          keyboardType="email-address"
          />

          <FormField
          title="Password"
          value={form.password}
          handleChangeText={(e) => setForm({...form, password: e })}
          otherStyles="mt-7"
          />

          <CustomButton 
          title="Sign In"
          handlePress={submit}
          containerStyles="mt-7 w-full"
          isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">Don't have an account? </Text>

            <Link href="/sign-up" className="text-lg font-psemibold text-secondary">Sign up</Link>
          </View>
    
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn