import { StyleSheet } from "react-native";
import { semiboldFont, colorBlack, defaultFont, colorTextAlert } from "../../variables";

export default StyleSheet.create({
    wrapModalContent: {
        backgroundColor: "white",
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        height: 350,
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 60,
        justifyContent: 'space-between',
        marginHorizontal: 10
    },
    title: {
        fontSize: 22,
        fontFamily: semiboldFont,
        color: colorBlack,
        textAlign: 'center',
        marginBottom: 15
    },
    textWrap:{
        flexGrow: 1,
        flexShrink: 0,
    },
    modal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.76)'
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
})