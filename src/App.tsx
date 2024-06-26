import React from 'react';

import { Button, EventTag, TextField } from './ui-kit';
import { DropdownDatePickers } from './ui-kit/DropownDatePickers/DropdownDatePickers';

export const App = () => {
  return (
    <>
      <DropdownDatePickers/>
      <Button label={'Войти'} buttonType={'filledBlack'} />
      <Button label={'Войти'} buttonType={'outlineRed'} />
      <Button label={'Войти'} buttonType={'outlineRed'} disabled />
      <div style={{ width: '346px' }}>
        <TextField textFieldType={'password'} label={'имя'} placeholder={'Enter name'} />
        <EventTag eventType={'accede'} eventLabel={'accede'}/>
        <EventTag eventType={'past'} eventLabel={'past'}/>
        <EventTag eventType={'future'} eventLabel={'future'}/>
        <EventTag eventType={'created'} eventLabel={'created'}/>
      </div>
    </>
  );
};
