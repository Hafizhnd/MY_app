import { Image, ImageBackground, StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS } from '../assets/colors';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';

type Post = {
    id: number;
    userId: number;
    title: string;
    body: string;
    username?: string;
  };

const PostDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { post } = route.params as { post: Post }; 
  const [comments, setComments] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error(error));
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
      .then(response => setComments(response.data))
      .catch(error => console.error(error));
  }, [post.id]);

  const getUsername = (userId: number) => {
    const user = users.find(u => u.id === userId);
    return user ? user.username : 'Unknown User';
  };

  return (
    <ImageBackground
      source={require('../assets/bg_app.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.containerTop}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../assets/bi_arrow-left.png')}
              style={styles.backImage}
            />
          </TouchableOpacity>
          <Text style={styles.postText}>Post</Text>
        </View>

        <View style={styles.postDetails}>
          <Text style={styles.username}>{getUsername(post.userId)}</Text>
          <Text style={styles.title}>{post.title}</Text>
          <Text style={styles.body}>{post.body}</Text>
        </View>

        <Text style={styles.commentsHeader}>Comments</Text>
        <FlatList
          data={comments}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.commentContainer}>
              <Text style={styles.commenter}>{item.email}</Text>
              <Text style={styles.commentBody}>{item.body}</Text>
            </View>
          )}
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
  postText: {
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
  postDetails: {
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
    marginTop: 8,
  },
  body: {
    fontSize: 14,
    fontWeight: 'normal',
    color: 'white',
    fontFamily: 'NunitoSans-Regular',
    marginTop: 8,
    marginBottom: 20,
  },
  commentsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'NunitoSans-Bold',
    marginTop: 20,
    marginLeft: 10,
    marginBottom: 10,
  },
  commentContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 10,
    borderBottomWidth: 0.2,
    borderBottomColor: COLORS.greyline,
  },
  commenter: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  commentBody: {
    fontSize: 14,
    color: 'white',
  },
});

export default PostDetail;
