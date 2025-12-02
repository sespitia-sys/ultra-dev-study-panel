import { type FormEvent, useState } from "react";
import "./App.css";
import TarjetaObjetivo from "./TarjetaObjetivo";
import CursosApi from "./CursosApi";

function App() {
  const estudiante = "Santiago"; // cámbialo por tu nombre si quieres

  const [horasEstudio, setHorasEstudio] = useState(0);
  const [temaNuevo, setTemaNuevo] = useState("");
  const [temas, setTemas] = useState<string[]>([]);

  function manejarAgregarTema(event: FormEvent) {
    event.preventDefault();

    const limpio = temaNuevo.trim();
    if (!limpio) return;

    setTemas((prev) => [...prev, limpio]);
    setTemaNuevo("");
  }

  function manejarEliminarTema(indexAEliminar: number) {
    setTemas((prev) => prev.filter((_, index) => index !== indexAEliminar));
  }

  return (
    <div className="app-root">
      <header className="site-header">
  <div className="site-header-inner">
    <div className="site-header-content">
      <h1>Ultra Dev Study Panel</h1>
      <p>
        Panel de estudio de Desarrollo Web I para entrenar como ingeniero/a de élite.
      </p>
      <p className="site-header-sub">
        Bienvenido, <strong>{estudiante}</strong>.
      </p>
    </div>

    <nav className="site-nav" aria-label="Navegación del panel de estudio">
      <a href="#objetivos">Objetivos</a>
      <a href="#progreso">Progreso</a>
      <a href="#temas">Temas</a>
      <a href="#cursos-api">Cursos (API)</a>
    </nav>
  </div>
</header>


      <main className="app-main">
        
        <section id="resumen">
          <h2>Resumen rápido</h2>
          <div
            className="resumen-grid"
            aria-label="Resumen de tu panel de estudio"
          >
            <article className="resumen-card">
              <h3>Horas hoy</h3>
              <p>{horasEstudio}</p>
            </article>

            <article className="resumen-card">
              <h3>Temas en la lista</h3>
              <p>{temas.length}</p>
            </article>

            <article className="resumen-card">
              <h3>Objetivos activos</h3>
              <p>3</p>
            </article>

            <article className="resumen-card">
              <h3>Estado</h3>
              <p>{temas.length === 0 ? "Por empezar" : "En progreso"}</p>
            </article>
          </div>
        </section>

        <section id="objetivos">
          <h2>Objetivos de esta asignatura</h2>
          <div className="card-grid">
            <TarjetaObjetivo
              titulo="Dominar los fundamentos del frontend"
              descripcion="HTML, CSS moderno, JavaScript, TypeScript y React para construir interfaces profesionales."
            />
            <TarjetaObjetivo
              titulo="Pensar como full-stack"
              descripcion="Entender cómo el frontend habla con APIs y se integra con bases de datos y backend."
            />
            <TarjetaObjetivo
              titulo="Apuntar a salarios top"
              descripcion="Construir un portafolio y habilidades técnicas que te permitan competir por roles muy bien pagados."
            />
          </div>
        </section>

        <section id="progreso">
          <h2>Progreso de estudio</h2>
          <p>
            Hoy has estudiado{" "}
            <strong>{horasEstudio}</strong> horas de Desarrollo Web I.
          </p>
          <div className="progreso-actions">
            <button
              type="button"
              onClick={() =>
                setHorasEstudio((valorActual) => valorActual + 1)
              }
            >
              +1 hora
            </button>
            <button type="button" onClick={() => setHorasEstudio(0)}>
              Reiniciar a 0
            </button>
          </div>
        </section>

        <section id="temas">
          <h2>Temas por estudiar</h2>
          <form onSubmit={manejarAgregarTema} className="temas-form">
            <label className="sr-only" htmlFor="tema-nuevo">
              Tema por estudiar
            </label>
            <input
              id="tema-nuevo"
              type="text"
              placeholder="Ej: Flexbox, React hooks, TypeScript..."
              value={temaNuevo}
              onChange={(event) => setTemaNuevo(event.target.value)}
            />
            <button type="submit">Agregar tema</button>
</form>

          <ul className="temas-lista">
            {temas.length === 0 ? (
              <li>No has añadido temas todavía.</li>
            ) : (
              temas.map((tema, index) => (
                <li key={index} className="tema-item">
                  <span>{tema}</span>
                  <button
                    type="button"
                    onClick={() => manejarEliminarTema(index)}
                    className="tema-borrar"
                  >
                    Eliminar
                  </button>
                </li>
              ))
            )}
          </ul>
        </section>

        <CursosApi />

        <section id="horarios">
          <h2>Horarios de estudio recomendados</h2>
          <p className="tabla-descripcion">
            Ejemplo de tabla accesible con un plan simple de estudio semanal.
          </p>

          <div
            className="tabla-wrapper"
            role="region"
            aria-label="Tabla de horarios recomendados"
          >
            <table>
              <caption className="sr-only">
                Horarios sugeridos de estudio para la semana
              </caption>
              <thead>
                <tr>
                  <th scope="col">Día</th>
                  <th scope="col">Bloque sugerido</th>
                  <th scope="col">Duración</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Lunes</th>
                  <td>Frontend (HTML/CSS/React)</td>
                  <td>2 horas</td>
                </tr>
                <tr>
                  <th scope="row">Miércoles</th>
                  <td>JavaScript/TypeScript</td>
                  <td>2 horas</td>
                </tr>
                <tr>
                  <th scope="row">Viernes</th>
                  <td>APIs y proyectos</td>
                  <td>2 horas</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <footer className="site-footer">
  <div className="site-footer-inner">
    <p>© 2025 Ultra Dev · Panel de estudio de {estudiante}</p>
  </div>
</footer>
    </div>
  );
}

export default App;