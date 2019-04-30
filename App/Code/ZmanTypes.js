export const ZmanTypes = [
    { name: 'chatzosNight', desc: 'חצות הלילה', eng: 'Chatzos Halayla', heb: 'חצות הלילה' },
    { name: 'alos90', desc: 'עלות השחר - 90 דקות', eng: 'Alos Hashachar - 90 minutes', heb: 'עלות השחר' },
    { name: 'alos72', desc: 'עלות השחר - 72 דקות', eng: 'Alos Hashachar - 72 minutes', heb: 'עלות השחר' },
    { name: 'talisTefillin', desc: 'זמן עטיפת טלית ותפילין - 36 דקות', eng: 'Zman of Tallis and Tefillin', heb: 'טלית ותפילין' },
    { name: 'netzElevation', desc: 'הנץ החמה בגובה המיקום', eng: 'Sunrise (at location elevation)', heb: 'הנץ החמה' },
    { name: 'netzMishor', desc: 'הנץ החמה בגובה פני הים', eng: 'Sunrise', heb: 'הנץ החמה' },
    { name: 'szksMga', desc: 'סזק"ש מג"א', eng: 'Krias Shma - MG"A', heb: 'סזק"ש מג"א' },
    { name: 'szksGra', desc: 'סזק"ש הגר"א', eng: 'Krias Shma - GR"A', heb: 'סזק"ש הגר"א' },
    { name: 'sztMga', desc: 'סז"ת מג"א', eng: 'Zman Tefilla - MG"A', heb: 'סז"ת מג"א' },
    { name: 'sztGra', desc: 'סז"ת הגר"א', eng: 'Zman Tefilla - GR"A and Ba\'al Hatanya', heb: 'סז"ת הגר"א' },
    { name: 'chatzos', desc: 'חצות היום', eng: 'Chatzos Hayom', heb: 'חצות היום' },
    { name: 'minGed', desc: 'מנחה גדולה', eng: 'Mincha Gedola', heb: 'מנחה גדולה' },
    { name: 'minKet', desc: 'מנחה קטנה', eng: 'Mincha Ketana', heb: 'מנחה קטנה' },
    { name: 'plag', desc: 'פלג המנחה', eng: 'Plag HaMincha', heb: 'פלג המנחה' },
    { name: 'shkiaMishor', desc: 'שקיעת החמה מגובה פני הים', eng: 'Sunset (at sea level)', heb: 'שקיעת החמה' },
    { name: 'shkiaElevation', desc: 'שקיעת החמה מגובה המיקום', eng: 'Sunset', heb: 'שקיעת החמה' },
    { name: 'tzais45', desc: '45 דקות אחרי שקיעה', eng: 'Nightfall - 45 minutes', heb: 'צאת הכוכבים' },
    { name: 'tzais50', desc: '50 דקות אחרי שקיעה', eng: 'Nightfall - 50 minutes', heb: 'צאת הכוכבים' },
    { name: 'tzais72', desc: '72 דקות אחרי שקיעה', eng: 'Nightfall - 72 minutes', heb: 'צה"כ ר"ת - 72 דקות' },
    { name: 'tzais72Zmaniot', desc: '72 דקות זמניות אחרי שקיעה', eng: 'Nightfall - 72 minutes zmaniyot', heb: 'צה"כ ר"ת - זמניות' },
    { name: 'tzais72ZmaniotMA', desc: '72 דקות זמניות אחרי שקיעה - מג"א', eng: 'Nightfall - 72 minutes zmaniyot MG"A', heb: 'צה"כ ר"ת - זמניות מג"א' }
];

/**
 * Get the ZmanType with the given name.
 * @param {String} name
 * @returns {{name:String, desc: String, eng: String, heb: String }}
 */
export function getZmanType(name) {
    return ZmanTypes.find(zt =>
        zt.name.toLowerCase() === name.toLowerCase());
}
