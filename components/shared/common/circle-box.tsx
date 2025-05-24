import { CircleHelp } from "lucide-react";

interface CircleBoxProps {
  avatar?: string;
  icon?: React.ReactNode;
  className?: string;
}

export const CircleBox = ({
  avatar,
  icon,
  className = "rounded-full border-primary-foreground shadow-sm",
}: CircleBoxProps) => {
  return (
    <div className={`p-2 border ${className}`}>
      {avatar ? (
        <span>{avatar}</span>
      ) : (
        <span className="[&>svg]:size-4">{icon || <CircleHelp />}</span>
      )}
    </div>
  );
};
