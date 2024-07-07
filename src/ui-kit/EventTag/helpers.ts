export const getLabelColor = (eventType: string) => {
  if (eventType === 'past') {
    return 'gray';
  } if (eventType === 'future' || eventType === 'accede') {
    return 'black';
  } 
    return 'white';
  
};
