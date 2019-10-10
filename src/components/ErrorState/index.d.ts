export type ErrorStateProps = {
    closeError: () => void,
    isErrorShown: boolean,
    title: string,
    text: string,
    onPress: () => void,
    buttonText: string,
    imgSource: any
}