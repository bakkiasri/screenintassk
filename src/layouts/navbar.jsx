import { HiOutlineBell } from "react-icons/hi2";

export default function Naavbars() {
  return (
    <div className="bg-white shadow-xl flex justify-end gap-4 p-2">
      <div>
        <HiOutlineBell className="h-10 w-10 p-2 text-[#9CA3AF] hover:rounded-full hover:border-1 hover:border-[red-200]" />
      </div>
      <div className="text-white bg-red-800 w-10 h-10 p-2 text-center rounded-full">
        S
      </div>
    </div>
  );
}
