import ErrorUI from "@/components/props/component/error-ui";

export default function NotFound() {
  return (
    <div className="min-h-screen">
      <ErrorUI type="notFound" />
    </div>
  );
}
