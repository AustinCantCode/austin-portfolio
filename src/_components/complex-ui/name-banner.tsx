import Name from "@components/ui/name";
import Coin from "@components/complex-ui/coin";

export default function NameBanner() {
  return (
    <div className="grid grid-cols-5 items-center z-100">
      <Coin className="col-span-2 w-[200px] h-[200px]" onLoad />
      <div className="grid col-span-3 max-w-md">
        <Name />
      </div>
    </div>
  );
}
