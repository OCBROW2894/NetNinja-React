import { View, Text, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../components/FormField'

const SignIn = () => {
  const [form, setform] = useState({
    email: '',
    password: ''})
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center items-center h-full px-4">
          <Image
            source={images.logo}
            className="w-[115px] h-[35px]"
            resizeMode="contain"
          />

          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">Log in to Aora</Text>

          <FormField
          title="Email"
          value={form.email}
          setValue={(e) => setform({...form, email: e})}
          otherStyles="mt-7"
          keyboardType="email-address"
          />

          <FormField
          title="Password"
          value={form.password}
          setValue={(e) => setform({...form, password: e})}
          otherStyles="mt-7"
          />
    
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn