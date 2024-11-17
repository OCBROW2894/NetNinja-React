import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'

import FormField from '../components/FormField'
import CustomButton from '../components/CustomButton'
import { Link } from 'expo-router'
import { createUser } from '../../lib/appwrite'
import { router } from 'expo-router'

const SignUp = () => {
  const { setUser, setIsLogged } = useGlobalContext();

  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const submit= async () => {

    if(form.username === "" || form.email === "" || form.password === "") {
      Alert.alert("All fields are required");
    }
    setIsSubmitting(true);

    try{
      const result = await createUser(form.email, form.password, form.username);
      setUser(result);
      setIsLogged(true);

      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
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

          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">Sign Up to Aora</Text>

          <FormField
          title="Username"
          value={form.username}
          handleChangeText={(e) => setForm({...form, username: e })}
          otherStyles="mt-7"
          />

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
          title="Sign Up"
          handlePress={submit}
          containerStyles="mt-7 w-full"
          isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">Already have an account?</Text>

            <Link href="/sign-in" className="text-lg font-psemibold text-secondary">Sign In</Link>
          </View>
    
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp