import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
   base: "/demo4/",
  plugins: [tailwindcss(), react()],
});
// export default defineConfig({
//   base: "/twel/",
//   plugins: [react()],
// });
