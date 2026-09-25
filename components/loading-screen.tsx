import { LoaderCircle } from "lucide-react";

type LoadingScreenProps = {
  message?: string;
  overlay?: boolean;
};

export default function LoadingScreen({
  message = "Loading...",
  overlay = false,
}: LoadingScreenProps) {
  return (
    <div
      className={
        overlay
          ? "fixed inset-0 z-[100] flex min-h-screen items-center justify-center bg-white/95 p-6"
          : "flex min-h-[calc(100vh-4rem)] items-center justify-center bg-white p-6"
      }
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col items-center gap-4 text-center">
        <LoaderCircle className="h-10 w-10 animate-spin text-primary" aria-hidden="true" />
        <p className="text-sm font-medium text-gray-600">{message}</p>
      </div>
    </div>
  );
}
