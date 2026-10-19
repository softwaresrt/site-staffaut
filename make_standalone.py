from pathlib import Path
import base64,json
root=Path(__file__).parent
h=(root/'preview.html').read_text()
css=(root/'app/globals.css').read_text().replace("@import 'tailwindcss';",'')
h=h.replace('<link rel="stylesheet" href="app/globals.css">','<style>'+css+'</style>')
images={}
for name in ['metryx','artyx','krypton','codanik','cinex']:
    data='data:image/webp;base64,'+base64.b64encode((root/'public/agents'/f'{name}.webp').read_bytes()).decode()
    h=h.replace('src="public/agents/'+name+'.webp"','src="'+data+'"')
    images[name]=data
h=h.replace('const agents=', 'const agentImages='+json.dumps(images)+';\nconst agents=')
before = '''src="public/agents/'+a[5]+'.webp"'''
after = '''src="'+agentImages[a[5]]+'"'''
h=h.replace(before,after)
h=h.replace('href="app/privacidade/page.tsx"','href="#contato"')
Path('/mnt/data/StaffAut_PREVIA_INTERATIVA.html').write_text(h)
print('Standalone bytes',len(h),'dynamic image patch',before not in h)
