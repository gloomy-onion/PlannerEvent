import React from 'react';

import { Button, DayTemplate, Description, DropdownDatePickers, EventTag, Information, TextField } from './ui-kit';

export const App = () => {
  return (
    <>
      <Description label={'Описание'}/>
      <div style={{ width: '520px' }}>
        <Information isError />
      </div>
      <DayTemplate date={21}>
        <EventTag eventType={'accede'} eventLabel={'accede'} />
        <EventTag eventType={'past'} eventLabel={'past'} />
      </DayTemplate>
      <DayTemplate date={21} weekend>
        <EventTag eventType={'accede'} eventLabel={'accede'} />
        <EventTag eventType={'past'} eventLabel={'past'} />
      </DayTemplate>
      <DropdownDatePickers />

      <Button label={'Войти'} buttonType={'filledBlack'} />
      <Button label={'Войти'} buttonType={'outlineRed'} />
      <Button label={'Войти'} buttonType={'outlineRed'} disabled />
      <div style={{ width: '346px' }}>
        <TextField textFieldType={'password'} label={'имя'} placeholder={'Enter name'} />

        <EventTag eventType={'future'} eventLabel={'future'} />
        <EventTag eventType={'created'} eventLabel={'created'} />
      </div>
    </>
  );
};
