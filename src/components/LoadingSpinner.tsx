import Image from "next/image";
import loadingImage from "../../public/assets/spinner.svg";

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <Image
        src={loadingImage}
        alt="Loading..."
        className="h-24 w-24 animate-spin"
        width={96}
        height={96}
      />
    </div>
  );
}
