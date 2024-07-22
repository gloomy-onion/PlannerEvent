import React, { createContext, ReactNode, useContext, useState } from 'react';

import { CalendarEvent } from './EventContext';
import {
  CreateEvent,
  EmailAuth,
  ErrorPopup,
  EventDescription,
  PasswordAuth,
  Registration,
  SuccessCreate,
  SuccessJoin,
} from '../modules';

export enum Stages {
  EMAIL = 'email',
  PASSWORD = 'password',
  REGISTER = 'register',
  CREATE_EVENT = 'createEvent',
  ERROR = 'error',
  EVENT_DESCRIPTION = 'eventDescription',
  SUCCESS_CREATE = 'successCreate',
  SUCCESS_JOIN = 'successJoin',
  NULL = 'null',
}

type StageProviderProps = {
  children: ReactNode;
};

type StageContextType = {
  stage: Stages;
  setStage: (stages: Stages, props?: { event: CalendarEvent | null }) => void;
  stageIsActive: boolean;
  closeStage: () => void;
};

export const StageContext = createContext<StageContextType | undefined>(undefined);

const ContentManager = ({ stage }: { stage: Stages }, props: any) => {
  switch (stage) {
    case Stages.EMAIL:
      return <EmailAuth />;
    case Stages.PASSWORD:
      return <PasswordAuth />;
    case Stages.REGISTER:
      return <Registration />;
    case Stages.CREATE_EVENT:
      return <CreateEvent />;
    case Stages.ERROR:
      return <ErrorPopup />;
    case Stages.EVENT_DESCRIPTION:
      return <EventDescription {...props} />;
    case Stages.SUCCESS_CREATE:
      return <SuccessCreate {...props}/>;
    case Stages.SUCCESS_JOIN:
      return <SuccessJoin {...props}/>;
    case Stages.NULL:
      return null;
    default:
      return null;
  }
};

export const StageProvider = ({ children }: StageProviderProps) => {
  const [stage, setStage] = useState<Stages>(Stages.NULL);

  const closeStage = () => setStage(Stages.NULL);

  return (
    <StageContext.Provider value={{ stage, setStage, stageIsActive: Boolean(stage), closeStage }}>
      {children} {stage && <ContentManager stage={stage} />}
    </StageContext.Provider>
  );
};

export const useStage = (): StageContextType => {
  const context = useContext(StageContext);
  if (!context) {
    throw new Error('useStage must be used within a StageProvider');
  }

  return context;
};
