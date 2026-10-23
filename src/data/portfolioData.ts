/**
 * DATOS DEL PORTAFOLIO ACADÉMICO - FP DAW
 * =================================================================
 * Este archivo contiene toda la información de tu portafolio.
 * Puedes modificar los textos, proyectos, enlaces y tecnologías
 * directamente aquí en el código, o utilizar el botón "Personalizar"
 * en la web para editarlo de forma visual.
 * =================================================================
 */

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'DWEC' | 'DWES' | 'BBDD' | 'DIW' | 'PROYECTO_FINAL' | 'GENERAL';
  moduleName: string;
  description: string;
  detailedPoints?: string[];
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  docsUrl?: string;
  date: string;
  status: 'Completado' | 'En desarrollo' | 'Entregado';
  grade?: string;
  isDemo: boolean;
}

export interface AcademicDoc {
  id: string;
  title: string;
  category: 'Memorias de Prácticas' | 'Bases de Datos & SQL' | 'Despliegue & Servidores' | 'Currículum & Certificados';
  description: string;
  fileType: 'PDF' | 'Drive' | 'Notion' | 'GitHub' | 'ZIP';
  externalUrl: string;
  lastUpdated: string;
  isDemo: boolean;
}

export interface TechCategory {
  category: string;
  description: string;
  items: {
    name: string;
    subtext: string;
    level: 'Básico' | 'Intermedio' | 'Avanzado';
  }[];
}

export interface PersonalInfo {
  name: string;
  subtitle: string;
  institute: string;
  course: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  fctAvailability: string;
  fctModality: string;
  fctHours: string;
  aboutShort: string;
  aboutDetails: string[];
  interests: string[];
  tutorNote: string;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  projects: Project[];
  documents: AcademicDoc[];
  technologies: TechCategory[];
}

