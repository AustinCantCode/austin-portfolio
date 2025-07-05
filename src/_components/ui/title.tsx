import { Separator } from "@components/ui/separator";

type TitleProps = {
  className? : string,
  header?: string
}

export default function Title(props: TitleProps) {
  return (
    <div className={"max-w-5xl mx-auto text-white w-full " + props.className}>
      <Separator className="mb-8" />
      <h3 className="text-center text-[2vh] font-semibold whitespace-pre-wrap">
        {props.header}
      </h3>
      <Separator className="my-8" />
    </div>
  );
}
