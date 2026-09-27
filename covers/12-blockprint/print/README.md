# Print cover: AI Context Engineering (Chhaap)

`ai-context-engineering.html` is the full cover as one piece: back, spine and front, with bleed on a softcover or the turn-in on a hardcover. It is laid out to Pothi.com's rules for a 7.5 × 9.25 in trim. The page count sets the spine width, so the file is regenerated once the interior is final.

## Make the upload file

```sh
node tools/print_cover.js covers/12-blockprint/print/ai-context-engineering.html \
  --out out/ace-soft-412 --query "binding=soft&pages=412"
python3 tools/to_cmyk.py out/ace-soft-412
```

Upload `out/ace-soft-412-cmyk.pdf`. It is one flattened CMYK image at exact size, 300 dpi, converted with ISO Coated v2 300%. `to_cmyk.py` also writes these files:

- `-softproof.jpg`: roughly how it will print.
- `-guides.jpg`: fold, trim and safe lines. On a hardcover it also marks the hinge.
- `-cmyk.tif`: the same image as a TIFF.

It prints a preflight covering size, ink limit and colour shift.

## Query parameters

| param | default | |
|---|---|---|
| `binding` | `soft` | `soft` or `hard` |
| `pages` | `400` | interior page count; sets the spine width |
| `isbn` | `none` | `none` leaves the back empty there (a copy without an ISBN). `box` leaves a white 2 × 1.2 in box for the printer's barcode. An ISBN such as `978-93-xxxxx-xx-x` draws the EAN-13 barcode, with its check digit verified. |
| `extw`, `exth` | `0.276`, `0.394` | how much larger the hardcover board is than the trim. These values come from Pothi's 5 × 7 example; confirm them for 7.5 × 9.25. |
| `bleed` | `0.2` | softcover bleed |
| `guides` | off | `1` draws proofing guides. Never use it for the upload file. |

## Pothi's sizes

- **Softcover:** width = 0.2 + 7.5 + spine + 7.5 + 0.2 in; height = 9.65 in; spine = 0.001968 × pages.
- **Hardcover:** width = 0.787 + board + spine + board + 0.787 in; height = 0.787 + board height + 0.787; spine = 0.157 + 0.001968 × pages.

The spine formula assumes Pothi's standard paper. Confirm the spine width with Pothi once the paper (for example coated colour stock) and final page count are chosen, then regenerate.

`proofs/` holds soft proofs and guide views at 400 pages, for review only.
