import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { useGlobalSearchParams } from 'expo-router';
import axios from 'axios';
import Feather from '@expo/vector-icons/Feather';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import  Authorization from './config.js'

export default function Details() {
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useGlobalSearchParams();


  useEffect(() => )
   async function buscarFilme() {
      try {
       const response = await axios.get(`https://api.themoviedb.org/3/movie/movie_id?language=pt-BR`, {
       headers: {
         accept: 'application/json',
         Authorization: `${Authorization}`
       }
      })
      
      setMovie(response.data)
     } catch(error){
       return
     } finally {
       setLoading(false)
     }
   }

   buscarFilme();
  }, [id])

 if (loading) {
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
    <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
    </View>
  )
 }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{uri: `https://image.tmdb.org/
t/p/w500${movie.backdrop_path}`}}
	style={styles.poster}
      />

      <Text style={styles.title}>{movie.title}</Text>

      <View style={styles.content}>
        <Feather name="calendar" size={24} color="#676860" />
	<Text style={{ color: "#676860" }}>{movie.release_date}</Text>

	<Feather name="clock" size={24} color="#676860" />
	<Text style={{ color: "#676860" }}>{movie.runtime} minutos</Text>

	<EvilIcons name="star" size={24} color="yellow" />
	<Text style={{ color: "yellow" }}>{movie.vote_average}</Text>
      </View>

      <Text style={{                                          color: "white",
         fontSize: 18,
         borderBottomWidth: 0.5,                              borderColor: "white",                                marginBottom: 2,                                  }}>Sinopse:</Text>

      <Text style={{ color: "white", fontSize: 14 }}>{movie.overview}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   backgroundColor: "black",
  },
  title: {
   color: "white",
   fontSize: 23,
   fontWeight: "bold",
   textAlign: "center",
   marginBottom: 5,
  },
  poster: {
    width: "100%",
    height: 180,
  },
  date: {
   color: "#676860",
   fontSize: 17,
  },
  content: {
   flex: 1,
   backgroundColor: "black",
   alignItems: "center",
   flexDirection: "row",
   justifyContent: "space-between",
   paddingStart: 35,
   paddingEnd: 35,
   marginBottom: 10,
  }
})
