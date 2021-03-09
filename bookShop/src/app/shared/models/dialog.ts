export default interface IDialogOptions {
  title?: string;
  message: string;
  acceptButtonText?: string;
  declineButtonText?: string;
  acceptAction?: () => void;
  declineAction?: () => void;
}
