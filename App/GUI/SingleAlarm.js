import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Select
} from 'react-native';
import { getZmanType } from '../Code/ZmanTypes';

export default class SingleAlarm extends Component {
    constructor(props) {
        super(props);
        this.state = { activeAlarm: props.activeAlarm };
    }

    render() {
        const { activeAlarm, style } = this.state,
            zmanType = getZmanType(activeAlarm.zmanName);
        return <View style={style}>
            <View style={styles.field}>
                <Text style={styles.caption}>Title:</Text>
                <TextInput style={styles.textInput} value={activeAlarm.title || ''} onChange={t => {
                    activeAlarm.title = t;
                    this.setState({ activeAlarm });
                }} />
            </View>
            <View style={styles.field}>
                <Text style={styles.caption}>Text:</Text>
                <TextInput style={styles.textInput} value={activeAlarm.text || ''} onChange={t => {
                    activeAlarm.text = t;
                    this.setState({ activeAlarm });
                }} />
            </View>
            <View style={styles.field}>
                <Text style={styles.caption}>Alarm sounds </Text>
                
            </View>
            <Text style={styles.text}>{`Zman Name: ${zmanType.eng}`}</Text>
            <Text style={styles.text}>{`Alarm Offset: ${activeAlarm.alarmOffset}`}</Text>
            <Text style={styles.text}>{`Days: ${activeAlarm.days}`}</Text>
        </View>;
    }
}

const styles = StyleSheet.create({
    field: {
        flexDirection: 'row', alignContent: 'space-between', alignItems: 'center'
    },
    caption: { color: '#aff', fontWeight: 'bold', marginRight: 10 },
    text: { color: '#afb' },
    textInput: { color: '#fff', fontWeight: 'bold', fontSize: 18, borderStyle: 'solid', borderWidth: 1, borderColor: '#fff', borderRadius: 5 },
});
