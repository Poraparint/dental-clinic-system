export type Schedule = {
  id: string;
  datetime: Date;
  patientName: string;
  phone?: string;
  detail?: string;
  transactionCategory: {
    name?: string;
  };
  scheduleCategory: {
    name?: string;
  };
  dentist: {
    name?: string;
  };
  creator: {
    name?: string;
  };
};