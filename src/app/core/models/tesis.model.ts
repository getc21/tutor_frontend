export interface Tesis {
  id: number;
  titulo: string;
  estado: string;
  estado_display: string;
  fecha_creacion: string;
  fecha_actualizacion: string;
  estudiante: any;
  secciones: SeccionTesis[];
}

export interface SeccionTesis {
  id: number;
  tipo_seccion: string;
  contenido: string;
  tesis: number;
  retroalimentaciones: Retroalimentacion[];
}

export interface Retroalimentacion {
  id: number;
  contenido: string;
  prioridad: 'alta' | 'media' | 'baja';
  atendida: boolean;
  fecha_creacion: string;
  fecha_atencion: string | null;
  seccion: number;
}