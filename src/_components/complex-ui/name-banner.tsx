import Name from "@components/ui/name";
import ProfileImage from "@components/ui/profile-image";

export default function NameBanner() {
  return (
    <div className="grid grid-cols-6 items-center z-100">
      <ProfileImage className="col-span-2 cursor-pointer" width={200} />
      <div className="grid col-span-4 ml-10 max-w-md">
        <Name />
      </div>
    </div>
  );
}
