import ContactCards from "./_components/contact-cards";
import ProfileImage from "@components/ui/profile-image";

export default function Contact() {
  return (
    <main className="h-screen bg-black text-white relative fade-in">
      <div className="absolute inset-0 bg-stars z-0" />
      <div className="absolute inset-0 bg-twinkling z-10" />
      <div className="relative z-20">
        <h1 className="text-[5vh] text-center my-4">Get in touch!</h1>
        <p className="text-center">
          Click on the contact links below to connect with me.
        </p>
        <ProfileImage className="mx-auto my-14 cursor-pointer" />
        <ContactCards />
      </div>
    </main>
  );
}
