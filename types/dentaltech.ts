export type DentalTech = {
   
  id: string;
  deadline: Date;
  detail: string;
  level: string;
  status: string;
  teeth: number;
  patient: {
    name: string;
    phone: string;
  };
  creator: {
    name: string;
  }
  dentalTechCategory: {
    name: string;
  };

}