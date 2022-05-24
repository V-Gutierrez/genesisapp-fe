import CTA from 'components/CTA';

export default function NotFound() {
  return (
    <CTA
      title="Ops"
      subtitle="Parece que você tentou acessar uma página que não existe"
      buttonHref="/"
      buttonText="Ir para a Home"
      arrowText="Clique aqui para voltar"
    />
  );
}
