import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { COLORS } from '../assets/colors.js';

const Profile = ({ navigation }: { navigation: any }) => {
  const [currentPage, setCurrentPage] = useState<string>('Profile');

  const handleNavigation = (page: string) => {
    navigation.navigate(page);
    setCurrentPage(page);
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
        </View>

        {/* Profile */}
        <ScrollView contentContainerStyle={[styles.scrollContent, { paddingBottom: 80 }]}>
        <View style={styles.containerProfile}>
          <Image
            source={require('../assets/profile_pic.png')}
            style={styles.profilepic}
          />
        </View>

        <View style={styles.name}>
          <Text style={styles.pageTitle}>HAFIZH NABIL DZIKRULLAH</Text>
        </View>

        <View style={styles.contactfull}>

          {/* Contact */}
          <View style = {styles.contact}>
          <Image
              source={require('../assets/mi_call.png')}
              style={styles.conimage}
              />
            <Text style = {styles.conText}>(+62)82285052376</Text>
          </View>

          <View style = {styles.contact}>
          <Image
              source={require('../assets/clarity_email-solid.png')}
              style={styles.conimage}
              />
            <Text style = {styles.conText}>hafizhnabild@gmail.com</Text>
          </View>

          <View style = {styles.contact}>
          <Image
              source={require('../assets/tdesign_education-filled.png')}
              style={styles.conimage}
              />
            <Text style = {styles.conText}>Information System at Brawijaya University</Text>
          </View>

          <View style = {styles.contact}>
          <Image
              source={require('../assets/ri_github-fill.png')}
              style={styles.conimage}
              />
            <Text style = {styles.conText}>github.com/Hafizhnd</Text>
          </View>
          </View>
          {/* About Me */}
          <View>
            <Text style={styles.aboutme}>About Me</Text>
            <Text style={styles.description}>I have expertise in mobile application development using Android Studio and Flutter, as well as web development with HTML and CSS. I am proficient in managing databases with Firebase, creating responsive application interfaces, and ensuring application quality through thorough debugging and testing. I am also eager to learn new technologies and continuously enhance my skills to adapt to evolving industry trends.</Text>
          </View>

          <View className="secline" style={styles.lightline} />

          {/* Skills */}
          <View>
            <Text style={styles.aboutme}>My Skills</Text>
          </View>

          <View>
            <Image
              source={require('../assets/skills.png')}
              style={styles.skills}
            />
          </View>
        </ScrollView>
        
        {/* Navbar */}
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
  scrollContent: {
  },
  containerTop: {
    alignItems: 'center',
    marginBottom: 0,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.greyline,
  },
  image: {
    width: 47,
    height: 47,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  containerProfile: {
    alignItems: 'center',
  },
  profilepic: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginTop: 20,
    marginBottom:8,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: COLORS.greyline,
    marginTop: 10,
  },
  lightline: {
    width: '100%',
    height: 0.2,
    backgroundColor: '#ccc',
    marginTop: 20,
  },
  name: {
    alignItems: 'center',
    marginBottom: 25,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  profileText: {
    fontSize: 18,
    color: 'white',
    marginTop: 10,
  },
  contactfull: {
    paddingBottom: 20,
  },
  contact: {
    flexDirection: 'row',
    marginLeft: 8,
    paddingVertical:8,
  },
  conText: {
    fontSize: 15,
    color: 'white',
    paddingLeft: 10,
  },
  conimage : {
    width: 25,
    height: 25,
    marginLeft: 23,
  },

  aboutme: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
    paddingLeft: 40,
    paddingTop: 20,
    borderTopWidth: 0.2,
    borderTopColor: COLORS.greyline,
  },
  description: {
    fontSize: 14,
    color: 'white',
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 10,
  },
  skills: {
    width: 350,
    height: 153,
    resizeMode: 'contain',
    marginTop: 15,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#111216',
    height: 60,
    position: 'absolute',
    bottom: 0,
    borderTopWidth: 1.5,
    borderTopColor: COLORS.greyline,
    left: 15,
    right: 15,
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

export default Profile;
