import React, { createContext, ReactNode, useContext, useState } from 'react';
import { CreateEvent, EmailAuth, ErrorPopup, EventDescription, PasswordAuth, Registration, Success } from '../modules';

export type Stage = 'email' | 'password' | 'register' | 'createEvent' | 'error' | 'eventDescription' | 'success' | null;

const EmailStage = (props: any) => {
  return <EmailAuth {...props} />;
};

const PasswordStage = (props: any) => {
  return <PasswordAuth {...props} />;
};

const RegisterStage = (props: any) => {
  return <Registration {...props} />;
};

const CreateEventStage = (props: any) => {
  return <CreateEvent {...props} />;
};

const ErrorStage = (props: any) => {
  return <ErrorPopup {...props} />;
};

const EventDescriptionStage = (props: any) => {
  return <EventDescription {...props} />;
};

const SuccessStage = (props: any) => {
  return <Success {...props} />;
};

const STAGE: Record<Exclude<Stage, null>, (props: any) => React.JSX.Element> = {
  email: EmailStage,
  password: PasswordStage,
  register: RegisterStage,
  createEvent: CreateEventStage,
  error: ErrorStage,
  eventDescription: EventDescriptionStage,
  success: SuccessStage,
};

type StageProviderProps = {
  children: ReactNode;
};

type StageContextType = {
  stage: Stage;
  setStage: (stage: Stage) => void;
  stageIsActive: boolean;
  closeStage: () => void;
};

export const StageContext = createContext<StageContextType | undefined>(undefined);

export const StageProvider = ({ children }: StageProviderProps) => {
  const [stage, setStage] = useState<Stage>(null);

  const closeStage = () => setStage(null);

  return (
    <StageContext.Provider value={{ stage, setStage, stageIsActive: Boolean(stage), closeStage }}>
      {children} {stage && STAGE[stage]({ closeStage })}
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
