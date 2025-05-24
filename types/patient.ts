export type Patient = {
  id: string;
  name: string;
  age?: string | null;
  phone?: string | null;
  address?: string | null;
  work?: string | null;
  worktel?: string | null;
  cd?: string | null;
  drug?: string | null;
  
};

export type Patients = {
  id: string;
  name: string;
  phone: string;
  createdAt: Date;
  creator: {
    name: string;
  };
};
