import Location from './JCal/Location';
import AsyncStorage from '@react-native-community/async-storage';
import { log, error } from './GeneralUtils';

export default class Settings {
    /**
     *
     * @param {[{title:String, text:String, zmanName:String, alarmOffset:int, days:[]}]} [activeAlarms] List of active alarms
     * @param {Location} [location]
     */
    constructor(activeAlarms, location) {
        /**
         * @property {[ZmanTypes]} activeAlarms List of active alarms
         */
        this.activeAlarms = activeAlarms || [];
        /**
         * @property {Location} location
         */
        this.location = location || Location.getJerusalem();
    }
    clone() {
        return new Settings(
            this.activeAlarms,
            this.location);
    }
    /**
     * Saves the current settings to AsyncStorage.
     */
    async save() {
        log('started save Settings');
        try {
            await AsyncStorage.multiSet([
                ['ACTIVE_ALARMS', JSON.stringify(this.activeAlarms)],
                ['LOCATION', JSON.stringify(this.location)]
            ],
                errors => errors && error('Error during AsyncStorage.multiSet for settings', errors));
            log('Saved settings', this);
        }
        catch (e) {
            error(e);
        }
    }
    /**
     * Gets saved settings from the local storage
     */
    static async getSettings() {
        log('started getSettings');
        const settings = new Settings();
        try {
            const allKeys = await AsyncStorage.getAllKeys();
            log('all storage keys', allKeys);
            if (allKeys.includes('ACTIVE_ALARMS')) {
                const zts = await AsyncStorage.getItem('ACTIVE_ALARMS');
                settings.activeAlarms = JSON.parse(zts);
                log('activeAlarms from storage data', zts);
            }
            if (allKeys.includes('LOCATION')) {
                const location = await AsyncStorage.getItem('LOCATION');
                settings.location = JSON.parse(location);
                log('location from storage data', location);
            }
            if (!allKeys || !allKeys.length) {
                //initial set
                settings.save();
            }
        } catch (e) {
            error(e);
        }
        return settings;
    }

    static getEmptyAlarm() {
        return {
            title: 'New reminder',
            text: 'Fill in the text of reminder',
            zmanName: 'shkiaElevation',
            alarmOffset: -45,
            days: [0, 1, 2, 3, 4, 5, 6]
        };
    }
}