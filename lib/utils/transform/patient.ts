import { Patient, PatientFormData } from "@/types/patient";

export function toPatientFormData(patient: Patient): PatientFormData{
    return {
      id: patient.id,
      name: patient.name ?? "",
      age: patient.age ?? "",
      phone: patient.phone ?? "",
      address: patient.address ?? "",
      job: patient.job ?? "",
      work: patient.work ?? "",
      worktel: patient.worktel ?? "",
      cd: patient.cd ?? "",
      drug: patient.drug ?? "",
    };
}