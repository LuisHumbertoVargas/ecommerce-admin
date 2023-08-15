import { UserButton } from '@clerk/nextjs';

const SetUpPage = () => {
    return (
        <div className='flex justify-end p-5 mx-5'>
            <UserButton afterSignOutUrl='/' />
        </div>
    );
};

export default SetUpPage;
