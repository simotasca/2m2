export default interface WizTabHandle {
  validate: () => boolean;
  focus?: () => void;
}
