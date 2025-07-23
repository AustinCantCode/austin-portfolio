import ProfileImage from "@components/ui/profile-image";

export default function Header() {
  return (
    <div className="flex justify-baseline gap-x-8 items-center bg-white/15 p-4 max-w-5xl mx-auto rounded-lg">
      <ProfileImage width={110} />
      <div className="grid gap-y-2">
        <p className="font-semibold text-2xl md:text-4xl m-0 p-0">
          Get in touch!
        </p>
        <p className="m-0 p-0">
          Click on the contact links below to connect with me
        </p>
      </div>
    </div>
  );
}
