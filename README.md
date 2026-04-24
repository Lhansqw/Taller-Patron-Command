# Helpdesk System - State Pattern Demo

Este proyecto es una demostración completa y práctica del **Patrón de Diseño State** (Estado), implementado en un caso de uso real: un Sistema de Gestión de Incidentes de TI (Helpdesk).

La aplicación consta de dos proyectos independientes que se comunican a través de una API REST.

##  Características del Proyecto

* **Backend (Java / Spring Boot)**: Implementa la lógica de negocio pura utilizando el Patrón State. El flujo del ticket (Abierto → Asignado → En Diagnóstico → Resuelto → Cerrado / Reabierto) se controla completamente mediante polimorfismo, sin utilizar ni un solo condicional (`if` o `switch`) en la clase `Ticket` o en los controladores REST.
* **Frontend (React / Vite)**: Una interfaz de usuario moderna que simula la vista de un técnico de soporte. Permite interactuar con el ciclo de vida del ticket y visualizar en tiempo real:
  * El consumo del SLA (Acuerdo de Nivel de Servicio).
  * El diagrama de flujo del estado actual.
  * Una vista paralela del código Java real para entender cómo interactúan los componentes del patrón por debajo.

##  Estructura del Proyecto

```text
Taller-Patron-Command/
├── backend/                  # API REST con Spring Boot
│   ├── src/main/java/com/helpdesk/ticket/
│   │   ├── model/            # Contiene la clase Contexto (Ticket.java)
│   │   ├── state/            # Interfaz TicketState y todas las clases de estado concretas
│   │   ├── controller/       # Controladores REST
│   │   ├── service/          # Lógica de orquestación
│   │   └── dto/              # Objetos de Transferencia de Datos
│   └── pom.xml               # Configuración de Maven (Java 11, Spring Boot 2.7.x)
│
└── frontend/                 # Aplicación Web React
    ├── src/
    │   ├── api/              # Cliente Axios para la comunicación con el Backend
    │   ├── components/       # Componentes de UI (TicketCard, StateFlow, CodeViewer)
    │   ├── context/          # Gestión de estado global con React Context
    │   ├── hooks/            # Custom hooks
    │   └── App.jsx           # Layout principal (Dashboard de doble panel)
    └── package.json          # Configuración de Node.js
```

##  Prerrequisitos

Para ejecutar este proyecto en tu máquina local necesitarás:
* **Java Development Kit (JDK)** versión 11 o superior.
* **Node.js** (versión 16+ recomendada).

##  Cómo Ejecutar el Proyecto

El sistema se compone de dos servidores que deben ejecutarse en simultáneo.

### 1. Levantar el Backend (Java)

1. Abre una terminal y navega hasta la carpeta `backend`:
   ```bash
   cd backend
   ```
2. Ejecuta la aplicación utilizando el wrapper de Maven incluido (no necesitas tener Maven instalado globalmente):
   * En Windows:
     ```powershell
     .\mvnw spring-boot:run
     ```
   * En macOS / Linux:
     ```bash
     ./mvnw spring-boot:run
     ```
3. El servidor iniciará en `http://localhost:8080`.

### 2. Levantar el Frontend (React)

1. Abre una nueva pestaña/ventana en la terminal y navega hasta la carpeta `frontend`:
   ```bash
   cd frontend
   ```
2. Instala las dependencias de Node:
   ```bash
   npm install
   ```
3. Inicia el servidor de desarrollo de Vite:
   ```bash
   npm run dev
   ```
4. Abre tu navegador y dirígete a `http://localhost:5173`.

##  Entendiendo el Patrón State en este Proyecto

El corazón de este proyecto reside en la carpeta `backend/src/main/java/com/helpdesk/ticket/state`.

1. **Contexto (`Ticket.java`)**: Mantiene una referencia al estado actual (`TicketState`). Cuando el usuario intenta interactuar con el ticket (ej. `ticket.resolver()`), el ticket simplemente delega la acción a su estado: `estado.resolver(this, solucion)`.
2. **Interfaz de Estado (`TicketState.java`)**: Define todas las acciones posibles que puede sufrir un ticket a lo largo de su vida.
3. **Estados Concretos (`AbiertoState`, `EnDiagnosticoState`, etc.)**: Implementan la interfaz. Cada estado solo permite las acciones que tienen sentido en ese momento. Si intentas *resolver* un ticket que apenas está *abierto* (sin diagnóstico), el estado `AbiertoState` lanzará una excepción. Además, contienen lógicas ricas de negocio, como `ResueltoState`, que escala automáticamente el ticket si detecta que ha sido reabierto más de dos veces.

¡Disfruta explorando la demostración!
