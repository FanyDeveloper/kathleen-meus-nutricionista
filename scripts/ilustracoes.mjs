// Recorta as ilustrações de alimentos, remove o fundo e tinge nas cores da paleta
import sharp from 'sharp'

const veg = 'images/WhatsApp Image 2026-11-19 at 01.44.44 (1).jpeg'
const bowl = 'images/WhatsApp Image 2026-11-19 at 01.44.44.jpeg'
const recortes = [
  { src: bowl, nome: 'salada', box: { left: 120, top: 180, width: 480, height: 400 } },
  { src: veg, nome: 'alface', box: { left: 45, top: 160, width: 390, height: 400 } },
  { src: veg, nome: 'berinjela', box: { left: 340, top: 45, width: 360, height: 305 }, cobrir: [{ left: 0, top: 0, width: 35, height: 45 }, { left: 0, top: 130, width: 80, height: 175 }] },
  { src: veg, nome: 'rabanete', box: { left: 320, top: 415, width: 330, height: 495 }, cobrir: [{ left: 0, top: 0, width: 70, height: 60 }, { left: 0, top: 300, width: 70, height: 120 }, { left: 260, top: 0, width: 70, height: 45 }, { left: 55, top: 0, width: 70, height: 28 }] },
  // a área do letreiro "Veggies" e da assinatura é coberta antes do recorte
  { src: veg, nome: 'aspargos', box: { left: 25, top: 615, width: 380, height: 460 }, cobrir: [{ left: 265, top: 290, width: 115, height: 170 }, { left: 300, top: 0, width: 80, height: 75 }] },
]
const cores = { oliva: [62, 74, 49], creme: [246, 241, 233] }

for (const r of recortes) {
  let base = await sharp(r.src).extract(r.box).png().toBuffer()
  for (const c of r.cobrir ?? []) {
    const tampa = await sharp({ create: { width: c.width, height: c.height, channels: 3, background: '#ffffff' } }).png().toBuffer()
    base = await sharp(base).composite([{ input: tampa, left: c.left, top: c.top }]).png().toBuffer()
  }
  const { data, info } = await sharp(base)
    .grayscale()
    .negate()
    .linear(2.2, -90)
    .toColourspace('b-w')
    .raw()
    .toBuffer({ resolveWithObject: true })
  const { width, height } = info
  for (const [cor, [R, G, B]] of Object.entries(cores)) {
    await sharp({ create: { width, height, channels: 3, background: { r: R, g: G, b: B } } })
      .joinChannel(data, { raw: { width, height, channels: 1 } })
      .webp({ quality: 85, alphaQuality: 90 })
      .toFile(`public/img/ilustra-${r.nome}-${cor}.webp`)
  }
  console.log(r.nome, width, height)
}
