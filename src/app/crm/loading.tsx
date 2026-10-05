import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="w-full h-[60vh] flex flex-col items-center justify-center animate-in fade-in duration-500">
      <Loader2 className="w-10 h-10 text-accent animate-spin mb-4 opacity-80" />
      <div className="text-text-muted text-sm font-medium animate-pulse">Loading data...</div>
    </div>
  );
}
