export const getLabelColor = (buttonType: string, disabled: boolean) =>
  disabled ? 'gray' : buttonType === 'filledBlack' || buttonType === 'outlineBlack' ? 'white' : 'red';
