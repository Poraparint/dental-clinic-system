"use client";

import { Card } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { useCompany } from "@/context/context";
import { useMembers } from "@/hooks";

export const MemberView = () => {

    const { companyId } = useCompany();
    const { members, error, isLoading } = useMembers(companyId);

    return (
        <TabsContent value="member-view">
            <Card>
                <div className="text-lg font-medium mb-4">ข้อมูลพนักงาน</div>
                <div className="overflow-x-auto">
                    <table className="w-full table-auto border-collapse border border-slate-200">
                        <thead>
                            <tr>
                                <th className="border border-slate-300 px-4 py-2 text-left">ชื่อพนักงาน</th>
                                <th className="border border-slate-300 px-4 py-2 text-left">เบอร์ติดต่อ</th>
                                <th className="border border-slate-300 px-4 py-2 text-left">อีเมล</th>
                                <th className="border border-slate-300 px-4 py-2 text-left">บทบาท</th>
                                <th className="border border-slate-300 px-4 py-2 text-left">วันที่เข้าร่วม</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan={5} className="text-center p-4">
                                        กำลังโหลด...
                                    </td>
                                </tr>
                            ) : error ? (
                                <tr>
                                    <td colSpan={5} className="text-center p-4 text-red-500">
                                        เกิดข้อผิดพลาดในการโหลดข้อมูล
                                    </td>
                                </tr>
                            ) : members.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="text-center p-4">
                                        ไม่มีข้อมูลพนักงาน
                                    </td>
                                </tr>
                            ) : (
                                members.map((member) => (
                                    <tr key={member.id} className="hover:bg-gray-100">
                                        <td className="border border-slate-300 px-4 py-2">{member.user.name}</td>
                                        <td className="border border-slate-300 px-4 py-2">{member.user.phone}</td>
                                        <td className="border border-slate-300 px-4 py-2">{member.user.email}</td>
                                        <td className="border border-slate-300 px-4 py-2">{member.role}</td>
                                        <td className="border border-slate-300 px-4 py-2">{new Date(member.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </TabsContent>
    );
}