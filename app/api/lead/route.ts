import { NextRequest, NextResponse } from 'next/server';
export const runtime = 'nodejs';

// Formulário funcional apenas quando as variáveis de ambiente estiverem configuradas.
// Resend faz entrega real; nenhum dado é salvo em banco de dados local/efêmero.
export async function POST(req: NextRequest) {
  const type=req.headers.get('content-type') || '';
  if (!type.includes('application/json')) return NextResponse.json({error:'Envie dados JSON.'},{status:415});
  let body:Record<string,unknown>;
  try { body = await req.json(); } catch { return NextResponse.json({error:'Dados inválidos.'},{status:400}); }
  if (body.website) return NextResponse.json({ok:true}); // honeypot
  const name=String(body.name || '').trim().slice(0,100);
  const email=String(body.email || '').trim().slice(0,180);
  const agent=String(body.agent || '').trim().slice(0,70);
  const message=String(body.message || '').trim().slice(0,1200);
  if(name.length<2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !agent || !body.consent){
    return NextResponse.json({error:'Preencha os dados e autorize o contato.'},{status:400});
  }
  const key=process.env.RESEND_API_KEY;
  const to=process.env.LEADS_TO_EMAIL;
  const from=process.env.LEADS_FROM_EMAIL;
  if(!key || !to || !from) return NextResponse.json({error:'O recebimento de contatos ainda não foi ativado. Configure RESEND_API_KEY, LEADS_TO_EMAIL e LEADS_FROM_EMAIL.'},{status:503});
  const payload={from,to:[to],reply_to:email,subject:`[StaffAut] Interesse em ${agent}`,text:`Novo contato StaffAut\nNome: ${name}\nEmail: ${email}\nInteresse: ${agent}\nNecessidade: ${message || 'Não informada'}\nConsentimento de contato: Sim`};
  try {
    const res=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${key}`,'Content-Type':'application/json'},body:JSON.stringify(payload),cache:'no-store'});
    if(!res.ok){console.error('Lead email delivery failed',res.status);return NextResponse.json({error:'Não foi possível enviar agora. Tente novamente.'},{status:502});}
    return NextResponse.json({ok:true});
  }catch{return NextResponse.json({error:'Serviço temporariamente indisponível.'},{status:502});}
}
