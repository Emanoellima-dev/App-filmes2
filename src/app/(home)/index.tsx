import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, StatusBar, Image, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import TMDB_API_KEY from './config.js';
import Authorization from './config.js'


export default function Index(){
 const [movies, setMovies] = useState([])
 const [moviesPopular, setMoviesPopular] = useState({})
 const [moviesTopRated, setMoviesTopRated] = useState({})
 const [moviesNowPlaying, setMoviesNowPlaying] = useState({})
 const [loading, setLoading] = useState(true)
 const router = useRouter();

 useEffect(() => {
  async function buscarFilmes(){
   try {	   
     const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=pt-BR&page=1`)
     setMovies(response.data.results)
   } catch(error) {
     console.error("erro ao buscar os filmes", error)
   } finally {
     setLoading(false)
   }
  }

  buscarFilmes();

  async function buscarFilmesPopulares(){
   try {
     const response = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${TMDB_API_KEY}&language=pt-BR&page=1`, {
      headers: {
       accept: 'application/json',
       Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZTllNGMxNmRkMTRlMDJkYmRkZDhkOGIxOTVlNGM2ZiIsIm5iZiI6MTcyODM0NTA2Ny4yNDYyMjMsInN1YiI6IjY2ZjA5MzI5MmQ5OGQ1OWNlMTNhZDdkMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lkgTdIwhS--ceb5kinjYH_Gi-JFbeEVbtCb2GYoEIp4'
      }
    })
    
    setMoviesPopular(response.data.results);
   } catch(error) {
  console.log("erro ao buscar os filmes", error)
   }
  }

  buscarFilmesPopulares();


  async function buscarFilmesMaisVotados(){
   try {
     const response = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?language=pt-BR&page=1`, {
       headers: {
         accept: 'application/json',
         Authorization: `${Authorization}`
       }
     })

      setMoviesTopRated(response.data.results);
   } catch(error){
     console.error("erro ao buscar os filmes", error)
   }
  }

  buscarFilmesMaisVotados();


  async function buscarFilmesEmCartaz(){
   try {
     const response = await axios.get("https://api.themoviedb.org/3/movie/now_playing?language=pt-BR&page=1", {
       headers: {
         accept: 'application/json',
	 Authorization: `${Authorization}`
       }
     })

      setMoviesNowPlaying(response.data.results)
    } catch(error) {
      console.error("erro ao buscar os filmes", error)
    }
  }

  buscarFilmesEmCartaz();
 }, [])

 if (loading) {
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
    <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
    </View>
  )
 }
   
 return (
    <ScrollView style={styles.container}>

      <Text style={styles.title}>Veja Os Detalhes Dos Seus Filmes Favoritos!</Text>

    <Text style={styles.subTitle}>Filmes Populares</Text>
    

    <FlatList
     data={movies}
     keyExtractor={ (item) => String(item.id) }
     renderItem={ ({ item }) => (
       <View style={styles.movieItem}>
         <TouchableOpacity onPress={ () => router.push(`/details/${item.id}`) }>
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
              style={styles.poster}
            />
         </TouchableOpacity>
      </View>
     ) }
        horizontal={true}
    />

  <Text style={styles.subTitle}>Em Breve</Text>
    <FlatList
      data={moviesPopular}
      keyEctractor={ (item) => String(item.id) }
      renderItem={ ({ item }) => (	
        <View style={styles.movieItem}>
	 <TouchableOpacity onPress={ () => router.push(`/details/${item.id}`) }>
         <Image
           source={{ uri:`https://image.tmdb.org/t/p/w500${item.poster_path}`}}
	   style={styles.poster}
	 />
	 </TouchableOpacity>
	</View>
      ) }
      horizontal={true}
    />

    <Text style={styles.subTitle}>Mais Votados</Text>

    <FlatList
      data={moviesTopRated}
      keyExtractor={ (item) => String(item.id) }
      renderItem={ ({ item }) => (
        <View style={styles.movieItem}>
	 <TouchableOpacity onPress={ () => router.push(`/details/${item.id}`) }>
          <Image
            source={{ uri:`https://image.tmdb.org/t/p/w500${item.poster_path}`}}
	    style={styles.poster}
	  />
	  </TouchableOpacity>
	</View>
      ) }
      horizontal={true}
    />

    <Text style={styles.subTitle}>Filmes Em Cartaz Nos Cinemas</Text>

      <FlatList
       data={moviesNowPlaying}
      keyExtractor={ (item) => String(item.id) }
       renderItem={ ({ item }) => (
          <View style={styles.movieItem}>
	   <TouchableOpacity onPress={ () => router.push(`/details/${item.id}`) }>
            <Image
              source={{ uri:`https://image.tmdb.org/t/p/w500${item.poster_path}` }}
	      style={styles.poster}
	    />
	    </TouchableOpacity>
	  </View>
       ) }
       horizontal={true}
      />
     </ScrollView>
  )
}


const styles = StyleSheet.create({
  container: {
   flex: 1,
   backgroundColor: 'black',
  },
  title: {
   color: "white",
   fontSize: 22,
   fontWeight: "bold",
   textAlign: "center",
   marginBottom: 15,
  },
  movieItem: {
    paddingTop: 3,
    alignItems: 'center',
    marginBottom: 7,
  },
  poster: {
    width: 150,
    height: 210,
    borderRadius: 10,
    marginStart: 5,
    marginEnd: 5,
    marginBottom: 8,
  },
  subTitle: {
    color: "white",                                 fontSize: 18,                                   fontWeight: "bold",
    paddingStart: 9,
    borderBottomWidth: 1,
    borderColor: "white",
    marginBottom: 13,
  },
  loadingIndicator: {
   marginTop: 50,
  }
})
