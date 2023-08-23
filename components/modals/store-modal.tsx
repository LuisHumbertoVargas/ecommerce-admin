'use client';

import * as z from 'zod'; // Importación de la biblioteca para validación y esquematización de datos
import { useForm } from 'react-hook-form'; // Importación del hook para gestionar formularios en React
import { zodResolver } from '@hookform/resolvers/zod'; // Importación del resolver para integrar validación zod con react-hook-form

import { useStoreModal } from '@/hooks/use-store-modal'; // Importación de un hook personalizado para manejar la ventana modal
import { Modal } from '@/components/ui/modal'; // Importación de un componente personalizado para representar una ventana modal

// Definición del esquema de validación utilizando zod
const formSchema = z.object({
    name: z.string().min(1).max(50), // El campo 'name' debe ser una cadena de caracteres con longitud entre 1 y 50
});

// Definición del componente funcional StoreModal
export const StoreModal = () => {
    // Uso del hook useStoreModal para obtener la lógica relacionada con la ventana modal
    const storeModal = useStoreModal();

    // Uso del hook useForm para configurar un formulario con validación basada en el esquema formSchema
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema), // Aplicar validación zod al formulario
    });

    // Devolución del componente Modal con propiedades y contenido
    return (
        <Modal
            title='Create Store' // Título de la ventana modal
            description='Add a new store to manage products and categories' // Descripción de la ventana modal
            isOpen={storeModal.isOpen} // Propiedad para controlar si la ventana modal está abierta o no
            onClose={storeModal.onClose} // Función para cerrar la ventana modal
        >
            Future Create Store Form{' '}
            {/* Contenido futuro: posiblemente un formulario */}
        </Modal>
    );
};
