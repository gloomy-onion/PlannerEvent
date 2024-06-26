export const getLabelColor = (eventType: string) => {
  if (eventType === 'past') {
    return 'gray';
  } else if (eventType === 'future' || eventType === 'accede') {
    return 'black';
  } else {
    return 'white';
  }
};
