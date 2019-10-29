import {
    NavigationScreenProp,
    NavigationScreenOptions
} from "react-navigation";
import { Profile } from "../Profile";
import { AlertProps } from "../../components/SuccessfulAlert";


export type EditProfileScreenStateProps = {
    navigationOptions?: NavigationScreenOptions;
    profileData?: Profile | null;
    isFetching?: boolean;
    userId: string;
}

export type EditProfileScreenFromData = EditProfileScreenStateProps & EditProfileScreenFromFormik;

export type EditProfileScreenDispatchProps = {
    editProfile: (data: EditProfileScreenFromData, setErrors: any) => Promise<any>;
    openAlert: (data: AlertProps) => Promise<any>;
    videoRecordModalOpen: () => void;
};

export type profileInfo = {
    country?: string;
    city?: string;
    phoneNumber?: string;
}

export type EditProfileScreenFromFormik = {
    name: string;
    email: string;
    newPasswd: string;
    dob?: string;
    profileInfo?: profileInfo;
}


export type EditProfileScreenProps = EditProfileScreenStateProps &
    EditProfileScreenDispatchProps;
