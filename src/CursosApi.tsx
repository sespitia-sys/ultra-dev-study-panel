import { useEffect, useState } from "react";

interface CursoApi {
  id: number;
  title: string;
  body: string;
}

export default function CursosApi() {
  const [cursos, setCursos] = useState<CursoApi[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMensaje, setErrorMensaje] = useState<string | null>(null);

  useEffect(() => {
    async function cargarCursos() {
      try {
        setIsLoading(true);
        setErrorMensaje(null);

        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts?_limit=5"
        );

        if (!response.ok) {
          throw new Error("Error al obtener datos de la API");
        }

        const data: CursoApi[] = await response.json();
        setCursos(data);
      } catch (error) {
        console.error(error);
        setErrorMensaje("❌ No se pudieron cargar los cursos.");
      } finally {
        setIsLoading(false);
      }
    }

    cargarCursos();
  }, []);

  return (
    <section id="cursos-api">
      <h2>Cursos sugeridos (API)</h2>
      <p>Datos de ejemplo para practicar cómo un frontend moderno habla con un backend.</p>

      {isLoading && <p>Cargando cursos...</p>}

      {errorMensaje && <p>{errorMensaje}</p>}

      {!isLoading && !errorMensaje && (
        <div className="api-courses-grid">
          {cursos.map((curso) => (
            <article key={curso.id} className="api-course-card">
              <h3>{curso.title}</h3>
              <p>{curso.body}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}