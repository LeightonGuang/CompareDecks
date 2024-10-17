import Link from "next/link";

export const THead = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <th
      className={`h-[3rem] px-[1rem] py-[1px] text-[0.875rem] font-[500] text-[#5E6D82] ${className}`}
    >
      {children}
    </th>
  );
};

export const TData = ({
  children,
  className = "",
  href = "/",
}: {
  children?: React.ReactNode;
  className?: string;
  href?: string;
}) => {
  return (
    <td className={className} id="td">
      <Link className="h-full" href={href} id="link">
        <div className="flex items-center justify-center p-[1rem]">
          <div className="flex h-[4rem] items-center">{children}</div>
        </div>
      </Link>
    </td>
  );
};
