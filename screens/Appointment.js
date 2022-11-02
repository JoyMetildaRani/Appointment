import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Alert,
  Button,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import TimePicker from 'react-native-simple-time-picker';
import { RFValue } from 'react-native-responsive-fontsize';
import * as Notifications from 'expo-notifications';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default class Appointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeinhours: 0,
      timeinmin: 0,
      name: '',
      isDatePickerVisible: false,
      setDatePickerVisibility: false,
      setSelectedDate: '',
      selectedDate: '',

      selectedHours: 0,
      setSelectedHours: 0,
      selectedMinutes: 0,
      setSelectedMinutes: 0,
      email: this.props.email,
    };
  }

  writeindb = async (hrs, min, name, datefull) => {
    console.log(this.state.setSelectedDate);

    if (hrs > 21 || hrs < 9) {
      Alert.alert('Please select time between 9:00 to 21:00');
    } else if (hrs && min && name && this.state.setSelectedDate) {
      db.collection('patients').add({
        patient_name: name,
        patient_appointment_time: hrs + ':' + min,
        patient_appointment_date: datefull,
        patient_email: this.state.email,
        serverTime: firebase.firestore.Timestamp.now().toDate(),
      });

      Alert.alert('Appointment has been made successfully');

      this.setState({
        timeinhours: '',
        timeinmin: '',
        name: '',
        selectedDate: '',
        setSelectedDate: '',
        selectedHours: 0,
        setSelectedHours: 0,
        selectedMinutes: 0,
        setSelectedMinutes: 0,
      });
    } else {
      Alert.alert('Please enter all the fields');
    }
  };

  showDatePicker = () => {
    this.setState({
      setDatePickerVisibility: true,
      isDatePickerVisible: true,
    });
  };

  hideDatePicker = () => {
    this.setState({
      setDatePickerVisibility: false,
      isDatePickerVisible: false,
    });
  };

  handleConfirm = (date) => {
    this.setState({
      setSelectedDate: date,
    });
    console.log(moment(this.state.setSelectedDate).format('MM/DD/YYYY'));
    dateset = moment(this.state.setSelectedDate).format('MM/DD/YYYY');
    this.setState({
      selectedDate: dateset,
    });

    this.hideDatePicker();
  };

  render() {
    const {
      selectedHours,
      setSelectedHours,
      selectedMinutes,
      setSelectedMinutes,
    } = this.state;
    const { timeinhours, timeinmin, name } = this.state;
    const {
      isDatePickerVisible,
      setDatePickerVisibility,
      setSelectedDate,
      selectedDate,
    } = this.state;
    return (
      <KeyboardAvoidingView behaviour="padding" style={styles.container}>
        <ImageBackground
          source={require('../assets/de.jpg')}
          style={{ width: '100%', height: '100%' }}>
          <View style={styles.uppercontainer}>
            <View style={{ marginTop: 25 }}>
              <Text style={styles.text}>Get Well Soon !!!</Text>
            </View>
          </View>
          <ScrollView>
            <View style={{ flex: 0.2 }}>
              <TextInput
                style={[styles.textname, { color: '#FFFFFF' }]}
                placeholder={'Name of the Patient'}
                placeholderTextColor={'#FFFFFF'}
                onChangeText={(text) => this.setState({ name: text })}
                value={this.state.name}
              />
            </View>
            <View style={styles.lowercontainer}>
              <Text style={[styles.textname, { color: '#FFFFFF' }]}>
                Selected Time: {setSelectedHours}:{setSelectedMinutes}
              </Text>
              <TimePicker
                selectedHours={selectedHours}
                //initial Hourse value
                selectedMinutes={selectedMinutes}
                //initial Minutes value
                onChange={(hours, minutes) => {
                  this.setState({
                    setSelectedHours: hours,
                    setSelectedMinutes: minutes,
                  });
                }}
              />
            </View>
            <View
              style={{
                flex: 0.3,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={[
                  styles.textname,
                  { color: '#FFFFFF' },
                ]}>{`Selected Date:  ${
                setSelectedDate
                  ? moment(setSelectedDate).format('DD/MM/YYYY')
                  : ''
              }`}</Text>
              <Button
                title="Please select date"
                onPress={this.showDatePicker}
              />
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={this.handleConfirm}
                onCancel={this.hideDatePicker}
              />
            </View>
          </ScrollView>
          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              await schedulePushNotification(
                setSelectedHours,
                setSelectedMinutes
              );
              await this.writeindb(
                setSelectedHours,
                setSelectedMinutes,
                name,
                moment(setSelectedDate).format('DD/MM/YYYY')
              );
            }}>
            <Text style={styles.buttonText}>Make an Appointment</Text>
          </TouchableOpacity>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}

async function schedulePushNotification(setSelectedHours, setSelectedMinutes) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Hey!! it's time",
      body: 'You have an appointment with the doctor ',
      data: { data: 'goes here' },
    },
    trigger: {
      hour: setSelectedHours,
      minute: setSelectedMinutes,
      repeats: true,
    },
  });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center',
    margin: 20,
  },
  textinput: {
    borderRadius: 20,
    padding: 20,
    backgroundColor: '#fd5da8',
    fontSize: 30,
  },
  textname: {
    borderRadius: 20,
    padding: 10,
    backgroundColor: '#fd5da8',
    fontSize: 18,
    margin: 10,
  },
  uppercontainer: {
    fles: 0.5,
    alignItems: 'center',
  },
  lowercontainer: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#c35ec3',
    padding: 15,
    borderRadius: 25,
    margin: 15,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 20,
    alignSelf: 'center',
  },
  imagebackground: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
