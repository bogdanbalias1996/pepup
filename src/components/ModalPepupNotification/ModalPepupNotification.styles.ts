import { StyleSheet } from "react-native";
import {
    colorBlack,
    colorTextGray,
    colorLightGray,
    colorSwipeLine,
    colorTomato,
    semiboldFont,
    defaultFont,
    colorItalic,
    italicFont
} from "../../variables";

export default StyleSheet.create({
    wrapModalContent: {
        backgroundColor: "white",
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        flexGrow: 1,
        paddingHorizontal: 24
    },
    avatar: {
        width: 76,
        height: 76,
        borderRadius: 15,
        marginRight: 10,
        marginBottom: 10
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
        marginBottom: 5
    },
    swiperLine: {
        width: 64,
        height: 4,
        backgroundColor: colorSwipeLine,
        marginVertical: 20,
        alignSelf: "center"
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
        marginBottom: 50,
        backgroundColor: "transparent",
        alignItems: 'flex-end'
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
    reqTitle: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    footerWrap: {
        justifyContent: "flex-end",
        alignItems: 'flex-end',
        flexShrink: 1,
        marginTop: 15
    },
    wrap: {
        flex: 1,
        marginBottom: 10
    },
    textBlock: {
        marginVertical: 10
    },
    reqData: {
        color: colorItalic,
        fontFamily: italicFont,
        fontSize: 18
    }
});
