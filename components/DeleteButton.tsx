'use client';

import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter();
  const deleteImage = async (publicId: string) => {
    const res = await fetch('/api/removeImage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ publicId }),
    });
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this post?'
    );

    if (confirmed) {
      try {
        const res = await fetch(`/api/posts/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (res.ok) {
          const post = await res.json();
          const { publicId } = post;
          await deleteImage(publicId);

          toast.success('Post deleted successfully!');
          router.refresh();
        }
      } catch (error) {
        toast.error('Failed to delete post.');
        console.log(error);
      }
    }
  };

  return (
    <button onClick={handleDelete} className="text-red-600">
      Delete
    </button>
  );
}
