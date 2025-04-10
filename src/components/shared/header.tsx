import { Settings, Smartphone } from "lucide-react";
import { Button } from "../ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b bg-background">
      <div className="max-w-7xl flex h-16 items-center mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Smartphone className="h-6 w-6 text-rose-500" />
          <span className="text-xl font-bold">CelularesApp</span>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="sm" className="cursor-pointer">
            <Settings className="h-4 w-4" />
            Configuración
          </Button>
        </div>
      </div>
    </header>
  );
}
