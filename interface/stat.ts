import { Period } from "@/lib/utils/stat/stat";
import { Recheck, RecheckList, Schedule } from "@/types/appointment";
import { DentalTech } from "@/types/dentaltech";
import { Expenses } from "@/types/expenses";
import { Patients } from "@/types/patient";
import { Transaction } from "@/types/transaction";

export interface DashboardStatProps {
  patients: Patients[];
  dentalTechs: DentalTech[];
  period: Period;
  schedules: Schedule[];
  rechecks: Recheck[];
  recheckLists: RecheckList[];
}

export interface FinancialStatProps {
  transactions: Transaction[];
  expenses: Expenses[];
  period: Period;
}