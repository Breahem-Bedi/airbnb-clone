import Image from "next/image";
import { StarIcon } from "@heroicons/react/solid";

function PopupCard({ img, title, star, price }) {
    return (
        <div className="rounded overflow-hidden">
            <div className="relative h-40 w-60">
                <Image src={img} layout="fill" objectFit="cover"
                    className="w-full"
                />
            </div>
            <div className="pt-2 flex flex-col">
                <h4 className="text-sm text-gray-700 font-semibold">{title}</h4>

                <div className="border-b w-70 pt-2"></div>

                
                <div className="flex justify-between pt-2">
                    <p className="flex items-center">
                        <StarIcon className="h-5 text-red-400 cursor-pointer"/>
                        {star}
                    </p>
                    <div>
                        <p className="text-lg font-semibold">{price}</p>                      
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PopupCard;
