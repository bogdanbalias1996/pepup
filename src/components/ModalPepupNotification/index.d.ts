import { UserRequest } from "../../pages/Profile";

export type PepupNotificationProps = {
    closeNotifyModal: () => void, 
    getPepupNotification?: (id: string) => Promise<any>,
    isModalNotifyShown: boolean, 
    isFetching: boolean, 
    pepupData: UserRequest | null,
    acceptPepupRequest: (id: string) => Promise<any>,
    denyPepupRequest: (id: string) => Promise<any>
}