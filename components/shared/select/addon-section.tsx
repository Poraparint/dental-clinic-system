"use client";

import { Plus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SelectCategory } from "@/components/shared/select/select-category";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { useState } from "react";

export interface AddonItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface AddonSectionProps {
  availableAddons: { id: string; name: string; unitPrice?: number | null }[];
  addonList: AddonItem[];
  setAddonList: (list: AddonItem[]) => void;
  isPending: boolean;
  isLoading: boolean;
}

export const AddonSection = ({
  availableAddons,
  addonList,
  setAddonList,
  isPending,
  isLoading,
}: AddonSectionProps) => {
  const [selectedAddon, setSelectedAddon] = useState("");
  const [addonQty, setAddonQty] = useState(1);

  const handleAddonAdd = () => {
    const addon = availableAddons.find((a) => a.id === selectedAddon);
    if (addon && selectedAddon && addonQty > 0) {
      const existingIndex = addonList.findIndex((item) => item.id === addon.id);
      const newList = [...addonList];

      if (existingIndex >= 0) {
        newList[existingIndex].quantity += addonQty;
      } else {
        newList.push({
          id: addon.id,
          name: addon.name,
          price: addon.unitPrice ?? 0,
          quantity: addonQty,
        });
      }

      setAddonList(newList);
      setSelectedAddon("");
      setAddonQty(1);
    }
  };

  const handleAddonRemove = (index: number) => {
    setAddonList(addonList.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2">
      <h3 className="font-medium text-sm">เพิ่มรายการเสริม</h3>

      <div className="flex gap-2">
        <SelectCategory
          value={selectedAddon}
          onValueChange={setSelectedAddon}
          disabled={isPending}
          isLoading={isLoading}
          categories={availableAddons}
        />

        <div className="w-20">
          <Input
            type="number"
            min={1}
            value={addonQty}
            onChange={(e) => setAddonQty(Number(e.target.value))}
            placeholder="จำนวน"
          />
        </div>

        <Button
          type="button"
          onClick={handleAddonAdd}
          disabled={!selectedAddon || addonQty < 1 || isPending}
        >
          <Plus />
        </Button>
      </div>

      {addonList.length > 0 && (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-xs">รายการ</TableHead>
                <TableHead className="text-xs text-center w-16">
                  จำนวน
                </TableHead>
                <TableHead className="text-xs text-right w-20">
                  ราคารวม
                </TableHead>
                <TableHead className="w-8"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {addonList.map((item, index) => (
                <TableRow
                  key={`${item.id}-${index}`}
                  className="hover:bg-muted/50"
                >
                  <TableCell className="py-2">
                    <div>
                      <div className="font-medium text-xs">{item.name}</div>
                      <div className="text-xs text-muted-foreground">
                        ฿{item.price.toFixed(2)} ต่อหน่วย
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-2 text-center text-xs">
                    <p>{item.quantity}</p>
                  </TableCell>
                  <TableCell className="py-2 text-right">
                    <p>฿ {(item.price * item.quantity).toFixed(2)}</p>
                  </TableCell>
                  <TableCell className="py-2">
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => handleAddonRemove(index)}
                    >
                      <Trash className="w-3 h-3" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};
