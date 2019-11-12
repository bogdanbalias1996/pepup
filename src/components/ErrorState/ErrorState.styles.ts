import { StyleSheet } from "react-native";

import { colorBlack, defaultFont, colorCancelButton, boldFont } from "../../variables";

export default StyleSheet.create({
    wrapModalContent: {
        backgroundColor: 'white',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        flexGrow: 1,
        alignItems: 'center',
        paddingHorizontal: 24,
        justifyContent: 'space-evenly'
    },
    title: {
        fontSize: 22,
        fontFamily: boldFont,
        color: colorBlack,
        textAlign: 'center',
        marginBottom: 15
    },
    modal: {
        zIndex: 100,
        flex: 1,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
    },
    btnSubmit: {
        width: 155,
        alignSelf: 'center',
    },
    btnCancel: {
        width: 48,
        height: 48,
        borderRadius: 30,
        backgroundColor: colorCancelButton,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 16
    },
    text: {
        fontSize: 16,
        fontFamily: defaultFont,
        color: colorBlack,
        opacity: 0.7,
        textAlign: 'center'
    },
    imageContainer: {
        height: 250,
        width: 300,
        marginTop: 50,
    },
    image: {
        flex: 1,
        width: undefined,
        height: undefined
    },
    modalFooter: {
        flexDirection: "row",
        marginTop: 15,
        marginBottom: 50,
        backgroundColor: "transparent",
        alignItems: 'flex-end'
    },
});
