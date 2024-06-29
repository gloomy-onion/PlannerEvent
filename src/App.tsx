import React from 'react';

import { Auth, CreateEvent, EventDescription, Registration } from './modules';
import { AddPhoto, DayTemplate, Description, DropdownDatePickers, EventTag, Information } from './ui-kit';

export const App = () => {
  return (
    <>
      <CreateEvent/>
      <EventDescription
        eventLabel={'Конкурс'}
        description={
          'Это независимый музыкальный фестиваль талантливых артистов, которые уже собирают крупнейшие залы поклонников по всей России или только начинают свой творческий путь. Главное, что объединяет участников фестиваля — эмоции, которые они передают слушателям, погружая их в особенную атмосферу своего выступления.'
        }
      />
      <Registration />
      <Auth />
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
    </>
  );
};
