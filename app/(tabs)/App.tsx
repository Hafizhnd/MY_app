import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { COLORS } from '../assets/colors.js';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Peoples from './Peoples'; 
import Profile from './Profile';
import PostDetail from './PostDetail';
import UserDetail from './UserDetail';
const Stack = createStackNavigator();

type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

const Home = ({ navigation }: { navigation: any }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<string>('Home');

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((response) => setUsers(response.data))
      .catch((error) => console.error(error));
  
    axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        const shuffledPosts = response.data.sort(() => Math.random() - 0.5);
        setPosts(shuffledPosts);
      })
      .catch((error) => console.error(error));
  }, []);

  const getUsername = (userId: number) => {
    const user = users.find(u => u.id === userId);
    return user ? user.username : 'Unknown User';
  };

  const renderItem = ({ item }: { item: Post }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('PostDetail', { post: item })}
    >
      <View style={styles.itemContainer}>
        <Text style={styles.username}>{getUsername(item.userId)}</Text>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleNavigation = (page: string) => {
    setCurrentPage(page);
    navigation.navigate(page);
  };

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
          data={posts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          style={styles.flatList}
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


const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          animation: 'none',
        }}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Peoples"
          component={Peoples}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="UserDetails" component={UserDetail} />
        <Stack.Screen
          name="PostDetail"
          component={PostDetail}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
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
    marginBottom:0,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
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
  flatList: {
    flex: 1,
  },
  itemContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 10,
    borderBottomWidth: 0.2,
    borderBottomColor: COLORS.greyline,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'NunitoSans-Bold',
  },
  title: {
    fontSize: 16,
    fontWeight: 'medium',
    color: 'white',
    fontFamily: 'NunitoSans-Regular',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'tranparrant',
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

export default App;