import { useUser } from "@/context/UserContext";

interface Props {
  setIsDeleteAccount: (arg0: boolean) => void;
}

// https://cdn.dribbble.com/users/195163/screenshots/1491585/media/343f9d565c4c964666a6ecd21e374337.jpg?resize=400x300&vertical=center

const DeleteAccountModal = ({ setIsDeleteAccount }: Props) => {
  const { user, deleteAccount } = useUser();
  const handleDeleteAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await deleteAccount(user.id);
    if (response.success) {
      setIsDeleteAccount(false);
      window.location.reload();
    }
  };

  return (
    <div
      className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50"
      id="delete-account-modal"
    >
      <div
        className="w-[22rem] rounded-[0.375rem] bg-white md:w-[28rem]"
        id="delete-account-card"
      >
        <div>
          <div className="m-[1rem]">
            <div className="mb-[1rem] flex items-center justify-between">
              <h1 className="text-[1.25rem]">Delete Account</h1>
              <button
                className="rounded-[0.25rem] bg-gray-300 px-[0.5rem] py-[0.25rem] text-[0.75rem] text-black"
                onClick={() => setIsDeleteAccount(false)}
              >
                Cancel
              </button>
            </div>
            <form
              className="flex flex-col gap-[1rem]"
              onSubmit={handleDeleteAccount}
            >
              <label className="text-[0.875rem]">
                {`Are you sure you want to delete your account? (Account data will
                be permanently deleted.)`}
              </label>
              <button
                className="w-[10rem] rounded-[0.375rem] bg-red-500 px-[1rem] py-[0.5rem] text-white"
                type="submit"
              >
                Delete Account
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
