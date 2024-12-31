import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { COLORS } from '../assets/colors.js';

const UserDetail = ({ route, navigation }: { route: any; navigation: any }) => {
  const [currentPage, setCurrentPage] = useState<string>('UserDetail');
  const { userId } = route.params;
  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
      });
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error('Error fetching user posts:', error));
  }, [userId]);

  const handleNavigation = (page: string) => {
    navigation.navigate(page);
    setCurrentPage(page);
  };

  const renderPostItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.postItem}
      onPress={() => navigation.navigate('PostDetail', { post: item })}
    >
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postBody} numberOfLines={2}>
        {item.body}
      </Text>
    </TouchableOpacity>
  );

  if (!user) {
    return (
      <ImageBackground source={require('../assets/bg_app.png')} style={styles.backgroundImage}>
        <View style={styles.container}>
          <Text style={styles.loadingText}>Loading user details...</Text>
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground source={require('../assets/bg_app.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.containerTop}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../assets/bi_arrow-left.png')}
              style={styles.backImage}
            />
          </TouchableOpacity>
          <Text style={styles.userText}>User</Text>
        </View>

        <FlatList
          contentContainerStyle={[styles.scrollContent, { paddingBottom: 0 }]}
          ListHeaderComponent={
            <>
              {/* User Profile Section */}
              <View style={styles.containerProfile}>
                <Image source={require('../assets/user_pic.png')} style={styles.profilePic} />
                <Text style={styles.username}>{user.username}</Text>
                <Text style={styles.name}>{user.name}</Text>
              </View>

              {/* Contact Information */}
              <View style={styles.contactContainer}>
              <View style={styles.contactInfo}>
                <View style={styles.contact}>
                  <Image
                    source={require('../assets/mi_call.png')}
                    style={styles.conimage}
                  />
                  <Text style={styles.conText}>{user.phone}</Text>
                </View>

                <View style={styles.contact}>
                  <Image
                    source={require('../assets/clarity_email-solid.png')}
                    style={styles.conimage}
                  />
                  <Text style={styles.conText}>{user.email}</Text>
                </View>

                <View style={styles.contact}>
                  <Image
                    source={require('../assets/mdi_search-web.png')}
                    style={styles.conimage}
                  />
                  <Text style={styles.conText}>{user.website}</Text>
                </View>
              </View>
              </View>


              {/* Address Section */}
              <View style={styles.addressContainer}>
                <Text style={styles.sectionTitle}>Address</Text>
                <Text style={styles.addressText}>
                  {user.address.street}, {user.address.suite}, {user.address.city}
                </Text>
                <Text style={styles.addressText}>Zipcode: {user.address.zipcode}</Text>
              </View>


              {/* Company Section */}
              <View style={styles.companyContainer}>
                <View style={styles.companyBorder}>
                  <Text style={styles.sectionTitle}>Company</Text>
                  <Text style={styles.companyText}>{user.company.name}</Text>
                  <Text style={styles.companyText}>📜 {user.company.catchPhrase}</Text>
                  <Text style={styles.companyText}>💼 {user.company.bs}</Text>
                </View>
              </View>
            
              {/* Posts Section */}
              <View style={styles.postsContainer}>
              <Text style={styles.sectionTitle}>Posts</Text>
              </View>
            </>
          }
          
          data={posts}
          renderItem={renderPostItem}
          keyExtractor={(item) => item.id.toString()}
        />
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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
    marginTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.greyline,
  },
  userText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 45,
    color: 'white',
    marginBottom: 25,
  },
  backImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  scrollContent: {},
  containerProfile: {
    alignItems: 'center',
  },
  profilePic: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 10,
    marginTop: 20,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  name: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  contactContainer: {
    borderBottomWidth: 0.2,
    borderBottomColor: COLORS.greyline,
  },
  contactInfo: {
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 0,
  },
  contact: {
    flexDirection: 'row',
    marginLeft: 8,
    paddingVertical: 8,
  },
  conText: {
    fontSize: 15,
    color: 'white',
    paddingLeft: 10,
  },
  conimage: {
    width: 25,
    height: 25,
    marginLeft: 23,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    marginLeft: 15,
  },
  addressContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  addressText: {
    fontSize: 16,
    color: 'white',
    marginBottom: 5,
    marginLeft: 15,
  },
  companyContainer: {
    borderTopWidth: 0.2,
    borderTopColor: COLORS.greyline,
    borderBottomWidth: 0.2,
    borderBottomColor: COLORS.greyline,
  },
  companyBorder: {
    marginTop: 20,
    marginBottom: 20,
  },
  companyText: {
    fontSize: 16,
    color: 'white',
    marginBottom: 5,
    marginLeft: 15,
  },
  postsContainer: {
    marginTop: 20,
  },
  postItem: {
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.greyline,
    marginHorizontal: 20,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: 'white',
    fontFamily: 'NunitoSans-Regular',
  },
  postBody: {
    fontSize: 14,
    fontWeight: 'normal',
    color: 'white',
    fontFamily: 'NunitoSans-Regular',
    marginTop: 8,
    marginBottom: 20,
  },
  lightLine: {
    width: '100%',
    height: 0.2,
    backgroundColor: COLORS.greyline,
    marginVertical: 10,
  },
  loadingText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default UserDetail;
