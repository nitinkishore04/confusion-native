import React, { Component } from "react";
import { Text, View, ScrollView, StyleSheet, Picker, Switch, Button, Modal, Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Animatable from 'react-native-animatable';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import * as Calendar from 'expo-calendar';

class Reservation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      guests: 1,
      smoking: false,
      date: new Date(),
      time: new Date(),
      show: false,
      mode: "date",
    };
  }
 

  handleReservation() {
    console.log(JSON.stringify(this.state));
    this.addReservationToCalendar(this.state.date);
    this.presentLocalNotification(this.state.date);
    this.resetForm();
  }

  resetForm() {
    this.setState({
      guests: 1,
      smoking: false,
      date: new Date(),
      time: new Date(),
      show: false,
      showModal: false,
      mode: "date",
    });
  }

  async obtainNotoficationPermission(){
    let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS)
    if ( permission !== 'granted'){
      permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS)
      if (permission.status !== 'granted') {
        Alert.alert('Permission not granted to show notifications');
      }
    }
    return permission;
  }

  async presentLocalNotification(date){
    await this.obtainNotoficationPermission();
    Notifications.presentLocalNotificationAsync({
      title: "Your Reservation Notification",
      body: `Reservation for ${date} requested`,
      ios: {
        sound: true
      },
      android: {
        sound: true,
        vibrate: true,
        color: '#512DA8'
      }
    })
  }


  obtainCalendarPermission = async () => {
    const calendarPermission = await Permissions.askAsync(Permissions.CALENDAR);
    if ( calendarPermission === 'granted') {
      if (permission.status !== 'granted') {
        permission = await Permissions.askAsync(Permissions.CALENDAR);
        if (permission.status !== 'granted') {
          Alert.alert('Permission not granted to access the calendar');
        }
      }
      return permission;
    }
  }


  async addReservationToCalendar(date) {
    await this.obtainCalendarPermission();
    console.log("Date: "+date);
    
    let dateMs = Date.parse(date);
    let startDate = new Date(dateMs);
    let endDate = new Date(dateMs + 2 * 60 * 60 * 1000);
    const defaultCalendarSource =
    Platform.OS === 'ios'
    ? await getDefaultCalendarSource()
    : { isLocalAccount: true, name: 'Expo Calendar' };
    let details = {
    title: 'Con Fusion Table Reservation',
    source: defaultCalendarSource,
    name: 'internalCalendarName',
    color: 'blue',
    entityType: Calendar.EntityTypes.EVENT,
    sourceId: defaultCalendarSource.id,
    ownerAccount: 'personal',
    accessLevel: Calendar.CalendarAccessLevel.OWNER,
    }

    const calendarId = await Calendar.createCalendarAsync(details);
      await Calendar.createEventAsync(calendarId , {
      title: 'Con Fusion Table Reservation',
      startDate: startDate,
      endDate: endDate,
      timeZone: 'Asia/Hong_Kong',
      location: '121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong'
    });

  }

  render() {
    const showDatepicker = () => {
      this.setState({ show: true });
    };
    const reservationAlert = () =>
      Alert.alert(
        "Your Reservation OK?",
        `Number of Guest: ${this.state.guests}\nSmoking? ${this.state.smoking ? "Yes" : "No"}\nDate: ${this.state.date.toISOString()}\nTime: ${this.state.time.toTimeString()}`,
        [
          {
            text: "Cancel",
            onPress: () => this.resetForm(),
            style: "cancel"
          },
          { text: "OK", onPress: () => this.handleReservation() }
        ],
        { cancelable: false }
      );

    return (
      <ScrollView>
        <Animatable.View animation="zoomIn" duration={2000} delay={1000}>
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>Number of Guests</Text>
            <Picker
              style={styles.formItem}
              selectedValue={this.state.guests}
              onValueChange={(itemValue, itemIndex) => this.setState({ guests: itemValue }) }
            >
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3" value="3" />
              <Picker.Item label="4" value="4" />
              <Picker.Item label="5" value="5" />
              <Picker.Item label="6" value="6" />
            </Picker>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
            <Switch
              style={styles.formItem}
              value={this.state.smoking}
              trackColor={{ false: "#767577", true: "#512DA8" }}
              thumbColor={'#522DA8'}
              onValueChange={(value) => this.setState({ smoking: value })}
            />
          </View>
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>Date and Time</Text>
            <Text style={styles.formItem} onPress={showDatepicker}>
              {this.state.date.toDateString()} {'\n'} {this.state.time.toTimeString()}
            </Text>
            {this.state.show && (
              <DateTimePicker
                value={this.state.date}
                mode={this.state.mode}
                display="default"
                placeholder="Date"
                minimumDate={new Date()}
                onChange={(selected, value) => {
                  if (value !== undefined) {
                    this.setState({
                      show: this.state.mode === "time" ? false : true,
                      mode: "time",
                      date: new Date(selected.nativeEvent.timestamp),
                      time: new Date(selected.nativeEvent.timestamp),
                    });
                  } else {
                    this.setState({ show: false });
                  }
                }}
              />
            )}
          </View>
          <View style={styles.formRow}>
            <Button
              onPress={() => reservationAlert()}
              title="Reserve"
              color="#512DA8"
              accessibilityLabel="Learn more about this purple button"
            />
          </View>
        </Animatable.View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  formRow: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    margin: 20,
  },
  formLabel: {
    fontSize: 18,
    flex: 2,
  },
  formItem: {
    flex: 1,
  },
  modal: {
    justifyContent: "center",
    margin: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    backgroundColor: "#512DA8",
    textAlign: "center",
    color: "white",
    marginBottom: 20,
  },
  modalText: {
    fontSize: 18,
    margin: 10,
  },
});

export default Reservation;
