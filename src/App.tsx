import React from 'react';

import { eventImg } from './assets/img/eventImg';
import {
  AddPhoto,
  Button,
  DayTemplate,
  Description,
  DropdownDatePickers,
  EventTag,
  ImageCarousel,
  Information, Participant,
  TextField,
} from './ui-kit';

export const App = () => {
  return (
    <>
      <Participant name={'Игорь'} organizer photo={'https://media.istockphoto.com/id/1200677760/ru/%D1%84%D0%BE%D1%82%D0%BE/%D0%BF%D0%BE%D1%80%D1%82%D1%80%D0%B5%D1%82-%D0%BA%D1%80%D0%B0%D1%81%D0%B8%D0%B2%D0%BE%D0%B3%D0%BE-%D1%83%D0%BB%D1%8B%D0%B1%D0%B0%D1%8E%D1%89%D0%B5%D0%B3%D0%BE%D1%81%D1%8F-%D0%BC%D0%BE%D0%BB%D0%BE%D0%B4%D0%BE%D0%B3%D0%BE-%D1%87%D0%B5%D0%BB%D0%BE%D0%B2%D0%B5%D0%BA%D0%B0-%D1%81%D0%BE-%D1%81%D0%BA%D1%80%D0%B5%D1%89%D0%B5%D0%BD%D0%BD%D1%8B%D0%BC%D0%B8-%D1%80%D1%83%D0%BA%D0%B0%D0%BC%D0%B8.jpg?s=612x612&w=0&k=20&c=XAmUDQcCbmorrYBQOVADBgkzUX66S7-HSRyEzjwpxZI='}/>
      <ImageCarousel items={eventImg} />
      <AddPhoto />
      <Description label={'Описание'} />
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
