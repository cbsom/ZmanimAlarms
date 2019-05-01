import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, FlatList, Picker, TouchableHighlight, Image } from 'react-native';
import Settings from '../Code/Settings';
import { log } from '../Code/GeneralUtils';
import SingleAlarm from './SingleAlarm';
import { getList, findLocation } from '../Code/Locations';
import { regenerateAll } from '../Code/Notifications';
import deleteImg from '../Images/delete.png';
import addImg from '../Images/add.png';
import saveImg from '../Images/save.png';

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.setInitialData = this.setInitialData.bind(this);
    this.getStorageData = this.getStorageData.bind(this);
    this.changeSettings = this.changeSettings.bind(this);

    this.setInitialData();
  }
  componentDidMount() {
    this.getStorageData();
  }
  setInitialData() {
    const settings = new Settings();
    this.state = { settings };
  }
  async getStorageData() {
    const settings = await Settings.getSettings();
    this.setState({ settings });
  }
  changeSettings(settings) {
    log('changed settings:', settings);
    settings.save();
    regenerateAll(settings);
    this.setState({ settings });
  }
  render() {
    const settings = this.state.settings;
    return (
      <View style={styles.container}>
        <View style={{ flex: 0 }}>
          <Text style={styles.welcome}>Zmanim Alarms!</Text>
          <View style={styles.locationBar}>
            <Text style={styles.location}>My Location</Text>
            <Picker
              mode='dropdown'
              style={styles.locPicker}
              itemStyle={styles.locPickerItem}
              selectedValue={findLocation(settings.location.Name)}
              onValueChange={l => {
                settings.location = l;
                this.changeSettings(settings);
              }}>
              {getList().map((l, i) => (
                <Picker.Item key={i} value={l} label={l.Name + (l.NameHebrew ? ' / ' + l.NameHebrew : '')} />
              ))}
            </Picker>
          </View>
          <Text>Active Alarm List</Text>
        </View>
        <View style={{ flex: 1 }}>
          {settings.activeAlarms.length
            ? <FlatList
              data={settings.activeAlarms}
              renderItem={({ item, index }) =>
                <View style={styles.singleAlarm}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.alarmItemIndex}>{`Alarm #${index + 1} - ${item.title}`}</Text>
                    <TouchableHighlight onPress={() => {
                      const activeAlarms = [...settings.activeAlarms];
                      activeAlarms.splice(index, 1);
                      settings.activeAlarms = activeAlarms;
                      this.changeSettings(settings);
                    }}><Image source={deleteImg} /></TouchableHighlight>
                  </View>
                  <SingleAlarm activeAlarm={item} style={styles.container} />
                  <TouchableHighlight style={{ flex: 1, marginTop: 10, backgroundColor: '#343', borderRadius: 10, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }} onPress={() => {
                    const activeAlarms = [...settings.activeAlarms];
                    settings.activeAlarms = activeAlarms;
                    this.changeSettings(settings);
                  }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Image source={saveImg} />
                      <Text style={styles.instructions}>Save Changes</Text>
                    </View>
                  </TouchableHighlight>
                </View>}
              keyExtractor={(item, index) => index.toString()} />
            : <Text style={styles.welcome}>There are no alarms set.</Text>}
        </View>
        <TouchableHighlight style={{ flex: 0, backgroundColor: '#223', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }} onPress={() => {
          const activeAlarms = [...settings.activeAlarms];
          activeAlarms.push(Settings.getEmptyAlarm());
          settings.activeAlarms = activeAlarms;
          this.setState({ settings });
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={addImg} />
            <Text style={styles.instructions}>Add a new Zman Alarm</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000'
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    color: '#C88'
  },
  locationBar: {
    backgroundColor: '#113',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center'
  },
  location: {
    color: '#aac',
    fontSize: 12
  },
  locPicker: {
    height: 50,
    width: '100%',
    fontWeight: 'bold',
    fontSize: 18,
    color: '#bbf',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',
    alignContent: 'space-around'
  },
  locPickerItem: {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',
    alignContent: 'space-around'
  },
  instructions: {
    textAlign: 'center',
    color: '#aaa',
    marginBottom: 5,
  },
  alarmItemIndex: {
    color: '#7fa',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 20,
  },
  singleAlarm: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#222',
    marginBottom: 5,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 5
  },
});
