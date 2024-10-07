import React, { useState, useRef } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  Animated,
  Dimensions
} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import Calendar from './Calendar' // Import màn hình Calendar
import Light from './Light' // Import màn hình Light
import Login from './Login'
import Register from './Register'

const Stack = createStackNavigator()

const HomeScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const screenWidth = Dimensions.get('window').width
  const menuWidth = Math.min(500, screenWidth * 0.6) // Đặt chiều rộng tối đa là 500px hoặc 60% màn hình
  const translateX = useRef(new Animated.Value(-menuWidth)).current

  const menuItems = [
    { id: '1', title: 'Calendar', screen: 'Calendar' },
    { id: '2', title: 'Light', screen: 'Light' },
    { id: '3', title: 'Vegetable', screen: 'Vegetable' },
    // { id: '4', title: 'Settings', screen: 'Settings' }
  ]

  const openMenu = () => {
    setModalVisible(true)
    Animated.timing(translateX, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true
    }).start()
  }

  const closeMenu = () => {
    Animated.timing(translateX, {
      toValue: -menuWidth,
      duration: 300,
      useNativeDriver: true
    }).start(() => setModalVisible(false))
  }

  const renderMenuItem = ({ item }) => (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={() => {
        navigation.navigate(item.screen) // Điều hướng khi bấm vào menu item
        closeMenu()
      }}
    >
      <Text style={styles.menuItemText}>{item.title}</Text>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={openMenu} style={styles.menuButton}>
          <Text style={styles.menuButtonText}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Home</Text>
      </View>

      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeMenu}
      >
        <TouchableOpacity
          style={styles.modalBackground}
          onPress={closeMenu}
          activeOpacity={1}
        >
          <TouchableOpacity activeOpacity={1} style={{ width: menuWidth }}>
            <Animated.View
              style={[
                styles.modalContainer,
                { transform: [{ translateX }], width: menuWidth }
              ]}
            >
              <FlatList
                data={menuItems}
                renderItem={renderMenuItem}
                keyExtractor={item => item.id}
              />
              <TouchableOpacity onPress={closeMenu} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </Animated.View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  )
}

// Cấu hình Stack Navigator để chuyển hướng giữa các màn hình
const Home = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register } />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="Calendar" component={Calendar} />
        <Stack.Screen name="Light" component={Light} />
        {/* Thêm các màn hình khác nếu cần */}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: 'black',
    padding: 20
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'black',
    padding: 10
  },
  menuButton: {
    padding: 10
  },
  menuButtonText: {
    fontSize: 24,
    color: 'white'
  },
  headerTitle: {
    fontSize: 20,
    color: 'white'
  },
  modalBackground: {
    paddingTop: 100,
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  modalContainer: {
    backgroundColor: 'black',
    borderRadius: 10,
    padding: 20,
    height: '100%'
  },
  menuItem: {
    paddingTop: 30,
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  menuItemText: {
    fontSize: 18,
    color: 'white'
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
    alignItems: 'center'
  },
  closeButtonText: {
    color: 'white'
  }
})

export default Home
