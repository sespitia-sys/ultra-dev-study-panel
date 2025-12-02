export interface TarjetaObjetivoProps {
  titulo: string;
  descripcion: string;
}

export default function TarjetaObjetivo({
  titulo,
  descripcion,
}: TarjetaObjetivoProps) {
  return (
    <article className="card">
      <h3>{titulo}</h3>
      <p>{descripcion}</p>
    </article>
  );
}