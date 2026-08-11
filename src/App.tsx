import ThemeToggle from "./components/ThemeToggle";

export default function App() {
  return (
    <div>
      Vite + React Dark Mode
      The theme automatically syncs with system settings and saves your manual preference.      
      <ThemeToggle />
    </div>
  );
}