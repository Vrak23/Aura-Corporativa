<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Servicio;

class ServicioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $servicios = [
            [
                'titulo' => 'Tercerización de Personal',
                'slug' => 'tercerizacion-de-personal',
                'descripcion' => 'Reclutamos, contratamos y administramos talento calificado y operativo adaptado a la demanda y cultura de su organización.',
                'descripcion_corta' => 'Talento calificado y operativo administrado integralmente.',
                'incluye' => [
                    'Reclutamiento y selección especializada',
                    'Contratación bajo normativa laboral vigente',
                    'Reemplazo inmediato ante incidencias',
                    'Supervisión y control de asistencia',
                ],
                'icono' => 'users',
                'orden' => 1,
                'activo' => true,
            ],
            [
                'titulo' => 'Gestión de Planillas (Payroll)',
                'slug' => 'gestion-de-planillas',
                'descripcion' => 'Cálculo exacto y puntual de haberes, beneficios de ley, aportes a AFP/ONP, tributos (PLAME) y liquidaciones con confidencialidad absoluta.',
                'descripcion_corta' => 'Procesamiento puntual de nóminas y cumplimiento tributario.',
                'incluye' => [
                    'Cálculo de nómina quincenal o mensual',
                    'Declaración y pago de PLAME / AFP Net',
                    'Cálculo de CTS, gratificaciones y utilidades',
                    'Emisión y distribución de boletas electrónicas',
                ],
                'icono' => 'calculator',
                'orden' => 2,
                'activo' => true,
            ],
            [
                'titulo' => 'Gestión Integral & Facility',
                'slug' => 'gestion-integral-facility',
                'descripcion' => 'Optimice los recursos y mantenimiento operativo de sus oficinas, plantas y locales comerciales con personal de soporte confiable.',
                'descripcion_corta' => 'Mantenimiento y soporte operativo para sus instalaciones.',
                'incluye' => [
                    'Servicio de limpieza y desinfección corporativa',
                    'Mantenimiento preventivo y correctivo menor',
                    'Recepción, conserjería y mensajería',
                    'Gestión de suministros y consumibles de oficina',
                ],
                'icono' => 'briefcase',
                'orden' => 3,
                'activo' => true,
            ],
            [
                'titulo' => 'Soporte Administrativo',
                'slug' => 'soporte-administrativo',
                'descripcion' => 'Asistentes ejecutivos, gestores documentales y personal administrativo para dinamizar el flujo de trabajo de su empresa.',
                'descripcion_corta' => 'Personal administrativo para optimizar procesos y flujos diarios.',
                'incluye' => [
                    'Digitalización y control de archivos físicos/digitales',
                    'Gestión de compras y facturación básica',
                    'Atención de mesa de partes y central telefónica',
                    'Soporte en trámites notariales y registrales',
                ],
                'icono' => 'folderCheck',
                'orden' => 4,
                'activo' => true,
            ],
        ];

        foreach ($servicios as $servicio) {
            Servicio::updateOrCreate(
                ['slug' => $servicio['slug']],
                $servicio
            );
        }
    }
}
