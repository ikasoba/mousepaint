import { defineConfig } from "@twind/core";
import autoPrefix from "@twind/preset-autoprefix";
import presetTailwind from "@twind/preset-tailwind";
import presetExt from "@twind/preset-ext";

export default defineConfig({
  presets: [autoPrefix(), presetTailwind(), presetExt()],
});
