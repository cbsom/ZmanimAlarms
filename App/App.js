import React, { PureComponent } from 'react';
import { Platform, StyleSheet, Text, View, FlatList, Picker } from 'react-native';
import Settings from './Code/Settings';
import { log } from './Code/GeneralUtils';
import SingleAlarm from './GUI/SingleAlarm';
import {getList, findLocation} from './Code/Locations';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const Props = {};
export default class App extends PureComponent {
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
    ////ONLY INITIAL DATA
    settings.save();
    this.state = { settings };
  }
  async getStorageData() {
    const settings = await Settings.getSettings();
    this.setState({ settings });
  }
  changeSettings(settings) {
    log('changed settings:', settings);
    settings.save();
    this.setState({ settings });
  }
  renderAlarmItem({ item, index }) {
    return (<View>
      <Text style={styles.alarmItemIndex}>{`Alarm #${index + 1}`}</Text>
      <SingleAlarm activeAlarm={item} style={styles.container} />
    </View>);
  }
  render() {
    const { activeAlarms, location } = this.state.settings;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Zmanim Alarms!</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.location}>My Location is:</Text>
          <Picker
            style={styles.picker}
            itemStyle={styles.pickerItem}
            selectedValue={findLocation(location.Name)}
            onValueChange={l => {
              activeAlarms.location = l;
              this.setState({ activeAlarms });
            }}>
            {getList().map((l, i) => (
              <Picker.Item key={i} value={l} label={l.Name} />
            ))}
          </Picker>
        </View>
        <Text>Active Alarm List</Text>
        {activeAlarms.length
          ? <FlatList style={styles.alarmList} contentContainerStyle={styles.singleAlarm} data={activeAlarms} renderItem={this.renderAlarmItem} keyExtractor={(item, index) => index.toString()} />
          : <Text style={styles.welcome}>There are no alarms set.</Text>}
        <Text style={styles.instructions}>{instructions}</Text>
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
  location: {
    textAlign: 'center',
    color: '#aaf',
    margin: 5,
  },
  instructions: {
    textAlign: 'center',
    color: '#aaa',
    marginBottom: 5,
  },
  alarmList: { flex: 1 },
  alarmItemIndex: {
    color: '#7fa',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 20,
  },
  singleAlarm: {
    borderStyle: 'solid',
    borderRadius: 10,
    borderColor: '#888',
    padding: 15,
    backgroundColor: '#222',
    marginLeft: 35,
    marginRight: 35,
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: 100,
    backgroundColor: '#000'
  },
  pickerItem: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#aaf',
    textAlign: 'center'
  },
});
