import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import useInputFocus from '../hooks/useInputFocus';

const Register = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Tạo các instance của custom hook cho mỗi ô nhập
  const emailInputFocus = useInputFocus();
  const passwordInputFocus = useInputFocus();
  const confirmPasswordInputFocus = useInputFocus();

  const handleRegister = () => {
    if (email === '' || password === '' || confirmPassword === '') {
      Alert.alert('Vui lòng nhập đầy đủ thông tin');
    } else if (password !== confirmPassword) {
      Alert.alert('Mật khẩu không khớp');
    } else {
      navigation.navigate('Login');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.registerContainer}>
        <Text style={styles.title}>Đăng Ký</Text>

        <TextInput
          style={[styles.input, emailInputFocus.inputStyle]} // Áp dụng style từ hook
          placeholder="Email"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          onFocus={emailInputFocus.onFocus} // Gán onFocus từ hook
          onBlur={emailInputFocus.onBlur} // Gán onBlur từ hook
        />

        <TextInput
          style={[styles.input, passwordInputFocus.inputStyle]} // Áp dụng style từ hook
          placeholder="Mật khẩu"
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          autoCapitalize="none"
          onFocus={passwordInputFocus.onFocus} // Gán onFocus từ hook
          onBlur={passwordInputFocus.onBlur} // Gán onBlur từ hook
        />

        <TextInput
          style={[styles.input, confirmPasswordInputFocus.inputStyle]} // Áp dụng style từ hook
          placeholder="Xác nhận mật khẩu"
          placeholderTextColor="#888"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={true}
          autoCapitalize="none"
          onFocus={confirmPasswordInputFocus.onFocus} // Gán onFocus từ hook
          onBlur={confirmPasswordInputFocus.onBlur} // Gán onBlur từ hook
        />

        {/* Button Đăng Ký */}
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Đăng Ký</Text>
        </TouchableOpacity>

        {/* Button quay lại màn hình Đăng Nhập */}
        <TouchableOpacity
          style={[styles.button, styles.buttonSecondary]}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Đã có tài khoản? Đăng nhập</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  registerContainer: {
    padding: 20,
    backgroundColor: '#333',
    marginHorizontal: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff',
  },
  input: {
    height: 40,
    borderColor: '#555',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: '#fff',
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonSecondary: {
    backgroundColor: '#4169e1',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Register;
