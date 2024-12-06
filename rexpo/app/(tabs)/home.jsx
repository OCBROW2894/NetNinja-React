import { View, Text, FlatList, Image} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import SearchInput from '../components/SearchInput'
import Trending from '../components/Trending'
import EmptyState from '../components/EmptyState'


const Home = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
        <FlatList
            //data={[{ id : 1}, { id : 2}, { id : 3}]}
            data={[]}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <Text className="text-primary text-3xl font-bold text-white">
                {item.id}
              </Text>
            )}

            ListHeaderComponent={()=> (
              <View className="my-6 px-4 space-y-6">
                <View className="flex-row justify-between items-start mb-6">
                  <View>
                    <Text className="font-pmedium text-sm text-gray-100">
                      Welcome Back
                    </Text>
                    <Text className="text-2xl font-psemibold text-white">
                      OCBROW_2894
                    </Text>
                  </View>
                  <View className="mt-1.5">
                    <Image
                      source={images.logoSmall}
                      className="w-9 h-10"
                      resizeMode="contain"
                    />
                  </View>
                </View>
                <SearchInput/>
                <View className="w-full flex-1 pt-5 pb-8">
                  <Text className="text-gray-100 text-lg font-pregular mb-3">
                    Trending Videos
                  </Text>

                  <Trending
                  posts={[{id: 1}, {id: 2}, {id: 3}] ?? []}
                  />
                </View>
              </View>
            )}
            ListEmptyComponent={()=>(
              <EmptyState
              title="No Videos Found"
              subtitle="Be The Firstone to upload a video"
              />
            )}
        />
    </SafeAreaView>
  )
}

export default Home