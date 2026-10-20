"""Optional maintenance: pip install fonttools, then run this script after editing export text/data.

Downloads SIL OFL Noto Sans SC and subsets it to the site's source text plus Latin/IPA.
Generated font binaries are committed; deployment does not run Python or download fonts.
"""
from pathlib import Path
from urllib.request import urlretrieve
from fontTools import subset
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parent.parent
DEST = ROOT / 'public' / 'fonts'
SOURCE = ROOT / 'tmp' / 'fonts'
SOURCE.mkdir(parents=True, exist_ok=True)
DEST.mkdir(parents=True, exist_ok=True)

corpus = ''.join(path.read_text(encoding='utf-8') for path in (ROOT / 'src').rglob('*.ts*'))
unicodes = set(map(ord, corpus)) | set(range(0x20, 0x300)) | set(range(0x2000, 0x2070)) | set(range(0x3000, 0x3040)) | set(range(0xFF00, 0xFFF0))
for weight in ('Regular', 'Bold'):
    source = SOURCE / f'NotoSansSC-{weight}.otf'
    if not source.exists():
        urlretrieve(f'https://raw.githubusercontent.com/notofonts/noto-cjk/main/Sans/SubsetOTF/SC/{source.name}', source)
    font = TTFont(source)
    options = subset.Options()
    options.name_IDs = ['*']
    options.name_legacy = True
    options.name_languages = ['*']
    subsetter = subset.Subsetter(options=options)
    subsetter.populate(unicodes=unicodes)
    subsetter.subset(font)
    # Rename this modified font while preserving copyright and license records.
    for record in font['name'].names:
        if record.nameID in (1, 2, 3, 4, 6, 16, 17):
            value = {1: 'Wuqing Export', 2: weight, 3: f'WuqingExport-{weight}',
                     4: f'Wuqing Export {weight}', 6: f'WuqingExport-{weight}',
                     16: 'Wuqing Export', 17: weight}[record.nameID]
            record.string = value.encode(record.getEncoding())
    cff = font['CFF '].cff
    cff.fontNames = [f'WuqingExport-{weight}']
    cff.topDictIndex[0].FamilyName = 'Wuqing Export'
    cff.topDictIndex[0].FullName = f'Wuqing Export {weight}'
    output = DEST / f'WuqingExport-{weight}.otf'
    font.save(output)
    print(f'{output.name}: {output.stat().st_size:,} bytes')

urlretrieve('https://raw.githubusercontent.com/notofonts/noto-cjk/main/Sans/LICENSE', DEST / 'OFL.txt')
