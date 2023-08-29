'use client';

import * as z from 'zod'; // Importación de la biblioteca para validación y esquematización de datos
import axios from 'axios';
import { useForm } from 'react-hook-form'; // Importación del hook para gestionar formularios en React
import { zodResolver } from '@hookform/resolvers/zod'; // Importación del resolver para integrar validación zod con react-hook-form
import { useState } from 'react';
import { toast } from 'react-hot-toast';

import { useStoreModal } from '@/hooks/use-store-modal'; // Importación de un hook personalizado para manejar la ventana modal
import { Modal } from '@/components/ui/modal'; // Importación de un componente personalizado para representar una ventana modal
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Definición del esquema de validación utilizando zod
const formSchema = z.object({
    name: z.string().min(1).max(45), // El campo 'name' debe ser una cadena de caracteres con longitud entre 1 y 45
});

// Definición del componente funcional StoreModal
export const StoreModal = () => {
    // Uso del hook useStoreModal para obtener la lógica relacionada con la ventana modal
    const storeModal = useStoreModal();

    const [loading, setLoading] = useState(false);

    // Uso del hook useForm para configurar un formulario con validación basada en el esquema formSchema
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema), // Aplicar validación zod al formulario
        defaultValues: {
            name: '',
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);
            const response = await axios.post('/api/stores', values);
            toast.success('Store created 🚀');
        } catch (error) {
            toast.error('Something went wrong ❌');
        } finally {
            setLoading(false);
        }
    };

    // Devolución del componente Modal con propiedades y contenido
    return (
        <Modal
            title='Create Store' // Título de la ventana modal
            description='Add a new store to manage products and categories' // Descripción de la ventana modal
            isOpen={storeModal.isOpen} // Propiedad para controlar si la ventana modal está abierta o no
            onClose={storeModal.onClose} // Función para cerrar la ventana modal
        >
            <div>
                <div className='space-y-4 py-2-pb'>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={loading}
                                                placeholder='E-Commerce'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className='pt-6 space-x-2 flex items-center justify-end w-full'>
                                <Button
                                    disabled={loading}
                                    variant='outline'
                                    onClick={storeModal.onClose}
                                >
                                    Cancel
                                </Button>
                                <Button disabled={loading} type='submit'>
                                    Continue
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </Modal>
    );
};
