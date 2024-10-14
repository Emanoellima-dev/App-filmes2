import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSearchParams } from 'expo-router';
import axios from 'axios'

const TMDB_API_KEY = "be9e4c16dd14e02dbddd8d8b195e4c6f"

export default function Details(){
 const [movie, setMovie] = useState(null);
 const { id } = useSearchParams();

 useEffect(() => {
 async function buscarFilme(){
   try {
     const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=TMDB_API_KEY`)

    console.log(response.data.results)
   } catch(error) {
     console.error("erro ao obter os detalhes do filme", error)
   }
  }

  buscarFilme();
 }, [id])

  return (
    <View style={styles.container}>
     <Text style={styles.text}>Pagina Details</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
  },
  text: {
    color: "white",
  }
})
