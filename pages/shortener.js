import {React} from "react";
import {useState} from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import axios from 'axios';

function App() {
    const [userURL, setuserURL] = useState("");
    const [shortLink, setshortLink] = useState("")

    const fetchData = async () => {
        try {       
            const response = await axios(`https://api.shrtco.de/v2/shorten?url=${userURL}`); 
            setshortLink(response.data.result.full_short_link);  
        } catch (e) {  
            setshortLink(e.message);
            console.log(e); 
        }
    };

    return (
        <div className="h-50 w-screen bg-slate-100 text-stone-900 flex flex-row gap-10 justify-center py-2">
            <div className="text-center">
                <span className="text-xl text-blue-700 font-bold">
                    Easy URL Shortener
                </span>
            </div>
            <input
                className="outline-none border-2 border-blue-500 rounded-md backdrop-blur-xl bg-white shadow-md px-2 py-1"
                type="text"
                placeholder="Enter you link..."
                value={userURL}
                onChange={(e)=>{setuserURL(e.target.value)}}
            />
            <button className=" bg-blue-500 text-white px-3 py-1 rounded-md shadow-xl
                hover:bg-blue-800 hover:shadow-md"
                onClick={() => { fetchData(); }}
            >
                Submit URL
            </button>
            {shortLink &&
                <div>{shortLink}
                <CopyToClipboard text={shortLink}>
                    <button className="border-2 border-blue-500 bg-blue-500 text-white font-medium px-2 py-1 ml-4 rounded-md">
                        Copy URL to Clipboard
                    </button>
                </CopyToClipboard>
                </div>
            }
            </div>
    );
}

export default App;