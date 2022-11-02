import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native';

export default function App() {
  let [isLoading, setIsLoading] = useState(true);
  let [error, setError] = useState();
  let [response, setResponse] = useState();

  useEffect(() => {
    fetch("https://school1298.ru/cl/calendar.json",
      // fetch("https://api.coindesk.com/v1/bpi/currentprice.json",
      {
        method: 'GET',
        headers: { 'Content-Type': 'text/plain' }
      })
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result.value)
          setResponse(result);
          setIsLoading(false);
        },
        (error) => {
          setIsLoading(false);
          setError(error);
        }
      )
  }, []);

  const getContent = () => {
    if (isLoading) {
      return <ActivityIndicator size="large" />;
    }

    if (error) {
      return <Text>{error}</Text>
    }
    return <Text>Bitcoin (USD): {response["bpi"]["USD"].rate}</Text>;
  };

  const data2 = [{ Address: 'tt' }, { Address: 'tt2' }]

  return (
    // <View style={styles.container}>
    <View >
      {/* {getContent()} */}
      {!isLoading && <Text>{response.value[0].Address}</Text>}
      <FlatList
        data={response?.value}
        renderItem={(item) => {
          return <>
            <Text>'Что: {item.item.Group[0].Title}, '</Text>
            <Text>'Где: {item.item.Address}, '</Text>
            <Text>'Кто: {item.item.MainMan.Title}, '</Text>
            <Text>'Дата: {item.item.DateStart}, '</Text>  
            <Text>'Время: {item.item.Time}, '</Text>  

            <Text>-------------</Text>
          </>
        }}
        keyExtractor={(item) => item.id}
        vertical
      />


      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
