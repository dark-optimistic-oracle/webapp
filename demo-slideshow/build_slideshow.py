"""Compose untouched public screenshots with auditable step captions.

Usage: python build_slideshow.py PATH_TO_DEMO_FOLDER
Requires reportlab. A slides.json manifest is the single source of captions.
"""
import html
import json
import sys
from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader
from reportlab.lib.colors import HexColor
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle

folder = Path(sys.argv[1]).resolve()
manifest = json.loads((folder / 'slides.json').read_text())
width, height = 1280, 900
pdf = canvas.Canvas(str(folder / 'DEMO_SLIDESHOW.pdf'), pagesize=(width, height))
pdf.setTitle(manifest['title'])
style = ParagraphStyle('caption', fontName='Helvetica', fontSize=15, leading=20,
                       textColor=HexColor('#dcebe7'))
sections = []
for number, slide in enumerate(manifest['slides'], 1):
    pdf.setFillColor(HexColor('#081916'))
    pdf.rect(0, 0, width, height, fill=1, stroke=0)
    pdf.setFillColor(HexColor('#75e0bc'))
    pdf.setFont('Helvetica-Bold', 22)
    pdf.drawString(32, height - 40, f"Slide {number} | {slide['step']} | {manifest['title']}")
    image = ImageReader(str(folder / slide['file']))
    iw, ih = image.getSize()
    scale = min((width - 64) / iw, (height - 200) / ih)
    dw, dh = iw * scale, ih * scale
    pdf.drawImage(image, (width - dw) / 2, 155 + (height - 215 - dh) / 2,
                  dw, dh, preserveAspectRatio=True)
    caption = Paragraph(html.escape(slide['caption']), style)
    _, ph = caption.wrap(width - 64, 110)
    if ph > 110:
        raise ValueError('Caption is too long for slide ' + str(number))
    caption.drawOn(pdf, 32, 130 - ph)
    pdf.setFont('Helvetica', 10)
    pdf.setFillColor(HexColor('#aabcb6'))
    pdf.drawString(32, 22, 'Testnet | ' + manifest['run'] +
                   ' | Step references: DEMO_SCREENPLAY.md and CALLING_SEQUENCE.md')
    pdf.showPage()
    sections.append(f'<section><h2>Slide {number} - {html.escape(slide["step"])}</h2>'
                    f'<img src="{html.escape(slide["file"], quote=True)}" alt="Public demo screenshot">'
                    f'<p>{html.escape(slide["caption"])}</p></section>')
pdf.save()
(folder / 'index.html').write_text('<!doctype html><html lang="en"><meta charset="utf-8">'
    '<meta name="viewport" content="width=device-width,initial-scale=1">'
    '<title>' + html.escape(manifest['title']) + '</title>'
    '<style>body{background:#081916;color:#dcebe7;font:18px system-ui;margin:0}'
    'section{min-height:100vh;box-sizing:border-box;padding:2rem;scroll-snap-align:start}'
    'html{scroll-snap-type:y proximity}img{max-width:100%;max-height:75vh;object-fit:contain}'
    'h2{color:#75e0bc}</style><h1>' + html.escape(manifest['title']) + '</h1>' +
    ''.join(sections) + '</html>')
print('Created', len(manifest['slides']), 'slides in', folder)
