import { useState } from 'react';
import { TextInput } from 'react-native';

const useInputFocus = () => {
  const [isFocused, setIsFocused] = useState(false);

  const onFocus = () => setIsFocused(true);
  const onBlur = () => setIsFocused(false);

  const inputStyle = {
    borderColor: isFocused ? '#1e90ff' : '#555', // Đổi màu viền khi có focus
    borderWidth: 1,
  };

  return {
    onFocus,
    onBlur,
    inputStyle,
  };
};

export default useInputFocus;
