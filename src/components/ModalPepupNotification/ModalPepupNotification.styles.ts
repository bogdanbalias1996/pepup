import { StyleSheet } from "react-native";
import {
    colorBlack,
    colorLightGray,
    semiboldFont,
    colorItalic,
    italicFont,
    boldFont
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
    },
    title: {
        fontSize: 18,
        fontFamily: boldFont,
        color: colorBlack,
        lineHeight: 20
    },
    subTitle: {
        fontSize: 14,
        fontFamily: semiboldFont,
        color: colorBlack,
        marginBottom: 5
    },
    modal: {
        marginTop: 20,
        zIndex: 100,
        flex: 1,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32
    },
    modalFooter: {
        flexDirection: 'row',
        marginTop: 15,
        marginBottom: 30,
        marginHorizontal: 24,
        backgroundColor: 'transparent',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
    },
    btnCancel: {
        width: 48,
        height: 48,
        borderRadius: 30,
        backgroundColor: colorLightGray,
        justifyContent: "center",
        alignItems: "center",
    },
    btnSubmit: {
        flex: 1
    },
    btnReject: {
        marginHorizontal: 10
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
    scrollContent: {
        paddingBottom: 90, position: 'relative'
    },
    wrap: {
        flex: 1,
        paddingHorizontal: 24
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
