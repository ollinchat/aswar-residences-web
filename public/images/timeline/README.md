# Timeline building renders

Drop **transparent PNG** files here (isolated tower, no background):

| File | Stage |
|------|--------|
| `building-phase1.png` | Land acquisition |
| `building-phase2.png` | Groundbreaking |
| `building-phase3.png` | Foundation (current) |
| `building-phase4.png` | Superstructure |
| `building-final.png` | Handover |

Then update `imageSrc` in `lib/project-timeline.ts` from `.svg` to `.png`.

Placeholder SVG silhouettes ship until studio assets are ready.

## ROI / pricing data

Edit `lib/project-timeline.ts`:

- `ENTRY_AED` / `HANDOVER_AED` — aligned with 1BR launch pricing in `lib/residence-models.ts`
- `financialsAt(estimatedValue)` per stage — change the AED amount for each phase

Fields shown on site: entry price, estimated market value, avg. AED/sq.ft (1BR reference area), growth % from entry.
