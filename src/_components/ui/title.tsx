import { Separator } from "@components/ui/separator";

type TitleProps = {
  className?: string;
  header?: string;
};

export default function Title(props: TitleProps) {
  return (
    <div className={"max-w-5xl mx-auto text-white w-full " + props.className}>
      <Separator className="mb-8" />
      <p className="text-center text-[3vh] md:text-3xl mx-4 md:mx-0 font-semibold whitespace-pre-wrap">
        {props.header}
      </p>
      <Separator className="my-8" />
    </div>
  );
}
