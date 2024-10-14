import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function Layout(){
  return (
    <Tabs
     screenOptions={{
      tabBarStyle: { backgroundColor: 'black' },
      tabBarActiveTintColor: 'white',
      tabBarInactiveTintColor: 'gray',
     }}
    >
      <Tabs.Screen name="index"
       options={{
        headerShown: false,
	tabBarLabel: "Home",
	tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color}/>
       }}
      />


      <Tabs.Screen name="search"
       options={{
        headerShown: false,
	tabBarLabel: "Pesquisar",
	tabBarIcon: ({ size, color }) => <Ionicons name="search" size={size} color={color}/>
       }}
      />

      <Tabs.Screen name="details/[id]"
       options={{
        headerShown: false,
        tabBarLabel: "Detalhes",
        tabBarIcon: ({ size, color }) => <MaterialCommunityIcons name="movie-open-check" size={size} color={color} />
       }}                                             />
    </Tabs>
  )
}
