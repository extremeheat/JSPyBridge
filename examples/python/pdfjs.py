# SPDX-FileCopyrightText: 2023 mara004 aka geisserml <geisserml@gmail.com>
# SPDX-License-Identifier: CC-BY-4.0 OR Apache-2.0

# See also https://gist.github.com/mara004/87276da4f8be31c80c38036c6ab667d7

# Py-Depends: Pillow, JsPyBridge itself
# Js-Depends: pdfjs-dist, canvas
# Use `python -m pip install` and `python -m javascript --install`

import argparse
from pathlib import Path
import PIL.Image
import javascript

# NOTE canvas must be the build pdfjs is linked against, otherwise it'll fail with type error
pdfjs = javascript.require("pdfjs-dist")
libcanvas = javascript.require("canvas")


def render_pdf(input, outdir, scale):
    
    pdf = pdfjs.getDocument(input).promise
    n_pages = pdf.numPages
    n_digits = len(str(n_pages))
    
    for i in range(1, n_pages+1):
        
        page = pdf.getPage(i)
        viewport = page.getViewport({"scale": scale})
        w, h = int(viewport.width), int(viewport.height)
        
        canvas = libcanvas.createCanvas(w, h)
        context = canvas.getContext("2d")
        page.render({"canvasContext": context, "viewport": viewport}).promise
        
        # note that blobValueOf() is much faster than valueOf()["data"] for large byte buffers
        js_buffer = canvas.toBuffer("raw")
        py_buffer = js_buffer.blobValueOf()
        
        pil_image = PIL.Image.frombuffer("RGBX", (w, h), py_buffer, "raw", "BGRX", 0, 1)
        pil_image.save(outdir / f"out_{i:0{n_digits}d}.jpg")
    
    pdf.destroy()


def main():
    
    parser = argparse.ArgumentParser(
        description="Render a PDF file with Mozilla pdf.js via JsPyBridge.\n" +
        "Known issues: - URL support is buggy; - certain PDFs may hit memory limits.",
    )
    path_type = lambda p: Path(p).expanduser().resolve()
    input_type = lambda p: p if p.startswith("http") else str(path_type(p))
    parser.add_argument(
        "input", type=input_type,
        help="Input file path or URL.",
    )
    parser.add_argument("--outdir", "-o", type=path_type)
    parser.add_argument("--scale", type=float, default=4)
    
    args = parser.parse_args()
    if not args.outdir.exists():
        args.outdir.mkdir(parents=True, exist_ok=True)
    
    render_pdf(args.input, args.outdir, scale=args.scale)


main()
