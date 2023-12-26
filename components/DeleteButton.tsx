'use client';

export default function DeleteButton({ id }: { id: string }) {
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
          console.log('Post Deleted');
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <button onClick={handleDelete} className='text-red-600'>
      Delete
    </button>
  );
}
