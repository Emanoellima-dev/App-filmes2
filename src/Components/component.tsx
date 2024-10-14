import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router'

export function Component({ data }){
 const router = useRouter();

  return (
   <View style={styles.movieContainer}>
    <TouchableOpacity onPress={ () => router.push(`/details/${data.id}`) }>
     <Image
       source={{ uri: `https://image.tmdb.org/t/p/w500${data.poster_path}`}}
       style={styles.poster}
     />
     </TouchableOpacity>
     <Text style={styles.title}>{data.title}</Text>
   </View>
  )
}

const styles = StyleSheet.create({
  movieContainer: {
   flex: 1,
   backgroundColor: 'black',
   alignItems: "center",
  },
  poster: {
   margin: 4,
   borderRadius: 8,
   height: 170,
   width: 150,
   margin: 3,
  },
  title: {
   color: "white",
   fontSize: 14,
   fontWeight: "bold",
  }
})
