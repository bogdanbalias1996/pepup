export type AlertProps = {
    closeAlert: () => void,
    isAlertShown: boolean,
    title: string,
    text: string,
    onPress: () => void
}
