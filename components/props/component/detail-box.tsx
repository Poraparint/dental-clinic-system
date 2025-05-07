interface DetailBoxProps {
  header: string;
  icon: React.ReactNode;
  title: string;
}

export const DetailBox = ({ header, icon, title }: DetailBoxProps) => {
  return (
    <div className="space-y-2">
      <p className="text-muted-foreground text-sm">{header}</p>
      <div className="flex items-center gap-2">
        {icon}
        <span>{title}</span>
      </div>
    </div>
  );
};
