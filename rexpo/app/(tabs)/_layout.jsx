// Import core components from React Native for building UI
import { View, Text, Image } from 'react-native'
// Import navigation components from Expo Router
import { Tabs, Redirect } from 'expo-router'
// Import React library
import React from 'react'
// Import icons from a constants file
import { icons } from '../../constants';

// Define a custom component for rendering tab icons and labels
const TabIcon = ({color, focused, icon, name}) => {
    return (
        // Container for icon and label, centered with a gap between them
        <View className="flex items-center justify-center gap-2">
            {/* Display the icon image with dynamic color and size */}
            <Image
             source={icon}
             resizeMode="contain"
             tintColor={color}  // Change icon color based on active state
             className="w-6 h-6"  // Set icon size
              />
              {/* Display the tab label with dynamic styling */}
              <Text 
                numberOfLines={1}  // Limit text to a single line
                ellipsizeMode="tail"  // Add ellipsis if text overflows
                className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs text-center`} 
                style={{
                    color: color,  // Apply active/inactive color
                    minWidth: 60,  // Ensure minimum width for text
                    textAlign: 'center'  // Center align text
                }}
              >
                {name}  // Display the name of the tab
              </Text>
        </View>
    );
};

// Main component for tab navigation layout
const TabsLayout = () => {
  return (
    <>
      {/* Configure the tab navigation with custom options */}
      <Tabs
      screenOptions={{
        tabBarShowLabel: false,  // Hide default tab labels
        tabBarActiveTintColor:'#FFA001',    // Set active tab color to orange
        tabBarInactiveTintColor: '#CDCDE0', // Set inactive tab color to grey
        tabBarStyle: {
            backgroundColor: '#161622',  // Set dark background for tab bar
            borderTopWidth: 2,  // Remove top border
            borderTopColor: '#232533',   // Set subtle top border color
            height: 50,  // Set tab bar height
        }
      }}
      >
        {/* Configure the Home tab */}
        <Tabs.Screen
         name="home" 
         options={{
          headerShown: false,  // Hide the header for this screen
          title: 'Home',  // Set the title for accessibility
          tabBarIcon: ({color, focused}) => (
           <TabIcon
           color={color}  // Pass color to TabIcon
           focused={focused}  // Pass focus state to TabIcon
           icon={icons.home}  // Use home icon
           name="Home"  // Set tab name
           />
          ),
         }}
         />

          {/* Configure the Bookmark tab */}
          <Tabs.Screen
              name="bookmark"
              options={{
                  headerShown: false,
                  title: "Bookmark",
                  tabBarIcon: ({color, focused}) => (
                      <TabIcon
                          color={color}
                          focused={focused}
                          icon={icons.bookmark}
                          name="Bookmark"
                      />
                  ),
              }}
          />

          {/* Configure the Create Post tab */}
          <Tabs.Screen
              name="create"
              options={{
                  headerShown: false,
                  title: 'Create',
                  tabBarIcon: ({color, focused}) => (
                      <TabIcon
                          color={color}
                          focused={focused}
                          icon={icons.plus}
                          name="Create"
                      />
                  ),
              }}
          />

          {/* Configure the Profile tab */}
          <Tabs.Screen
              name="profile"
              options={{
                  headerShown: false,
                  title: 'Profile',
                  tabBarIcon: ({color, focused}) => (
                      <TabIcon
                          color={color}
                          focused={focused}
                          icon={icons.profile}
                          name="Profile"
                      />
                  ),
              }}
          />
      </Tabs>
    </>
  )
}

// Export the TabsLayout component as default
export default TabsLayout;