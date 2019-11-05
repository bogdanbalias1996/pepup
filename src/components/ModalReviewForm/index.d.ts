import { UserRequest } from "../../pages/Profile";

export type ModalPostReviewProps = {
    isFetching?: boolean,
    pepupData: UserRequest | null,
    closePostReviewModal: () => void;
    isModalPostReviewShown: boolean;
    postReview: (formData: PostReviewFormProps, setErrors: any) => Promise<any>
}

export type PostReviewFormProps = {
    review: string,
    rating: number
}