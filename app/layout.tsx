import type { Metadata, Viewport } from 'next';
import { Manrope, Space_Grotesk } from 'next/font/google';
import './globals.css';

const manrope = Manrope({ subsets:['latin'],variable:'--font-manrope',display:'swap' });
const space = Space_Grotesk({ subsets:['latin'],variable:'--font-space',display:'swap' });
export const metadata: Metadata = {
  title:'StaffAut — Funcionários digitais que fazem acontecer',
  description:'Conheça a StaffAut: funcionários digitais para vendas, atendimento, marketing, design, financeiro, desenvolvimento e vídeo. Explore como trabalham.',
  openGraph:{title:'StaffAut — A nova força de trabalho',description:'Menos operação parada. Mais trabalho acontecendo.',type:'website'},
  robots:{index:true,follow:true}
};
export const viewport: Viewport = {width:'device-width',initialScale:1,themeColor:'#ffffff'};
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="pt-BR"><body className={`${manrope.variable} ${space.variable}`}>{children}</body></html>; }
