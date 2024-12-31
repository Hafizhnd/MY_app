import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios for API calls
import { COLORS } from '../assets/colors.js';

const Peoples = ({ navigation }: { navigation: any }) => {
  const [currentPage, setCurrentPage] = useState<string>('Peoples');
  const [users, setUsers] = useState<any[]>([]); 

  useEffect(() => {
    axios
    
      .get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setUsers(response.data); 
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const handleNavigation = (page: string) => {
    navigation.navigate(page);
    setCurrentPage(page);
  };

  const renderUserItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.userItemContainer}
      onPress={() => navigation.navigate('UserDetails', { userId: item.id })}
    >
      <Text style={styles.username}>{item.username}</Text>
      <Text style={styles.name}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={require('../assets/bg_app.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.containerTop}>
          <Image
            source={require('../assets/MY.png')}
            style={styles.image}
          />
          <View style={styles.line} />
        </View>

        <FlatList
          data={users}
          renderItem={renderUserItem}
          keyExtractor={(item) => item.id.toString()}
          style={styles.userList}
        />

        <View style={styles.navBar}>
          <TouchableOpacity onPress={() => handleNavigation('Home')} style={styles.navItem}>
            <Image
              source={currentPage === 'Home' ? require('../assets/App_ic.png') : require('../assets/App_rest_ic.png')}
              style={styles.navIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleNavigation('Peoples')} style={styles.navItem}>
            <Image
              source={currentPage === 'Peoples' ? require('../assets/People_ic.png') : require('../assets/People_rest_ic.png')}
              style={styles.navIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleNavigation('Profile')} style={styles.navItem}>
            <Image
              source={currentPage === 'Profile' ? require('../assets/Profile_ic.png') : require('../assets/Profile_rest_ic.png')}
              style={styles.navIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  containerTop: {
    alignItems: 'center',
    marginBottom: 0,
  },
  image: {
    width: 47,
    height: 47,
    resizeMode: 'contain',
  },
  line: {
    width: '100%',
    height: 1.5,
    backgroundColor: COLORS.greyline,
    marginTop: 10,
  },
  userList: {
    flex: 1,
  },
  userItemContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 15,
    borderBottomWidth: 0.2,
    borderBottomColor: COLORS.greyline,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'NunitoSans-Bold',
    paddingBottom: 5,
  },
  name: {
    fontSize: 14,
    color: 'white',
    fontFamily: 'NunitoSans-Regular',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'transparent',
    height: 60,
    borderTopWidth: 1.5,
    borderTopColor: COLORS.greyline,
  },
  navItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  navIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});

export default Peoples;
