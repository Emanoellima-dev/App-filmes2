import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { Component } from '../../Components/component';
import Authorization from './config.js'


export default function Search(){
 const [movie, setMovie] = useState({})
 const [query, setQuery] = useState('')
 const [loading, setLoading] = useState(false)

 async function searchMovie(){
  if (!query) return;

  setLoading(true)
  try {
   const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=pt-BR&page=1`, {
     headers: {
      accept: 'application/json',
      Authorization: `${Authorization}`
     }
   })

    setMovie(response.data.results)
  } catch(error){
    console.erro("erro ao pesquisar o filme", error)
  } finally {
    setLoading(false)
  }
 }

  return (
   <View style={styles.container}>
<Text style={styles.title}>Pesquisar Filmes</Text>

    <View style={styles.containerInput}>
     <TextInput
       value={query}
       onChangeText={setQuery}
       placeholder="pesquisar filmes"
       placeholderTextColor="white"
       style={styles.Input}
      />

      <Ionicons name="search" color="white" size={24}/>
    </View>

    <TouchableOpacity 
      style={styles.button}
      onPress={searchMovie}
    >
     <Text style={styles.text}>Pesquisar</Text>
    </TouchableOpacity>

    {loading ? (
     <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
    ) : (
    <FlatList
      data={movie}
      keyExtractor={ (item) => String(item.id)}
      renderItem={ ({ item }) => <Component data={item}/> }
      numColumns={2}
    />
    )}
   </View>
  )
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   backgroundColor: 'black',
  },
  title: {
   color: "white",
   fontSize: 25,
   textAlign: "center",
   fontWeight: "bold",
  },
  Input: {
   color: "#FFF",
   width: "80%",
   paddingLeft: 15,
  },
  containerInput: {
   backgroundColor: "#676860",
   height: 45,
   padding: 11,
   borderRadius: 16,
   marginTop: 24,
   marginBottom: 20,
   alignItems: "center",
   justifyContent: "space-between",
   flexDirection: "row",
  },
  button: {
    backgroundColor: "#676860",
    width: "40%",
    borderRadius: 8,
    padding: 8,
    alignItems: "center",
    marginBottom: 8,
  },
  text: {
   color: "white",
  },
  loadingIndicator: {
    marginTop: 20,
  }
})
