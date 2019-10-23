import { Celeb } from "../../pages/Pepups";

export type PepupNotificationProps = {
    closeNotifyModal: () => void, 
    isModalNotifyShown: boolean, 
    isFetching: boolean, 
    celebData: Celeb
}