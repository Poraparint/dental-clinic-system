import { getRecheckByCompanyId } from "@/data/internal/recheck-dentaltech";
import { getPatientByTransactionId } from "@/data/internal/transaction";
import { db } from "@/lib/db";
import { formatDateOnly } from "@/lib/utils";
import {
  validateAllExceptTechnician,
  validateManagerAndDentist,
} from "@/lib/utils/validation/member";
import { CreateRecheckSchema } from "@/schemas";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string }> }
) {
  const { companyId } = await params;

  const accessToGet = await validateAllExceptTechnician(companyId);

  if (accessToGet instanceof Response) {
    return accessToGet;
  }

  try {
    const rechecks = await db.recheck.findMany({
      where: { companyId },
      select: {
        id: true,
        patientId: true,
        createdAt: true,
        recheckList: {
          select: {
            id: true,
            datetime: true,
            detail: true,
            price: true,
            isConfirmed: true,
            transactionCategory: {
              select: {
                id: true,
                name: true,
              },
            },
            scheduleCategory: {
              select: {
                name: true,
                order: true,
              },
            },
          },
        },

        patient: {
          select: {
            name: true,
            phone: true,
          },
        },
        transaction: {
          select: {
            transactionCategory: {
              select: {
                name: true,
              },
            },
            detail: true,
            price: true,
            paid: true,
          },
        },
        creator: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    if (rechecks.length < 1) {
      return NextResponse.json({
        error: "ไม่พบข้อมูลรายการ",
        description: "เริ่มต้นด้วยการสร้างรายการรีเช็ค / แบ่งจ่าย",
      });
    }
    return NextResponse.json(rechecks);
  } catch (error) {
    console.error("[RECHECK_GET]", error);
    return NextResponse.json(
      {
        error: "ไม่สามารถดึงข้อมูลรายการรีเช็คได้",
        description: "โปรดติดต่อผู้ดูแลระบบ",
      },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string }> }
) {
  const values = await request.json();

  const { companyId } = await params;

  const accessToPost = await validateManagerAndDentist(companyId);

  if (accessToPost instanceof Response) {
    return accessToPost;
  }

  const { member } = accessToPost;

  const validation = CreateRecheckSchema.safeParse(values);

  if (!validation.success) {
    return NextResponse.json(
      {
        error: "ข้อมูลไม่ถูกต้อง",
        description: "โปรดตรวจสอบข้อมูลที่กรอก",
      },
      { status: 400 }
    );
  }

  const { transactionId, recheckList } = validation.data;

  const existingRecheck = await getRecheckByCompanyId(companyId, transactionId);

  if (existingRecheck) {
    return NextResponse.json(
      { error: "รหัสธุรกรรมนี้ถูกใช้ไปแล้ว" },
      { status: 409 }
    );
  }

  const patientId = await getPatientByTransactionId(transactionId);

  if (!patientId) {
    return NextResponse.json(
      {
        error: "รหัสธุรกรรมไม่ถูกต้องหรือไม่มีรหัสธุรกรรมนี้",
      },
      { status: 409 }
    );
  }

  try {
    const recheck = await db.recheck.create({
      data: {
        id: transactionId,
        companyId,
        patientId: patientId.patientId,
        creatorUserId: member.id,
      },
    });

    const recheckListData = recheckList.map((item) => ({
      recheckId: recheck.id,
      datetime: formatDateOnly(item.datetime),
      detail: item.detail,
      price: item.price,
      transactionCategoryId: item.tcId,
      scheduleId: item.scheduleId,
    }));

    await db.$transaction([
      ...recheckListData.map((data) => db.recheckList.create({ data })),
    ]);

    return NextResponse.json(
      {
        success: "เพิ่มรายการใหม่สำเร็จ",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[RECHECK_POST]", error);
    return NextResponse.json(
      {
        error: "เกิดข้อผิดพลาดขณะสร้างรายการ",
        description: "โปรดติดต่อผู้ดูแลระบบ",
      },
      { status: 500 }
    );
  }
}