export const portfolioData: PortfolioData = {
  personalInfo: {
    name: "Emerson Rodríguez",
    subtitle: "Estudiante de Desarrollo de Aplicaciones Web (DAW)",
    institute: "DigiTech FP",
    course: "2º Curso (Curso Académico 2025 - 2026)",
    location: "España (Disponible para trabajo presencial o remoto)",
    email: "emersongeovannyescob@gmail.com",
    github: "https://github.com/emerson19290/mi-portfolio-profesional",
    linkedin: "https://linkedin.com/in/emerson-rodriguez",
    fctAvailability: "Marzo - Junio 2026 (Horario de mañanas o jornada completa)",
    fctModality: "Presencial / Híbrida / Remota",
    fctHours: "370 - 400 horas de prácticas curriculares",
    aboutShort: "Estudiante de segundo curso de Desarrollo de Aplicaciones Web (DAW), con formación complementaria en marketing y experiencia en gestión administrativa, gestión de empleados, análisis de datos y atención al cliente. Cuento con conocimientos en HTML5, CSS, JavaScript, PHP, Java, APIs REST y bases de datos MySQL/PostgreSQL. Con capacidad analítica, adaptabilidad, organización y orientación a la resolución de problemas, y la mejora continua. Busco una oportunidad para aplicar mis conocimientos, adquirir experiencia en proyectos reales, aprender metodologías ágiles y seguir desarrollándome profesionalmente en el sector del desarrollo web, aportando valor al equipo.",
    aboutDetails: [],
    interests: [
      "Desarrollo Frontend con JavaScript / React",
      "Desarrollo Backend con PHP (MVC) y Java",
      "Modelado relacional y optimización de consultas SQL",
      "Despliegue con contenedores Docker y servidores Linux",
      "Buenas prácticas de accesibilidad web (WCAG) y UX/UI"
    ],
    tutorNote: "Espacio preparado para la supervisión docente y del departamento de prácticas del centro educativo. Incluye repositorios de código fuente verificable, memorias técnicas de prácticas y proyectos ejecutables."
  },
  projects: [
    {
      id: "proj-1",
      title: "Plataforma de Gestión y Catálogo E-Commerce",
      subtitle: "Arquitectura Modelo-Vista-Controlador en PHP con persistencia MySQL",
      category: "DWES",
      moduleName: "Desarrollo Web en Entorno Servidor",
      description: "Aplicación web completa desarrollada desde cero implementando el patrón MVC en PHP puro sin frameworks. Cuenta con autenticación por roles (administrador y cliente), cifrado de contraseñas con password_hash, carrito de compras persistente en sesión y panel CRUD para gestión de inventario.",
      detailedPoints: [
        "Diseño relacional de base de datos con tablas de usuarios, productos, categorías y pedidos con claves foráneas e integridad referencial.",
        "Prevención de inyecciones SQL mediante consultas preparadas PDO (PHP Data Objects).",
        "Generación automática de facturas en PDF para pedidos confirmados.",
        "Panel de administración protegido con control estricto de sesiones y tokens CSRF."
      ],
      technologies: ["PHP 8", "MySQL", "PDO", "CSS3 / Flexbox", "Apache"],
      githubUrl: "https://github.com/emerson19290/tienda-mvc-php",
      demoUrl: "https://ejemplo-tienda-demo.vercel.app",
      docsUrl: "https://drive.google.com/ejemplo-memoria-tienda",
      date: "Noviembre 2025",
      status: "Completado",
      grade: "9.5 / 10",
      isDemo: false
    },
    {
      id: "proj-2",
      title: "Single Page Application (SPA) - Gestor de Incidencias Técnicas",
      subtitle: "Aplicación cliente interactiva con JavaScript modular y consumo de API REST",
      category: "DWEC",
      moduleName: "Desarrollo Web en Entorno Cliente",
      description: "SPA dinámica orientada al seguimiento de tickets y tareas técnicas. Desarrollada con JavaScript vanilla aplicando módulos ES6, manipulación eficiente del DOM, almacenamiento local (LocalStorage) y consumo asíncrono con Fetch API / Promises.",
      detailedPoints: [
        "Filtrado dinámico por prioridad, estado y departamento sin recarga de página.",
        "Validación avanzada de formularios en tiempo real con mensajes de error accesibles.",
        "Manejo de estados asíncronos (cargando, error y datos) con renderizado optimizado.",
        "Persistencia local offline y sincronización opcional con endpoint MockAPI."
      ],
      technologies: ["JavaScript ES6+", "HTML5 Semántico", "CSS Grid & Variables", "Fetch API", "LocalStorage"],
      githubUrl: "https://github.com/emerson19290/gestor-incidencias-dwec",
      demoUrl: "https://ejemplo-incidencias.netlify.app",
      docsUrl: "https://github.com/emerson19290/gestor-incidencias-dwec#readme",
      date: "Enero 2026",
      status: "Completado",
      grade: "10 / 10",
      isDemo: false
    },
    {
      id: "proj-3",
      title: "API RESTful de Reservas y Gestión de Aulas",
      subtitle: "Servicio backend con Java Spring Boot y persistencia JPA / Hibernate",
      category: "DWES",
      moduleName: "Desarrollo Web en Entorno Servidor / Programación",
      description: "Servicio web que expone endpoints REST para la reserva de aulas informáticas y recursos escolares. Incluye documentación interactiva generada con Swagger/OpenAPI y pruebas unitarias con JUnit.",
      detailedPoints: [
        "Controladores RESTful con códigos de estado HTTP semánticos (200, 201, 400, 404, 409).",
        "Mapeo entidad-relación con Hibernate JPA y migraciones con Flyway.",
        "Validación de fechas para evitar solapamiento de reservas en el mismo horario.",
        "Colección exportada de pruebas en Postman para verificación por el profesorado."
      ],
      technologies: ["Java 17", "Spring Boot", "JPA / Hibernate", "PostgreSQL", "Swagger", "Postman"],
      githubUrl: "https://github.com/emerson19290/api-aulas-springboot",
      docsUrl: "https://documenter.getpostman.com/ejemplo-api-aulas",
      date: "Febrero 2026",
      status: "Completado",
      grade: "9.0 / 10",
      isDemo: false
    },
    {
      id: "proj-4",
      title: "Diseño y Maquetación de Portal Web Accesible",
      subtitle: "Prototipado en Figma y maquetación responsive cumpliendo WCAG 2.1 AA",
      category: "DIW",
      moduleName: "Diseño de Interfaces Web",
      description: "Proyecto enfocado en la usabilidad, experiencia de usuario y diseño accesible. Partiendo de wireframes y prototipos interactivos en Figma, se realizó la maquetación completa con CSS moderno, modo oscuro/claro y soporte para lectores de pantalla.",
      detailedPoints: [
        "Contraste tipográfico verificado según estándar WCAG 2.1 nivel AA.",
        "Navegación completa por teclado con indicadores de foco personalizados.",
        "Diseño mobile-first adaptado fluidamente a resoluciones móviles, tablets y monitores ultrawide.",
        "Exportación de guía de estilos con paleta de colores, tipografías y componentes UI."
      ],
      technologies: ["Figma", "HTML5 Accesible (ARIA)", "CSS Moderno", "Tailwind CSS", "Lighthouse (100% Accesibilidad)"],
      githubUrl: "https://github.com/emerson19290/portal-diw-accesible",
      demoUrl: "https://ejemplo-portal-diw.vercel.app",
      docsUrl: "https://drive.google.com/ejemplo-guia-estilos-figma",
      date: "Octubre 2025",
      status: "Completado",
      grade: "9.8 / 10",
      isDemo: false
    },
    {
      id: "proj-5",
      title: "Automatización de Despliegue con Docker y Nginx",
      subtitle: "Entorno contenerizado multi-servicio para aplicaciones web LAMP/LEMP",
      category: "PROYECTO_FINAL",
      moduleName: "Despliegue de Aplicaciones Web",
      description: "Configuración de entorno de producción y staging utilizando Docker Compose. Integra contenedores independientes para servidor web Nginx, intérprete PHP-FPM, servidor de base de datos MariaDB y phpMyAdmin con volúmenes persistentes y redes aisladas.",
      detailedPoints: [
        "Archivo docker-compose.yml parametrizado mediante variables de entorno .env seguras.",
        "Configuración de reverse proxy en Nginx con compresión gzip y headers de seguridad.",
        "Script Bash para copias de seguridad automáticas y restauración de volcados SQL.",
        "Manual de despliegue paso a paso para ejecutar el entorno en cualquier servidor VPS."
      ],
      technologies: ["Docker", "Docker Compose", "Nginx", "Linux (Ubuntu Server)", "Bash Scripting", "MariaDB"],
      githubUrl: "https://github.com/emerson19290/docker-lemp-stack-daw",
      docsUrl: "https://github.com/emerson19290/docker-lemp-stack-daw/blob/main/DOCUMENTACION.md",
      date: "Diciembre 2025",
      status: "Completado",
      grade: "10 / 10",
      isDemo: false
    }
  ],
  documents: [
    {
      id: "doc-1",
      title: "Currículum Vitae Técnico (CV) - Perfil FP DAW",
      category: "Currículum & Certificados",
      description: "Documento en formato PDF con trayectoria académica, conocimientos técnicos clasificados, prácticas realizadas y disponibilidad horaria para FCT.",
      fileType: "PDF",
      externalUrl: "https://drive.google.com/ejemplo-tu-cv-daw.pdf",
      lastUpdated: "Febrero 2026",
      isDemo: false
    },
    {
      id: "doc-2",
      title: "Memoria Técnica: Tienda E-Commerce en PHP MVC",
      category: "Memorias de Prácticas",
      description: "Memoria completa de 24 páginas con especificación de requisitos, arquitectura de carpetas, diagrama de flujo, justificación de seguridad y casos de prueba.",
      fileType: "Drive",
      externalUrl: "https://drive.google.com/ejemplo-memoria-tienda-mvc",
      lastUpdated: "Noviembre 2025",
      isDemo: false
    },
    {
      id: "doc-3",
      title: "Diagrama Entidad-Relación y Script DDL/DML de BBDD",
      category: "Bases de Datos & SQL",
      description: "Modelo conceptual y lógico de base de datos relacional en Chen y Crow's Foot, normalización hasta 3FN y script SQL con triggers e índices optimizados.",
      fileType: "GitHub",
      externalUrl: "https://github.com/emerson19290/bbdd-practica-sql",
      lastUpdated: "Enero 2026",
      isDemo: false
    },
    {
      id: "doc-4",
      title: "Guía de Despliegue en Servidor VPS y Docker",
      category: "Despliegue & Servidores",
      description: "Manual paso a paso para administradores de sistemas con instalación de Docker, configuración de cortafuegos UFW, certificados SSL gratuitos con Certbot y proxy inverso.",
      fileType: "Notion",
      externalUrl: "https://notion.so/ejemplo-guia-despliegue-vps",
      lastUpdated: "Diciembre 2025",
      isDemo: false
    },
    {
      id: "doc-5",
      title: "Certificado de Curso: Git y GitHub para Equipos",
      category: "Currículum & Certificados",
      description: "Acreditación complementaria de 30 horas sobre flujos de trabajo GitFlow, resolución de conflictos, pull requests y GitHub Actions.",
      fileType: "PDF",
      externalUrl: "https://drive.google.com/ejemplo-certificado-git.pdf",
      lastUpdated: "Septiembre 2025",
      isDemo: false
    }
  ],
  technologies: [
    {
      category: "Desarrollo Frontend (Cliente Web)",
      description: "Construcción de interfaces interactivas, maquetación semántica y programación del navegador.",
      items: [
        { name: "HTML5 Semántico", subtext: "Estructura accesible, formularios y microdatos", level: "Avanzado" },
        { name: "CSS3 Moderno", subtext: "Flexbox, CSS Grid, variables CSS, animaciones y media queries", level: "Avanzado" },
        { name: "JavaScript (ES6+)", subtext: "DOM, Promesas, Async/Await, Módulos, Fetch API", level: "Avanzado" },
        { name: "Tailwind CSS", subtext: "Maquetación basada en utilidades y diseño responsivo", level: "Intermedio" },
        { name: "React / Componentes", subtext: "Estado, hooks básicos y arquitectura por componentes", level: "Intermedio" }
      ]
    },
    {
      category: "Desarrollo Backend (Servidor y Lógica)",
      description: "Lógica de negocio, desarrollo de APIs RESTful y gestión de servidores web.",
      items: [
        { name: "PHP 8 (POO & MVC)", subtext: "Programación orientada a objetos, PDO, sesiones y autenticación", level: "Avanzado" },
        { name: "Java (SE & Spring)", subtext: "Programación estructurada y orientada a objetos, APIs REST", level: "Intermedio" },
        { name: "APIs RESTful", subtext: "Diseño de endpoints, códigos HTTP, JSON y cabeceras de seguridad", level: "Avanzado" },
        { name: "Node.js / Express", subtext: "Servidores básicos y consumo de paquetes npm", level: "Básico" }
      ]
    },
    {
      category: "Bases de Datos & Persistencia",
      description: "Modelado conceptual, normalización, optimización y consultas relacionales.",
      items: [
        { name: "MySQL / MariaDB", subtext: "DDL, DML, consultas complejas con JOINs, vistas y transacciones", level: "Avanzado" },
        { name: "PostgreSQL", subtext: "Bases de datos relacionales avanzadas e integridad referencial", level: "Intermedio" },
        { name: "phpMyAdmin & DBeaver", subtext: "Herramientas de administración y análisis de esquemas", level: "Avanzado" },
        { name: "Normalización (1FN, 2FN, 3FN)", subtext: "Eliminación de redundancias y diseño óptimo", level: "Avanzado" }
      ]
    },
    {
      category: "Herramientas, Control de Versiones & Despliegue",
      description: "Entorno de trabajo profesional, control de versiones colaborativo e infraestructura.",
      items: [
        { name: "Git & GitHub", subtext: "Commits semánticos, ramas, ramas de soporte, pull requests", level: "Avanzado" },
        { name: "Docker & Docker Compose", subtext: "Contenerización de aplicaciones web y servicios LEMP", level: "Intermedio" },
        { name: "Apache & Nginx", subtext: "Virtual hosts, proxy inverso y configuración de servidores", level: "Intermedio" },
        { name: "Linux / Terminal Bash", subtext: "Administración básica, permisos chmod/chown y scripts", level: "Intermedio" },
        { name: "VS Code & Postman", subtext: "Entorno de desarrollo y pruebas de endpoints de APIs", level: "Avanzado" }
      ]
    }
  ]
};

export const initialPortfolioData = portfolioData;
