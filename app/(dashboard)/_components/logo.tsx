import Image from "next/image";

export const Logo = () => {
  return (
    <div className="flex justify-start items-center ">
      <Image height={20} width={70} alt="logo" src="/logo.svg" />
      <p className="text-lg font-semibold ">Coursify</p>
    </div>
  );
};
