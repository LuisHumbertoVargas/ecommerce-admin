export default function AuthLayout({
    children,
}: {
    children: React.ReactMode;
}) {
    return (
        <div className='flex items-center justify-center h-full w-full'>
            {children}
        </div>
    );
}
