import { Product } from "@/components/component/product";

export default function Main() {
    return (
        <Product
            id="unicum"
            version="1.1.17"
            title="Unicum"
            description="Dynamic cheat tools. It have many features that provide in-game API as electron web services."
            steps={[
                {
                    title: "Installation",
                    description: "How to install Unicum.",
                    features:[
                        "Download the latest version of Unicum.",
                        "Run the installer.",
                        "Wait until auto update is done.",
                    ]
                },
                {
                    title: "Usage",
                    description: "How to use Unicum.",
                    features:[
                        "Run Bluestacks first.",
                        "Run Unicum.",
                        "Input your token.",
                    ]
                },
                {
                    title: "Posbase Scanning",
                    description: "How to get position base.",
                    features:[
                        "Go to the top of streetlamp.",
                        "First scan 18.47 as float type in cheat engine.",
                        "Go to the top of fence.",
                        "Next scan 3.3 as float type in cheat engine.",
                        "Find the address that is end with 7E4.",
                        "Put the address in Posbase section.",
                    ]
                },
                {
                    title: "Cambase Scanning",
                    description: "How to get camera base.",
                    features:[
                        "Raise your view as high as possible.",
                        "First scan -0.8 as float type in cheat engine.",
                        "Lower your view as low as possible.",
                        "Next scan 1.05 as float type in cheat engine.",
                        "Find the address that is end with 00C.",
                        "Put the address in Cambase section.",
                    ]
                },
                {
                    title: "Ingame Scanning",
                    description: "How to get ingame base.",
                    features:[
                        "Press F1 to copy pos array of bytes.",
                        "Paste it in cheat engine and scan as array of bytes.",
                        "Copy all the address and press F2 to paste it in Unicum.",
                        "Press F3 to copy players array of bytes.",
                        "Paste it in cheat engine and scan as array of bytes.",
                        "Copy all the address and press F4 to paste it in Unicum.",
                    ]
                },
                {
                    title: "Precautions",
                    description: "Things to be aware of.",
                    features:[
                        "When you are in lobby, turn off the features or press clear button.",
                        "When your game is finished, turn off the features or press clear button.",
                        "Please double check the scan type in cheat engine.",
                        "If the outline is not green, address is not correct.",
                    ]
                }
            ]}
            faqs={[]}
        />
    )
}