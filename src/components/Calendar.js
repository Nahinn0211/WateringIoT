import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';

const CalendarComponent = () => {
  // Thiết lập sự kiện mẫu cho ngày "2024-10-01"
  const [events, setEvents] = useState({
    '2024-10-03': 3, 
    '2024-10-10': 10, // Ngày 1 tháng 10 năm 2024 có 1 sự kiện
  });

  const handleDayPress = (day) => {
    // Thêm sự kiện vào ngày đã chọn (Ví dụ)
    const newEvents = { ...events };
    newEvents[day.dateString] = newEvents[day.dateString] ? newEvents[day.dateString] + 1 : 1;
    setEvents(newEvents);
  };

  const renderEventButton = (day) => {
    return events[day.dateString] ? (
      <TouchableOpacity style={styles.noteButton}>
        <Text style={styles.noteButtonText}>Notes</Text>
      </TouchableOpacity>
    ) : null;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{new Date().toLocaleDateString()}</Text>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={Object.keys(events).reduce((acc, date) => {
          acc[date] = { selected: true, marked: true, dotColor: 'blue' };
          return acc;
        }, {})}
        renderDay={(day, item) => {
          return (
            <View>
              <Text style={styles.dayText}>{day.dateString}</Text>
              {renderEventButton(day)}
            </View>
          );
        }}
        theme={{
          backgroundColor: 'black',
          calendarBackground: 'black',
          textSectionTitleColor: 'white',
          textMonthFontWeight: 'bold',
          selectedDayBackgroundColor: 'blue',
          todayTextColor: 'blue',
          dayTextColor: 'white',
          textDisabledColor: '#666',
        }}
      />
      <TouchableOpacity onPress={() => alert('Add new event')} style={styles.addButton}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
    paddingTop: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
  dayText: {
    color: 'white',
    textAlign: 'center',
    marginVertical: 5,
  },
  noteButton: {
    marginTop: 5,
    backgroundColor: 'rgba(0, 0, 255, 0.3)', // Màu nền mờ
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  noteButtonText: {
    color: 'white',
    fontSize: 12,
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  addButtonText: {
    fontSize: 30,
    color: 'white',
  },
});

export default CalendarComponent;
