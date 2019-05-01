import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Picker
} from 'react-native';
import { getZmanType, ZmanTypes } from '../Code/ZmanTypes';
import { range } from '../Code/GeneralUtils';

export default class SingleAlarm extends Component {
    constructor(props) {
        super(props);
        this.state = { activeAlarm: props.activeAlarm };
    }

    render() {
        const { activeAlarm, style } = this.state;
        return <View style={style}>            
            <View style={styles.field}>
                <Text style={styles.caption}>Title:</Text>
                <TextInput
                    style={styles.textInput}
                    value={activeAlarm.title}
                    onChangeText={t => {
                        activeAlarm.title = t || '';
                        this.setState({ activeAlarm });
                    }} />
            </View>
            <View style={styles.field}>
                <Text style={styles.caption}>Text:</Text>
                <TextInput
                    style={styles.textInput}
                    value={activeAlarm.text}
                    onChangeText={t => {
                        activeAlarm.text = t || '';
                        this.setState({ activeAlarm });
                    }} />
            </View>
            <View style={{ marginTop: 10, marginBottom: 10 }}>
                <Text style={styles.caption}>Alarm time:</Text>
                <View style={{ margin: 10 }}>
                    <View style={styles.field}>
                        <Text style={styles.captionInner}>At </Text>
                        <Picker style={[styles.picker, styles.textInput]}
                            itemStyle={styles.textInput}
                            caption='Number of minutes'
                            selectedValue={Math.abs(activeAlarm.alarmOffset)}
                            onValueChange={v => {
                                activeAlarm.alarmOffset = Math.sign(activeAlarm.alarmOffset) * v;
                                this.setState({ activeAlarm });
                            }}>
                            {range(0, 500).map(i =>
                                <Picker.Item key={i} value={i} label={i.toString()} />)}
                        </Picker>
                        <Text style={styles.captionInner}> minutes </Text>
                    </View>
                    <View style={styles.field}>
                        <Picker style={[styles.picker, styles.textInput]}
                            itemStyle={styles.textInput}
                            caption='Before or after the zman'
                            selectedValue={activeAlarm.alarmOffset > 0 ? 1 : -1}
                            onValueChange={v => {
                                activeAlarm.alarmOffset = Math.abs(activeAlarm.alarmOffset) * v;
                                this.setState({ activeAlarm });
                            }}>
                            <Picker.Item key={1} value={-1} label='before' />
                            <Picker.Item key={2} value={1} label='after' />
                        </Picker>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.captionInner}> the zman of </Text>
                        <Picker style={[styles.picker, styles.textInput]}
                            itemStyle={styles.textInput}
                            caption='Select a Zman'
                            selectedValue={activeAlarm.zmanName}
                            onValueChange={zt => {
                                activeAlarm.zmanName = zt;
                                this.setState({ activeAlarm });
                            }}>
                            {ZmanTypes.map((item, index) =>
                                <Picker.Item key={index} value={item.name} label={item.eng} />)}
                        </Picker>
                    </View>
                </View>
            </View>
            <View style={styles.field}>
                <Text style={styles.caption}>On the following days: </Text>
                <Text style={styles.text}>{activeAlarm.days}</Text>
            </View>
        </View>;
    }
}

const styles = StyleSheet.create({
    field: {
        flexDirection: 'row', alignContent: 'space-between', alignItems: 'center'
    },
    caption: { color: '#aff', fontWeight: 'bold', marginRight: 10 },
    captionInner: { color: '#dbd' },
    text: { color: '#afb' },
    textInput: { flex: 1, color: '#fff', fontWeight: 'bold', fontSize: 18, borderStyle: 'solid', borderWidth: 1, borderColor: '#fff', borderRadius: 5, marginBottom: 2, marginTop: 2 },
    picker: { height: 25, backgroundColor: '#333' },
});
