// Converte as fotos de /images para WebP em /public/img e gera src/data/imagens.ts
// Se a foto original não existir mais, reaproveita o WebP já gerado.
import sharp from 'sharp'
import { existsSync, writeFileSync } from 'node:fs'

const mapa = {
  'Retrato Profissional com Elegância Moderna.png': 'kathleen-hero',
  'Seminário_ 10 Passos para a Prosperidade.png': 'kathleen-seminario',
  'Foto principal da proprietaria.PNG': 'kathleen-retrato',
  'nutricionista na mesa do escritorio.PNG': 'kathleen-mesa',
  'proprietaria palestrando.PNG': 'kathleen-palestra',
  'Consultorio.PNG': 'consultorio',
  'Capturar23.PNG': 'porta-consultorio',
  'espaço interno Carpe Vita.PNG': 'espaco-interno',
  'faixada.PNG': 'fachada',
  'foto com aparelhos.PNG': 'avaliacao-corporal',
  'Cardapios para as dietas.PNG': 'cardapios',
  'algumas sacolas para clientes.PNG': 'sacolas',
  'Refeição saudavel.PNG': 'refeicao',
}

// recortes manuais: foca no assunto da foto (ex.: equipamentos na parte de baixo)
const foco = { 'avaliacao-corporal': { left: 60, top: 470, width: 613, height: 383 } }

const out = {}
for (const [orig, slug] of Object.entries(mapa)) {
  const destino = `public/img/${slug}.webp`
  let info
  if (existsSync(`images/${orig}`)) {
    let img = sharp(`images/${orig}`).rotate()
    if (foco[slug]) img = sharp(await img.extract(foco[slug]).toBuffer())
    info = await img.resize({ width: 1400, withoutEnlargement: true }).webp({ quality: 80 }).toFile(destino)
  } else if (existsSync(destino)) {
    info = await sharp(destino).metadata()
  } else continue
  out[slug] = { src: `/img/${slug}.webp`, width: info.width, height: info.height }
}

const hero = 'images/Retrato Profissional com Elegância Moderna.png'
if (existsSync(hero)) {
  await sharp(hero).resize(1200, 630, { fit: 'cover', position: 'top' }).jpeg({ quality: 80 }).toFile('public/og-image.jpg')
}

writeFileSync(
  'src/data/imagens.ts',
  `// Gerado por scripts/otimizar-imagens.mjs — não edite à mão\nexport const imagens = ${JSON.stringify(out, null, 2)} as const\nexport type ImagemKey = keyof typeof imagens\n`,
)
console.log(Object.keys(out).join(', '))
