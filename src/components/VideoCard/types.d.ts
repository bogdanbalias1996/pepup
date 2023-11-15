export type VideoCardProps = {
  videoUrl: string;
  width: number;
  height: number;
  openVideoModal: (videoUrl: string) => void;
  withoutShadow?: boolean;
  borderWidth?: number
}