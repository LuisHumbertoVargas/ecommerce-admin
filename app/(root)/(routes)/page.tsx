'use client';

import { useEffect } from 'react';
import { useStoreModal } from '@/hooks/use-store-modal';

// Home Page
const SetUpPage = () => {
    const onOpen = useStoreModal((state) => state.onOpen);
    const isOpen = useStoreModal((state) => state.isOpen);

    useEffect(() => {
        if (!isOpen) {
            onOpen();
        }
    }, [isOpen, onOpen]);

    return null;
};

export default SetUpPage;
