
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useThemeMode } from "@/hooks/useThemeMode";
import { motion } from "framer-motion";

export function ThemeModeToggle() {
  const { theme, toggleTheme } = useThemeMode();

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleTheme}
      className="relative"
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        key={theme}
      >
        {theme === "light" ? (
          <Sun className="h-5 w-5 text-amber-500" />
        ) : (
          <Moon className="h-5 w-5 text-blue-400" />
        )}
      </motion.div>
    </Button>
  );
}
