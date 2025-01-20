import React, { useState, useEffect } from 'react';
import { FlatList, StatusBar, Text, TextInput, View, StyleSheet } from 'react-native';

let originalData = [];

const App = () => {
  const [myData, setMyData] = useState([]);

  useEffect(() => {
    // Fetch data from Fortune 500 Companies API
    fetch("https://api.mysafeinfo.com/api/data?list=fortune500&format=json")
        .then((response) => response.json())
        .then((myJson) => {
          if (originalData.length < 1) {
            setMyData(myJson);
            originalData = myJson;
          }
        });
  }, []);

  const FilterData = (text) => {
    if (text !== '') {
      let myFilteredData = originalData.filter((item) =>
          item.Company && item.Company.toLowerCase().includes(text.toLowerCase())); // Filter by Company name
      setMyData(myFilteredData);
    } else {
      setMyData(originalData);
    }
  };

  const renderItem = ({ item }) => {
    return (
        <View style={styles.item}>
          <Text style={styles.companyName}>{item.Company || 'Unknown Company'}</Text>
          <Text style={styles.detail}>Rank: {item.Rank || 'N/A'}</Text>
          <Text style={styles.detail}>Revenue: {item.Revenue || 'N/A'}</Text>
          <Text style={styles.detail}>Profit: {item.Profit || 'N/A'}</Text>
          <Text style={styles.detail}>Employees: {item.Employees || 'N/A'}</Text>
        </View>
    );
  };

  return (
      <View style={styles.container}>
        <StatusBar />
        <Text style={styles.header}>Fortune 500 Companies Search</Text>
        <TextInput
            style={styles.input}
            onChangeText={(text) => { FilterData(text); }}
            placeholder="Search companies..."
        />
        <FlatList
            data={myData}
            renderItem={renderItem}
            keyExtractor={(item) => item.Rank.toString()}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  item: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detail: {
    fontSize: 14,
    color: '#555',
  },
});

export default App;

