import {
    NavigationScreenProp,
    NavigationScreenOptions
} from "react-navigation";
import { Profile } from "../Profile";
import { AlertProps } from "../../components/SuccessfulAlert";
import { Celeb } from "../Pepups";
import { VideoType } from '../../components/ModalRecordVideo'

export type EditProfileScreenStateProps = {
    navigationOptions?: NavigationScreenOptions;
    profileData?: Profile | null;
    celebData?: Celeb | null;
    isFetching?: boolean;
    userId: string;
}

export type EditProfileScreenFromData = EditProfileScreenStateProps & EditProfileScreenFromFormik;

export type EditProfileScreenDispatchProps = {
    editProfile: (data: EditProfileScreenFromData, setErrors: any) => Promise<any>;
    openAlert: (data: AlertProps) => Promise<any>;
    videoRecordModalOpen: (entityId: string, videoType: VideoType) => void;
    getCeleb: (id: string) => Promise<any>;
};

export type EditProfileScreenFromFormik = {
    name: string;
    email: string;
    newPasswd: string;
    dob?: string;
    city?: string,
    address?: string,
    country?: string,
    phoneNumber?: string,
    intro?: string,
    bio?: string,
    introVideo?: string
}


export type EditProfileScreenProps = EditProfileScreenStateProps &
    EditProfileScreenDispatchProps;
