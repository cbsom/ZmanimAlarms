import React, { PureComponent } from 'react';
import { Platform, StyleSheet, Text, View, FlatList } from 'react-native';
import Settings from './App/Code/Settings';
import { log } from './App/Code/GeneralUtils';
import SingleAlarm from './App/GUI/SingleAlarm';

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
    //settings.save();
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
    return (<View><Text>{`Alarm #${index + 1}`}</Text>
      <View style={{ marginLeft: 25 }}>
        <SingleAlarm activeAlarm={item} style={styles.container} />
      </View></View>);
  }
  render() {
    const { activeAlarms, location } = this.state.settings;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Zmanim Alarms!</Text>
        <Text style={styles.location}>My Location is: <Text style={{ fontWeight: 'bold', fontSize: 17 }}>{location.Name}</Text></Text>
        <Text>Active Alarm List</Text>
        {activeAlarms.length
          ? <FlatList data={activeAlarms} renderItem={this.renderAlarmItem} keyExtractor={(item, index) => index.toString()} />
          : <Text style={styles.welcome}>There are no alarms set.</Text>}
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
});
