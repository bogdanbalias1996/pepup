import { StyleSheet } from "react-native";

import { colorLightGray, semiboldFont, colorBlack, defaultFont, colorTextAlert } from "../../variables";

export default StyleSheet.create({
    wrapContent: {
        backgroundColor: colorLightGray,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        paddingTop: 16,
        flex: 1,
        marginTop: 10,
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 22,
        fontFamily: semiboldFont,
        color: colorBlack,
        textAlign: 'center',
        marginBottom: 15
    },
    textWrap: {
        flexGrow: 1,
        flexShrink: 0,
    },
    btnSubmit: {
        width: 155,
        alignSelf: 'center'
    },
    text: {
        fontSize: 18,
        fontFamily: defaultFont,
        color: colorTextAlert,
        textAlign: 'center'
    },
    image: {

    }
});