import { StyleSheet } from "react-native";
import {
    colorBlack,
    semiboldFont,
    colorCancelButton,
    defaultFont,
    colorModalTextGrey,
    colorTextGrey
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
        width: 80,
        height: 100,
        borderRadius: 6,
    },
    title: {
        fontSize: 16,
        fontFamily: semiboldFont,
        color: colorBlack,
        lineHeight: 24
    },
    featured: {
        color: colorTextGrey
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
        backgroundColor: colorCancelButton,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 17,
        top: 23,
        zIndex: 999
    },
    btnSubmit: {
        flex: 1
    },
    btnReject: {
        marginHorizontal: 10
    },
    reqTitle: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row'
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
        marginVertical: 5
    },
    textWrap: {
        marginLeft: 15
    },
    reqData: {
        color: colorModalTextGrey,
        fontFamily: defaultFont,
        fontSize: 14
    },
    image: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6
    },
});
