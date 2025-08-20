import nlp from "compromise";
import Sentiment from "sentiment";
import { v4 as uuid } from "uuid"
import conditions from "@/lib/conditions.json" assert { type: "json" };
import privacyMap from "@/lib/privacyMap.json" assert { type: "json" };

let sentiment= new Sentiment();



export default function ShizukaMain () {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="">

            </div>
        </div>
    )
}