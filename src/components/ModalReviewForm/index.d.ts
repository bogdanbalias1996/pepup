import { Celeb } from "../../pages/Pepups";

export type ModalPostReviewProps = {
    isFetching?: boolean,
    celebData: Celeb,
    closePostReviewModal: () => void;
    isModalPostReviewShown: boolean;
    postReview: (formData: PostReviewFormProps, setErrors: any) => Promise<any>
}

export type PostReviewFormProps = {
    review: string,
    rating: number
}