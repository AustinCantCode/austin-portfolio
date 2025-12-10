import Name from "@components/ui/name";
import Coin from "@components/complex-ui/coin";

export default function NameBanner() {
  return (
    <div className="grid grid-cols-5 items-center z-100">
      <Coin
        className="col-span-2 w-[12vh] h-[12vh] md:w-[150px] md:h-[150px] lg:w-[200px] lg:h-[200px]"
        onLoad
      />
      <div className="grid col-span-3 max-w-md">
        <Name />
      </div>
    </div>
  );
}
