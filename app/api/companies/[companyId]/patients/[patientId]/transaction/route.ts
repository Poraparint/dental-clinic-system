import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";
import { validateManagerAndDentist } from "@/lib/utils/validation/member";
import { CreateTransactionSchema } from "@/schemas";
import { getPatientByCompanyId } from "@/data/internal/patient";
import { getDisplayDate } from "@/lib/utils";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string; patientId: string }> }
) {
  const { companyId, patientId } = await params;

  const accessToGet = await validateManagerAndDentist(companyId);

  if (accessToGet instanceof Response) {
    return accessToGet;
  }

  if (!patientId) {
    return NextResponse.json(
      {
        error: "ไม่พบ id คนไข้",
        description: "URL ไม่ถูกต้อง",
      },
      { status: 400 }
    );
  }
  try {
    if (!companyId || !patientId) {
      return NextResponse.json(
        {
          error: "ไม่ข้อมูลบริษัทหรือคนไข้",
          description: "โปรดติดต่อผู้ดูแลระบบ",
        },
        { status: 400 }
      );
    }

    const transactions = await db.transaction.findMany({
      where: {
        patientId,
        isDelete: false,
      },
      select: {
        id: true,
        datetime: true,
        transactionCategory: true,
        detail: true,
        price: true,
        paid: true,
        creator: {
          select: {
            name: true,
          },
        },
        updater: {
          select: {
            name: true,
          },
        },
        transactionAddons: {
          select: {
            id: true,
            quantity: true,
            price: true,
            addonItem: {
              select: {
                name: true,
              },
            },
          },
        },
        recheck: true,
        dentaltech: true,
      },
      orderBy: { createdAt: "desc" },
    });

    if (transactions.length < 1) {
      return NextResponse.json({
        error: "ไม่พบข้อมูลธุรกรรม",
        description: "เริ่มต้นด้วยการสร้างรายการธุรกรรม",
      });
    }

    return NextResponse.json(transactions);
  } catch (error) {
    console.error("[TRANSACTION_PATIENT_GET]", error);
    return NextResponse.json(
      {
        error: "ไม่สามารถดึงข้อมูลธุรกรรมได้",
        description: "โปรดติดต่อผู้ดูแลระบบ",
      },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string; patientId: string }> }
) {
  const values = await request.json();

  const { companyId, patientId } = await params;

  const accessToPost = await validateManagerAndDentist(companyId);

  if (accessToPost instanceof Response) {
    return accessToPost;
  }

  const { member } = accessToPost;

  const existingCompany = await getPatientByCompanyId(companyId, patientId);
  if (!existingCompany) {
    return NextResponse.json(
      { error: "คนไข้ไม่ได้มีชื่ออยู่ในบริษัทนี้" },
      { status: 400 }
    );
  }

  const validation = CreateTransactionSchema.safeParse(values);

  if (!validation.success) {
    return NextResponse.json(
      {
        error: "ข้อมูลไม่ถูกต้อง",
        description: "โปรดตรวจสอบข้อมูลที่กรอก",
      },
      { status: 400 }
    );
  }

  const { datetime, transactionCategoryId, detail, price, paid, addonItems } =
    validation.data;

  try {
    const transaction = await db.transaction.create({
      data: {
        datetime: getDisplayDate(datetime),
        transactionCategoryId,
        detail,
        price,
        paid,
        patientId,
        creatorUserId: member.id,
      },
    });

    const addonItemsData = addonItems.map((item) => ({
      transactionId: transaction.id,
      quantity: item.quantity,
      price: item.price,
      addonItemId: item.addonItemId,
    }));

    await db.$transaction([
      ...addonItemsData.map((data) => db.transactionAddon.create({ data })),
    ]);

    return NextResponse.json(
      {
        success: "เพิ่มรายการใหม่สำเร็จ",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[TRANSACTION_PATIENT_POST]", error);
    return NextResponse.json(
      {
        error: "เกิดข้อผิดพลาดขณะสร้างรายการ",
        description: "โปรดติดต่อผู้ดูแลระบบ",
      },
      { status: 500 }
    );
  }
}
