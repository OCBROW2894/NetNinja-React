import { TouchableOpacity, Text } from 'react-native'
import React from 'react'

const CustomButton = () => {
  return (
    <TouchableOpacity className={'bg-secondary rounded-xl min-h-[62px] items-center justify-center'}>
      <Text className="text-primary font-psemibold text-lg">CustomButton</Text>
    </TouchableOpacity>
  )
}

export default CustomButton