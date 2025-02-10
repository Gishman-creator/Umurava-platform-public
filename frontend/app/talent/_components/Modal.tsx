'use client';
import { useRouter } from 'next/navigation'; // Correct import
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const Modal = ({ onClose }: { onClose: () => void }) => {
    const router = useRouter();

    // Close the modal and navigate back when clicking outside or pressing the button
    const handleClose = () => {
        onClose();
        router.back(); // Navigate back to the previous page
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white w-fit flex flex-col justify-between items-center text-center py-8 px-12 rounded-lg">
                <div className="bg-blue-100 flex justify-between items-center w-fit p-4 rounded-full">
                    <Image
                        className="w-9 h-9 object-cover"
                        src="/image-14.png"
                        alt="image-14"
                        height={100}
                        width={100}
                    />
                </div>
                <div>
                    <h2 className="font-bold mt-8">Join our Whatsapp Community</h2>
                    <p className="text-xs text-gray-600 mt-4 w-60">Get notified on the latest projects and hackathons</p>
                </div>
                <Button className="bg-primary text-xs text-white rounded-lg px-8 mt-4" onClick={handleClose}>
                    Join
                </Button>
            </div>
        </div>
    );
};

export default Modal;
