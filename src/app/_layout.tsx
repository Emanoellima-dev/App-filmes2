import { Drawer } from 'expo-router/drawer';
import { View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

 export default function RootLayout() {
  return (
    <Drawer
     screenOptions={{
       headerShown: true,
       drawerStyle: {
         backgroundColor: 'black',
         width: 240,
	},
	drawerActiveTintColor: 'white',
        drawerInactiveTintColor: 'gray',
      }}
    >
     
      <Drawer.Screen 
        name="(home)"
	options={{
         title: "Home",
       headerTitle: "Home",
	 headerStyle: {
          borderBottomWidth: 0,
	  elevation: 0,
	  backgroundColor: 'black' 
	},
	 drawerLabelStyle: { color: 'white' },
	 headerTintColor: 'white',
	 headerRight: () => (
	<View style={styles.container}>
          <Feather
            name="user"
            size={25}
            color="white"
	    style={styles.iconUser}
          />
	</View>
	 ),
	}}
      />
     </Drawer>
  );
}

const styles = StyleSheet.create({
  container: {
   backgroundColor: 'black',
   marginEnd: 14,
 },
  iconUser: {
   marginTop: -5,
  }
})
