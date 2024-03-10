//import Header from "../Components/Header"
import { useState } from 'react';
import FileUploadForm from '../Components/ImageForm';
import './Landing.css';
export default function Landing() {
    const [response, setResponse] = useState('');

    return (
        <div className="main">
            <div className="nav">
                <h1>Ornipedia</h1>
            </div>
            {!response && (
                <>
                    <div className="upload">
                        <FileUploadForm
                            setResponse={(res) => {
                                setResponse(res);
                            }}
                        />
                    </div>
                </>
            )}

            <div className={"response " + (response ? "big" : "small")}>{response}</div>
        </div>
    );
}
