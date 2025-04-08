[...]  

**User Flows (Flujos de Usuario):**

1. **Inicio del ciclo**
   - Usuario abre la app → entra al chat con IA → declara compromisos → recibe acciones generadas con horarios.

2. **Seguimiento diario**
   - Usuario abre la app → ve snackbars activos con acciones del día → marca completados o agrega mensaje nuevo.

3. **Registro emocional o físico**
   - Usuario accede al menú → selecciona "Registrar emoción" o "Registrar síntoma" → completa formulario breve.

4. **Registro de alimentación**
   - Usuario accede a sección de comidas → registra lo que comió en una entrada diaria.

5. **Integración con wearable**
   - Usuario conecta smartwatch en la sección de ajustes → app comienza a sincronizar automáticamente datos de sueño, pasos, etc.

6. **Informe final**
   - Se cumple el ciclo de 14 días → si hay >80% de acciones cumplidas → IA genera informe personalizado → se muestra en pantalla y se guarda en historial.

---

**Wireframes o Mockups:**

(Pendientes de realizar visualmente en herramienta como Figma, Penpot o Whimsical. A continuación, estructura sugerida de pantallas)

1. **Pantalla de bienvenida y autenticación**
2. **Pantalla principal de ciclo activo (con snackbars de acciones)**
3. **Chat de inicio de ciclo con IA**
4. **Pantalla de registro emocional/síntomas**
5. **Pantalla de registro de comidas**
6. **Panel de configuración e integración con wearables**
7. **Pantalla de informe final con acceso a historial**

---

**Arquitectura Técnica Detallada:**

- **Frontend (React Native)**
  - Estructura de carpetas modular por features
  - Navegación stack + bottom tabs
  - Context API o Redux para estado global

- **Backend (NestJS)**
  - Módulos separados por dominio (usuario, hábitos, emociones, IA)
  - Controladores REST y servicios conectados a la base de datos con Prisma
  - Endpoints para:
    - Guardar compromisos
    - Registrar emociones, síntomas, comidas
    - Marcar acciones como completadas
    - Disparar generación de informes IA

- **Base de Datos (PostgreSQL)**
  - Tablas: usuarios, ciclos, acciones, emociones, síntomas, comidas, informes, datos_wearable

- **IA**
  - OpenAI (chat de inicio + generación de informe)
  - LangChain para estructuración del JSON y gestión de contexto

- **Integraciones externas**
  - Google Fit / Apple Health API para recolección biométrica
  - Supabase para autenticación (opcional)

---

**Roadmap y MVP:**

**MVP (versión inicial):**
- Chat de inicio con IA y generación de acciones
- Snackbars con botón de completado
- Registro de emociones, síntomas y comidas
- Informe final generado por IA
- Sincronización simple con smartwatch (fase beta)

**Futuras versiones:**
- Exportación de informes en PDF
- Comunidad interna con interacción
- Visualización de progreso en gráficos
- Entrenamiento de modelo propio con datos históricos
- Versión web complementaria

---

**Testing y Validación:**
- Testeo de funcionalidades en TestFlight / Android Beta
- Pruebas con 5-10 usuarios reales (Clara, Lucas, Sofía)
- Encuesta de satisfacción por ciclo
- Validación técnica: pruebas unitarias backend, pruebas end-to-end frontend con Cypress o Detox

---

**Informe Final / Presentación del Proyecto:**

Incluye este documento como base, complementado con:
- Capturas de pantalla del prototipo
- Video demo de 1-2 minutos del flujo principal
- Repositorio GitHub con código y README detallado
- Pitch deck de 5 slides (opcional para incubadoras o concursos)

---

