import type { ServiceItem, FAQItem } from '../types';
import imgTercerizacion from '../assets/tercerizacion_personal.png';
import imgPlanillas from '../assets/administracion_planillas.png';
import imgGestion from '../assets/gestion_personal.png';
import imgSoporte from '../assets/soporte_administrativo.png';

export const servicesData: ServiceItem[] = [
  {
    id: 'tercerizacion-personal',
    title: 'Tercerización de Personal',
    tagline: 'Selección y gestión del talento que tu operación requiere',
    badge: 'Servicio Principal',
    iconName: 'users',
    image: imgTercerizacion,
    description:
      'Nos encargamos de la búsqueda, selección, contratación y gestión del personal que tu empresa necesita, de acuerdo con el servicio contratado.',
    includes: [
      'Reclutamiento y selección',
      'Contratación',
      'Gestión de documentos laborales',
      'Administración y seguimiento del personal',
      'Control de asistencia',
      'Gestión de incidencias laborales',
    ],
    keyBenefits: [
      'Reducción inmediata de tiempos de contratación',
      'Personal calificado según el perfil de puesto',
      'Cumplimiento estricto de la normativa laboral',
    ],
  },
  {
    id: 'administracion-planillas',
    title: 'Administración de Planillas',
    tagline: 'Cálculo exacto y puntual de todas tus obligaciones laborales',
    badge: 'Especializado',
    iconName: 'calculator',
    image: imgPlanillas,
    description:
      'Gestionamos el proceso de planillas y las obligaciones relacionadas con tus trabajadores, manteniendo la información laboral organizada y actualizada.',
    includes: [
      'Elaboración de planillas',
      'Cálculo de remuneraciones',
      'Beneficios sociales',
      'Vacaciones y gratificaciones',
      'Liquidaciones',
      'Altas y bajas',
      'Reportes de planilla',
    ],
    keyBenefits: [
      'Cero contingencias ante entidades regulatorias',
      'Puntualidad en los pagos y depósitos de ley',
      'Reportes ejecutivos detallados por centro de costo',
    ],
  },
  {
    id: 'gestion-integral-personal',
    title: 'Gestión Integral del Personal',
    tagline: 'Acompañamiento en todo el ciclo laboral del colaborador',
    badge: 'Gestión 360°',
    iconName: 'briefcase',
    image: imgGestion,
    description:
      'Administramos el ciclo laboral de tus trabajadores, desde su incorporación hasta el término de la relación laboral.',
    includes: [
      'Incorporación de personal',
      'Gestión de legajos',
      'Seguimiento del personal',
      'Control de asistencia',
      'Gestión de vacaciones y permisos',
      'Administración documentaria',
      'Reportes y seguimiento',
    ],
    keyBenefits: [
      'Organización impecable de legajos y contratos',
      'Trazabilidad en tiempo real de asistencias y permisos',
      'Clima laboral ordenado y transparente',
    ],
  },
  {
    id: 'soporte-administrativo',
    title: 'Soporte Administrativo',
    tagline: 'Procesos ordenados y eficientes para optimizar tu tiempo',
    badge: 'Eficiencia Operativa',
    iconName: 'folderCheck',
    image: imgSoporte,
    description:
      'Asumimos procesos administrativos que permiten a tu empresa trabajar de manera más ordenada y eficiente.',
    includes: [
      'Gestión documentaria',
      'Organización de archivos y legajos',
      'Elaboración de reportes',
      'Control de vencimientos',
      'Seguimiento de procesos',
      'Coordinación administrativa',
    ],
    keyBenefits: [
      'Disminución drástica de la carga operativa interna',
      'Control preventivo de fechas y renovaciones clave',
      'Flujos de trabajo estandarizados y ágiles',
    ],
  },
];

export const faqData: FAQItem[] = [
  {
    category: 'General',
    question: '¿Qué ventajas obtiene mi empresa al tercerizar procesos con Aura Corporativa?',
    answer:
      'Al delegar procesos operativos y de personal, tu empresa reduce significativamente los costos fijos, mitiga riesgos de contingencias legales/laborales y libera tiempo valioso para que tu equipo directivo se enfoque 100% en el crecimiento del negocio.',
  },
  {
    category: 'Legal y Laboral',
    question: '¿Cómo garantiza Aura Corporativa el cumplimiento legal y normativo?',
    answer:
      'Contamos con un equipo especializado en legislación laboral y tributaria que supervisa cada contratación, cálculo de planilla, aportes a seguridad social y beneficios de ley, asegurando total transparencia y cumplimiento normativo vigente.',
  },
  {
    category: 'Implementación',
    question: '¿En cuánto tiempo se puede iniciar el servicio contratado?',
    answer:
      'El tiempo de inicio se adapta al alcance del servicio. Procesos de administración de planillas o soporte administrativo pueden desplegarse en pocos días tras la recepción de información, mientras que procesos de tercerización masiva de personal se programan bajo un cronograma ágil acordado.',
  },
  {
    category: 'Soporte',
    question: '¿Qué tipo de reportes recibe mi empresa durante la gestión?',
    answer:
      'Entregamos reportes periódicos y personalizados que incluyen control de asistencia, resúmenes de planillas, estatus de legajos, incidencias y seguimiento de procesos administrativos para que mantengas total control y visibilidad.',
  },
];
