export type Schedule = {
  id: string;
  datetime: Date;
  patientName: string;
  phone?: string;
  detail?: string;
  transactionCategory: {
    name: string;
  };
  scheduleCategory: {
    name: string;
    order: number;
  };
  dentist: {
    name?: string;
  };
  creator: {
    name?: string;
  };
};

export type Recheck = {
  id: string;
  patientId: string;
  createdAt: Date;
  recheckList: {
    id: string;
    datetime: Date;
    detail: string;
    price: number;
    isConfirmed: boolean;
    transactionCategory: {
      name: string;
    };
    scheduleCategory: {
      name: string;
      order: number;
    };
  }[];
  patient: {
    name: string;
    phone: string;
  };
  transaction: {
    transactionCategory: {
      name: string;
    };
    detail?: string;
    price: number;
    paid: number;
  };
  creator: {
    name: string;
  };
};

export type RecheckList = {
  datetime: Date;
  detail: string;
  price: number;
  isConfirmed: boolean;
  transactionCategory: {
    name: string;
  };
  scheduleCategory: {
    name: string;
    order: number;
  };
};

// Type รวมที่มีคุณสมบัติจากทั้ง Schedule และ Recheck
export type DentalAppointment = {
  // ข้อมูลหลัก
  id: string;
  datetime: Date;

  // ข้อมูลคนไข้
  patientId?: string;
  patientName: string;
  phone?: string;

  // รายละเอียดการนัด
  detail?: string;

  // ข้อมูลประเภท
  transactionCategory: {
    name: string;
  };
  scheduleCategory: {
    name: string;
    order: number;
  };

  // ข้อมูลทันตแพทย์
  dentist?: {
    name?: string;
  };
  isConfirmed?: boolean;

  // ข้อมูลเพิ่มเติมจาก Recheck
  isRecheck: boolean;
  recheckList?: RecheckList[];

  // ข้อมูลธุรกรรม
  transaction?: {
    detail?: string;
    price?: number;
    paid?: number;
    transactionCategory?: {
      name: string;
    };
  };

  // ข้อมูลผู้สร้าง
  creator: {
    name?: string;
  };
  createdAt?: Date;
};
