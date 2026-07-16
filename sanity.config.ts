"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { media } from "sanity-plugin-media";
import { dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool({ structure }),
    media({
      locales: [
        { id: "sk", title: "Slovenčina", default: true },
        { id: "en", title: "English" },
      ],
      maximumUploadSize: 20_000_000,
    }),
  ],
});
