"use client";

import { Textarea } from "@/components/ui/textarea";
import { formatDate } from "@/lib/utils";
import { ProfileCard } from "@/components/props/component/card/profile-card";
import {
  Calendar,
  Clock,
  FileText,
  LayoutGrid,
  Phone,
  Stethoscope,
  Syringe,
  User,
} from "lucide-react";
import { CardCategory } from "@/components/shared/card";
import { DialogWrapper } from "@/components/shared/dialog";
import { onSoftDeleteProps } from "@/interface/props";
import { handleSoftDelete } from "@/lib/common/soft-delete";
import { RoleGate } from "../../wrapper/role-gate";
import { CompanyRole } from "@prisma/client";
import { ConfirmDeleteDialog } from "@/components/shared/dialog/confirm-dialog";

interface CalendarEventProp<T = unknown> extends onSoftDeleteProps<T> {
  avatar?: string;
  badge?: React.ReactNode;
  badgeTooltip?: string;
  name: string;
  phone?: string | null;
  levelIcon?: React.ReactNode;
  level?: string;
  statusIcon?: React.ReactNode;
  status?: string;
  schedule?: string;
  categoryName: string;
  detail?: string | null;
  teeth?: number;
  datetime: Date;
  creator?: string;
  dentist?: string | null;
  extraLabel?: string;
}

export const CalendarEventCard = <T,>({
  avatar,
  badge,
  badgeTooltip,
  name,
  phone,
  levelIcon,
  level,
  statusIcon,
  status,
  schedule,
  categoryName,
  detail,
  teeth,
  datetime,
  creator,
  dentist,
  extraLabel,
  item,
  onSoftDelete,
  onDeleteResult,
}: CalendarEventProp<T>) => {
  return (
    <DialogWrapper
      trigger={
        <div>
          <ProfileCard
            avatar={avatar}
            icon={levelIcon}
            title={name}
            badge={badge}
            badgeTooltip={badgeTooltip}
            description={`${categoryName} ${teeth ? ` • ${teeth} ซี่` : ""}`}
            className="pt-5 hover:bg-primary-foreground cursor-pointer rounded-t-md"
          />
        </div>
      }
    >
      <CardCategory
        icon={levelIcon || <User />}
        title={name}
        description="ข้อมูลรายละเอียด"
      >
        <div>
          <div className="grid grid-cols-2">
            <ProfileCard
              icon={<Phone className="text-emerald-600" />}
              description={phone || "-"}
              className="border-none"
              tooltip="เบอร์โทรศัพท์"
            />
            <ProfileCard
              icon={<Stethoscope className="text-purple-600" />}
              description={dentist || "-"}
              className="border-none"
              tooltip="ทันตแพทย์"
            />
          </div>
          <hr className="mb-4 border-primary-foreground" />
          <div className="grid grid-cols-2">
            <ProfileCard
              icon={<LayoutGrid className="text-amber-600" />}
              description={categoryName}
              className="border-none"
            />
            {teeth && (
              <ProfileCard
                icon={<Syringe className="text-blue-600" />}
                description={`${teeth} ซี่`}
                className="border-none"
              />
            )}
            {schedule && (
              <ProfileCard
                icon={<Clock className="text-blue-600" />}
                description={schedule}
                className="border-none"
              />
            )}
            {level && status && (
              <>
                <ProfileCard
                  icon={levelIcon}
                  description={level}
                  className="border-none"
                />
                <ProfileCard
                  icon={statusIcon}
                  description={status}
                  className="border-none"
                />
              </>
            )}
            <ProfileCard
              icon={<Calendar />}
              description={formatDate(datetime)}
              className="border-none"
            />
            {creator && (
              <ProfileCard
                icon={<User className="text-muted-forground" />}
                description={creator}
                className="border-none"
                tooltip="ผู้ลงข้อมูล"
              />
            )}
          </div>
          <hr className="mb-4 border-primary-foreground" />
          {/* Additional Notes */}
          {detail && (
            <div className="p-4">
              <div className="flex items-center space-x-2 mb-3">
                <FileText className="size-4 text-muted-foreground" />
                <h3 className="font-medium text-sm">รายละเอียดเพิ่มเติม</h3>
              </div>
              <Textarea
                readOnly
                value={detail}
                className="bg-background border-none focus-visible:ring-0"
              />
            </div>
          )}
          {extraLabel && (
            <span className="text-xs bg-foreground/10 text-foreground px-2 py-0.5 rounded-full">
              {extraLabel}
            </span>
          )}
          <RoleGate
            allowedRole={[
              CompanyRole.MANAGER,
              CompanyRole.COMANAGER,
              CompanyRole.DENTIST,
            ]}
          >
            {onSoftDelete && (
              <ConfirmDeleteDialog
                onConfirm={() =>
                  handleSoftDelete({
                    item,
                    onSoftDelete,
                    onDeleteResult,
                  })
                }
              />
            )}
          </RoleGate>
        </div>
      </CardCategory>
    </DialogWrapper>
  );
};
