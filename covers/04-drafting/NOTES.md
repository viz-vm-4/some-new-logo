# 04 — Drawing Office

**Every Vizuara book is issued as an engineering drawing of the machine it teaches you to build.**

## The idea
Vizuara's whole pitch is that you build the thing yourself, from an empty file. So each cover is
the sheet you would build it from: the book's core mechanism drawn with a real drafting office's
conventions (orthographic and isometric views, sections and hatching, detail views, conventional
breaks, dimension lines, balloons, a parts list). The brand lives in the **title block**, the
bordered form every engineering drawing carries. Drawing no. = book no. Level is stamped in ink.
Capsules and hours are the drawing's extent. A units note says what the drawing is measured in
(tokens, neurons, GPUs, reward). Vizuara signs in the bottom-right corner, where a drawing office
signs its work. The sheet (frame, zone marks, the drawing number repeated upside-down top-left for
flat-file filing, title block) never changes. The drawing is different every time. Not a blueprint:
it's drafting paper, graphite and a single engineering ink, closer to a patent-office sheet or a
Braun service manual than to cyan-and-white.

## Palette
| role | hex |
|---|---|
| Drafting paper (the sheet) | `#EBEAE4` |
| Graphite (outlines, all primary lettering) | `#1F2123` |
| Soft graphite (secondary lettering, ≥7:1 on paper) | `#474B4F` |
| Construction grey (lines only, never text) | `#8A8E91` |
| Engineering ink: the one quantity the book teaches you to control | `#D0381B` |

The ink has one job per cover: the context-window limit, the loss and the backward pass, det A,
the causal mask, rank 0, the summaries a harness writes, the reward. In greyscale it prints as a
clear mid-grey between graphite and paper.

## Type (Google Fonts)
- **Instrument Sans** SemiBold at width 88: titles, the book's subtitle line, the imprint.
- **Overpass Mono** 500–700: all lettering, dimensions, title-block labels. Overpass comes from
  Highway Gothic, which shares its lineage with drafting-template lettering.

## Level
Filled ink squares in the LEVEL cell of the title block, like a tolerance class stamped on a
drawing (more squares = tighter work), with the word always spelled out beside it:
■□□ Beginner · ■■□ Intermediate · ■■■ Advanced. At 180 px the squares still show as a short or long
red dash.

## Imprint
A **V-block** (the machinist's fixture that cradles round stock for inspection) drawn in section:
a hatched V holding one part (in ink) with its centre mark. It reads as a V, it's a real drafting
object, and it only appears at the foot of the title block beside the VIZUARA wordmark, so the
title is always louder.

## Emblems: how each drawing was derived
- **VB·001 AI Context Engineering**: Section A–A through one context window, drawn as a multi-core
  cable. Instructions, tools, knowledge, memory and a jacketed (isolated) sub-agent strand sit
  inside a fixed ink diameter, with small solid strands for compressed history. The book's four
  strategies (write / select / compress / isolate) are called out in ink.
- **VB·002 Mathematical Foundations for ML**: the unit circle and unit square under a symmetric
  matrix A. "Before" is in phantom line and "after" in solid: an ellipse whose eigen-axes are ink
  centre lines, dimensioned λ₁ and λ₂, with det A as the hatched parallelogram.
- **VB·003 Neural Networks from Scratch**: a 4-6-6-3 MLP drawn as a hole pattern (centre-marked
  holes, "6× ReLU" callouts). Detail A enlarges one neuron (Σ, weights, bias, ReLU). The
  cross-entropy loss sends the backward pass home in ink.
- **VB·004 Build LLMs from Scratch**: GPT-2 (124M) general arrangement: embedding, blocks with
  residual bypasses, LM head, with a conventional break for the 12 identical blocks. Section B–B,
  cut through masked attention, is the causal mask.
- **VB·005 5D Parallelism**: an isometric 4×4×4 lattice of GPUs, dimensioned data × tensor ×
  pipeline, with rank 0 in ink. Auxiliary views C (context ring) and E (expert routing, top-2 in
  ink) supply the other two axes.
- **VB·006 Pi vs Hermes vs Codex**: one overflowing session drawn three times as a turned shaft
  against an ink context-limit datum. Pi cuts at a turn, Hermes gets a conventional S-break through
  the middle, and Codex couples to the next model. Every summary is in ink.
- **VB·046–049 Charlie and the Intelligence Factory** (sub-series): the drawing type switches to
  architecture, with an enlarged plan of one room per book, column grid bubbles, poché walls, door
  swings, an equipment schedule, and a **key plan** that walks the ink room I→IV across the four
  covers.
  - Language: scheduler, prefill, a decode loop, paged KV-cache racks.
  - Vision: an image cut into patches, flattened onto a conveyor behind [CLS], fed to the encoder.
  - Sound: mic → VAD → ASR → LLM → TTS → speaker, a barge-in path, the latency budget in ink.
  - Reasoning: bandit arms on the wall, an agent/environment loop track, reward returning in ink.
- **VB·014 Build Decision Trees from Scratch** (beginner): feature space cut by greedy
  axis-aligned splits with thresholds dimensioned, beside the tree that makes them. The root split
  is in ink.
- **VB·051 Kernel Engineering** (coming soon): tiled C = A·B with one output tile, the strips it
  reads and the current k-step in ink, plus the memory hierarchy (HBM/SRAM/registers) in section.
  It is stamped **PRELIMINARY — NOT FOR CONSTRUCTION** and its extent is left blank until it's built.

The drawing number is the book's position in the catalogue (books.json order).

## Deliverables
- `index.html`: the presentation page (direction, rationale, palette/type/level/line conventions,
  a drawing register table, all 12 covers at full size, and a print wrap of VB·003 as `.wrap`: the
  back is a parts list of chapters numbered bottom-up the way a bill of materials grows from the
  title block, the spine carries number/title/level/mark, and the front is the cover).
- `renders/`: PNG @2×, JPG @1×, vector PDFs at exact 7.5 × 9.25 in trim.
- Everything is HTML + inline SVG drawn in code. There are no raster images. The line floor is
  0.9 px at trim, and dimension labels sit on paper knock-outs, not stroke halos (those don't
  survive Chrome's PDF output).

## What I'd do next
1. Turn the drawing helpers (dimension, leader, balloon, section, break, isometric box) into a
   small documented kit, so a new book's cover is one ~60-line drawing function. Then draw the
   remaining ~37 titles.
2. Give each book a "sheet 2": the back cover as its parts list (as in the wrap), generated from
   the book's real chapter data.
3. Spine system for the shelf: drawing numbers and level squares aligned across spines, so a row
   of books reads like a flat file.
4. Print proof on uncoated stock and tune the paper tint and ink for press. Then consider a
   two-colour (graphite + one PMS) print spec, which this system is already built for.
