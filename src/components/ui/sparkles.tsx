import { InfiniteSlider } from "./infinite-slider";
import hdfc1 from "../../assets/logos/hdfc1.png";
import zerodha1 from "../../assets/logos/zerodha1.png";
import icici1 from "../../assets/logos/icici1.png";
import angel1 from "../../assets/logos/angel1.png";
import upstocks1 from "../../assets/logos/upstocks1.png";
import kotak811 from "../../assets/logos/kotak811.png";

export function InfiniteSliderHoverSpeed() {
  return (
    <InfiniteSlider speedOnHover={20} gap={100}>
      <div className="flex flex-col items-center">
        <img
          src={hdfc1}
          alt="HDFC"
          className="aspect-square w-[40px] rounded-[4px]"
        />
      </div>
      <div className="flex flex-col items-center">
        <img
          src={angel1}
          alt="Angle One"
          className="aspect-square w-[40px] rounded-[4px]"
        />
      </div>
      <div className="flex flex-col items-center">
        <img
          src={icici1}
          alt="ICICI"
          className="aspect-square w-[40px] rounded-[4px]"
        />
      </div>
      <div className="flex flex-col items-center">
        <img
          src={zerodha1}
          alt="Zerodha"
          className="aspect-square w-[40px] rounded-[4px]"
        />
      </div>
      <div className="flex flex-col items-center">
        <img
          src={upstocks1}
          alt="Upstox"
          className="aspect-square w-[40px] rounded-[4px]"
        />
      </div>
      <div className="flex flex-col items-center">
        <img
          src={kotak811}
          alt="Kotak"
          className="aspect-square w-[40px] rounded-[4px]"
        />
      </div>
    </InfiniteSlider>
  );
}
