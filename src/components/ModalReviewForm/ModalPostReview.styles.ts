import { StyleSheet } from "react-native";
import {
    colorBlack,
    colorTextGray,
    colorLightGray,
    colorSwipeLine,
    colorTomato,
    semiboldFont,
    defaultFont
} from "../../variables";

export default StyleSheet.create({
    wrapModalContent: {
        flex: 1, paddingHorizontal: 24, position: 'relative'
    },
    title: {
        fontSize: 18,
        fontFamily: semiboldFont,
        color: colorBlack,
        lineHeight: 25
    },
    subTitle: {
        fontSize: 14,
        fontFamily: semiboldFont,
        color: colorBlack,
        marginBottom: 10
    },
    swiperLine: {
        width: 64,
        height: 4,
        backgroundColor: colorSwipeLine,
        marginVertical: 20,
        alignSelf: "center"
    },
    disclaimerText: {
        color: colorTextGray,
        lineHeight: 22,
        fontFamily: defaultFont
    },
    modal: {
        marginTop: 20,
        zIndex: 100,
        flex: 1,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32
    },
    modalFooter: {
        flexDirection: "row",
        marginTop: 15,
        marginBottom: 30,
        backgroundColor: "transparent",
        left: 0,
        right: 0,
        marginHorizontal: 24,
        position: 'absolute',
        bottom: 0
    },
    btnCancel: {
        width: 48,
        height: 48,
        borderRadius: 30,
        backgroundColor: colorLightGray,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 16
    },
    btnSubmit: {
        flex: 1
    },
    text: {
        fontSize: 14,
        fontFamily: defaultFont
    },
    reqTitle: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    form: {
        flexGrow: 1,
        justifyContent: 'space-between'
    },
    formErrorContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    formError: {
        color: colorTomato,
        textAlign: "center",
        paddingLeft: 40,
        fontSize: 14
    },
    inputWrap: {
        marginTop: 25
    },
    starsWrap: {
        marginTop: 30,
        paddingHorizontal: 40
    },
    footerWrap: {
        justifyContent: "flex-end",
        alignItems: 'flex-end',
        flexShrink: 1,
        marginTop: 15
    },
    // wrap: { flex: 1, position: 'relative' },
    checkboxWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 30
    },
    checkText: {
        marginLeft: 10
    },
    scrollContent: { paddingBottom: 90 }
});
