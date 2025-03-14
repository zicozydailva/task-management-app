interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  name?: string;
}

interface Props {
  user: User;
  disabled?: boolean;
}

export default function User({ user, disabled = false }: Props) {
  const viewUser = () => {
    // !disabled && router.push(`${Routes.User}?id=${user?._id}`)
  };

  return (
    <div className="flex items-center space-x-2 text-sm" onClick={viewUser}>
      <div className="border-200 relative h-8 w-8 overflow-hidden rounded-full border border-neutral-200">
        <img src="/assets/images/avatar.png" className="object-contain" alt="Profile" />
      </div>
      <p className="">
        {user?.firstName} {user?.lastName} {user?.name}
      </p>
    </div>
  );
}
