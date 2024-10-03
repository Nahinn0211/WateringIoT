import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';

const Light = () => {
  const [lightOn, setLightOn] = useState(false);
  const [brightness, setBrightness] = useState(0);

  const toggleLight = () => {
    setLightOn(prev => !prev);
    if (!lightOn) {
      // Nếu bật đèn, đặt cường độ sáng về 0
      setBrightness(0);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Light Control</Text>
      <View style={styles.circleContainer}>
        <View
          style={[
            styles.circle,
            {
              backgroundColor: lightOn ? `rgba(255, 255, 255, ${brightness / 100})` : 'rgba(128, 128, 128, 0.5)', // Màu nền khi cường độ sáng tăng
            },
          ]}
        >
          <TouchableOpacity onPress={toggleLight} style={styles.lightSwitch}>
            <Text style={styles.switchText}>{lightOn ? 'ON' : 'OFF'}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.brightnessText}>Brightness: {Math.round(brightness)}</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={100}
        value={brightness}
        onValueChange={value => {
          if (lightOn) {
            setBrightness(value);
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000', // Nền đen
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff', // Màu chữ trắng
    marginBottom: 20,
  },
  circleContainer: {
    width: 220,
    height: 220,
    borderRadius: 110,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#fff', // Viền trắng
  },
  circle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#aaa',
    elevation: 5, // Đổ bóng
  },
  lightSwitch: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#00BFFF', // Màu xanh nước biển
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // Đổ bóng
  },
  switchText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  brightnessText: {
    marginTop: 20,
    fontSize: 18,
    color: '#fff', // Màu chữ trắng
  },
  slider: {
    width: 300,
    height: 40,
    marginTop: 20,
  },
});

export default Light;
