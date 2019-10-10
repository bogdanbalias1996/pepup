export type AlertProps = {
    closeAlert: () => void,
    isAlertShown: boolean,
    alertData?: AlertData
}

export type AlertData = {
    title: string,
    text: string,
    onPress?: () => void
}