import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './lib/gsap'
import './index.css'
import Layout from './components/Layout'
import Inicio from './pages/Inicio'
import Sobre from './pages/Sobre'
import Servicos from './pages/Servicos'
import Servico from './pages/Servico'
import PerguntasFrequentes from './pages/PerguntasFrequentes'
import Contato from './pages/Contato'
import Privacidade from './pages/Privacidade'
import NaoEncontrada from './pages/NaoEncontrada'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Inicio />} />
          <Route path="sobre" element={<Sobre />} />
          <Route path="servicos" element={<Servicos />} />
          <Route path="servicos/:slug" element={<Servico />} />
          <Route path="perguntas-frequentes" element={<PerguntasFrequentes />} />
          <Route path="contato" element={<Contato />} />
          <Route path="politica-de-privacidade" element={<Privacidade />} />
          <Route path="*" element={<NaoEncontrada />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
