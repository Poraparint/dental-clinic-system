"use client";

import { useParams } from "next/navigation";
import { useRechecks } from "@/hooks/internal/company/use-recheck";
import { Loading } from "@/components/loading";
import { RecheckCardUi } from "@/components/props/wrapper/recheck-card-ui";
import { FormNotFound } from "@/components/form-not-found";
import { StepTimeLineItem } from "@/components/props/component/step-time-line";

export const RecheckCard = () => {
  const params = useParams();
  const companyId = params.companyId as string;
  const { rechecks, error, isLoading } = useRechecks(companyId);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <FormNotFound message={error?.error} description={error?.description} />
    );
  }

  return (
    <div>
      {rechecks.map((recheck) => {
        const sortedList = [...recheck.recheckList].sort(
          (a, b) =>
            new Date(a.datetime).getTime() - new Date(b.datetime).getTime()
        );

        const completionPercentage = (() => {
          if (!sortedList || sortedList.length === 0) return 0;

          const now = new Date();
          const completed = sortedList.filter(
            (item) => new Date(item.datetime) < now
          ).length;
          return (completed / sortedList.length) * 100;
        })();
        return (
          <div key={recheck.id}>
            <RecheckCardUi
              createdAt={recheck.createdAt}
              creator={recheck.creator.name}
              price={recheck.transaction.price}
              transaction={recheck.transaction.transactionCategory.name}
              footer={
                <div className="w-full mt-2 mb-1">
                  <div className="relative flex justify-between items-center">
                    <div className="absolute h-0.5 bg-slate-200 top-3 left-0 right-0 z-0"></div>
                    <div
                      className="absolute h-0.5 bg-emerald-600 top-3 left-0 z-0"
                      style={{ width: `${completionPercentage}%` }}
                    />

                    {/* Milestone items */}
                    {sortedList.map((item, index) => (
                      <StepTimeLineItem
                        key={item.id || index}
                        index={index}
                        total={sortedList.length}
                        step={item}
                      />
                    ))}
                  </div>
                </div>
              }
            />
          </div>
        );
      })}
    </div>
  );
};
