import { useEffect, useState } from "react"


const starterQuestion = [
    {

    }
]

export default function QuestionCareMain () {

    const [conditionsData, setConditionsData] = useState([]);
    const [userAnswer, setUserAnswer] = useState("")

    useEffect(() => {
        fetch("/")
        .then((res) => res.json())
        .then((data) => setConditionsData(data))
        .catch((err) => console.log("data unable to load: ", err))
    })

    function questionProvide () {

    }


    function answer (value) {
        if(!conditionsData.length) return;
        setUserAnswer(value);

        switch(userAnswer) {
            case "yes": {
                
            }
            break
            case "no": {

            }
            break
            case "notSure": {

            }
            break
        }
        
        questionProvide()

    }

    function calculate (userAnswer) {
        
    }


    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center">
            <div className="">
                {starterQuestion.map((questionProvide, idx) => {

                })}
            </div>
            <div className="">
                <button className="" value={"Yes"} onClick={() => answer(value)}>
                    Yes
                </button>
                <button className="" value={"No" } onClick={() => answer(value)}>
                    No
                </button>
                <button className="" value={"NotSure"} onClick={() => answer(value)}>
                    Not Sure
                </button>
            </div>
        </div>
    )
}